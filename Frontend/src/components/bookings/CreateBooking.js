// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { bookEvent } from "../services/bookingService";

// const CreateBooking = () => {
//   const { eventId } = useParams(); // Pass eventId dynamically if required
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     attendeeName: "",
//     attendeeCNIC: "",
//     attendeeAddress: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await bookEvent(eventId, formData);
//       navigate("/dashboard"); // Redirect after successful booking
//     } catch (err) {
//       console.error("Error booking event:", err);
//       setError(err.response?.data?.message || "Failed to book the event.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "50px auto",
//         padding: 4,
//         backgroundColor: "#fff",
//         borderRadius: 2,
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Reserve Your Seat
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Attendee Name"
//           name="attendeeName"
//           value={formData.attendeeName}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="CNIC"
//           name="attendeeCNIC"
//           value={formData.attendeeCNIC}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Address"
//           name="attendeeAddress"
//           value={formData.attendeeAddress}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         {error && (
//           <Typography color="error" sx={{ mt: 2 }}>
//             {error}
//           </Typography>
//         )}
//         <Box sx={{ mt: 3, textAlign: "right" }}>
//           {loading ? (
//             <CircularProgress size={24} />
//           ) : (
//             <Button variant="contained" color="primary" type="submit">
//               Reserve Seat
//             </Button>
//           )}
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default CreateBooking;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { bookEvent, getEventById } from "../services/bookingService";

const CreateBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    attendeeName: "",
    attendeeCNIC: "",
    attendeeAddress: "",
  });
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useEffect(() => {
  // Fetch event details
  const fetchEventDetails = async () => {
    try {
      const details = await getEventById(eventId); // Correct API call
      setEventDetails(details);
    } catch (err) {
      console.error("Failed to fetch event details:", err);
      setError("Could not fetch event details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchEventDetails();
}, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await bookEvent(eventId, formData); // Send booking request
      navigate("/booking/view/all-bookings"); // Redirect after successful booking
    } catch (err) {
      console.error("Error booking event:", err);
      setError(err.response?.data?.message || "Failed to book the event.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "50px auto",
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Reserve Your Seat for {eventDetails.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Seats Available: {eventDetails.capacity}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Attendee Name"
          name="attendeeName"
          value={formData.attendeeName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="CNIC"
          name="attendeeCNIC"
          value={formData.attendeeCNIC}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          name="attendeeAddress"
          value={formData.attendeeAddress}
          onChange={handleChange}
          margin="normal"
          required
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 3, textAlign: "right" }}>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Reserve Seat
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default CreateBooking;
