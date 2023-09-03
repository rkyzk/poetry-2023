import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "../../styles/PoemCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Return Poem create form.
 * Display error messages if the input is not valid.
 */
function PoemCreateForm() {
  // variable for storing error data
  const [errors, setErrors] = useState({});
  // variable for storing input made by users
  const [poemData, setPoemData] = useState({
    title: "",
    content: "",
    category: "other",
  });
  // destructure the poemdata object
  const { title, content, category } = poemData;
  // boolean to tell if user has clicked on 'publish'
  const [publish, setPublish] = useState(false);
  // instantiate history object to store data which url the user has visited.
  const history = useHistory();

  const currentUser = useCurrentUser();
  // redirect logged out users to home page.
  useRedirect("loggedOut");
  const user_id = currentUser?.pk;
  // stores feedback message
  var msg;

  /**
   *  Set user input into variable 'poemData'.
   */
  const handleChange = (event) => {
    setPoemData({
      ...poemData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Send poem data entered by users to the backend.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    /* if 'publish' has been clicked, set published to true
       and set the feedback message accordingly */
    if (publish) {
      formData.append("published", true);
      msg = "Your poem has been published";
    } else {
      msg = "Your poem has been saved";
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    try {
      // Send the api the data of a new poem
      const { data } = await axiosReq.post("/poems/", formData);
      // redirect users to the new poem's page.
      history.push(`/poems/${data.id}`);
    } catch (err) {
      // if the error is not 'unauthorized, set error data to 'errors'
      err.response?.status !== 401 && setErrors(err.response?.data);
    }
  };

  return (
    <>
      <h2>Write a new poem</h2>
      <Form onSubmit={handleSubmit} className={styles.PoemForm}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            name="content"
            as="textarea"
            rows={10}
            value={content}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group controlId="category">
          <Form.Label className="my-1 mr-2">Category</Form.Label>
          <Form.Control
            as="select"
            className={`${styles.Category} ml-3`}
            name="category"
            value={category}
            defaultValue="other"
            onChange={handleChange}
            custom
          >
            <option>nature</option>
            <option>love</option>
            <option>people</option>
            <option>humor</option>
            <option>haiku</option>
            <option>other</option>
          </Form.Control>
        </Form.Group>
        {errors?.category?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {message}
          </Alert>
        ))}
        <Button
          className={`${btnStyles.Button} ${btnStyles.Olive} mt-2`}
          type="submit"
        >
          save as draft
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Olive} ml-2 mt-2`}
          onClick={() => {
            setPublish(true);
          }}
          type="submit"
        >
          publish
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Olive} ml-2 mt-2`}
          onClick={() => history.goBack()}
        >
          cancel
        </Button>
      </Form>
    </>
  );
}

export default PoemCreateForm;
