import React, {forwardRef, useState} from "react";
import {motion} from "framer-motion";

const Dialog = forwardRef(({children, toggleDialog}, ref) => {

    const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            toggleDialog()
        }
    }

    return (

         // <motion.div
         //        // className='sm:mx-auto sm:w-full sm:max-w-md'
         //        initial={{opacity: 0, y: -20}}
         //        animate={{opacity: 1, y: 0}}
         //        transition={{duration: 0.8}}
         //        ref={ref}
         //    onClick={handleClick}
         //    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:mx-auto sm:w-full sm:max-w-md p-6 rounded-lg shadow-xl max-w-lg focus:outline-none`}
         //    >
         //        <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Login</h2>
         //    </motion.div>
        <dialog
            ref={ref}
            onClick={handleClick}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  p-6 rounded-lg shadow-xl max-w-lg focus:outline-none`}
        >
            <div>
                {children}

                <button onClick={handleClick} className={"flex mt-4 closeButton"}>X</button>
            </div>
        </dialog>

    )
})

export default Dialog

