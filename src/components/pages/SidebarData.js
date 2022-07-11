import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const sidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    className: "nav-text",
  },
  {
    title: "Login",
    path: "/signin",
    icon: <AiIcons.AiOutlineLogin />,
    className: "nav-text",
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <FaIcons.FaHistory />,
    className: "nav-text",
  },
];
