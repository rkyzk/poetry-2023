import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Poem from "./Poem";

function PoemPage() {
  const { id } = useParams();
  const [poem, setPoem] = useState({ results: [] });
 
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: poem }] = await Promise.all([
          axiosReq.get(`/poems/${id}`),
        ]);
        setPoem({ results: [poem] });
        console.log(poem);
      } catch(err) {
        console.log(err)
      }
    }
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Poem {...poem.results[0]} setPoems={setPoem} poemPage />
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PoemPage;