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
  const currentUser = useCurrentUser();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: profiles } =
          await axiosReq.get(`/profiles/?${filter}`);
        const array = [profiles.results[0], profiles.results[1]];
        console.log(array);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: array },
        }));

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [filter]);

    return (
      <Container className={appStyles.Content}>
        <h2>Followed Profiles</h2>
        <Col>
          {hasLoaded ? (
            <>
              {pageProfile.results.length ? (
                <InfiniteScroll
                  children={pageProfile.results.map((profile) => (
                    <ProfilePartial key={profile.id} {...profile} />
                  ))}
                  dataLength={pageProfile.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!pageProfile.next}
                  next={() => fetchMoreData(pageProfile, setProfileData)}
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