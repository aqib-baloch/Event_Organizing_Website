import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Grid,
} from "@mui/material";

// AppBar Component for Header
const Header = ({ onLogout }) => (
  <AppBar position="static" sx={{ backgroundColor: "#333f58" }}>
    <Toolbar>
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, textAlign: "center", color: "#ffffff" }}
      >
        Event Organizer Dashboard
      </Typography>
      <Button sx={{ color: "#ffffff" }} onClick={onLogout}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
);

// Footer Component
const Footer = () => (
  <Box
    sx={{
      py: 3,
      px: 2,
      textAlign: "center",
      mt: "auto",
      backgroundColor: "#333f58",
    }}
  >
    <Container maxWidth="sm">
      <Typography variant="body1" color="#ffffff">
        Eventify &copy; 2024
      </Typography>
    </Container>
  </Box>
);

const AttendeeDashboard = () => {
  const navigate = useNavigate();

  const handleViewEvents = () => {
    navigate("/booking/view/all-events");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#001f3f", // Navy blue background
      }}
    >
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <Paper
          elevation={4}
          sx={{ p: 4, color: "white", backgroundColor: "#333f58" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome, Event Attendee!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Use the dashboard to exlore the events and reserve the seats for
            yourself and yours besties!
          </Typography>

          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleViewEvents}
                sx={{ height: "100%" }}
              >
                View the Events
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleViewEvents}
                sx={{ height: "100%" }}
              >
                Reserve Seats
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => navigate("/booking/view/all-bookings")}
                sx={{ height: "100%" }}
              >
                View Your Bookings
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AttendeeDashboard;
