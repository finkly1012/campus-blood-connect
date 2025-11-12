import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming App.css contains general styling

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to Campus Blood Connect</h1>
      <p className="lead">
        Your platform to connect blood donors with those in need within the campus community.
        Save lives, one donation at a time.
      </p>
      <div className="d-grid gap-2 col-md-6 mx-auto mt-5">
        <Link to="/find-donor" className="btn btn-danger btn-lg">
          Find Donor
        </Link>
        <Link to="/donate" className="btn btn-outline-danger btn-lg">
          I Want to Donate
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
