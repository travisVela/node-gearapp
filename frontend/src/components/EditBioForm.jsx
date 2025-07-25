import img from "../assets/react.svg";
import React, {forwardRef, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Lock, LogIn} from "lucide-react";

const EditBioForm = ({data, onSubmit, onClose}) => {
    const [bio, setBio] = useState(data)
    const [formState, setFormState] = useState(data);


    useEffect(() => {
        setFormState(data);
    }, [data]);


    const handleChange = (e) => {
        const {id, value} = e.target
        setFormState(prevState => ({...prevState, [id]: value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formState)
    }

    return (


        <div className='flex flex-col justify-center py-8 pt-0 sm:px-6 lg:px-8'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                <h2 className='text-center text-2xl font-extrabold text-emerald-400'>Update Profile</h2>
            </motion.div>

            <motion.div
                className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form onSubmit={handleSubmit} className='space-y-2'>

                            <div className={"flex flex-col justify-center items-start mx-1"}>
                                <label htmlFor='usernam' className='block text-sm font-medium text-gray-300'>
                                    Username
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id={'username'}
                                        type='text'

                                        value={formState.username || ''}
                                        onChange={handleChange}
                                        className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500
									 focus:border-emerald-500 sm:text-sm'
                                        placeholder='username'
                                    />
                                </div>
                            </div>


                        <div className={"mx-1"}>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
                                Bio
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <textarea
                                    id='bio'
                                    // type='description'
                                    value={formState.bio || ''}
                                    onChange={handleChange}
                                    className=' block h-24 w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='bio'
                                    row={5}
                                    cols={40}
                                />
                            </div>
                        </div>


                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                            // disabled={loading}
                        >
                            {/*{loading ? (*/}
                            {/*    <>*/}
                            {/*        <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true'/>*/}
                            {/*        Loading...*/}
                            {/*    </>*/}
                            {/*) : (*/}
                            {/*)}*/}
                            <>
                                <LogIn className='mr-2 h-5 w-5' aria-hidden='true'/>
                                Update
                            </>
                        </button>
                    </form>


                </div>
            </motion.div>
        </div>
        // <div className={"flex container flex-col w-full items-center justify-center "}>
        //     <div
        //         className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        //
        //         <div className="flex flex-col items-center pb-10">
        //
        //             <div className="flex mt-4 md:mt-6">
        //                 <form onSubmit={handleSubmit}>
        //                     <div className={"flex flex-col w-50"}>
        //
        //                         <textarea
        //                             value={formState.bio || ''}
        //                             name={"bio"}
        //                             onChange={handleChange}
        //
        //                             className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //                             rows="5"
        //                             cols={"40"}
        //                         />
        //                     </div>
        //                     <div className={"flex flex-col w-50"}>
        //
        //                         <input
        //                             value={formState.username || ''}
        //                             name={"username"}
        //                             onChange={handleChange}
        //
        //                             className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //
        //                         />
        //                     </div>
        //                     <button className="m-2" type="submit" onClick={onClose}>Edit</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default EditBioForm