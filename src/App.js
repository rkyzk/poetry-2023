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
import NewPoems from "./pages/poems_lists/NewPoems";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import Home from "./pages/poems_lists/Home";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <NavBarSecond />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/contact" render={() => <h1>Contact</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/my-poems"
            render={() => <PoemsPage 
                            filter={`owner__profile=${profile_id}&ordering=-created_at&`} />} />
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
                filter={`owner__followed__owner__profile=${profile_id}&ordering=-owner__following__created_at&`}
              />)}
            />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/poems/create" render={() => <PoemCreateForm />} />
          <Route exact path="/poems/:id/edit" render={() => <PoemEditForm />} />
          <Route exact path="/poems/:id" render={() => <PoemPage />} />
          <Route
            exact path="/new-poems"
            render={() => <NewPoems filter={`status=1&ordering=-created_at&`} />} />
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
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />   
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;