import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

/**
 * Return sign up form.
 */
const SignUpForm = () => {
  /** registerData will store data entered by users. */
  const [registerData, setRegisterData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  /** destructure 'registerData' */
  const { username, password1, password2 } = registerData;
  /** stores errors */
  const [errors, setErrors] = useState({});

  /**
   * Set the data entered by users to
   * 'registerData.'
   */
  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Col
      className="my-auto py-2 p-md-2"
      lg={{ span: 6, offset: 3 }}
      md={{ span: 8, offset: 2 }}
    >
      <Container className="p-4">
        <h1 className={styles.Header}>sign up</h1>
        <Form>
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
          <Button
            className={`${btnStyles.Button} ${btnStyles.Large} ${btnStyles.Olive}`}
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
      <Container className="mt-3">
        <Link className={styles.Link} to="/signin">
          Already have an account?{" "}
          <span className={styles.TextColor}>Sign in</span>
        </Link>
      </Container>
    </Col>
  );
};

export default SignUpForm;
