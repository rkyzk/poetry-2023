import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "../comments/CommentEditForm";

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
    setComments,
  } = props;

  /** get info about the logged in user. */
  const currentUser = useCurrentUser();
  /** is_owner is set to true if the user is the owner. */
  const is_owner = currentUser?.username === owner;
  /** showEditForm will be set true if the edit form should be displayed. */
  const [showEditForm, setShowEditForm] = useState(false);

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
          {/* If showEditForm is true, show the edit form. */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Display three dots for the owner, if the edit form is not displayed. */}
        {is_owner && !showEditForm && (
          <MoreDropdown handleEdit={() => setShowEditForm(true)} />
        )}
      </Media>
    </>
  );
};

export default Comment;
