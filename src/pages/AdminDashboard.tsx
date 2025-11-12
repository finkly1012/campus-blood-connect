import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../data/users.json';
import requestsData from '../data/requests.json';
import { Alert } from 'react-bootstrap';

interface User {
  id: number;
  name: string;
  email: string;
  bloodType: string;
  role: 'user' | 'admin';
}

interface BloodRequest {
  id: number;
  requesterId: number;
  requesterName: string;
  bloodType: string;
  status: 'open' | 'fulfilled';
  createdAt: string;
}

interface PendingDonor {
  name: string;
  nim: string;
  bloodType: string;
  lastDonationDate: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allRequests, setAllRequests] = useState<BloodRequest[]>([]);
  const [pendingDonors, setPendingDonors] = useState<PendingDonor[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);


  useEffect(() => {
    const userString = localStorage.getItem('loggedInUser');
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        if (user.role === 'admin') {
          setLoggedInUser(user);
          setAllUsers(usersData);
          setAllRequests(requestsData);
          loadPendingDonors();
        } else {
          navigate('/user');
        }
      } catch (error) {
        console.error("Failed to parse loggedInUser from localStorage:", error);
        navigate('/login'); // Redirect to login if user data is corrupted
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const loadPendingDonors = () => {
    const storedPendingDonors = JSON.parse(localStorage.getItem('pendingDonors') || '[]');
    setPendingDonors(storedPendingDonors);
  };

  const handleMarkFulfilled = (requestId: number) => {
    setAllRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'fulfilled' } : req
      )
    );
    setMessage({ type: 'success', text: `Request ID: ${requestId} has been marked as fulfilled.` });
    // In a real app, this would update the backend/JSON file
  };

  const handleDeleteRequest = (requestId: number) => {
    if (window.confirm(`Are you sure you want to delete request ID: ${requestId}?`)) {
      setAllRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
      setMessage({ type: 'success', text: `Request ID: ${requestId} has been deleted.` });
      // In a real app, this would update the backend/JSON file
    }
  };

  const handleApproveDonor = (index: number) => {
    const donorToApprove = pendingDonors[index];
    // In a real application, you would add this donor to your main users data (e.g., users.json)
    // For this dummy implementation, we'll just remove it from pending.
    const updatedPendingDonors = pendingDonors.filter((_, i) => i !== index);
    localStorage.setItem('pendingDonors', JSON.stringify(updatedPendingDonors));
    setPendingDonors(updatedPendingDonors);
    setMessage({ type: 'success', text: `Donor ${donorToApprove.name} approved and removed from pending list.` });
  };

  const handleRejectDonor = (index: number) => {
    const donorToReject = pendingDonors[index];
    const updatedPendingDonors = pendingDonors.filter((_, i) => i !== index);
    localStorage.setItem('pendingDonors', JSON.stringify(updatedPendingDonors));
    setPendingDonors(updatedPendingDonors);
    setMessage({ type: 'danger', text: `Donor ${donorToReject.name} rejected and removed from pending list.` });
  };

  if (!loggedInUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard - Welcome, {loggedInUser.name}!</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      {/* Pending Donor Registrations Section */}
      <div className="card mb-5">
        <div className="card-header bg-primary text-white">
          <h4>Pending Donor Registrations</h4>
        </div>
        <div className="card-body">
          {pendingDonors.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>NIM</th>
                    <th>Blood Type</th>
                    <th>Last Donation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDonors.map((donor, index) => (
                    <tr key={index}>
                      <td>{donor.name}</td>
                      <td>{donor.nim}</td>
                      <td><span className="badge bg-info">{donor.bloodType}</span></td>
                      <td>{donor.lastDonationDate || 'N/A'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleApproveDonor(index)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRejectDonor(index)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No pending donor registrations.</p>
          )}
        </div>
      </div>

      {/* All Users Section */}
      <div className="card mb-5">
        <div className="card-header bg-success text-white">
          <h4>All Registered Users</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Blood Type</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><span className="badge bg-info">{user.bloodType}</span></td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* All Blood Requests Section */}
      <div className="card mb-5">
        <div className="card-header bg-danger text-white">
          <h4>All Blood Requests</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Requester</th>
                  <th>Blood Type</th>
                  <th>Status</th>
                  <th>Requested On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.requesterName}</td>
                    <td><span className="badge bg-danger">{request.bloodType}</span></td>
                    <td>
                      <span className={`badge ${request.status === 'open' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td>
                      {request.status === 'open' && (
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleMarkFulfilled(request.id)}
                        >
                          Mark Fulfilled
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;