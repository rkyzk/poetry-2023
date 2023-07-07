import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Poem from "../poems/Poem";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";


function ProfilePage() {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileData, setProfileData] = useState({ results: [] });
  const [profilePoems, setProfilePoems] = useState({ results: [] });
  const currentUser = useCurrentUser();
  // const is_owner = currentUser?.username === profileData?.results[0].owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profile }, { data: profilePoems }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/poems/?owner__profile=${id}`),
          ]);
          setProfileData({ results: [profile] });
          setProfilePoems(profilePoems);
          setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

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
    <Container>
      <Profile {...profileData.results[0]} setProfiles={setProfileData} profilePage />
      {poems}
  </Container> 
  );
}

export default ProfilePage;