import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Return Comment component.
 */
const Comment = (props) => {
  /** destructure props */
  const {
    profile_id,
    profile_image,
    owner,
    created_at,
    updated_at,
    content,
    id,
  } = props;

  /** get info about the logged in user. */
  const currentUser = useCurrentUser();

  return (
    <>
      <hr />
      <Media>
        <Link to="#">
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <Row>
            <Col sm={5}>
              <span className={styles.Owner}>{owner}</span>
            </Col>
            {/* If the comment has been edited, label 'edited' */}
            {updated_at !== created_at ? (
              <Col sm={7}>
                <span className={`${styles.Time}`}>{created_at}</span>
                <span className={`${styles.Time} ml-3`}>edited</span>
              </Col>
            ) : (
              <Col sm={7}>
                <span className={`${styles.Time}`}>{created_at}</span>
              </Col>
            )}
          </Row>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </>
  );
};

export default Comment;
