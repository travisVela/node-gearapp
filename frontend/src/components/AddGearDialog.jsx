import {forwardRef, useEffect, useState} from 'react';

import {useGearStore} from "../stores/useGearStore.js";
import AddGearForm from "./AddGearForm.jsx";


const AddGearDialog = forwardRef(({onClose, toggleDialog, children}, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(true)

    const {addGear} = useGearStore()

    const handleClick = (e) => {

        // if (e.currentTarget === e.target) {
        //     ref.current.hasAttribute("open")
        //     ? ref.current.close()
        //     : ref.current.showModal()
        // }
        if (e.currentTarget === e.target) {
            setIsDialogOpen(!isDialogOpen)
            toggleDialog()
        }
    }

    return (
        <dialog
            ref={ref}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl max-w-lg focus:outline-none bg-gray-800"
            onClick={handleClick}
        >
            <div>
                {children}
                <button className={"m-2 closeButton "} onClick={handleClick}>X</button>
                <AddGearForm
                    setOpen={setIsDialogOpen}
                    isOpen={isDialogOpen}
                    onSubmit={(data) => {
                        addGear(data)
                        onClose(setIsDialogOpen(false))
                    }
                    }/>
            </div>
        </dialog>
    )
})
export default AddGearDialog;