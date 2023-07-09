import React from "react";
import styles from "../../styles/Poem.module.css";
import { useHistory } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Poem = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_name,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    published_at,
    poemPage,
    setPoems,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/poems/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/poems/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }  
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { poem: id });
      setPoems((prevPoems) => ({
        ...prevPoems,
        results: prevPoems.results.map((poem) => {
          return poem.id === id
            ? { ...poem, likes_count: poem.likes_count + 1, like_id: data.id }
            : poem;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setPoems((prevPoems) => ({
        ...prevPoems,
        results: prevPoems.results.map((poem) => {
          return poem.id === id
            ? { ...poem, likes_count: poem.liks_count - 1, like_id: null }
            : poem;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Poem}>
      <Card.Body>
        {title && poemPage ? (
          <Card.Title className="styles.LinkText">
            {title}
          </Card.Title>
        ) : (
          <Card.Title className="styles.LinkText">
            <Link to={`/poems/${id}`}>
              {title}
            </Link>
          </Card.Title>
        )}
        <div className="d-flex justify-content-between">
          <span className="styles.LinkText">
            <Link to={`/profiles/${profile_id}`}>
              {profile_name}
            </Link>
          </span>
          <span className="ml-5 justify-content-end">
            {published_at ? (
                <>Published on {published_at}</>
              ) : (
                <>Not published yet</>    
              )
            }
            {is_owner && poemPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                className="ml-3"
              />
            )}
          </span>
        </div>       
      </Card.Body>
      <Card.Body>     
        {content && !poemPage ? (
          <Card.Text>{content.substring(0, 60)}</Card.Text>
        ) : (
          <Card.Text>{content}</Card.Text>
        )}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own poem!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like poems!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/poems/${id}`}>
            <i className="far fa-comments ml-2" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Poem;