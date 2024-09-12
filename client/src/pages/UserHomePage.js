import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/UserNavBar";
import Footer from "../components/Footer";

function UserHomePage() {
  return (
    <>
      <NavBar />
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
          <h1>Want to view your events or create one?</h1>
          <div className="m-2 my-9">
            <Link to="/events">
              <button className="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200">
                Browse events
              </button>
            </Link>
            <Link to="/event-form">
              <button className=" py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200">
                Create event
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default UserHomePage;
