import React, { useState, useEffect } from "react";
import requestsData from "../data/requests.json";
import { useUser } from '../context/UserContext'; // Import useUser hook

interface BloodRequest {
  id: number;
  requesterId: number;
  requesterName: string;
  bloodType: string;
  status: "open" | "fulfilled";
  createdAt: string;
}

const UserDashboard: React.FC = () => {
  const { user: loggedInUser } = useUser(); // Use the user from context
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [newRequestBloodType, setNewRequestBloodType] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    const storedRequests = localStorage.getItem("bloodRequests");
    if (storedRequests) {
      setBloodRequests(JSON.parse(storedRequests));
    } else {
      // Initialize with data from requests.json if no stored requests
      setBloodRequests(
        (requestsData as BloodRequest[]).filter((req) => req.status === "open")
      );
    }
  }, []);

  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInUser || !newRequestBloodType) {
      alert("Please select a blood type.");
      return;
    }

    const newRequestId =
      bloodRequests.length > 0
        ? Math.max(...bloodRequests.map((req) => req.id)) + 1
        : 1;
    const newRequest: BloodRequest = {
      id: newRequestId,
      requesterId: loggedInUser.id,
      requesterName: loggedInUser.name,
      bloodType: newRequestBloodType,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    // In a real app, this would be sent to a backend API
    // For now, we'll simulate by adding to the local state and showing success
    const updatedRequests = [...bloodRequests, newRequest];
    setBloodRequests(updatedRequests);
    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests)); // Persist to localStorage
    setRequestSuccess(true);
    setNewRequestBloodType(""); // Clear form
    setTimeout(() => setRequestSuccess(false), 3000); // Hide success message after 3 seconds
  };

  if (!loggedInUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Please log in to view your dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card border-primary mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Welcome, {loggedInUser.name}!</h2>
        </div>
        <div className="card-body">
          {/* User Profile Section */}
          <div className="card mb-4">
            <div className="card-header bg-danger text-white">
              <h4>Your Profile</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>Email:</strong> {loggedInUser.email}
              </p>
              <p>
                <strong>Blood Type:</strong>{" "}
                <span className="badge bg-danger fs-6">
                  {loggedInUser.bloodType}
                </span>
              </p>
              <p>
                <strong>Role:</strong> {loggedInUser.role}
              </p>
            </div>
          </div>

          {/* Make a New Blood Request Section */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h4>Make a New Blood Request</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleNewRequest}>
                <div className="mb-3">
                  <label htmlFor="bloodTypeSelect" className="form-label">
                    Blood Type Needed
                  </label>
                  <select
                    id="bloodTypeSelect"
                    className="form-select"
                    value={newRequestBloodType}
                    onChange={(e) => setNewRequestBloodType(e.target.value)}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
                {requestSuccess && (
                  <div className="alert alert-success mt-3" role="alert">
                    Your blood request has been submitted!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Active Blood Donation Requests Section */}
      <h3 className="mb-3">Active Blood Donation Requests</h3>
      <div className="row">
        {bloodRequests.length > 0 ? (
          bloodRequests.map((request) => (
            <div className="col-md-6 col-lg-4 mb-4" key={request.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-danger">
                    Blood Type: {request.bloodType}
                  </h5>
                  <p className="card-text">
                    <strong>Requester:</strong> {request.requesterName}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-warning text-dark">
                      {request.status}
                    </span>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Requested on:{" "}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                  {/* In a real app, a user might "volunteer" here */}
                  <button className="btn btn-outline-danger mt-auto" disabled>
                    Volunteer (Coming Soon)
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">
              No active blood donation requests at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
