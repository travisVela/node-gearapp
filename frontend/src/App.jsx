import React, {useEffect} from 'react';
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
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (checkingAuth) return <LoadingSpinner />

  return (

      <div>
          <Navbar/>
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