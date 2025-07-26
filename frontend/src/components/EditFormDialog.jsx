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
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none`}
            id={"editformdialog"}
        >
            <div>
                {children}

                <button onClick={handleClick} className={"flex mt-4 "}>X</button>
                <EditGearForm
                    data={initialData}
                    onSubmit={(updatedData) => {
                        updateGear(updatedData)
                        onClose()
                    }}
                />
            </div>
        </dialog>

        // <dialog
        //     ref={editGearRef}
        //     className="dialog-content flex flex-col justify-items-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl max-w-lg focus:outline-none bg-gray-800 z-50"
        //     onClick={handleClick}
        // >
        //     <div>
        //         {children}
        //         <button className={"mt-4 text-sm"} onClick={handleClick}>Close</button>
        //         <EditGearForm
        //             data={initialData}
        //             onSubmit={(updatedData) => {
        //                 updateGear(updatedData)
        //                 onClose();
        //             }}/>
        //     </div>
        // </dialog>

    );

})
export default EditGearFormDialog

// function EditFormDialog({ onClose, initialData }) {
//     const {updateGear} = useGearStore()
//
//   return (
//     <div >
//       <div className="dialog-content flex flex-col justify-items-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl max-w-lg focus:outline-none bg-gray-800 z-50">
//         <button className={"mt-4"} onClick={onClose}>Close</button>
//         <EditGearForm data={initialData} onSubmit={(updatedData) => {
//
//           updateGear(updatedData)
//           onClose();
//         }} />
//       </div>
//     </div>
//   );
// }
// export default EditFormDialog;