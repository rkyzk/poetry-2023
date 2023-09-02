import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import styles from "../../styles/FeaturedProfiles.module.css";
import { useFeaturedProfilesData } from "../../contexts/FeaturedProfilesDataContext";

/**
 * Get featured profiles data from FeaturedProfilesDataContext.js
 * and display them.
 */
const FeaturedProfiles = () => {
  const { featuredProfilesData, errMessage } = useFeaturedProfilesData();
  return (
    <Container>
      <h3 className={`${styles.Heading} text-center`}>Featured profiles</h3>
      {errMessage ? (
        <Alert variant="warning">{errMessage}</Alert>
      ) : featuredProfilesData.results.length ? (
        <Row>"Profiles"</Row>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default FeaturedProfiles;
