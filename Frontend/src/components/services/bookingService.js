// src/services/bookingService.js
import axios from "axios";
import { getToken } from "../../utils/tokenUtils"; // Your utility to get the JWT token

const API = axios.create({
  baseURL: "http://localhost:4000", // Update the base URL accordingly
  headers: {
    "Content-Type": "application/json",
  },
});

// Book Event
// export const bookEvent = async (eventId, bookingData) => {
//   const token = localStorage.getItem("token"); // Get token from localStorage
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, // Attach token as Bearer
//     },
//   };

//   const response = await API.post(
//     `/booking/${eventId}/book-event`,
//     bookingData,
//     config
//   );
//   return response.data;
// };

export const bookEvent = async (eventId, bookingData) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach token as Bearer
    },
  };

  // Perform the API call
  const response = await API.post(
    `/booking/${eventId}/book-event`,
    bookingData,
    config
  );

  // Extract and return event details from the response
  const { event, booking, message } = response.data;
  return { event, booking, message };
};

export const getMyBookings = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (!token) {
    throw new Error("No token found");
  }

  const response = await API.get("/booking/view/all-bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get Event Booking Details by ID
export const getBookingById = async (bookingId) => {
  const token = getToken(); // Get the token using your utility function
  const response = await API.get(`/booking/view-booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return response.data;
    
};


// Get event details by ID
export const getEventById = async (eventId) => {
    const token = getToken();
    const response = await API.get(`/booking/event/${eventId}`,
      {
          headers: {
      Authorization: `Bearer ${token}`,
    },
      }
  );
  return response.data;
};



// Get All Events for Booking
export const getAllEventsForBooking = async () => {
  const token = getToken(); // Get the token using your utility function
  const response = await API.get("/booking/view/all-events", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

 

 

