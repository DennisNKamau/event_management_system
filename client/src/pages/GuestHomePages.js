import React from "react";
import "../index.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import GuestNavBar from "../components/GuestNavBar";

function GuestHomePage() {
  return (
    <>
      <GuestNavBar />
      <div className="flex hero-section">
        <div class=" py-40 pl-8">
          <div class="text-6xl">Welcome to your event management system</div>
          <p class="py-3 text-lg">
            Organize, manage, and track your events effortlessly with our
            intuitive platform. From start to finish, we've got you covered to
            ensure a seamless event experience.
          </p>
        </div>
      </div>
      <div className="browse-section">
        <section className="content">
          <h1>Ready to look around?</h1>
          <div className="m-2 my-9">
            <Link to="/register">
              <button className="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200">
                Get started
              </button>
            </Link>
            <Link to="/login">
              <button className=" py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200">
                Login
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default GuestHomePage;
