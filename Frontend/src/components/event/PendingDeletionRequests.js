import React, { useEffect, useState } from "react";
import { getPendingDeletionRequests } from "../services/eventService";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { red, blueGrey } from "@mui/material/colors";

const PendingDeletionRequests = () => {
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeletionRequests = async () => {
      try {
        const requests = await getPendingDeletionRequests();
        setDeletionRequests(requests);
      } catch (error) {
        console.error("Error fetching deletion requests:", error);
        alert("Failed to load deletion requests");
      } finally {
        setLoading(false);
      }
    };
    fetchDeletionRequests();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          color: blueGrey[800],
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Pending Deletion Requests
      </Typography>
      {deletionRequests.length > 0 ? (
        <Grid container spacing={3}>
          {deletionRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Card style={{ backgroundColor: blueGrey[50] }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{ color: blueGrey[900], fontWeight: "bold" }}
                  >
                    {request.event.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ color: blueGrey[700] }}
                  >
                    Requested by: <strong>{request.organizer.name}</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: blueGrey[600], marginTop: "10px" }}
                  >
                    Reason: {request.reason}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      marginTop: "8px",
                      color:
                        request.status === "PENDING" ? red[500] : blueGrey[500],
                      fontWeight: "bold",
                    }}
                  >
                    Status: {request.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ backgroundColor: red[400], color: "#fff" }}
                  >
                    Review Request
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          style={{ textAlign: "center", color: blueGrey[600] }}
        >
          No pending deletion requests.
        </Typography>
      )}
    </div>
  );
};

export default PendingDeletionRequests;
