// src/services/authService.js

import axios from "axios";

// Create an Axios instance with a base URL of your NestJS backend
const API = axios.create({
  baseURL: "http://localhost:4000/", // Change this to your NestJS API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// User login function
export const login = async (email, password, role) => {
  const response = await API.post("/auth/login", {
    email,
    password,
    role,
  });
  // Store the access token in localStorage
  localStorage.setItem("access_token", response.data.access_token);
  return response.data;
};

// User signup function
export const signup = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  return response.data;
};
