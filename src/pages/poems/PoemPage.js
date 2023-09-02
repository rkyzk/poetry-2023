import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosReq } from "../../api/axiosDefaults";
import Poem from "./Poem";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";

/**
 * Return content of individual poem pages.
 */
function PoemPage() {
  /** get the poem id from the URL */
  const { id } = useParams();
  /** stores data of the poem */
  const [poem, setPoem] = useState({ results: [] });
  /** stores info about the logged in user. */
  const currentUser = useCurrentUser();
  /** stores profile image of the current user */
  const profile_image = currentUser?.profile_image;
  /** stores comments about the poem */
  const [comments, setComments] = useState({ results: [] });

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

  return (
    <>
      <Row className="h-100">
        <Col className="mt-3" lg={{ span: 8, offset: 2 }}>
          <Poem {...poem.results[0]} setPoems={setPoem} poemPage />
          {/* If logged in, display comment form.
                If not, display the heading 'Comments' if there are any comments. */}
          {currentUser && (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              poem={id}
              setPoem={setPoem}
              setComments={setComments}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default PoemPage;
