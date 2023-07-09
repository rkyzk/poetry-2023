import React, { useEffect, useState } from "react";

 import Form from "react-bootstrap/Form";
 import Button from "react-bootstrap/Button";
 import Row from "react-bootstrap/Row";
 import Col from "react-bootstrap/Col";
 import Container from "react-bootstrap/Container";
 import Alert from "react-bootstrap/Alert";
 import Image from "react-bootstrap/Image";

 import styles from "../../styles/PoemCreateEditForm.module.css";
 import appStyles from "../../App.module.css";
 import btnStyles from "../../styles/Button.module.css";

 import { useHistory, useParams } from "react-router";
 import { axiosReq } from "../../api/axiosDefaults";

 function PoemEditForm() {
   const [errors, setErrors] = useState({});

   const [poemData, setPoemData] = useState({
     title: "",
     content: "",
   });
   const { title, content } = poemData;
   // published tells if the poem has been published.
   const [published, setPublished] = useState(false);
   // publish will be set true, if user decides to publish the poem
   const [publish, setPublish] = useState(false);

   const history = useHistory();
   const { id } = useParams();

   useEffect(() => {
     const handleMount = async () => {
       try {
         const { data } = await axiosReq.get(`/poems/${id}`);
         const { title, content, is_owner, published } = data;
         published && setPublished(true)
         is_owner ? setPoemData({ title, content }) : history.push("/");
       } catch (err) {
         console.log(err);
       }
     };

     handleMount();
   }, [history, id]);

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
     if (publish || published) {
      formData.append("published", true);
     }
     try {
       await axiosReq.put(`/poems/${id}`, formData);
       history.push(`/poems/${id}`);
     } catch (err) {
       console.log(err);
       if (err.response?.status !== 401) {
         setErrors(err.response?.data);
       }
     }
   };

   const textFields = (
     <div className="ml-2">
       <Form.Group>
         <Form.Label>Title</Form.Label>
         <Form.Control
           type="text"
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

       <Form.Group>
         <Form.Label>Content</Form.Label>
         <Form.Control
           as="textarea"
           rows={10}
           name="content"
           value={content}
           onChange={handleChange}
         />
       </Form.Group>
       {errors?.content?.map((message, idx) => (
         <Alert variant="warning" key={idx}>
           {message}
         </Alert>
       ))}

       <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
         save
       </Button>
      {!published && (
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={()=>{setPublish(true)}} 
          type="submit"
          >
          publish
        </Button>
      )}
       <Button
         className={`${btnStyles.Button} ${btnStyles.Blue}`}
         onClick={() => history.goBack()}
       >
         cancel
       </Button>
       
     </div>
   );

   return (
     <Form onSubmit={handleSubmit}>
       <Container>
           <div>{textFields}</div>
       </Container>
     </Form>
   );
 }

 export default PoemEditForm; 