import React from 'react'
import "../index.css";
import Logo from "../images/logo-2.png"
import {Link} from 'react-router-dom'


function UserNavBar() {
  return (
    <>
    <nav className="bg-slate-300 flex justify-between">
      <img src={Logo} alt="" className="h-16 ml-4 mt-2" />
      <ul className="flex py-5 space-x-10 justify-end mr-11">
        <Link to="/user">
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link to="/event-form">
          <li className="cursor-pointer">Create Event</li>
        </Link>
        <Link to="/events">
          <li className="cursor-pointer">My events</li>
        </Link>
        <Link to="/contact">
          <li className="cursor-pointer">Contact us</li>
        </Link>
        {/* TODO: LOGOUT PAGE */}
        <Link to="/">
          <li className="cursor-pointer">Logout</li>
        </Link>
      </ul>
    </nav>
    </>
  );
}

export default UserNavBar
