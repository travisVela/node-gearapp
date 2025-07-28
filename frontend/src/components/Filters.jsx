import {Search} from 'lucide-react'

const Filters =({columnFilters, setColumnFilters}) => {
    const typeName = columnFilters.find((f) => f.id === 'type')?.value || ''

    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })
    )

    return (
        <div className={"flex flex-row w-full items-center m-4 "}>
            <Search />
            <input
                type={"text"}
                placeholder={"filter"}
                className={"border rounded p-2 ml-2"}
                value={typeName}
                onChange={(e) => onFilterChange('type', e.target.value)}
            >

            </input>
        </div>
    )
}
export default Filters