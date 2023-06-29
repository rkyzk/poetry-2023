import React from "react";
import styles from "../../styles/ProfilePartial.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const ProfilePartial = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  console.log(profile.following_id);
  const { id, display_name, image } = profile;
  const currentUser = useCurrentUser();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <strong>{display_name}</strong>
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
    </div>
  );
};

export default ProfilePartial;