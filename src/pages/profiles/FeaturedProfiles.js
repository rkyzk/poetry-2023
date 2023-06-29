import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ProfilePartial from "./ProfilePartial";

const FeaturedProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    featuredProfiles: { results: [] },
  });
  const { featuredProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?featured_flag=1"
        );
        setProfileData((prevState) => ({
          ...prevState,
          featuredProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {featuredProfiles.results.length ? (
        <>
          <p>Featured profiles</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {featuredProfiles.results.slice(0, 4).map((profile) => (
                <ProfilePartial key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            featuredProfiles.results.map((profile) => (
              <ProfilePartial key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default FeaturedProfiles;