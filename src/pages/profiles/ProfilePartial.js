import React from "react";
import styles from "../../styles/ProfilePartial.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const ProfilePartial = (props) => {
  const { profile, mobile, imageSize = 55 } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;
  const id = profile?.id;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
        <div
          className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
        >
          <div>
            <Link className="align-self-center" to={`/profiles/${id}`}>
              <Avatar src={profile.image} height={imageSize} />
            </Link>
          </div>
          <div className={`mx-2 ${styles.WordBreak}`}>
            <Link className="align-self-center" to={`/profiles/${id}`}>
              <strong>{profile.display_name}</strong>
            </Link>
          </div>
          <div className={`text-right ${!mobile && "ml-auto"}`}>
            { currentUser ? (
                profile.follwoing_id ? (
                  <span>You're following this poet</span>
                ) : (
                  <></>
                )) : (
                  <></>
                )
            }
          </div>   
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (profile.following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default ProfilePartial;