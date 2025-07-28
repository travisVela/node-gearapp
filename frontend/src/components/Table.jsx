import {useReactTable, getCoreRowModel, flexRender, getFilteredRowModel} from '@tanstack/react-table'
import {useGearStore} from "../stores/useGearStore.js";
import {useEffect, useState} from "react";
import TableDropdown from "./TableDropdown.jsx";
import DescriptionCell from "./DescriptionCell.jsx";
import Filters from "./Filters.jsx";



const Table = () => {
    const {getGear, gear} = useGearStore()
    const data = gear ? gear : []
    const [columnFilters, setColumnFilters] = useState([])


    useEffect(() => {
        getGear()

    }, [getGear]);




    const columns = [
        {
            accessorKey: "type",
            header: 'Type',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "brand",
            header: 'Brand',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "model",
            header: 'Model',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "year",
            header: 'Year',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "serial_number",
            header: 'SN',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "description",
            header: 'Description',
            cell: DescriptionCell
        },
        {
            accessorKey: "edit",
            Header: '',
            cell: TableDropdown
        }
    ]

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })
    console.log(columnFilters)
    return (
    <div className={"container justify-items-center"}>
        <div className={"mx-6 px-2 w-full"}>
            <Filters
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
        </div>
        <div style={{width: table.getTotalSize() - 120}} className={`flex flex-col mx-6`}>
            {table.getHeaderGroups().map(headerGroup => <div className={"tr flex flex-row border"} key={headerGroup.id}>

                {headerGroup.headers.map(

                    header => <div style={{width: header.getSize()}} className={`th flex flex-col m-2  `} key={header.id} >

                        {header.column.columnDef.header}
                    </div>
                )}

            </div>)}
            {table.getRowModel().rows.map(row => <div className={"tr border flex flex-row "} key={row.id}>
                    {row.getVisibleCells().map(cell => <div style={{width: cell.column.getSize()}} className={`td  flex flex-col m-2 justify-center`} key={cell.id}>
                        {
                            flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )
                        }
                    </div>)}
                </div>)}
        </div>
    </div>

    )
}

export default Table