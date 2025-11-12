import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import '../App.css';

interface Donor {
  id: string;
  name: string;
  bloodType: string;
  faculty: string;
  lastDonation: string; // Date string or 'N/A'
  status: 'Available' | 'Recently Donated';
}

const dummyDonors: Donor[] = [
  { id: '1', name: 'Budi', bloodType: 'A+', faculty: 'Computer Science', lastDonation: '2023-10-15', status: 'Available' },
  { id: '2', name: 'Surti', bloodType: 'B-', faculty: 'Nursing', lastDonation: '2024-01-20', status: 'Recently Donated' },
  { id: '3', name: 'Boby', bloodType: 'O+', faculty: 'Economics and Bussiness', lastDonation: '2023-11-01', status: 'Available' },
  { id: '4', name: 'Dono', bloodType: 'AB+', faculty: 'Education', lastDonation: '2024-02-10', status: 'Available' },
  { id: '5', name: 'Miska', bloodType: 'A-', faculty: 'Engineering', lastDonation: '2024-03-05', status: 'Available' },
];

const FindDonorPage: React.FC = () => {
  const [bloodType, setBloodType] = useState<string>('');
  const [faculty, setFaculty] = useState<string>('');
  const [donationStatus, setDonationStatus] = useState<string>('');
  const [results, setResults] = useState<Donor[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = dummyDonors.filter(donor => {
      return (
        (bloodType === '' || donor.bloodType === bloodType) &&
        (faculty === '' || donor.faculty.toLowerCase().includes(faculty.toLowerCase())) &&
        (donationStatus === '' || donor.status === donationStatus)
      );
    });
    setResults(filteredResults);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Find a Donor</h1>
      <Form onSubmit={handleSearch} className="mb-5 p-4 border rounded shadow-sm">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBloodType">
            <Form.Label>Blood Type</Form.Label>
            <Form.Control
              as="select"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="">Any</option>
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

          <Form.Group as={Col} controlId="formFaculty">
            <Form.Label>Faculty/Major</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Engineering, Computer Science"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDonationStatus">
            <Form.Label>Donation Status</Form.Label>
            <Form.Control
              as="select"
              value={donationStatus}
              onChange={(e) => setDonationStatus(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Available">Available</option>
              <option value="Recently Donated">Recently Donated</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button variant="danger" type="submit" className="w-100">
          Search Donors
        </Button>
      </Form>

      {results.length > 0 && (
        <div>
          <h2 className="mb-4 text-center">Matching Donors</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {results.map((donor) => (
              <Col key={donor.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{donor.name}</Card.Title>
                    <Card.Text>
                      <strong>Blood Type:</strong> {donor.bloodType}<br />
                      <strong>Faculty:</strong> {donor.faculty}<br />
                      <strong>Last Donation:</strong> {donor.lastDonation}<br />
                      <strong>Status:</strong> <span className={`badge ${donor.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>{donor.status}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      {results.length === 0 && bloodType !== '' && faculty !== '' && donationStatus !== '' && (
        <p className="text-center text-muted">No donors found matching your criteria.</p>
      )}
    </div>
  );
};

export default FindDonorPage;
