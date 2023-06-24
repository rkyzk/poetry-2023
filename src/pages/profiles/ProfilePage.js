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
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams(); 
  const [profile, setProfile] = useState({});
  const [profilePoemsData, setProfilePoemsData] = useState({ results: [] });

  const { owner, following_id, display_name, image, about_me, created_at } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profile }, { data: profilePoemsData }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/poems/?owner__profile=${id}`)
        ]);
        setProfile(profile);
        setProfilePoemsData({ results: [profilePoemsData] });
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchData();
  }, [id]);

  const mainProfile = (
    <>
      <Avatar src={profile?.image} />
      <span>Member since {profile?.created_at}</span>
      <div>{profile?.display_name}</div>
      {profile?.poems_count}
      <span>poems</span>
      {profile?.followers_count}
      <span>followers</span>
      <div>{profile?.about_me}</div>
      { currentUser && !is_owner && 
        (profile?.following_id ? (
          <Button onClick={() => {}}>unfollow</Button>
        ) : (
          <Button onClick={() => {}}>follow</Button>
        )
      )}
   </>
  )

  const profilePoems = (
    <h3>Poems by this Writer</h3>

  )

  return (
    <>
      {mainProfile}
      {profilePoems}
    </>
  );
}

export default ProfilePage;