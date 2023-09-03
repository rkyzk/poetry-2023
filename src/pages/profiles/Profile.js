import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

/**
 * Return Profile component.
 * Depending on the page, return different elements.
 */
const Profile = (props) => {
  /** destructure props */
  const {
    id,
    user_id,
    owner,
    image,
    display_name,
    followers_count,
    poems_count,
    /** if the current user is following the profile,
        following_id will be present, otherwise 'none'. */
    following_id,
    imageSize = 55,
    created_at,
    mobile,
    featured,
  } = props;
  /** Get logged in user info */
  const currentUser = useCurrentUser();
  /** is_owner is set to True if the logged in user owns the profile. */
  const is_owner = currentUser?.username === owner;

  return (
    <Card className="mb-1">
      <Card.Body>
        {mobile ? (
          <>
            {/* In the featured profiles component on screen sizes below md,
                display the following */}
            <Row className={`${styles.Mobile} justify-content-center`}>
              <Link className={styles.ProfileLink} to={`/profiles/${id}`}>
                <Avatar src={image} height={45} />
                <Media>
                  <div>
                    <p className={`ml-2 mb-0 ${styles.MobileName}`}>
                      {display_name}
                    </p>
                    <span className={`ml-2 ${styles.CountsText}`}>
                      {poems_count} poems
                    </span>
                  </div>
                </Media>
              </Link>
            </Row>
          </>
        ) : featured ? (
          <>
            {/* In the featured profiles component for large screen,
                display the following. */}
            <Media className="align-items-center">
              <Row>
                <Col xs={4}>
                  <Link className={styles.ProfileLink} to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                  </Link>
                </Col>
                <Col xs={8}>
                  <Link className={styles.ProfileLink} to={`/profiles/${id}`}>
                    <h4 className={`${styles.FeaturedName}`}>{display_name}</h4>
                  </Link>
                  <span className={`${styles.ProfileText}`}>
                    {poems_count} poems
                  </span>
                  <span className={`${styles.ProfileText} ml-2`}>
                    {followers_count} followers
                  </span>
                </Col>
              </Row>
            </Media>
          </>
        ) : (
          <>
            {/* ProfilePage */}
            <Row style={{ height: "100px" }} className="pt-2">
              <Col xs={4}>
                <Avatar src={image} height={80} className={`${styles.Img}`} />
              </Col>
              {/* display the user info (the name, the date joinged etc)
                next to the avatar for screen sizes above 490px
                className ProfileInfo won't be displayed below 490px. */}
              <Col xs={7} className={styles.ProfileInfo}>
                <Link className={styles.ProfileLink} to={`/profiles/${id}`}>
                  <h3 className={`${styles.ProfileName}`}>{display_name}</h3>
                </Link>
                <p className={`${styles.ProfileText} mb-0`}>
                  Member since {created_at}
                </p>
                <span className={`${styles.ProfileText}`}>
                  {poems_count} poems
                </span>
                <span className={`${styles.ProfileText} ml-2`}>
                  {followers_count} followers
                </span>
              </Col>
              <Col>{is_owner && <ProfileEditDropdown id={id} />}</Col>
            </Row>
          </>
        )}
        {/* if not mobile, if logged in, and if the owner of the profile,
            display 'You!' tag.  If not the owner, display follow/unfollow
            buttons.  (If following_id exists, display 'unfollow,' otherwise
            'follow.'  */}
        {!mobile &&
          currentUser &&
          (is_owner ? (
            <div className="mt-2">
              <span className={`${btnStyles.You} ml-4`}>You!</span>
            </div>
          ) : following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.LightBlue} mt-2 ml-4`}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black} mt-2 ml-4`}
            >
              follow
            </Button>
          ))}
      </Card.Body>
    </Card>
  );
};

export default Profile;
