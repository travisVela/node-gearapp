import {useEffect, useRef, useState} from "react";
import Dialog from "./Dialog.jsx";
import {useGearStore} from "../stores/useGearStore.js";

const DescriptionCell = ({getValue}) => {
    const ref = useRef(null)
    const [dialogContent, setDialogContent] = useState(null)
    const [isRefOpen, setIsRefOpen] = useState(false)
    const {getGear} = useGearStore()

    const value = getValue()

    useEffect(() => {
        if (isRefOpen) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [isRefOpen])

    function toggleDialog() {
        if (!ref) {
            return
        }
        setDialogContent(value)

        ref.current.hasAttribute("open")
            ? ref.current.close(setDialogContent(null))
            : ref.current.showModal()
        getGear()
    }

    return (
        <div>
            <a
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        toggleDialog();
                    }
                }}
            >description</a>
            <Dialog toggleDialog={toggleDialog} ref={ref}>
                {dialogContent}
            </Dialog>
        </div>
    )
}

export default DescriptionCell