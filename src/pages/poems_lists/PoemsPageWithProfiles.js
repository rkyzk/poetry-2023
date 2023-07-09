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

function PoemsPageWithProfiles(props) {
  const { page, heading } = props;
  let startDate;
  let filter;

  // For new poems page, filter by published in the past 14 days
  if (page === "newPoems") {
    /* set filter for new poems page */
    startDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString().substring(0, 10);           
    filter = `published=1&published_at__date__gte=${startDate}&ordering=-published_at`;
  }
  // For popular poems page, filter by published in the past 30 days and order by descending likes_count
  if (page === "popularPoems") {
    startDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10);           
    filter = `published=1&published_at__date__gte=${startDate}&ordering=-likes_count`;
  }
  // For poems by categories page, filter by category
  // if (category !== "") {
  //   filter = `published=1&category=${category}ordering=-published_at`;
  // }

  return (
    <>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
         <FeaturedProfiles mobile />
         <h2>{heading}</h2>
          <PoemsPage filter={filter} />
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <FeaturedProfiles />
        </Col>
      </Row>
    </>
  );
}

export default PoemsPageWithProfiles;