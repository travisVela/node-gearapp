import React, {useEffect, useRef, useState} from "react";
import {useGearStore} from "../stores/useGearStore.js";
import EditGearFormDialog from "./EditFormDialog.jsx";


const TableDropdown = ({getValue, row}) => {



    const [isdropdownRefOpen, setisdropdownRefOpen] = useState(false)
    const [isEditRefOpen, setIsEditRefOpen] = useState(false)

    const editGearRef = useRef(null)
    const dropdownRef = useRef(null)
    const [formData, setFormData] = useState({})
    const {gear, deleteGear, getGear} = useGearStore()


    useEffect(() => {
        if (isEditRefOpen) {
            editGearRef.current?.showModal();
        } else {
            editGearRef.current?.close();
        }
    }, [isEditRefOpen])

    useEffect(() => {
        if (isdropdownRefOpen) {
            dropdownRef.current?.showModal();
        } else {
            dropdownRef.current?.close();
        }
    }, [isdropdownRefOpen])


    const handleDropdown = () => {
        if (!dropdownRef) {
            return
        }
        setisdropdownRefOpen(true)
        dropdownRef.current.hasAttribute("open")
            ? dropdownRef.current.close()
            : dropdownRef.current.showModal()
    }

    function handleToggleEditDialog() {
        // setIsEditRefOpen(true)
        // setIsOpen(!isOpen)
        setisdropdownRefOpen(false)
        setIsEditRefOpen(true)
        setFormData(row.original)

        editGearRef.current.hasAttribute("open")
            ? editGearRef.current.close()
            : editGearRef.current.showModal()
    }

    const handleDelete = () => {
        console.log(row.original._id)
        try {
            deleteGear(row.original._id)
        } catch (error) {
            console.error("Error deleting gear", error);
        }
        getGear()
    }


    return (
        <div className="flex justify-end px-4 ">
            <button id="dropdownButton" data-dropdown-toggle="dropdown"
                    className="inline-block closeButton text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700  focus:outline-none  rounded-lg text-sm p-1.5"
                    type="button"
                    onClick={handleDropdown}
                    onCancel={() => setisdropdownRefOpen(false)}
            >
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 16 3">
                    <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            {/*${!show ? "hidden" : "absolute m-0 transform translate-12 z-10"}*/}
            <dialog ref={dropdownRef}
                    className={`absolute top-1/2 left-1/2 transform translate-x-8 -translate-y-6 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-30 dark:bg-gray-700`}
                    onClick={(e) => {
                        if (e.currentTarget === e.target) {
                            handleDropdown();
                        }
                    }}
            >

                <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={() => handleToggleEditDialog()}
                        >Edit
                        </div>
                    </li>
                    <li>
                        <div href="#"
                           className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                             onClick={handleDelete}
                        >Delete</div>
                    </li>
                </ul>
            </dialog>
            <EditGearFormDialog
                toggleDialog={handleToggleEditDialog}
                initialData={formData}
                ref={editGearRef}
                onClose={handleToggleEditDialog}
            />
        </div>
    )

}

export default TableDropdown