import React, { useState, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import '../App.css';
import { DonorContext } from '../context/DonorContext';

// Definisikan tipe data pendonor sesuai dengan users.json
interface Donor {
  id: number;
  name: string;
  bloodType: string;
}

const FindDonorPage: React.FC = () => {
  const [bloodType, setBloodType] = useState<string>('');
  const [results, setResults] = useState<Donor[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const donorContext = useContext(DonorContext);

  if (!donorContext) {
    return <div>Loading...</div>;
  }

  const { donors } = donorContext;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    if (bloodType === '') {
      setResults(donors); // Tampilkan semua jika tidak ada filter
    } else {
      const filteredResults = donors.filter(donor => 
        donor.bloodType === bloodType
      );
      setResults(filteredResults);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Cari Pendonor</h1>
      <Form onSubmit={handleSearch} className="mb-5 p-4 border rounded shadow-sm">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBloodType">
            <Form.Label>Golongan Darah</Form.Label>
            <Form.Control
              as="select"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="">Semua</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>.
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button variant="danger" type="submit" className="w-100">
          Cari Pendonor
        </Button>
      </Form>

      {searchPerformed && results.length > 0 && (
        <div>
          <h2 className="mb-4 text-center">Hasil Pencarian</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {results.map((donor) => (
              <Col key={donor.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{donor.name}</Card.Title>
                    <Card.Text>
                      <strong>Golongan Darah:</strong> {donor.bloodType}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      
      {searchPerformed && results.length === 0 && (
        <p className="text-center text-muted">Tidak ada pendonor yang cocok dengan kriteria Anda.</p>
      )}
    </div>
  );
};

export default FindDonorPage;
