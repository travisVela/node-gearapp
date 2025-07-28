import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'
import {useGearStore} from "../stores/useGearStore.js";
import {useEffect, useState} from "react";
import TableDropdown from "./TableDropdown.jsx";
import DescriptionCell from "./DescriptionCell.jsx";



const Table = () => {
    const {getGear, gear} = useGearStore()
    const data = gear ? gear : []

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
        getCoreRowModel: getCoreRowModel()
    })

    return (
    <div className={"container justify-items-center"}>
        <div style={{width: table.getTotalSize()}} className={`flex flex-col`}>
            {table.getHeaderGroups().map(headerGroup => <div className={"tr flex flex-row border"} key={headerGroup.id}>

                {headerGroup.headers.map(

                    header => <div style={{width: header.getSize()}} className={`th flex flex-col m-2  `} key={header.id} >

                        {header.column.columnDef.header}
                    </div>
                )}

            </div>)}
            {table.getRowModel().rows.map(row => <div className={"tr border flex flex-row "} key={row.id}>
                    {row.getVisibleCells().map(cell => <div style={{width: cell.column.getSize()}} className={`td  flex flex-col m-2 `} key={cell.id}>
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