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

  /* set filter for new poems page */
  let startDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString().substring(0, 10);           
  let filter = `published=1&published_at__date__gte=${startDate}`;
  // add ordering later!  need to redeploy api

  return (
    <>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
         <FeaturedProfiles mobile />
         <h2>New Poems (published in previous 2 weeks)</h2>
          <PoemsPage filter={filter} />
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <FeaturedProfiles />
        </Col>
      </Row>
    </>
  );
}

export default NewPoems;