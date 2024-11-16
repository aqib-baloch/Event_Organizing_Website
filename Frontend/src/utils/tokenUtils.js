// src/utils/tokenUtils.js

// Function to get the JWT token from local storage
export const getToken = () => {
  return localStorage.getItem('access_token');
};

// Function to set the JWT token in local storage
export const setToken = (token) => {
  localStorage.setItem('access_token', token);
};

// Function to remove the JWT token from local storage
export const removeToken = () => {
  localStorage.removeItem('access_token');
};
