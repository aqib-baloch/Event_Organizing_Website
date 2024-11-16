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

// AppBar Component
const Header = ({ onLogout }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Event Attendee Dashboard
      </Typography>
      <Button color="inherit" onClick={onLogout}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
);

// Footer Component
const Footer = () => (
  <Box sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "#f5f5f5" }}>
    <Container maxWidth="sm">
      <Typography variant="body1">Event Organizer &copy; 2024</Typography>
    </Container>
  </Box>
);

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate("/events/create-event");
  };

  const handleViewEvents = () => {
    navigate("/events/getAllEvents");
  };

  const handleRequestDeletion = () => {
    navigate("/request-deletion");
  };
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Attendee Dashboard
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            View the Upcoming Events and  Book the Tickets For Your Besties!
          </Typography>

          {/* Buttons for Dashboard Actions */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateEvent}
              >
                Create Event
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleViewEvents}
              >
                View My Events
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleRequestDeletion}
              >
                View the Deletion Request
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

export default OrganizerDashboard;
