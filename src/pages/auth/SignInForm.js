import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

/**
 * Return the sign in form.
 */
function SignInForm() {
  /** 'signInData' will store data entered by users  */
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  /** destructure 'signInData' */
  const { username, password } = signInData;

  /** stores errors */
  const [errors, setErrors] = useState({});

  /** set data entered by users to 'signInData'. */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Col
      className="my-auto p-0 p-md-2"
      lg={{ span: 6, offset: 3 }}
      md={{ span: 8, offset: 2 }}
    >
      <Container className="p-4">
        <h1 className={styles.Header}>sign in</h1>
        <Form>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
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
          <Form.Group controlId="password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button
            className={`${btnStyles.Button} ${btnStyles.Large} ${btnStyles.Olive}`}
            type="submit"
          >
            Sign in
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
      </Container>
      <Container className="mt-3">
        <Link className={styles.Link} to="/signup">
          Don't have an account?{" "}
          <span className={styles.TextColor}>Sign up now!</span>
        </Link>
      </Container>
    </Col>
  );
}

export default SignInForm;
