import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PoemCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function PoemCreateForm() {
  const [errors, setErrors] = useState({});
  const [poem, setPoem] = useState({
    title: "",
    content: "",
  });
  const { title, content } = poem
  const history = useHistory();

  const handleChange = (event) => {
    setPoem({
      ...poem,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    try {
      const { data } = await axiosReq.post('poems/create/', poem);
      history.push("/poems/`${data.id}`");
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      <Button variant="primary" type="submit" name="poem" value="publish">
        Publish
      </Button>
      <Button variant="primary" type="submit" name="poem" value="save">
        Save as Draft
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
       Cancel
      </Button>
    </Form>
  );
}

export default PoemCreateForm;