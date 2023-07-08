import React from "react";
import styles from "../../styles/ProfilePartial.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

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
    setProfiles
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
        <Media className="align-items-center">
          {!profilePage ? (
          <Link to={`/profiles/${id}`}>
            <Avatar src={image} height={55} />
            <h3 className="ml-4">{display_name}</h3>
          </Link>
          ) : (
            <>
              <Avatar src={image} height={120} />
              <h3 className="ml-4">{display_name}</h3>
            </>
          )}
          <div className="d-flex align-items-center ml-4">
            <span>Member since {created_at}</span>
            {is_owner && profilePage && (
                <ProfileEditDropdown id={id} />
            )}
          </div>
        </Media>
      </Card.Body>
      {profilePage && (
        <Card.Body>
            {about_me && (
              <>
                <div className="text-muted">About me</div>
                {about_me})
              </>)
            }
            {favorites && (
              <>
                <div className="text-muted">Favorites</div>
                {favorites}
              </>)}
            <div>
              <span>{poems_count} poems</span>
              <span className="ml-2">{followers_count} followers</span>
            </div>
        </Card.Body>
      )}
      {currentUser &&
        !is_owner &&
        (following_id ? (
        <Card.Body>
          <Button
            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
            onClick={() => handleUnfollow()}
          >
            unfollow
          </Button>
        </Card.Body>
        ) : (
          <Card.Body>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Black}`}
            onClick={() => handleFollow()}
          >
            follow
          </Button>
        </Card.Body>
        ))}
    </Card>
  );
};

export default Profile;