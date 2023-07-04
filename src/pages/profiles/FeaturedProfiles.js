import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import ProfilePartial from "./ProfilePartial";
import { useProfileData } from "../../contexts/ProfileDataContext";

const FeaturedProfiles = ({ mobile }) => {
  const { featuredProfiles } = useProfileData();

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
              {featuredProfiles.results.map((profile) => (
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