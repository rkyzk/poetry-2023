import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FeaturedProfiles from "../profiles/FeaturedProfiles";
import styles from "../../styles/Home.module.css";
import PoemsPage from "./PoemsPage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Return the content of "Home" page.
 */
function Home() {
  /** get the currentUser info. */
  const currentUser = useCurrentUser();

  /** The heading and the introduction. */
  const intro = (
    <>
      <h2 className="text-center">Welcome!</h2>
      <p className={styles.Intro}>
        Be part of our friendly and supportive community where you can share
        your poems, read others' poems and give and receive feedback. It doesn't
        matter if you haven't written since your high school years, or you've
        never written one before. Read some poems, get inspired and start
        writing!
      </p>
      {/* if not logged in, display invitation to sign up. */}
      {!currentUser && (
        <>
          <span className={`${styles.Intro} mt-0`}>
            Don't have an account yet?
          </span>
          <Link
            to="/signup"
            className={`${styles.NavLink} ${styles.Intro} ml-2`}
          >
            Sign up
          </Link>
          <span className={`${styles.Intro} ml-2`}>here.</span>
        </>
      )}
    </>
  );
  return (
    <Container>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          {/* display featured profiles at the top center for
            screen sizes md or smaller. */}
          <FeaturedProfiles mobile />
          {intro}
          <hr className="my-4" />
          {/* featured poems section */}
          <PoemsPage
            filter={`published=1&featured_flag=1&ordering=-created_at&`}
            heading="Featured Poems"
          />
        </Col>
        {/* featured profiles for large screen sizes */}
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <FeaturedProfiles />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
