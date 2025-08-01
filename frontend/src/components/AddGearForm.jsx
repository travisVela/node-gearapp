import React, {useEffect, useState} from 'react';

import Select from 'react-select'
import {motion} from "framer-motion";
import {ArrowRight, Loader, Lock, LogIn, Mail} from "lucide-react";
import {Link} from "react-router-dom";
import {useGearStore} from "../stores/useGearStore.js";
;


const AddGearForm = ({onSubmit, setOpen, isOpen}) => {
    const [type, setType] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerial] = useState("")
    const [year, setYear] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({type: '', brand: '', model: '', year: '', serial_number: '', description: ''});
    // const [isOpen, setIsOpen] = useState(false)

    const {addGear} = useGearStore()

    // const options = [
    //     {value: 'guitar', label: 'guitar'},
    //     {value: 'bass', label: 'bass'},
    //     {value: 'steel', label: 'steel'},
    //     {value: "amp", label: "amp"},
    //     {value: "pedal", label: "pedal"}
    // ]
    //
    // const handleSelect = (e) => {
    //
    //     return setType(e.value)
    // }
    // const selectedType = type ? type : "Select"

    const handleChange = async (e) => {
        const {id, value} = e.target
        // console.log(e.target.id)
        setFormData(prevState => ({...prevState, [id]: value}));
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {type, brand, model, serial_number, year, description}
        try {
            setFormData(data)
            if (isOpen) {
                onSubmit(formData)
                setOpen(false)
            }
            addGear(formData)

        } catch (error) {
            console.log(error)
        }
            setType("")
            setBrand("")
            setModel("")
            setSerial("")
            setYear("")
            setDescription("")
    }

    return (

        <div className='flex flex-col justify-center sm:px-6 lg:px-8 '>


            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <div className='bg-white rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 sm:py-4 px-4 sm:rounded-lg sm:px-10 '>
                    <motion.div
                        className='sm:mx-auto sm:w-full sm:max-w-md'
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                    >
                        <h2 className='mb-4 md:my-6 text-center text-xl font-bold leading-none text-gray-900 dark:text-white'>Add gear</h2>
                    </motion.div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor='type' className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Type
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id={'type'}
                                    type='text'
                                    required
                                    value={formData.type}
                                    onChange={handleChange}
                                    className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='type of gear'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Brand
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='brand'
                                    type='text'
                                    required
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className=' block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='brand'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Model
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='model'
                                    type='text'
                                    required
                                    value={formData.model}
                                    onChange={handleChange}
                                    className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='model'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Year
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='year'
                                    type='text'
                                    value={formData.year}
                                    onChange={handleChange}
                                    className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='year'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Serial Number
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='serial_number'
                                    type='text'
                                    value={formData.serial_number}
                                    onChange={handleChange}
                                    className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='serial number'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='brand' className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Description
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <textarea
                                    id='description'
                                    // type='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='description'
                                    row={5}
                                    cols={40}
                                />
                            </div>
                        </div>


                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium  text-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:text-white
							   transition duration-150 ease-in-out disabled:opacity-50'
                            style={{backgroundColor: "goldenrod"}}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <>
                                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true'/>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <LogIn className='mr-2 h-5 w-5' aria-hidden='true'  />
                                    Add Gear
                                </>
                            )}
                        </button>
                    </form>


                </div>
            </motion.div>
        </div>

    )
}

export default AddGearForm;