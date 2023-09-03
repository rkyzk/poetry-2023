import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Alert from "react-bootstrap/Alert";

/**
 * Return the content of individual profile pages.
 * Get the data of the profile and the poems written by
 * the profile owner, and set them to variables and pass
 * them down to Profile and Poem component.
 */
function ProfilePage() {
  /** get the profile id from the URL */
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.pk === parseInt(id);
  const [hasLoaded, setHasLoaded] = useState(false);
  /** stores data of a profile */
  const [profileData, setProfileData] = useState({ results: [] });
  /** store data of poems written by the profile owner  */
  const [profilePoems, setProfilePoems] = useState({ results: [] });
  /** stores error messages. */
  const [errMsg, setErrMsg] = useState("");

  /** When the component is mounted, get the data of the profile and the poems,
      set them to variables. */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        setProfileData({ results: [profile] });
        setProfilePoems(profilePoems);
        setHasLoaded(true);
      } catch (err) {
        setErrMsg("There was an error.  Please try again later");
      }
    };
    handleMount();
  }, [id]);

  return (
    <Col md={{ span: 8, offset: 2 }}>
      {is_owner && <h2 className="text-center">My Profile</h2>}
      {errMsg ? (
        <Alert key={errMsg} variant="warning" className="mt-3">
          {errMsg}
        </Alert>
      ) : (
        <>
          <Profile
            {...profileData.results[0]}
            page={"profilePage"}
            setProfiles={setProfileData}
          />
          "list of poems"
        </>
      )}
    </Col>
  );
}

export default ProfilePage;
