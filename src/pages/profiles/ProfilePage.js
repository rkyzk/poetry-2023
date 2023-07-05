import React, { useEffect, useState } from "react";

import { Col, Row, Card } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import FeaturedProfiles from "./FeaturedProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Poem from "../poems/Poem";
import { fetchMoreData } from "../../utils/utils";

function ProfilePage() {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePoems, setProfilePoems] = useState({ results: [] });
  const [profileData, setProfileData] = useState({ results: [] });

  const currentUser = useCurrentUser();

  const { handleFollow, handleUnfollow } = useSetProfileData();
  const profile = profileData.results[0];

  const is_owner = currentUser?.username === profile?.owner;


  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePoems }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/poems/?owner__profile=${id}`),
          ]);
        setProfileData({ results: [pageProfile] });
        setProfilePoems(profilePoems);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
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
                {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
              </Col>
            </Row>
          </Card.Title>
            {profile?.poems_count}
            <span>poems</span>
            {profile?.followers_count}
            <span>followers</span>
            <div className="text-muted">About me:</div>
            <div>{profile?.about_me}</div>
            <div className="text-muted">My favorite poets/poems:</div>
            <div>{profile?.favorites}</div>
            { currentUser && !is_owner && 
              (profile?.following_id ? (
                <Button
                  onClick={() => handleUnfollow(profile)}
                  className={`${btnStyles.Button} ${btnStyles.Olive}`}
                >
                  unfollow
                </Button>
              ) : (
                <Button
                  onClick={() => handleFollow(profile)}
                  className={`${btnStyles.Button} ${btnStyles.Olive}`}
                >
                  follow
                </Button>
              ))}
        </Card.Body>
      </Card>
    </>
  )

  const poems = (
    <>
      <div>Poems by this Writer</div>
      {profilePoems.results.length? (
        <InfiniteScroll
          children={profilePoems.results.map((poem) => (
            <Poem
              key={poem.id}
              {...poem}
              setPoems={setProfilePoems}
            />
          ))}
          dataLength={profilePoems.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePoems.next}
          next={() => fetchMoreData(profilePoems, setProfilePoems)}
        />
      ) : (
        <p>No published poems yet</p>
      )}
    </>
  )

  return (
    <>
      {mainProfile}
      {poems}
    </>
  );
}

export default ProfilePage;