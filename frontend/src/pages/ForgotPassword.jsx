import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader, ArrowLeft } from "lucide-react";
import { useState } from "react";

import { useUserStore } from "../stores/useUserStore.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
    forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center h-lvh sm:px-6 lg:px-8 ">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-bold leading-none text-gray-900 dark:text-white">
          Forgot Password
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 dark:bg-gray-800 dark:border-gray-700 sm:py-4 px-4 m-2 sm:m-0 sm:rounded-lg sm:px-10 ">
          <p className=" text-gray-900 dark:text-white mb-6 text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium dark:text-white text-black/70  focus:outline-none focus:ring-2 focus:ring-offset-2
							   transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
                style={{ backgroundColor: "goldenrod" }}
              >
                {loading ? (
                  <Loader className="size-6 animate-spin mx-auto" />
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-900 dark:text-white mb-6 text-center">
                If an account exists for {email}, you will receive a password
                reset link shortly
              </p>
            </div>
          )}
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justitfy-center">
          <Link
            to={"/login"}
            className="text-sm text-green-400 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
