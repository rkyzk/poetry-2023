import React, { useState } from "react";
import FeaturedProfiles from "../profiles/FeaturedProfiles";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PoemCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PoemsPage from "../poems/PoemsPage";

function NewPoems() {
  return (
    <>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <FeaturedProfiles mobile />
          <PoemsPage />
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <FeaturedProfiles />
        </Col>
      </Row>
    </>
  );
}

export default NewPoems;