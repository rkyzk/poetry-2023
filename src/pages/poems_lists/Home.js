import React, { useState } from "react";
// import FeaturedProfiles from "../profiles/FeaturedProfiles";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Home.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PoemsPage from "../poems/PoemsPage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const intro = (
    <>
      <h2 className="text-center">Welcome!</h2>
      <p>You landed this page, because you love poetry.
        Here you can share your poems, read others' poems,
        give & get comments and feedback.  In this friednly
        and supportive community, you can become better writers.
        Haven't written since high school years?
        Or haven't written a poem before?  Doesn't matter.
        You can read tips to get started and start writing today.
      </p>
    </>

);


function Home() {
  return (
    <>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
         {/* <FeaturedProfiles mobile /> */}
          {intro}
          <Link
            to="/signup"
            className={styles.NavLink}>
            Register
          </Link> here.
          <><h2 className="mt-3" >Featured Poems</h2></>
          <PoemsPage filter={`status=1&featured_flag=1&ordering=-created_at&`}/>
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          {/* <FeaturedProfiles /> */}
        </Col>
      </Row>
    </>
  );
}

export default Home;