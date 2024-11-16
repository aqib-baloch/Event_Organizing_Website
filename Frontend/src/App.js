import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AttendeeDashboard from "./components/dashboard/AttendeeDashboard";
import OrganizerDashboard from "./components/dashboard/OrganizerDashboard";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Home from "./components/Home/Home";
import MyEvents from "./components/event/MyEvents";
import CreateEvent from "./components/event/CreateEvent";
import EditEvent from "./components/event/EditEvent";
import DeleteRequestPage from "./components/event/DeleteRequestPage";
import PendingDeletionRequests from "./components/event/PendingDeletionRequests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/edit-event/:id" element={<EditEvent />} /> */}
      <Route
        path="/attendee-dashboard"
        element={
          <ProtectedRoute>
            <AttendeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer-dashboard"
        element={
          <ProtectedRoute>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/create-event"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/getAllEvents"
        element={
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/update-event-by-id/:id"
        element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delete-request/:id"
        element={
          <ProtectedRoute>
            <DeleteRequestPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/request-deletion"
        element={
          <ProtectedRoute>
            <PendingDeletionRequests/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
