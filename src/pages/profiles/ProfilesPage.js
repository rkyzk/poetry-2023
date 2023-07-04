import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ProfilePartial from "./ProfilePartial";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function ProfilesPage({ filter = "" }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profiles, setProfiles] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { handleFollow, handleUnfollow } = useSetProfileData();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?${filter}`
        );
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchProfiles();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter]);

    return (
      <Container className={appStyles.Content}>
        <h2>Followed Profiles</h2>
        <Col>
          {hasLoaded ? (
            <>
              {profiles.results.length ? (
                <InfiniteScroll
                  children={profiles.results.map((profile) => (
                    <ProfilePartial key={profile.id} profile={profile} />
                  ))}
                  dataLength={profiles.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!profiles.next}
                  next={() => fetchMoreData(profiles, setProfiles)}
                />
              ) : (
                <p>You haven't followed any profiles.</p>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <p>spinner</p>
            </Container>
          )}
        </Col>
      </Container>
    );
}

export default ProfilesPage;