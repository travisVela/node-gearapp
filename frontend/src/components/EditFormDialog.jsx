import React, {forwardRef} from 'react';
import EditGearForm from "./EditGearForm.jsx";

import { useGearStore} from '../stores/useGearStore.js'


const EditGearFormDialog = forwardRef(({onClose, initialData, children}, editGearRef) => {

    const {updateGear} = useGearStore()


    const handleClick = (e) => {

        if (e.currentTarget === e.target) {
            editGearRef.current.hasAttribute("open")
            ? editGearRef.current.close()
            : editGearRef.current.showModal()
        }
    }

    return (

        <dialog
            ref={editGearRef}
            onClick={handleClick}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700  rounded-lg shadow-xl max-w-lg focus:outline-none`}
            id={"editformdialog"}
        >
            <div>
                {children}

                <button onClick={handleClick} className={"flex closeButton"}>X</button>
                <EditGearForm
                    data={initialData}
                    onSubmit={(updatedData) => {

                        updateGear(updatedData)
                        onClose()

                    }}
                />
            </div>
        </dialog>


    );

})
export default EditGearFormDialog

