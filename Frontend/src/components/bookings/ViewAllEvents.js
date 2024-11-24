import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { getAllEventsForBooking } from "../services/bookingService";

const ViewAllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEventsForBooking();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: 4,
          color: "#2c3e50",
          fontWeight: "bold",
        }}
      >
        Upcoming Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: "#34495e",
                    fontWeight: "bold",
                  }}
                >
                  {event.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#7f8c8d",
                    marginBottom: 2,
                  }}
                >
                  {event.description}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Time:</strong>{" "}
                  {new Date(event.date).toLocaleTimeString()}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Venue:</strong> {event.venue}
                </Typography>
                <Typography variant="body1">
                  <strong>Availble Seats:</strong> {event.capacity}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginTop: "auto", padding: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/reserve-seat/${event.id}`)}
                  fullWidth
                  sx={{
                    backgroundColor: "#3498db",
                    "&:hover": { backgroundColor: "#2980b9" },
                  }}
                >
                  Reserve Seat
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewAllEvents;
