import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Poem from "./Poem";
import Asset from "../../components/Asset";

// import appStyles from "../../App.module.css";
// import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";


function PoemsPage({ filter="" }) {
  const [poems, setPoems] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const { data } = await axiosReq.get(`/poems/?${filter}`);
        setPoems(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchPoems();
  }, [filter, pathname]);

  return (
    <>
      {hasLoaded ? (
          <>
            {poems.results.length ? (
              <InfiniteScroll
                children={poems.results.map((poem) => (
                  <Poem key={poem.id} {...poem} setPoems={setPoems} />
                ))}
                dataLength={poems.results.length}
                loader={<Asset spinner />}
                hasMore={!!poems.next}
                next={() => fetchMoreData(poems, setPoems)}
              />
            ) : (
              <p>No results found.</p>
            )}
          </>
        ) : (
          <p>spinner</p>
        )}
    </>
  );
}

export default PoemsPage;