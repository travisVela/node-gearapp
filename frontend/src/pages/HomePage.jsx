import React, {useEffect, useRef, useState} from 'react';

import AddGearForm from "../components/AddGearForm.jsx";
import EditFormDialog from "../components/EditFormDialog.jsx";
import {useGearStore} from "../stores/useGearStore.js";
import CardDropdown from "../components/CardDropdown.jsx";

const HomePage = () => {
    const {getGear, gear} = useGearStore()
    const [isEditRefOpen, setIsEditRefOpen] = useState(false)

    const [isdropdownRefOpen, setisdropdownRefOpen] = useState(false)

    const editGearRef = useRef(null)
    const dropdownRef = useRef(null)

    const [formData, setFormData] = useState({});

    useEffect(() => {
        getGear()

    }, [getGear]);

     useEffect(() => {
        gear
    }, [gear]);

    useEffect(() => {
        if (isdropdownRefOpen) {
            dropdownRef.current?.showModal();
        } else {
            dropdownRef.current?.close();
        }
    }, [isdropdownRefOpen])


    function handleToggleEditDialog(item) {
        // setIsEditRefOpen(true)
        // setIsOpen(!isOpen)
        setisdropdownRefOpen(false)
        setIsEditRefOpen(true)
        setFormData(item)

        editGearRef.current.hasAttribute("open")
            ? editGearRef.current.close()
            : editGearRef.current.showModal()
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
        <div className={"container mx-auto"}>
            <div className={"flex flex-row items-start justify-center p-2  h-lvh mt-2 "}>

                {/*inventory column*/}
                <div className={"basis-full md:basis-3/5 "}>
                    <CardDropdown />
                </div>

                {/*form column*/}
                <div className="hidden container md:flex md:basis-2/5  justify-center items-center ">
                    <AddGearForm addGear={handleAddGear}/>
                </div>

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