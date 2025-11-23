import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../App.css";

const EducationPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Blood Donation Education</h1>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-danger">
                Why Donate Blood?
              </Card.Title>
              <Card.Text>
                Blood donation is a selfless act that can save lives. A single
                donation can help multiple patients, including accident victims,
                surgical patients, cancer patients, and those with chronic
                illnesses. It's a simple way to make a profound impact on your
                community.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title as="h3" className="text-danger">
                Eligibility Requirements
              </Card.Title>
              <ul>
                <li>
                  Be at least 17 years old (16 with parental consent in some
                  areas).
                </li>
                <li>Weigh at least 110 pounds (approx. 50 kg).</li>
                <li>Be in good general health.</li>
                <li>Pass a physical and health history assessment.</li>
                <li>
                  No recent tattoos or piercings (usually within the last 3-12
                  months).
                </li>
                <li>No certain medications or medical conditions.</li>
              </ul>
              <Card.Text className="text-muted">
                Specific requirements may vary by region and blood bank. Please
                consult with your local donation center.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title as="h3" className="text-danger">
                The Donation Process
              </Card.Title>
              <ol>
                <li>
                  Registration: Provide identification and fill out a health
                  questionnaire.
                </li>
                <li>
                  Health Screening: A staff member will check your temperature,
                  pulse, blood pressure, and hemoglobin level.
                </li>
                <li>
                  Donation: The actual blood collection takes about 8-10 minutes
                  for whole blood.
                </li>
                <li>
                  Refreshments: Enjoy snacks and drinks to help your body
                  recover.
                </li>
                <li>
                  Recovery: Rest for a few minutes before resuming your daily
                  activities.
                </li>
              </ol>
              <Card.Text>
                The entire process, from arrival to departure, typically takes
                about an hour.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-danger">
                Campus Donation Schedule
              </Card.Title>
              <Card.Text>
                Stay tuned for upcoming blood drive events on campus! We
                regularly partner with local blood banks to host convenient
                donation opportunities for students and staff.
              </Card.Text>
              <div>
                Next Event:
                <ul>
                  <li>Date: December 10, 2025</li>
                  <li>Time: 10:00 AM - 4:00 PM</li>
                  <li>Location: Klabat University
                    , Lobby GK1</li>
                  <li>
                    Organizer: Campus Health Services in collaboration with Red
                    Cross
                  </li>
                </ul>
              </div>
              <Card.Text>
                Check our announcements section or campus bulletin boards for
                more details and future dates.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EducationPage;
