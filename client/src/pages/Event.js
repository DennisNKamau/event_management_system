import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../components/UserNavBar";
import Footer from "../components/Footer";

function Event() {
  const { id } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`/events/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Event ${id} deleted successfully`);
          history.push("/events"); // Redirect to events page after deletion
        } else {
          console.error("Failed to delete event");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-white text-center w-full p-10 event-page">
        <h1 className="text-center text-4xl mb-4">{event.name}</h1>
        <p className="text-2xl mb-4">{event.description}</p>
        <p className="text-lg">Location: {event.location}</p>
        <p className="text-lg">
          Start Time: {new Date(event.start_time).toLocaleString()}
        </p>
        <p className="text-lg">
          End Time: {new Date(event.end_time).toLocaleString()}
        </p>
        <div className="m-2 my-9">
          <button
            className="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200 bg-sky-800 text-white"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200 bg-sky-800 text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Event;
