// import React, { useState } from "react";
// import { signup } from "../services/authService";
// import { Link as RouterLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
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

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     contactNo: "",
//     cnic: "",
//     role: "Attendee", // Default to Attendee
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = await signup(formData);
//       console.log("Registration successful", userData);
//       navigate("/login"); // Redirect to login page after successful registration
//     } catch (err) {
//       setError("Error during registration");
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
//           Register
//         </Typography>
//         {error && <Alert severity="error">{error}</Alert>}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 variant="outlined"
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 variant="outlined"
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 variant="outlined"
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
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 name="address"
//                 variant="outlined"
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Contact No"
//                 name="contactNo"
//                 variant="outlined"
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="CNIC"
//                 name="cnic"
//                 variant="outlined"
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
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//         {/* Link to Sign In */}
//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Already have an account?{" "}
//           <Link component={RouterLink} to="/login">
//             Sign In
//           </Link>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { signup } from "../services/authService";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    address: "",
    contactNo: "",
    cnic: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signup(formData);
      console.log("Registration successful", userData);
      navigate("/login");
    } catch (err) {
      setError("Error during registration");
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
        maxWidth="sm"
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
            Register
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
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
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact No"
                name="contactNo"
                variant="outlined"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "#BBDEFB" } }}
                InputLabelProps={{ style: { color: "#B3E5FC" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CNIC"
                name="cnic"
                variant="outlined"
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
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="body2"
          sx={{ mt: 2, color: "#B3E5FC", textAlign: "center" }}
        >
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" style={{ color: "#29B6F6" }}>
            Sign In
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Register;
