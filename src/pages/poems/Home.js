import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

/**
 * Return the content of "Home" page.
 */
function Home() {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <p>Featured Profiles for mobile</p>
          <p>Intro</p>
          <p>Featured Poems</p>
        </Col>
        <Col md={4}>
          <p>Featured Profiles for large screen</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
