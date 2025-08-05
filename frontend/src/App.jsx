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

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
      });
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    useEffect(() => {

        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        // Save theme to local storage
        localStorage.setItem('theme', theme);
      }, [theme]);


    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
      };

    if (checkingAuth) return <LoadingSpinner />

  return (

      <div className={` h-full bg-gradient-to-r from-blue-200 to-indigo-400 dark:from-gray-800 dark:to-black`}>
          <Navbar toggleTheme={toggleTheme} theme={theme}/>
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