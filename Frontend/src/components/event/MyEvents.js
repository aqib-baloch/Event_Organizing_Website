// src/components/MyEvents.js
import React, { useEffect, useState } from "react";
import { getMyEvents } from "../services/eventService"; // Ensure this function is correctly implemented
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from MUI

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  textAlign: "center",
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}));

const StyledHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: "1.25rem", // Increase font size for header
  fontWeight: "bold",
  borderBottom: `3px solid ${theme.palette.secondary.main}`,
  textTransform: "uppercase", // Make text uppercase for emphasis
  letterSpacing: "0.5px", // Add some letter spacing
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow for depth
}));

const StyledEditButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const StyledDeleteButton = styled(Button)(({ theme }) => ({
  //backgroundColor: theme.palette.primary.main,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchEvents = async () => {
      const eventData = await getMyEvents();
      setEvents(eventData);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* AppBar directly included in MyEvents component */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Event Management
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/events/create-event")}
          >
            Create Event
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/organizer-dashboard")}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/search-event")}>
            Search Events
          </Button>
          <Button color="inherit" onClick={() => navigate("/delete-request/:id")}>
            Request for Delete
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" style={{ margin: "20px" }}>
        My Events
      </Typography>
      <TableContainer
        component={Paper}
        style={{ margin: "20px", borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeaderCell>Event Name</StyledHeaderCell>
              <StyledHeaderCell>Description</StyledHeaderCell>
              <StyledHeaderCell>Venue</StyledHeaderCell>
              <StyledHeaderCell>Date</StyledHeaderCell>
              <StyledHeaderCell>Capacity</StyledHeaderCell>
              <StyledHeaderCell>Edit</StyledHeaderCell>
              <StyledHeaderCell>Request</StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <StyledTableRow key={event.id}>
                <StyledTableCell>{event.name}</StyledTableCell>
                <StyledTableCell>{event.description}</StyledTableCell>
                <StyledTableCell>{event.venue}</StyledTableCell>
                <StyledTableCell>
                  {new Date(event.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>{event.capacity}</StyledTableCell>
                <StyledTableCell>
                  <StyledEditButton
                    variant="contained"
                    onClick={() =>
                      navigate(`/events/update-event-by-id/${event.id}`)
                    }
                  >
                    Edit
                  </StyledEditButton>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledDeleteButton
                    variant="contained"
                    onClick={() => navigate(`/delete-request/${event.id}`)}
                  >
                    Delete
                  </StyledDeleteButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyEvents;
