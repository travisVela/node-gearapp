import React from "react";
import { Lock } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, resetPassword, error, message } = useUserStore();

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      resetPassword(token, password, confirmPassword);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col w-full items-center justify-center h-lvh sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 dark:bg-gray-800 dark:border-gray-700 sm:py-4 px-4 m-2 sm:m-0 sm:rounded-lg sm:px-10 ">
          <h2 className="mt-6 text-center text-3xl font-bold leading-none text-gray-900 dark:text-white">
            Reset Password
          </h2>
          {error && (
            <p className="text-red-500 font-semibold mb-2">{error.error}</p>
          )}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            />
            <input
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 pl-10 border bg-gray-200 border-gray-100 dark:bg-gray-700  dark:border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium dark:text-white text-black/70  focus:outline-none focus:ring-2 focus:ring-offset-2
							   transition duration-150 ease-in-out disabled:opacity-50"
              type="submit"
              style={{ backgroundColor: "goldenrod" }}
              disabled={loading}
            >
              {loading ? "Resetting... " : "Set New Password"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
