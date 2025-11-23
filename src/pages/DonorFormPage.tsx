import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { DonorContext } from '../context/DonorContext';
import '../App.css';

interface DonorFormData {
  name: string;
  nim: string;
  bloodType: string;
  lastDonationDate: string;
}

const DonorFormPage: React.FC = () => {
  const [formData, setFormData] = useState<DonorFormData>({
    name: '',
    nim: '',
    bloodType: '',
    lastDonationDate: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const donorContext = useContext(DonorContext);

  if (!donorContext) {
    return <div>Loading...</div>;
  }

  const { addDonor } = donorContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDonor(formData);
    setMessage({ type: 'success', text: 'Thank you for registering! Your information has been saved.' });
    setFormData({
      name: '',
      nim: '',
      bloodType: '',
      lastDonationDate: '',
    }); // Clear form
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Register as a Donor</h1>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nim">
          <Form.Label>Student ID (NIM)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your student ID"
            value={formData.nim}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bloodType">
          <Form.Label>Blood Type</Form.Label>
          <Form.Control
            as="select"
            value={formData.bloodType}
            onChange={handleChange}
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
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastDonationDate">
          <Form.Label>Last Donation Date (Optional)</Form.Label>
          <Form.Control
            type="date"
            value={formData.lastDonationDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="danger" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default DonorFormPage;
