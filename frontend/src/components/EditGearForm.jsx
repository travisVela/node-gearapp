import React, {useEffect, useState} from 'react';

import Select from 'react-select'
import {motion} from "framer-motion";
import {Loader, Lock, LogIn} from "lucide-react";
import {useGearStore} from "../stores/useGearStore.js";


const EditGearForm = ({data, onSubmit}) => {
    const [type, setType] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerial] = useState("")
    const [year, setYear] = useState("")
    const [description, setDescription] = useState("")

    const [formState, setFormState] = useState(data);
    const {updateGear} = useGearStore()

    useEffect(() => {
        setFormState(data);
    }, [data]);


    // options for type select
    const options = [
        {value: 'guitar', label: 'guitar'},
        {value: 'bass', label: 'bass'},
        {value: 'steel', label: 'steel'},
        {value: "amp", label: "amp"},
        {value: "pedal", label: "pedal"}
    ]

    // const handleSelect = (e) => {
    //     console.log({"select event ": e})
    //
    //     return setType(e.value)
    // }
    // const selectedType = type ? type : "Select"

    const handleChange = (e) => {

        const {id, value} = e.target
        setFormState(prevState => ({...prevState, [id]: value}));
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (type && brand && model && serial_number && year && description) {
            updateGear(type, brand, model, serial_number, year, description);
            setType("")
            setBrand("")
            setModel("")
            setSerial("")
            setYear("")
            setDescription("")
        }
        onSubmit(formState);

    }

    return (

        <div className='flex flex-col justify-center py-8 sm:px-6 lg:px-8'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                <h2 className='text-center text-2xl font-extrabold text-emerald-400'>Update gear</h2>
            </motion.div>

            <motion.div
                className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <div className={"flex flex-row w-full"}>
                            <div className={"flex flex-col justify-center items-start mx-1"}>
                                <label htmlFor='type' className='block text-sm font-medium text-gray-300'>
                                    Type
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id={'type'}
                                        type='text'

                                        value={formState.type || ''}
                                        onChange={handleChange}
                                        className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500
									 focus:border-emerald-500 sm:text-sm'
                                        placeholder='type of gear'
                                    />
                                </div>
                            </div>

                            <div className={"flex flex-col justify-center items-start mx-1"}>
                                <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
                                    Brand
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id='brand'
                                        type='text'

                                        value={formState.brand || ''}
                                        onChange={handleChange}
                                        className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                        placeholder='brand'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-row w-full"}>

                        <div className={"flex flex-col justify-center items-start mx-1"}>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
                                Model
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='model'
                                    type='text'

                                    value={formState.model || ''}
                                    onChange={handleChange}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='model'
                                />
                            </div>
                        </div>
                        <div className={"flex flex-col justify-center items-start mx-1"}>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
                                Year
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='year'
                                    type='text'

                                    value={formState.year || ''}
                                    onChange={handleChange}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='year'
                                />
                            </div>
                        </div>
                            </div>
                        <div className={"mx-1"}>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
                                Serial Number
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='serial_number'
                                    type='text'
                                    required
                                    value={formState.serial_number || ''}
                                    onChange={handleChange}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='serial number'
                                />
                            </div>
                        </div>
                        <div className={"mx-1"}>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
                                Description
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <textarea
                                    id='description'
                                    // type='description'
                                    value={formState.description || ''}
                                    onChange={handleChange}
                                    className=' block h-24 w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='description'
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
                                Update Gear
                            </>
                        </button>
                    </form>


                </div>
            </motion.div>
        </div>


        // <form className="my-4  flex flex-col justify-items-center" onSubmit={handleSubmit}>
        //     <div className={"flex flex-row w-full"}>
        //         <div className={"flex flex-col w-50"}>
        //             <Select
        //                 options={options}
        //                 value={formState.type || ''}
        //                 name={"type"}
        //                 onChange={handleSelect}
        //                 placeholder={selectedType}
        //                 className={`flex flex-col text-gray-900 w-50 ${selectedType !== "Select" ? "text-gray-900" : ""}`}
        //             />
        //         </div>
        //         <div className={"flex flex-col w-50"}>
        //             <input
        //                 type="text"
        //                 name={"brand"}
        //                 value={formState.brand || ''}
        //                 onChange={handleChange}
        //                 placeholder="Enter brand"
        //                 className="input border border-gray-500 rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //             />
        //         </div>
        //     </div>
        //
        //
        //     <div className={"flex flex-row w-full"}>
        //         <div className={"flex flex-row w-50"}>
        //             <input
        //                 type="text"
        //                 value={formState.model || ''}
        //                 name={"model"}
        //                 onChange={handleChange}
        //                 placeholder="Enter model"
        //                 className="input border border-gray-500  rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //             />
        //         </div>
        //         <div className={"flex flex-col w-50"}>
        //             <input
        //                 type="number"
        //                 name={"year"}
        //                 value={formState.year || ''}
        //                 onChange={handleChange}
        //                 placeholder="Enter year"
        //                 className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //             />
        //
        //         </div>
        //     </div>
        //     <input
        //         type="text"
        //         value={formState.serial_number || ''}
        //         name={"serial_number"}
        //         onChange={handleChange}
        //         placeholder="Enter serial number"
        //         className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //     />
        //
        //     <textarea
        //
        //         value={formState.description || ''}
        //         name={"description"}
        //         onChange={handleChange}
        //         placeholder="Enter description"
        //         className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
        //         rows="5"
        //         cols={"40"}
        //     />
        //
        //     <button className="m-2" type="submit">Edit Gear</button>
        // </form>
    )
}

export default EditGearForm;