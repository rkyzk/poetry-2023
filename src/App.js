import styles  from "./App.module.css";
import NavBar from '../src/components/NavBar';
import NavBarSecond from '../src/components/NavBarSecond';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PoemCreateForm from "./pages/poems/PoemCreateForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PoemsPage from "./pages/poems/PoemsPage";
import PoemPage from "./pages/poems/PoemPage";
import PoemEditForm from "./pages/poems/PoemEditForm";
import ProfilesPage from "./pages/profiles/ProfilesPage";
import ProfilePage from "./pages/profiles/ProfilePage";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <NavBarSecond />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/contact" render={() => <h1>Contact</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/my-poems"
            render={() => <PoemsPage 
                            filter={`owner__profile=${profile_id}&ordering=-likes__created_at&`} />}
          />
          <Route
            exact
            path="/liked"
            render={() => <PoemsPage
                            filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />
          <Route
            exact
            path="/profiles/:id/following"
            render={() => (
              <ProfilesPage
                filter={`owner__following__followed__profile=${profile_id}&ordering=-owner__following__created_at&`}
              />
            )}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/poems/create" render={() => <PoemCreateForm />} />
          <Route exact path="/poems/:id/edit" render={() => <PoemEditForm />} />
          <Route exact path="/poems/:id" render={() => <PoemPage />} />       
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;