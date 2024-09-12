import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Logo from "../assets/logo.jpg";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const NavBar = () => {
  const navigatye = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav class="bg-white border-gray-200  fixed top-0 left-0 right-0 z-10">
      <div class=" flex flex-wrap items-center justify-between mx-auto px-3 md:px-32 py-2">
        <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} class="h-10" alt="CodeQ Logo" />
          <span class="self-center md:text-xl text-sm font-semibold  text-[#002140] inter no-underline">
            Todo App
          </span>
        </a>
        <div class="">
          <Button
            className="hover:text-white  hover:bg-[#4096ff] "
            type="primary" ghost
            onClick={() => {
              dispatch(logout());
              navigatye("/");
            }}
          >
          < LogoutOutlined/>  Logout
          </Button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
