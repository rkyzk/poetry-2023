import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import FeaturedProfiles from "./FeaturedProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Poem from "../poems/Poem";
import { fetchMoreData } from "../../utils/utils";
import Avatar from "../../components/Avatar";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePoems, setProfilePoems] = useState({ results: [] });
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const following_id = profile?.following_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePoems }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/poems/?owner__profile=${id}`),
          ]);

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePoems(profilePoems);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

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
              (following_id ? (
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
  );

  const mainProfilePoems = (
    <>
      <hr />
      <p className="text-center">Poems by {profile?.display_name}</p>
      <hr />
      {profilePoems.results.length ? (
        <InfiniteScroll
          children={profilePoems.results.map((poem) => (
            <Poem key={poem.id} {...poem} setPosts={setProfilePoems} />
          ))}
          dataLength={profilePoems.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePoems.next}
          next={() => fetchMoreData(profilePoems, setProfilePoems)}
        />
      ) : (
        <p>No poems found</p>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <FeaturedProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePoems}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <FeaturedProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;