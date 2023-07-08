import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useFeaturedProfilesData } from "../../contexts/FeaturedProfilesDataContext";

const FeaturedProfiles = ({ mobile }) => {
  const featuredProfilesData = useFeaturedProfilesData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {featuredProfilesData.results.length ? (
        <>
          <p>Featured profiles</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {featuredProfilesData.results.map((profile) => (
                <Profile key={profile.id} {...profile} mobile />
              ))}
            </div>
          ) : (
            featuredProfilesData.results.map((profile) => (
              <Profile key={profile.id} {...profile} />
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