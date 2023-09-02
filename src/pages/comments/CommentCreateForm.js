import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * Return comment form.
 */
function CommentCreateForm(props) {
  /** destructure props */
  const { poem, setPoem, setComments, profileImage, profile_id } = props;
  /** content stores the comment */
  const [content, setContent] = useState("");

  /** set value entered by users to 'content'. */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * Send comment data to the backend.
   * Add the comment to comments array
   * and adjust the comment count for the front end.
   */
  const handleSubmit = async (event) => {
    // Prevent the form from being submitted.
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        poem,
      });
      // Add the new comment to the comments array.
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} ${styles.Olive} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
