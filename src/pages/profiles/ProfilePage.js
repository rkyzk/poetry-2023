import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";


function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  const { owner, following_id, display_name, image, about_me, created_at } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <>
      <Avatar src={image} />
      <span>Member since {created_at}</span>
      <div>{display_name}</div>
      <div>{about_me}</div>
      { currentUser && !is_owner && (
        following_id? (
          <Button onClick={() => {}}>unfollow</Button>
        ) : (
          <Button onClick={() => {}}>follow</Button>
        )
      )}
    </>
  );
}

export default ProfilePage;