import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import { updateEvent, getEventById } from "../services/eventService"; // Import the necessary service functions
import { Button, TextField, Typography } from "@mui/material";
import { updateEvent } from "../services/eventService";
import { getEventById } from "../services/eventService";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    venue: "",
    date: "",
    capacity: 0,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(id); // Fetch the event details
      setEventData(fetchedEvent);
    };

    fetchEvent();
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({
  //     ...eventData,
  //     [name]: value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: name === "capacity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, eventData);
      // Call the update service
      navigate("/events/getAllEvents"); // Redirect to my events page after successful update
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4">Edit Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Venue"
          name="venue"
          value={eventData.venue}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Date"
          type="date"
          name="date"
          value={eventData.date.split("T")[0]} // Convert to YYYY-MM-DD format
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Capacity"
          type="number"
          name="capacity"
          value={eventData.capacity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" type="submit">
          Update Event
        </Button>
      </form>
    </div>
  );
};

export default EditEvent;
