// src/services/eventService.js
import axios from "axios";
import { getToken } from "../../utils/tokenUtils"; // Create a utility to get your JWT

const API = axios.create({
  baseURL: "http://localhost:4000", // Update the base URL accordingly
  headers: {
    "Content-Type": "application/json",
  },
});

// // Create Event
// export const createEvent = async (eventData) => {
//   const token = getToken(); // Make sure token is retrieved correctly
//   await API.post('events/create-event', eventData, {
//     headers: {
//       Authorization: `Bearer ${token}`, // Include token
//     },
//   });
// };

export const createEvent = async (eventData) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach token as Bearer
    },
  };

  const response = await API.post("/events/create-event", eventData, config);
  return response.data;
};

// // Get My Events
// export const getMyEvents = async () => {
//   const token = getToken();
//   const response = await API.get("/events/getAllEvents", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// Get My Events
export const getMyEvents = async () => {
  const token = getToken();
  const response = await API.get("/events/getAllevents", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch Event by ID Service
export const getEventById = async (id) => {
  const token = getToken();
  const response = await API.get(`/events/get-event-by-id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); // Adjust the endpoint as necessary
  return response.data;
};

export const updateEvent = async (id, updateEventDto) => {
  const token = getToken();
  const response = await API.patch(
    `/events/update-event-by-id/${id}`,
    updateEventDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Request Event Deletion
export const requestEventDeletion = async (eventId, reason) => {
  const token = getToken(); // Ensure this gets the correct auth token
  const response = await API.post(
    `/events/request-deletion`,
    { eventId, reason }, // Pass eventId and reason as expected by backend
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// export const getPendingDeletionRequests = async () => {
//   const token = getToken(); // Ensure the function retrieves the auth token
//   const response = await API.get("/events/deletion-requests/pending", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

export const getPendingDeletionRequests = async () => {
  const token = getToken(); // Fetch the token from local storage or your auth service
  const response = await API.get("/events/deletion-requests/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
