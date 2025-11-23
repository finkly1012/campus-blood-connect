import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../data/users.json';
import requestsData from '../data/requests.json';
import { Alert } from 'react-bootstrap';
import { useUser } from '../context/UserContext'; // Import useUser
import type { User } from '../context/UserContext'; // Import User interface

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
  const { user } = useUser(); // Use user from context
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allRequests, setAllRequests] = useState<BloodRequest[]>([]);
  const [pendingDonors, setPendingDonors] = useState<PendingDonor[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);


  useEffect(() => {
    if (user) { // Check user from context
      if (user.role === 'admin') {
          const typedUsersData: User[] = usersData.map(u => ({
            ...u,
            role: u.role as 'user' | 'admin'
          }));
          setAllUsers(typedUsersData);

          const typedRequestsData: BloodRequest[] = requestsData.map(req => ({
            ...req,
            status: req.status as 'open' | 'fulfilled'
          }));
          setAllRequests(typedRequestsData);
          
          const storedPendingDonors = JSON.parse(localStorage.getItem('pendingDonors') || '[]');
          setPendingDonors(storedPendingDonors);
        } else {
          navigate('/dashboard');
        }
    } else {
      navigate('/login');
    }
  }, [user, navigate]); // Add user to dependency array



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

  if (!user) { // Check user from context
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card border-info mb-4">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">Admin Dashboard - Welcome, {user.name}!</h2>
        </div>
        <div className="card-body">
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
                {allUsers.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="badge bg-info">{u.bloodType}</span></td>
                    <td>{u.role}</td>
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
      </div>
    </div>
  );
};

export default AdminDashboard;