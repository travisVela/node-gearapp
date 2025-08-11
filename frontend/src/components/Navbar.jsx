import { Link, useLocation } from "react-router-dom";
import { LogOut, MessageSquare, Moon, Settings, Sun, User } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import React, { useEffect, useRef, useState } from "react";

const Navbar = ({ toggleTheme, theme }) => {
  const { logout } = useUserStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef();
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let handler = (e) => {
      if (
        !mobileMenuRef.current.contains(e.target) &&
        buttonRef.current !== e.target
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
  };

  const handleThemeChange = () => {
    toggleTheme();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 z-50 sticky top-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Gear App
          </span>
        </a>
        {/*<button data-collapse-toggle="navbar-default" type="button"*/}
        {/*        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"*/}
        {/*        aria-controls="navbar-default" aria-expanded="false">*/}
        {/*    <span className="sr-only">Open main menu</span>*/}
        {/*</button>*/}

        <div className={"flex md:hidden"}>
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block cursor-pointer closeButton text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700  focus:outline-none   rounded-lg text-sm p-1.5"
            type="button"
            onClick={toggleMobileMenu}
            ref={buttonRef}
            // onCancel={() => setisdropdownRefOpen(false)}
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
        </div>

        <div
          className={`${
            mobileMenuOpen
              ? "flex flex-row justify-end z-50 absolute transform translate-y-20 -translate-x-8"
              : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            ref={mobileMenuRef}
            className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              {theme === "dark" ? (
                <Sun
                  className={"cursor-pointer text-white/50 hover:text-white/90"}
                  onClick={handleThemeChange}
                />
              ) : (
                <Moon
                  className={
                    "cursor-pointer text-black/50  hover:text-black/90"
                  }
                  onClick={handleThemeChange}
                />
              )}
            </li>
            <li>
              <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="sixe-5">
                  <span className="hidden sm:inline">Profile</span>
                </User>
              </Link>
            </li>
            <li>
              <button
                className="flex gap-2 items-center closeButton  "
                onClick={handleLogout}
              >
                <LogOut className="size-5 text-black/50 hover:text-black/90 dark:text-white/50 dark:hover:text-white/90">
                  <span className="hidden sm:inline">Logout</span>
                </LogOut>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
