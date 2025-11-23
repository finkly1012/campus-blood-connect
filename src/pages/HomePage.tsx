import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming App.css contains general styling

const HomePage: React.FC = () => {
  return (
    <>
      <div className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Campus Blood Connect</h1>
          <p className="lead">
            Your platform to connect blood donors with those in need within the campus community.
            <br />
            Save lives, one donation at a time.
          </p>
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center mt-5">
            <Link to="/find-donor" className="btn btn-light btn-lg px-4 gap-3">
              Find a Donor
            </Link>
            <Link to="/donate" className="btn btn-outline-light btn-lg px-4">
              I Want to Donate
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-5">
          <div className="row text-center">
              <div className="col-md-4">
                  <div className="card shadow-sm">
                      <div className="card-body">
                          <h5 className="card-title">Find a Donor</h5>
                          <p className="card-text">Quickly find blood donors in your area when you need them the most.</p>
                          <Link to="/find-donor" className="btn btn-primary">Find Donor</Link>
                      </div>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="card shadow-sm">
                      <div className="card-body">
                          <h5 className="card-title">Become a Donor</h5>
                          <p className="card-text">Join our community of heroes and save lives by donating blood.</p>
                          <Link to="/donate" className="btn btn-primary">Donate Now</Link>
                      </div>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="card shadow-sm">
                      <div className="card-body">
                          <h5 className="card-title">Learn About Donation</h5>
                          <p className="card-text">Get educated about the process and benefits of blood donation.</p>
                          <Link to="/education" className="btn btn-primary">Learn More</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default HomePage;
