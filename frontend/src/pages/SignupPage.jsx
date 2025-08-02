import React, {useState} from "react";
import toast from "react-hot-toast";
import {
    ArrowRight,
    Eye,
    EyeOff, Loader,
    Loader2,
    Lock, LogIn,
    Mail,
    MessageSquare,
    User,
} from "lucide-react";
import {useUserStore} from "../stores/useUserStore.js";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";


const SignupPage = () => {

    const [formState, setFormState] = useState();
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState()
    const [usernameError, setUsernameError] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    const [email, setEmail] = useState()
    const [emailError, setEmailError] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);


    const {signup, findUsername, usernameData, findEmail, emailData} = useUserStore()


    const handleChange = async (e) => {

        const {id, value} = e.target
        // console.log(e.target.id)
        setFormState(prevState => ({...prevState, [id]: value}));

        let username = e.target.value
        setUsername(username);

        if (e.target.id === "username" && username.length > 0) {
            try {
                await findUsername(username)
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

        let email = e.target.value
        setEmail(email);

        if (e.target.id === "email" && email.length > 0) {

            try {
                await findEmail(email)
                if (emailData?.exists) {
                    setEmailError(emailData.message);
                    setIsEmailAvailable(false);
                } else {
                    setEmailError('');
                    setIsEmailAvailable(true);
                }
            } catch (error) {
                console.error('Error fetching username availability:', error);
                setEmailError('Could not check username availability.');
                setIsEmailAvailable(false);
            }
        } else {
            setEmailError('');
            setIsEmailAvailable(false);
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
        signup(formState)

        // const success = validateForm()
        // if (success === true) signup(formData)
        // setFormData(null)
    }

    return (


        <div className='flex flex-col w-full items-center justify-center h-screen sm:px-6 lg:px-8'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                <h2 className='mt-6 text-center text-3xl font-bold leading-none text-gray-900 dark:text-white'>Create
                    your account</h2>
            </motion.div>

            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-8 dark:bg-gray-800 dark:border-gray-700 sm:py-4 px-4 m-2 sm:m-0 sm:rounded-lg sm:px-10 '>
                    <form onSubmit={handleSubmit} className='space-y-6 '>
                        {/*ROW 1*/}
                        <div className={"flex flex-row w-full"}>
                            <div className={"flex flex-col m-1"}>
                                <label htmlFor='email'
                                       className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Type
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id={'email'}
                                        type='email'

                                        value={formState?.email}
                                        onChange={handleChange}
                                        onKeyUp={handleChange}
                                        className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                        placeholder='email'
                                    />
                                    {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                                    {isEmailAvailable && !emailError &&
                                        <p style={{color: 'green'}}>Email available!</p>}
                                </div>
                            </div>
                            <div className={"flex flex-col m-1"}>
                                <label htmlFor='username'
                                       className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
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

                                        value={formState?.username || ''}
                                        onChange={handleChange}
                                        onKeyUp={handleChange}
                                        className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                        placeholder='username'
                                    />
                                    {usernameError && <p style={{color: 'red'}}>{usernameError}</p>}
                                    {isUsernameAvailable && !usernameError &&
                                        <p style={{color: 'green'}}>Username available!</p>}
                                </div>
                            </div>
                        </div>

                        {/*ROW 2*/}
                        <div className={"flex flex-row w-full"}>


                            <div className={"flex flex-col m-1"}>
                                <label htmlFor='password'
                                       className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Password
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id='password'
                                        type='password'

                                        value={formState?.password}
                                        onChange={handleChange}
                                        className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                        placeholder='password'
                                    />
                                </div>
                            </div>
                            <div className={"flex flex-col m-1"}>
                                <label htmlFor='confirmPassword'
                                       className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Confirm Password
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id='confirmPassword'
                                        type='password'

                                        value={formState?.confirmPassword}
                                        onChange={handleChange}
                                        className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zonc-500 focus:border-zinc-500 sm:text-sm'
                                        placeholder='confirm password'
                                    />
                                </div>
                            </div>
                        </div>

                        {/*ROW 3*/}
                        <div className={"flex flex-row w-full"}>
                            <div className={"flex flex-col m-1"}>
                                <label htmlFor='firstname'
                                       className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    First Name
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id='firstname'
                                        type='text'

                                        value={formState?.firstname}
                                        onChange={handleChange}
                                        className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                        placeholder='first name'
                                    />
                                </div>
                            </div>
                            <div  className={"flex flex-col m-1"}>
                                <label htmlFor='lastname'
                                       className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Last Name
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div
                                        className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                    </div>
                                    <input
                                        id='lastname'
                                        type='text'

                                        value={formState?.lastname}
                                        onChange={handleChange}
                                        className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                        placeholder='last name'
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='bio'
                                   className='block text-sm font-medium text-gray-900 truncate dark:text-white'>
                                Bio
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <textarea
                                    id='bio'
                                    // type='description'
                                    value={formState?.bio}
                                    onChange={handleChange}
                                    className='block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm'
                                    placeholder='bio'
                                    row={5}
                                    cols={40}
                                />
                            </div>
                        </div>


                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium dark:text-white text-black/70 bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                            // disabled={!isUsernameAvailable}
                            style={{backgroundColor: "goldenrod"}}
                        >
                            {loading ? (
                                <>
                                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true'/>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <LogIn className='mr-2 h-5 w-5' aria-hidden='true'/>
                                    Sign up
                                </>
                            )}
                        </button>
                    </form>
                    <p className='mt-8 text-center text-sm text-gray-400'>
                        Already a member?{" "}
                        <Link to='/login' className='font-medium text-emerald-400 hover:text-emerald-300'>
                            Login <ArrowRight className='inline h-4 w-4'/>
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
export default SignupPage