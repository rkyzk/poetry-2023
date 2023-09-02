import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";

/**
 * Get data of poems and return the list of poems.
 */
function PoemsPage({ filter, message = "No results found", heading }) {
  /** stores poems data */
  const [poems, setPoems] = useState({ results: [] });
  /** hasLoaded will be set true when the data loads. */
  const [hasLoaded, setHasLoaded] = useState(false);
  /** stores error message */
  const [errMsg, setErrMsg] = useState("");
  /** get current user info */
  const currentUser = useCurrentUser();

  /**
   * Get data of poems
   */
  useEffect(() => {
    const fetchPoems = async () => {
      try {
        // get data of poems with the filter
        const { data } = await axiosReq.get(`/poems/?${filter}`);
        setPoems(data);
        setHasLoaded(true);
      } catch (err) {
        setErrMsg("The data couldn't be retrieved. Please try again.");
      }
    };
    // at the beginning make sure hasLoaded is set to false.
    setHasLoaded(false);
    fetchPoems();
  }, [filter, currentUser]);

  return (
    <Col>
      <h2 className="my-2 px-2 text-center">{heading}</h2>
      {/* If there's an error message, display it. */}
      {errMsg ? (
        <Alert variant="warning" className="mt-3 text-center">
          {errMsg}
        </Alert>
      ) : hasLoaded ? (
        <>
          {/* If there's no error message, and the data has loaded,
            display the data. */}
          {poems.results.length ? (
            <p>poems</p>
          ) : (
            <>
              {/* If there's no poem that matches the filter,
                    display message (no results found, etc). */}
              <p className="text-center">{message}</p>
            </>
          )}
        </>
      ) : (
        <Asset />
      )}
    </Col>
  );
}

export default PoemsPage;
