import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/poems/Home";
import NavBar from "./components/NavBar";
import NavBarSecond from "./components/NavBarSecond";
import Container from "react-bootstrap/Container";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import PoemCreateForm from "./pages/poems/PoemCreateForm";
import PoemPage from "./pages/poems/PoemPage";
import PoemEditForm from "./pages/poems/PoemEditForm";
import PoemsPage from "./pages/poems/PoemsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfilesPage from "./pages/profiles/ProfilesPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;

  return (
    <div className={styles.App}>
      <NavBar />
      <NavBarSecond />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/poems/create" render={() => <PoemCreateForm />} />
          <Route exact path="/poems/:id" render={() => <PoemPage />} />
          <Route exact path="/poems/:id/edit" render={() => <PoemEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/my-poems"
            render={() => (
              <PoemsPage
                filter={`owner__profile=${profile_id}&ordering=-created_at&`}
                message="You haven't wrriten any poems yet."
                heading="My Poems"
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PoemsPage
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                heading="Poems I like"
                message="You haven't liked any poems yet."
              />
            )}
          />
          <Route
            exact
            path="/profiles/:id/following"
            render={() => (
              <ProfilesPage
                filter={`owner__followed__owner__profile=${profile_id}&ordering=-owner__following__created_at&`}
                message="You haven't followed anyone."
                page={"profilesPage"}
              />
            )}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
