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
// import {api} from "../api"
import {useUserStore} from "../stores/useUserStore.js";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";


const SignupPage = () => {
    // const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const {signup} = useUserStore()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        firstname: "",
        lastname: "",
        bio: ""
    });
    const validateForm = () => {
        if (!formData.username.trim()) return toast.error("Username is required");
        if (!formData.firstname.trim()) return toast.error("First Name is required");
        if (!formData.lastname.trim()) return toast.error("Last Name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (!formData.confirmPassword) return toast.error("Password is required");
        if (formData.password.length < 6)
            return toast.error("Password must be al least 6 characters");

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        signup(formData)

        // const success = validateForm()
        // if (success === true) signup(formData)
        // setFormData(null)
    }

    return (


        <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account</h2>
            </motion.div>

            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                                Type
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id={'email'}
                                    type='email'

                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500
									 focus:border-emerald-500 sm:text-sm'
                                    placeholder='email'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='username' className='block text-sm font-medium text-gray-300'>
                                Username
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='username'
                                    type='text'

                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='username'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                                Password
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='password'
                                    type='password'

                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='password'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
                                Confirm Password
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='confirmPassword'
                                    type='password'

                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='confirm password'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='firstname' className='block text-sm font-medium text-gray-300'>
                                First Name
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='firstname'
                                    type='text'

                                    value={formData.firstname}
                                    onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='first name'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='firstname' className='block text-sm font-medium text-gray-300'>
                                Last Name
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <input
                                    id='lastname'
                                    type='text'

                                    value={formData.lastname}
                                    onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='last name'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='bio' className='block text-sm font-medium text-gray-300'>
                                Bio
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                                </div>
                                <textarea
                                    id='bio'
                                    // type='description'
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
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
                            disabled={loading}
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