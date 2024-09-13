import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Logo from "../assets/logo.png";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const NavBar = () => {
  const navigatye = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav class="bg-white border-gray-200  fixed top-0 left-0 right-0 z-10">
      <div class=" flex flex-wrap items-center justify-between mx-auto px-3 md:px-32 py-2">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} class="w-12" alt="CodeQ Logo" />
          <span class="self-center md:text-2xl text-xl font-semibold  text-[#002140] inter no-underline">
            Todo Guru
          </span>
        </div>
        <div class="">
          <Button
            className="hover:text-white  hover:bg-[#4096ff] "
            type="primary"
            ghost
            onClick={() => {
              dispatch(logout());
              navigatye("/");
            }}
          >
            <LogoutOutlined /> Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
