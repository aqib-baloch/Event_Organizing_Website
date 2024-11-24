import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle, rgba(0,10,36,0.9), rgba(0,36,61,1))",
        backgroundImage:
          "radial-gradient(circle, rgba(3,37,65,0.8) 0%, rgba(3,37,65,0) 80%)",
        backgroundSize: "cover",
        backdropFilter: "blur(8px)",
        color: "#E0F7FA", // Lighter text color for contrast
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: "rgba(0, 10, 36, 0.85)" }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: "#E0F7FA" }}>
            Eventify
          </Typography>
          <Button
            color="inherit"
            style={{ color: "#B3E5FC" }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            style={{ color: "#B3E5FC" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            style={{ color: "#E1F5FE" }}
          >
            Welcome to Eventify
          </Typography>
          <Typography variant="h5" paragraph style={{ color: "#BBDEFB" }}>
            Let's Explore Your Interest!
          </Typography>

          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#29B6F6", color: "#FFFFFF" }}
                  size="large"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{ borderColor: "#29B6F6", color: "#29B6F6" }}
                  size="large"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          textAlign: "center",
          mt: "auto",
          backgroundColor: "rgba(0, 10, 36, 0.85)",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" style={{ color: "#B3E5FC" }}>
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
