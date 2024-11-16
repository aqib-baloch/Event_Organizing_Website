import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { requestEventDeletion } from "../services/eventService";

const DeleteRequestPage = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDeleteRequest = async () => {
    try {
      await requestEventDeletion(eventId, reason);
      alert("Deletion request submitted successfully");
      navigate("/events/getAllEvents"); // Redirect after success
    } catch (error) {
      console.error("Error submitting deletion request:", error);
      alert("Failed to submit deletion request");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h5">Request Event Deletion</Typography>
      <TextField
        label="Reason for Deletion"
        multiline
        rows={4}
        value={reason}
        onChange={handleReasonChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteRequest}
      >
        Submit Deletion Request
      </Button>
    </div>
  );
};

export default DeleteRequestPage;
