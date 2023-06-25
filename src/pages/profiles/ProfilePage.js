import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Col, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css"
import btnStyles from "../../styles/Button.module.css";
import { useParams, useHistory } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Poem from "../poems/Poem";
import Asset from "../../components/Asset";
import { followHelper, unfollowHelper } from "../../utils/utils";


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const [profilesData, setProfilesData] = useState({ results: [] });
  const [profilePoemsData, setProfilePoemsData] = useState({ results: [] });
  const [profile, setProfile] = useState({ results: [] });
  const { owner, poems_count, following_id, display_name, image, about_me, created_at } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleFollow = async () => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: id,
      });
      setProfilesData((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
        followHelper(profile, id, data.id)
        })
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axiosRes.delete(`/followers/${following_id}/`);
      setProfilesData((prevProfiles) => ({
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          unfollowHelper(profile, following_id)
        })
      }));
      history.push(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profile }, { data: profilePoemsData }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/poems/?owner__profile=${id}`)
        ]);
        setProfile(profile);
        setProfilePoemsData({ results: [profilePoemsData]});
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
      <Card>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col sm={2}>
                <Avatar src={profile?.image} height="100" />
              </Col>
              <Col>
                <div className="align-items-end">
                  <span>{profile?.display_name}</span>
                  <p>Member since {profile?.created_at}</p>
                </div>
              </Col>
            </Row>
          </Card.Title>
            {profile?.poems_count}
            <span>poems</span>
            {profile?.followers_count}
            <span>followers</span>
            <div>{profile?.about_me}</div>
            { currentUser && !is_owner && 
              (profile?.following_id ? (
                <Button
                  onClick={handleUnfollow}
                  className={`${btnStyles.Button} ${btnStyles.Olive}`}
                >
                  unfollow
                </Button>
              ) : (
                <Button
                  onClick={handleFollow}
                  className={`${btnStyles.Button} ${btnStyles.Olive}`}
                >
                  follow
                </Button>
              ))}
        </Card.Body>
      </Card>
    </>
  )

  const profilePoems = (
    <>
      <div>Poems by this Writer</div>
      {profilePoemsData.results.length? (
        <InfiniteScroll
          children={profilePoemsData.results.map((poem) => (
            <Poem key={poem.id} {...poem} setPoems={setProfilePoemsData}/>
          ))}
          dataLength={profilePoemsData.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePoemsData.next}
          next={() => fetchMoreData(profilePoemsData, setProfilePoemsData)}
        />
      ) : (
        <p>No published poems yet</p>
      )}
    </>
  )

  return (
    <>
      {mainProfile}
      {profilePoems}
    </>
  );
}

export default ProfilePage;