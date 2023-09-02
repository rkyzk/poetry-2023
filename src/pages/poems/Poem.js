import React from "react";
import styles from "../../styles/Poem.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Return poem data including title, content or excerpt,
 * author, published date.
 * This component holds handleLike und handleUnlike functions.
 */
const Poem = (props) => {
  const {
    /** poem id */
    id,
    /** poem owner */
    owner,
    /** owner's profile name */
    profile_name,
    /** number of comments */
    comments_count,
    /** number of likes */
    likes_count,
    /** like id, if the current user has liked the poem */
    like_id,
    /** poem titel */
    title,
    /** poem content */
    content,
    /** poem category */
    category,
    /** poem's published date */
    published_at,
    /** If called from poem page */
    poemPage,
  } = props;

  /** get currentUser from CurrentUserContext. */
  const currentUser = useCurrentUser();
  /** is_owner tells if the current user is the owner of the poem. */
  const is_owner = currentUser?.username === owner;
  /** get the pathname */

  return (
    <Card className={styles.Poem}>
      <Card.Body className="pr-5">
        <>
          <Row>
            <Card.Title className={`${styles.Title} mb-0 ml-2`}>
              {title && title}
            </Card.Title>
          </Row>
          <span className={`${styles.Text} ml-4`}>
            by
            {/* Link the profile name to the profile page. */}
            <Link
              className={`${styles.LinkText} ml-1`}
              to="#"
              aria-label={`go-to-the-profile-page-of-${profile_name}`}
            >
              {profile_name && profile_name}
            </Link>
          </span>
          <br />
          <Row>
            {/* If published display the published date */}
            <span className={`ml-auto ${styles.PubDate}`}>
              {published_at ? (
                <>Published on {published_at}</>
              ) : (
                <>Not published yet</>
              )}
            </span>
          </Row>
          <Card.Text className={styles.Line}>{content}</Card.Text>
          <p className={`mt-3 text-muted ${styles.Category}`}>
            Category: {category}
          </p>
          {/* If is_owner, tell they can't like their own poems when
                they hover over the heart icon. */}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own poem!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span>
              {/* If like_id exists, handleUnlike will be fired,
                  when the icon is clicked. */}
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span>
              {/* If like_id doesn't exist and the user is logged in, 
                    the poem will be liked. */}
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like poems!</Tooltip>}
            >
              {/* If the user isn't logged in, tell them:
                'log in to like poems' */}
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          <span className="ml-1">{likes_count}</span>
          <Link
            className={`${styles.CommentIcon}`}
            to={`/poems/${id}`}
            aria-label={`comment-on-${title}`}
          >
            <i className="far fa-comments ml-2 mr-1" />
          </Link>
          {comments_count}
        </>
      </Card.Body>
    </Card>
  );
};

export default Poem;
