import React from "react";
import styles from "../../styles/ProfilePartial.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Profile = (props) => {
  const {
    id,
    owner,
    image,
    display_name,
    followers_count,
    poems_count,
    following_id,
    about_me,
    favorites,
    created_at,
    profilePage,
    setProfiles,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();


  const handleFollow = async () => {
    try {
      const { data } = await axiosRes.post("/followers/", { followed: id });
      setProfiles((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          return profile.id === id
            ? { ...profile, followers_count: profile.followers_count + 1, following_id: data.id }
            : profile;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow= async () => {
    try {
      await axiosRes.delete(`/followers/${following_id}/`);
      setProfiles((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          return profile.id === id
            ? { ...profile, followers_count: profile.followers_count - 1, following_id: null }
            : profile;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {!profilePage ? (
          <Link to={`/profiles/${id}`}>
            <Avatar src={image} height={55} />
            {display_name}
          </Link>
          ) : (
            <>
              <Avatar src={image} height={80} />
              {display_name}
            </>
          )}
          <div className="d-flex align-items-center">
            <span>Member since {created_at}</span>
            {/* {is_owner && profilePage && (
              <MoreDropdown />
            )} */}
          </div>
        </Media>
      </Card.Body>
      {profilePage && (
        <Card.Body>
            <div>About me</div>
            {about_me && {about_me}}
            <div>Favorites</div>
            {favorites && {favorites}}
            <div>
                <span>{poems_count} poems</span>
                <span>{followers_count} followers</span>
            </div>
        </Card.Body>
      )}
      <div>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow()}
            >
              unfollow
            </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow()}
              >
                follow
              </Button>
        ))}
      </div>
    </Card>
  );
};

export default Profile;