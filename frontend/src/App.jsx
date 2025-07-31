import React, {useEffect, useState} from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import {Toaster} from "react-hot-toast";

import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import Navbar from "./components/Navbar.jsx";
import {useUserStore} from "./stores/useUserStore.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import CardDropdown from "./components/CardDropdown.jsx";



const App = () => {
    const {user, checkAuth, checkingAuth} = useUserStore()
    const [darkMode, setDarkMode] = useState(false)
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    useEffect(() => {
        let theme = localStorage.getItem("theme")
        if (!theme) {
            theme = "light"
            setDarkMode(false)
            localStorage.setItem("theme", theme)
        }
        setDarkMode(theme === "dark")
    }, []);

    const toggleTheme = () => {

        setDarkMode(!darkMode)
    }

    if (checkingAuth) return <LoadingSpinner />

  return (

      <div className={`${darkMode ? "dark" : ''} h-full bg-gradient-to-r from-blue-200 to-indigo-400 dark:from-gray-800 dark:to-black`}>
          <Navbar toggleTheme={toggleTheme} dark={darkMode}/>
          <Routes>
            <Route
                path={"/"}
                element={user ? <HomePage /> : <Navigate to={"/login"} /> }
            />
              <Route
                path={"/login"}
                element={!user ? <LoginPage /> : <Navigate to={"/"} />}
              />
              <Route
                path={"/signup"}
                element={!user ? <SignupPage /> : <Navigate to={"/"} />}
              />
              <Route
                path={"/profile"}
                element={user ? <ProfilePage /> : <Navigate to={"/login"}/>}

              />

        </Routes>
          <Toaster></Toaster>
      </div>
  );
};

export default App;