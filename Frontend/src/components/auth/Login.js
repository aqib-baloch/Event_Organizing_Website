// import React, { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/authService"; // Make sure to define this service
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Box,
//   Alert,
//   Link,
//   Grid,
// } from "@mui/material";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "Attendee", // Default to Attendee
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Use useNavigate for programmatic navigation

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = await login(
//         formData.email,
//         formData.password,
//         formData.role
//       );
//       console.log("Login successful", userData);
//       localStorage.setItem("token", userData.access_token); // Store token in localStorage

//       // Based on the role, redirect the user to their respective dashboard
//       if (formData.role === "Attendee") {
//         navigate("/attendee-dashboard");
//       } else if (formData.role === "Organizer") {
//         navigate("/organizer-dashboard");
//       }
//     } catch (err) {
//       setError("Invalid credentials or role mismatch");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           mt: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         {error && <Alert severity="error">{error}</Alert>}
//         <form onSubmit={handleLogin}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 variant="outlined"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type="password"
//                 variant="outlined"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="role-label">Role</InputLabel>
//                 <Select
//                   labelId="role-label"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   label="Role"
//                 >
//                   <MenuItem value="Attendee">Attendee</MenuItem>
//                   <MenuItem value="Organizer">Organizer</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//               >
//                 Login
//               </Button>
//             </Grid>
//           </Grid>
//         </form>

//         {/* Link to Sign In */}
//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Don't have an account?{" "}
//           <Link component={RouterLink} to="/register">
//             Sign In
//           </Link>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Alert,
  Link,
  Grid,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Attendee",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(
        formData.email,
        formData.password,
        formData.role
      );
      console.log("Login successful", userData);
      localStorage.setItem("token", userData.access_token);

      if (formData.role === "Attendee") {
        navigate("/attendee-dashboard");
      } else if (formData.role === "Organizer") {
        navigate("/organizer-dashboard");
      }
    } catch (err) {
      setError("Invalid credentials or role mismatch");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#001f3f",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box sx={{ textAlign: "center", color: "#E0F7FA", mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label" style={{ color: "#B3E5FC" }}>
                  Role
                </InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Role"
                  sx={{
                    color: "#BBDEFB",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#B3E5FC",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#29B6F6",
                    },
                  }}
                >
                  <MenuItem value="Attendee">Attendee</MenuItem>
                  <MenuItem value="Organizer">Organizer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#29B6F6",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#0288D1",
                  },
                  mt: 2,
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="body2"
          sx={{ mt: 2, color: "#B3E5FC", textAlign: "center" }}
        >
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            style={{ color: "#29B6F6" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
