// src/components/RequestDeletion.js
import React, { useState } from 'react';
import { requestEventDeletion } from '../services/eventService'; // Implement this function

const RequestDeletion = () => {
  const [eventId, setEventId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestEventDeletion(eventId); // Call your API
    // Optionally show a success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Event ID"
        required
      />
      <button type="submit">Request Deletion</button>
    </form>
  );
};

export default RequestDeletion;
