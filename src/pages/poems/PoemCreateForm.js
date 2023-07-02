import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "../../styles/PoemCreateEditForm.module.css";
// import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";

function PoemCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [poemData, setPoemData] = useState({
    title: "",
    content: "",
  });
  const { title, content } = poemData;
  const history = useHistory();

  const handleChange = (event) => {
    setPoemData({
      ...poemData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    try {
      const { data } = await axiosReq.post('/poems/', formData);
      console.log(data.id)
      history.push(`/poems/${data.id}`);
    } catch (err){
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      console.log(err);
    }
  };

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
      {errors?.title?.map((message, idx) => (
        <Form.Group controlId="title">
          <Alert variant="warning" key={idx}>		
            {message}		
          </Alert>	
        </Form.Group>	
      ))}
      <Form.Group> 
      {/* controlId="content" */}
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
      <Button 
        className={`${btnStyles.Button} ${btnStyles.Olive} mt-2`}
        type="submit"
      >
        Save as Draft
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Olive} ml-2 mt-2`}
        type="submit"
      >
        Publish
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Olive} ml-2 mt-2`}
        onClick={() => history.goBack()}
      >
       Cancel
      </Button>
    </Form>
  );
}

export default PoemCreateForm;