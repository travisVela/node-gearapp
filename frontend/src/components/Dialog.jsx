import React, {forwardRef, useState} from "react";
import {motion} from "framer-motion";

const Dialog = forwardRef(({children, toggleDialog}, ref) => {

    const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            toggleDialog()
        }
    }

    return (

        <dialog
            ref={ref}
            onClick={handleClick}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none`}

        >
            <button onClick={handleClick} className={"flex dark:text-white/50 hover:dark:text-white/90 closeButton"}>X</button>
            <div>
                {children}
            </div>
        </dialog>

    )
})

export default Dialog

