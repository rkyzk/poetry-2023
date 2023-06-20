import React from "react";
import { Card } from 'react-bootstrap';
import styles from "../../styles/ProfilePartial.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";


const ProfilePartial = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, image, display_name } = profile;

  return (
    <Card>
    <div
      className="my-3 d-flex align-items-center"
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{display_name}</strong>
      </div>
    </div>
    </Card>
  );
};

export default ProfilePartial;