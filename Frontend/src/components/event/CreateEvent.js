import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Remove destructuring to correctly import
import { createEvent } from "../services/eventService";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    venue: "",
    date: "",
    capacity: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check for the token and decode it
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      if (decoded.role !== "Organizer") {
        setError("You are not authorized to create events.");
        navigate("/unauthorized"); // Redirect to an unauthorized page or home
      }
    } else {
      setError("You need to log in to access this page.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    try {
      // Convert date to a Date object and ensure capacity is a number
      const eventToSubmit = {
        ...eventData,
        organizerId: decoded.userId, // Extracted organizer ID from token
        date: new Date(eventData.date).toISOString(), // Ensure correct date format
        capacity: parseInt(eventData.capacity, 10), // Ensure capacity is an integer
      };

      await createEvent(eventToSubmit); // Make API call to create event
      alert("Event created successfully!");
      navigate("/events/getAllEvents"); // Redirect to the event list page
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event");
    }
  };

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Event
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Event Name"
                name="name"
                value={eventData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Event Description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Venue"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Event Date and Time"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Capacity"
                type="number"
                name="capacity"
                value={eventData.capacity}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Event
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEvent;
