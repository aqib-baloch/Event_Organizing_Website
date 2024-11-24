import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { getMyBookings } from "../services/bookingService";

const ViewMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        console.log("Fetched Bookings:", data); // Log the fetched data
        setBookings(data || []); // Assuming data is the bookings array
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
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

  if (bookings.length === 0) {
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
        <Typography variant="h5" color="textSecondary">
          No bookings found.
        </Typography>
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
        My Bookings
      </Typography>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
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
                  {booking.attendeeName || "Attendee Name Not Available"}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: "#2c3e50" }}>
                  Event: {booking.event.name || "Event Name Not Available"}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  {booking.event.description ||
                    "No event description available"}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong>{" "}
                  {new Date(booking.event.date).toLocaleDateString() || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Time:</strong>{" "}
                  {new Date(booking.event.date).toLocaleTimeString() || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Venue:</strong>{" "}
                  {booking.event.venue || "Venue not available"}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Attendee CNIC:</strong>{" "}
                  {booking.attendeeCNIC || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewMyBookings;
