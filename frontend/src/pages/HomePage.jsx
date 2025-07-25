import React, {useEffect, useRef, useState} from 'react';
import {Pencil, Trash} from "lucide-react";

import AddGearForm from "../components/AddGearForm.jsx";
import Dialog from "../components/Dialog.jsx";
import EditFormDialog from "../components/EditFormDialog.jsx";
import {useGearStore} from "../stores/useGearStore.js";

const HomePage = () => {
    const {getGear, gear, deleteGear} = useGearStore()
    const [dialogContent, setDialogContent] = useState(null)
    const [isEditRefOpen, setIsEditRefOpen] = useState(false)
    const ref = useRef(null)
    const editGearRef = useRef(null)


    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const columns = [
        {header: 'Type', accessor: 'type'},
        {header: 'Brand', accessor: 'brand'},
        {header: 'Model', accessor: 'model'},
        {header: 'SN', accessor: 'serial_number'},
        {header: 'Year', accessor: 'year'},
        {header: 'Description', accessor: 'description'},
    ];
    useEffect(() => {
        getGear()

    }, [getGear, gear]);


    function toggleDialog(item) {

        if (!ref) {
            return
        }
        setDialogContent(item)
        ref.current.hasAttribute("open")
            ? ref.current.close(setDialogContent(null))
            : ref.current.showModal()
    }

    function handleToggleEditDialog(item) {

        // setIsEditRefOpen(true)
        // setIsOpen(!isOpen)
        setFormData(item)

        editGearRef.current.hasAttribute("open")
            ? editGearRef.current.close()
            : editGearRef.current.showModal()

    }

    const handleDelete = (item) => {
        try {
            deleteGear(item._id)
        } catch (error) {
            console.error("Error deleting gear", error);
        }
        getGear()
    }

    const handleAddGear = async () => {
        try {
            getGear()

        } catch (error) {
            console.error("Error adding gear", error);
        }
    };

    return (
        <div className={"flex flex-col w-full"}>
            <div
                className={"flex flex-row items-center justify-center p-2 w-screen h-lvh mt-2 divide-x-2 divide-sky-500"}>

                {/*column to set divide*/}
                <div className="flex flex-row items-center w-full justify-center h-3/4">

                    {/*inventory column*/}
                    {gear > 0 ? <h1 className={"animate-pulse"}>...</h1> :
                        <div
                            className="container w-full flex flex-col items-center justify-start p-8 h-lvh overflow-y-scroll">
                            <h2 className="p-2 text-2xl">Gear List</h2>
                            <div className={"w-full"}>
                                <div>
                                    <div
                                        className="flex flex-row  border-b border-b-sky-500  items-start justify-start w-full gap-10 space-x-3">
                                        {columns.map((column, index) => (
                                            <div className="py-2 flex flex-col w-full items-start"
                                                 key={`header-${index}`}>{column.header}</div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="flex flex-col  border-b border-b-sky-500  items-start justify-start w-full gap-10 space-x-3">
                                        {gear?.map((item, rowIndex) => (
                                            <div
                                                className={`flex flex-row border-b border-b-slate-500 items-start justify-start w-full gap-10 space-x-3`}
                                                key={`row-${rowIndex}`}
                                            >
                                                {columns.map((column, colIndex) => (
                                                    <div

                                                        onClick={column.accessor === 'description' ? () => toggleDialog(item.description) : undefined}
                                                        className={`py-2 flex flex-col w-full ${column.accessor === "description" ? "max-h-20 overflow-hidden overflow-ellipsis text-nowrap hover:cursor-pointer text-sky-500 hover:text-sky-700  min-w-24 underline " : ""}`}
                                                        key={`cell-${rowIndex}-${colIndex}`}>
                                                        {column.accessor === "description" ? "description" : item[column.accessor]}
                                                    </div>

                                                ))}
                                                <div className={"flex flex-row justify-center items-center"}>
                                                    <button onClick={() => handleToggleEditDialog(item)}><Pencil/>
                                                    </button>
                                                    {/*{isOpen && (*/}
                                                    {/*    */}
                                                    {/*)}*/}
                                                    <div>
                                                        <button onClick={() => handleDelete(item)}>
                                                            <Trash>
                                                            </Trash>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>}

                </div>
                {/*form column*/}
                <div className="container h-lvh flex flex-col flex-6/8 justify-center items-center">
                    <AddGearForm addGear={handleAddGear}/>
                </div>

                <Dialog toggleDialog={toggleDialog} ref={ref}>
                    {dialogContent}
                </Dialog>

                <EditFormDialog
                    toggleDialog={handleToggleEditDialog}
                    onClose={handleToggleEditDialog}
                    initialData={formData}
                    ref={editGearRef}
                />

            </div>

        </div>
    )
}

export default HomePage;