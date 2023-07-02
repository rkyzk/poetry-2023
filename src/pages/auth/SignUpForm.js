import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const [profileData, setProfileData] = useState({
    display_name: "",
    about_me: "",
    favorites: ""
  });
  const { username, password1, password2 } = signUpData;
  const { display_name, about_me, favorites } = profileData;
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('dj-rest-auth/registration/', signUpData);
      await axiosReq.post(`/profiles/${data.id}`, profileData);
      history.push("/signin");
    } catch(err){
      setErrors(err.response?.data);
    }
  }
  return (
    <Col className="my-auto py-2 p-md-2" md={{ span: 6, offset: 3 }}>
      <Container className={`${appStyles.Content} p-4 `}>
        <h1 className={styles.Header}>sign up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
          ))}
          <Form.Group controlId="display_name">
            <Form.Label className="d-none">Display name (if different from username)</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Display name if different from username"
              name="display_name"
              value={display_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="about_me">
            <Form.Label className="d-none">A few things about yourself (optional)</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="A few things about yourself (optional)"
              name="about_me"
              value={about_me}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="about_me">
            <Form.Label className="d-none">Your favorite poems/poets (optional)</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Your favorite poems/poets"
              name="favorites"
              value={favorites}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            type="submit"
          >
            Sign up
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
          ))}
        </Form>
      </Container>
      <Container className={`mt-3 ${appStyles.Content}`}>
        <Link className={styles.Link} to="/signin">
          Already have an account? <span>Sign in</span>
        </Link>
      </Container>
    </Col>
  );
};

export default SignUpForm;