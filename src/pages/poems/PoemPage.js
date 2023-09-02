import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * Return content of individual poem pages.
 */
function PoemPage() {
  /** get the poem id from the URL */
  const { id } = useParams();
  /** stores data of the poem */
  const [poem, setPoem] = useState({ results: [] });

  useEffect(() => {
    /** get the data of the poem and the comments and set them to variables */
    const handleMount = async () => {
      try {
        // get the data of the poem
        const [{ data: poem }] = await Promise.all([
          axiosReq.get(`/poems/${id}`),
        ]);
        // store the data to 'poem'
        setPoem({ results: [poem] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  console.log(poem.results[0]);
  return (
    <>
      <Row className="h-100">
        <Col className="mt-3" md={{ span: 8, offset: 2 }}>
          <p>{poem?.results[0].title}</p>
          <p>{poem?.results[0].content}</p>
        </Col>
      </Row>
    </>
  );
}

export default PoemPage;
