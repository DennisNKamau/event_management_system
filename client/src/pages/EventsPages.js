import React, { useEffect, useState } from "react";
// import EventCard from '../components/EventCard'
import Footer from "../components/Footer";
import NavBar from "../components/UserNavBar";
import EventCard from "../components/EventCard";

function EventsPage() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch("/events")
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-center text-white text-5xl p-10">My events</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {event.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default EventsPage;
