import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo-2.png";

function GuestNavBar() {
  return (
    <nav className="bg-slate-300 flex justify-between">
      <img src={Logo} alt="" className="h-16 ml-4 mt-2" />
      <ul className="flex py-5 space-x-10 justify-end mr-11">
        <Link to="/login">
          <li className="cursor-pointer">Login</li>
        </Link>
        <Link to="/register">
          <li className="cursor-pointer">Register</li>
        </Link>
      </ul>
    </nav>
  );
}

export default GuestNavBar
