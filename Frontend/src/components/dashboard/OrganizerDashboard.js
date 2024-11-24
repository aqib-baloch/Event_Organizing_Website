// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Box,
//   Paper,
//   Grid,
// } from "@mui/material";

// // AppBar Component
// const Header = ({ onLogout }) => (
//   <AppBar position="static" color="primary">
//     <Toolbar>
//       <Typography variant="h6" sx={{ flexGrow: 1 }}>
//         Event Organizer Dashboard
//       </Typography>
//       <Button color="inherit" onClick={onLogout}>
//         Logout
//       </Button>
//     </Toolbar>
//   </AppBar>
// );

// // Footer Component
// const Footer = () => (
//   <Box sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "#f5f5f5" }}>
//     <Container maxWidth="sm">
//       <Typography variant="body1">Event Organizer &copy; 2024</Typography>
//     </Container>
//   </Box>
// );

// const OrganizerDashboard = () => {
//   const navigate = useNavigate();

//   const handleCreateEvent = () => {
//     navigate("/events/create-event");
//   };

//   const handleViewEvents = () => {
//     navigate("/events/getAllEvents");
//   };

//   const handleRequestDeletion = () => {
//     navigate("/request-deletion");
//   };
//   const handleLogout = () => {
//     // Remove the token from local storage
//     localStorage.removeItem("token");
//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Header */}
//       <Header onLogout={handleLogout} />

//       {/* Main Content */}
//       <Container component="main" sx={{ mt: 8, mb: 2 }}>
//         <Paper elevation={3} sx={{ p: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Welcome to the Organizer Dashboard
//           </Typography>
//           <Typography variant="h6" component="h2" gutterBottom>
//             Manage your events efficiently
//           </Typography>

//           {/* Buttons for Dashboard Actions */}
//           <Grid container spacing={2} sx={{ mt: 3 }}>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={handleCreateEvent}
//               >
//                 Create Event
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//                 onClick={handleViewEvents}
//               >
//                 View My Events
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 color="error"
//                 fullWidth
//                 onClick={handleRequestDeletion}
//               >
//                 View the Deletion Request
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   );
// };

// export default OrganizerDashboard;


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
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", color: "#ffffff" }}>
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
  <Box sx={{ py: 3, px: 2, textAlign: "center", mt: "auto", backgroundColor: "#333f58" }}>
    <Container maxWidth="sm">
      <Typography variant="body1" color="#ffffff">
        Eventify &copy; 2024
      </Typography>
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
        <Paper elevation={4} sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome, Event Organizer!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Use this dashboard to manage and monitor your events.
          </Typography>

          {/* Action Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateEvent}
                sx={{ height: "100%" }}
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
                sx={{ height: "100%" }}
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
                sx={{ height: "100%" }}
              >
                View Deletion Requests
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
