import {useGearStore} from "../stores/useGearStore.js";
import img from "../assets/react.svg";
import React, {useEffect, useRef, useState} from "react";
import Dialog from "./Dialog.jsx";
import {Pencil, Plus, Trash} from "lucide-react";
import EditFormDialog from "./EditBioDialog.jsx";
import EditGearFormDialog from "./EditFormDialog.jsx";
import AddGearForm from "./AddGearForm.jsx";
import AddGearDialog from "./AddGearDialog.jsx";


const CardDropdown = () => {
    const {getGear, gear, deleteGear} = useGearStore()

    const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isAddGearDialogOpen, setIsAddGearDialogOpen] = useState(false)
    const [formData, setFormData] = useState({})


    const [dialogContent, setDialogContent] = useState(null)
    const dropdownRef = useRef(null)
    const descriptionDialogRef = useRef(null)
    const editItemDialogRef = useRef(null)
    const addGearDialogRef = useRef(null)


    useEffect(() => {
        getGear()
    }, [getGear]);


    const toggleDescriptionDialog = async (item) => {

        if (!descriptionDialogRef) {
            return
        }
        setDialogContent(item?.description)
        setIsDescriptionDialogOpen(true)
        setIsAddGearDialogOpen(false)
        setIsEditDialogOpen(false)

        descriptionDialogRef?.current.hasAttribute("open")
            ? descriptionDialogRef.current.close()
            : descriptionDialogRef.current.showModal()

    }

    const toggleEditDialog = (item) => {
        if (!editItemDialogRef) {
            return
        }
        setIsDescriptionDialogOpen(false)
        setIsAddGearDialogOpen(false)
        setIsEditDialogOpen(true)
        setFormData(item)

        editItemDialogRef?.current.hasAttribute("open")
            ? editItemDialogRef.current.close()
            : editItemDialogRef.current.showModal()

    }

    const handleDeleteItem = (item) => {

        deleteGear(item._id)
        getGear()
    }

    const toggleAddGearDialog = () => {

        if (!addGearDialogRef) {
            return
        }
        setIsDescriptionDialogOpen(false)
        setIsEditDialogOpen(false)
        setIsAddGearDialogOpen(true)

        addGearDialogRef?.current.hasAttribute("open")
            ? addGearDialogRef.current.close()
            : addGearDialogRef.current.showModal()

    };


    return (

            <div className="max-w-md sm:max-w-full p-2  bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Gear</h5>
                    <div

                        className="md:hidden cursor-pointer text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={toggleAddGearDialog}
                    >
                        <Plus />
                    </div>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ">
                        {gear.map((item) =>

                            <li key={item.id} className="py-3 sm:py-4">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={img}
                                             alt=""/>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        {/*<p className="text-sm font-medium text-gray-900 truncate dark:text-white">*/}
                                        {/*    {item.type}*/}
                                        {/*</p>*/}
                                        <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                            {item?.year} {item?.brand} {item?.model}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            SN: {item?.serial_number}
                                        </p>
                                    </div>


                                    <div className="flex flex-col justify-around px-4">
                                        <div
                                            className="inline-flex items-center text-base pb-2 text-gray-900 dark:text-white">
                                            <a className={"hover:cursor-pointer"}
                                               onClick={() => toggleDescriptionDialog(item)}
                                               onCancel={() => setIsDescriptionDialogOpen(false)}
                                            >
                                                description
                                            </a>
                                        </div>

                                        <div className={"flex flex-row "}>
                                            <button
                                                style={{backgroundColor: "goldenrod", borderRadius: "50%", padding: 0}}
                                                className={"h-8 w-8 text-black mr-2 flex flex-col justify-center items-center"}
                                                onClick={() => toggleEditDialog(item)}
                                            >
                                                <Pencil size={12}/>
                                            </button>
                                            <button
                                                style={{backgroundColor: "darkred", borderRadius: "50%", padding: 0}}
                                                className={"h-8 w-8  flex flex-col justify-center items-center"}
                                                onClick={() => handleDeleteItem(item)}
                                            >
                                                <Trash size={12}/>
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </li>)}

                    </ul>
                </div>

                <AddGearDialog
                    toggleDialog={toggleAddGearDialog}
                    ref={addGearDialogRef}
                    onClose={toggleAddGearDialog}
                >
                </AddGearDialog>

                <Dialog
                    toggleDialog={toggleDescriptionDialog}
                    ref={descriptionDialogRef}
                >
                    {dialogContent}
                </Dialog>

                <EditGearFormDialog
                    toggleDialog={toggleEditDialog}
                    initialData={formData}
                    ref={editItemDialogRef}
                    onClose={toggleEditDialog}
                />
            </div>

    )
}

export default CardDropdown