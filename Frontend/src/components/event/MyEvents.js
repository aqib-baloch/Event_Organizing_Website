// // src/components/MyEvents.js
// import React, { useEffect, useState } from "react";
// import { getMyEvents } from "../services/eventService"; // Ensure this function is correctly implemented
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { styled } from "@mui/material/styles"; // Import styled from MUI

// // Styled components for the table
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   padding: "16px",
//   textAlign: "center",
//   borderBottom: `2px solid ${theme.palette.primary.main}`,
// }));

// const StyledHeaderCell = styled(StyledTableCell)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.common.white,
//   fontSize: "1.25rem", // Increase font size for header
//   fontWeight: "bold",
//   borderBottom: `3px solid ${theme.palette.secondary.main}`,
//   textTransform: "uppercase", // Make text uppercase for emphasis
//   letterSpacing: "0.5px", // Add some letter spacing
//   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow for depth
// }));

// const StyledEditButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.success.main,
//   color: theme.palette.common.white,
//   "&:hover": {
//     backgroundColor: theme.palette.success.dark,
//   },
// }));

// const StyledDeleteButton = styled(Button)(({ theme }) => ({
//   //backgroundColor: theme.palette.primary.main,
//   backgroundColor: theme.palette.error.main,
//   color: theme.palette.common.white,
//   "&:hover": {
//     backgroundColor: theme.palette.error.dark,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:hover": {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const MyEvents = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const eventData = await getMyEvents();
//       setEvents(eventData);
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div>
//       {/* AppBar directly included in MyEvents component */}
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             Event Management
//           </Typography>
//           <Button
//             color="inherit"
//             onClick={() => navigate("/events/create-event")}
//           >
//             Create Event
//           </Button>
//           <Button
//             color="inherit"
//             onClick={() => navigate("/organizer-dashboard")}
//           >
//             Home
//           </Button>
//           <Button color="inherit" onClick={() => navigate("/search-event")}>
//             Search Events
//           </Button>
//           <Button color="inherit" onClick={() => navigate("/delete-request/:id")}>
//             Request for Delete
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Typography variant="h4" style={{ margin: "20px" }}>
//         My Events
//       </Typography>
//       <TableContainer
//         component={Paper}
//         style={{ margin: "20px", borderRadius: "8px" }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <StyledHeaderCell>Event Name</StyledHeaderCell>
//               <StyledHeaderCell>Description</StyledHeaderCell>
//               <StyledHeaderCell>Venue</StyledHeaderCell>
//               <StyledHeaderCell>Date</StyledHeaderCell>
//               <StyledHeaderCell>Capacity</StyledHeaderCell>
//               <StyledHeaderCell>Edit</StyledHeaderCell>
//               <StyledHeaderCell>Request</StyledHeaderCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {events.map((event) => (
//               <StyledTableRow key={event.id}>
//                 <StyledTableCell>{event.name}</StyledTableCell>
//                 <StyledTableCell>{event.description}</StyledTableCell>
//                 <StyledTableCell>{event.venue}</StyledTableCell>
//                 <StyledTableCell>
//                   {new Date(event.date).toLocaleDateString()}
//                 </StyledTableCell>
//                 <StyledTableCell>{event.capacity}</StyledTableCell>
//                 <StyledTableCell>
//                   <StyledEditButton
//                     variant="contained"
//                     onClick={() =>
//                       navigate(`/events/update-event-by-id/${event.id}`)
//                     }
//                   >
//                     Edit
//                   </StyledEditButton>
//                 </StyledTableCell>
//                 <StyledTableCell>
//                   <StyledDeleteButton
//                     variant="contained"
//                     onClick={() => navigate(`/delete-request/${event.id}`)}
//                   >
//                     Delete
//                   </StyledDeleteButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default MyEvents;

import React, { useEffect, useState } from "react";
import { getMyEvents } from "../services/eventService"; // Ensure this function is correctly implemented
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#333f58", // Card background color
  color: "#ffffff", // Card text color
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
}));

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const eventData = await getMyEvents();
      setEvents(eventData);
    };

    fetchEvents();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#001f3f",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      {/* AppBar with enhanced color and styling */}
      <AppBar position="static" style={{ backgroundColor: "#333f58" }}>
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
          <Button
            color="inherit"
            onClick={() => navigate("/delete-request/:id")}
          >
            Request for Delete
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" style={{ margin: "20px", textAlign: "center" }}>
        My Events
      </Typography>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#cccccc" }}
                    gutterBottom
                  >
                    {event.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Venue:</strong> {event.venue}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Capacity:</strong> {event.capacity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    style={{ color: "#4caf50" }} // Green for edit
                    onClick={() =>
                      navigate(`/events/update-event-by-id/${event.id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    style={{ color: "#f44336" }} // Red for delete
                    onClick={() => navigate(`/delete-request/${event.id}`)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default MyEvents;

