import img from "../assets/react.svg";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Lock, LogIn} from "lucide-react";
import {useUserStore} from "../stores/useUserStore.js";


const EditBioForm = ({data, onSubmit}) => {

    const [formState, setFormState] = useState(data);
    const [username, setUsername] = useState()
    const [usernameError, setUsernameError] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const {findUsername, usernameData} = useUserStore()


    useEffect(() => {
        setFormState(data);
    }, [data]);


    const handleChange = async (e) => {

        const {id, value} = e.target
        // console.log(e.target.id)
        setFormState(prevState => ({...prevState, [id]: value}));

        const newUsername = e.target.value
        setUsername(newUsername);

        if (e.target.id === "username" && newUsername.length > 0) {
            try {
                await findUsername(newUsername)
                if (usernameData?.exists) {
                    setUsernameError(usernameData.message);
                    setIsUsernameAvailable(false);
                } else {
                    setUsernameError('');
                    setIsUsernameAvailable(true);
                }
            } catch (error) {
                console.error('Error fetching username availability:', error);
                setUsernameError('Could not check username availability.');
                setIsUsernameAvailable(false);
            }
        } else {
            setUsernameError('');
            setIsUsernameAvailable(false);
        }
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
            <div className='bg-gray-800 py-8 px-4 sm:rounded-lg sm:px-10'>
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
                                // onBlur={handleChange}
                                onKeyUp={handleChange}
                                className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500
									 focus:border-emerald-500 sm:text-sm'
                                placeholder='username'
                            />
                            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                            {isUsernameAvailable && !usernameError && <p style={{ color: 'green' }}>Username available!</p>}
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
                        // disabled={!isUsernameAvailable}
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

)
}

export default EditBioForm