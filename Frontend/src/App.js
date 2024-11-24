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
//import BookingForm from "./components/bookings/CreateBooking";
import ViewAllEvents from "./components/bookings/ViewAllEvents";
import ViewMyBookings from "./components/bookings/ViewBooking";
import CreateBooking from "./components/bookings/CreateBooking";

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
            <PendingDeletionRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/view/all-events"
        element={
          <ProtectedRoute>
            <ViewAllEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/view/all-bookings"
        element={
          <ProtectedRoute>
            <ViewMyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reserve-seat/:eventId"
        element={
          <ProtectedRoute>
            <CreateBooking />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
