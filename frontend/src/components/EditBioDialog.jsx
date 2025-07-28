import {forwardRef} from 'react';
import EditBioForm from "./EditBioForm.jsx";
import {useUserStore} from "../stores/useUserStore.js";


const EditFormDialog = forwardRef(({onClose, initialData, children}, ref) => {

    const {editProfile} = useUserStore()

    const handleClick = (e) => {

        if (e.currentTarget === e.target) {
            ref.current.hasAttribute("open")
            ? ref.current.close()
            : ref.current.showModal()
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
                    <EditBioForm
                        data={initialData}
                        onSubmit={(updatedData) => {
                            editProfile(updatedData)
                            onClose();
                    }}/>
                </div>
        </dialog>
    )
})
export default EditFormDialog;