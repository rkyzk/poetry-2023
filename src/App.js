import styles  from "./App.module.css";
import NavBar from '../src/components/NavBar';
import NavBarSecond from '../src/components/NavBarSecond';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PoemCreateForm from "./pages/poems/PoemCreateForm";
import NewPoems from "./pages/poems_lists/NewPoems";
import PoemPage from "./pages/poems/PoemPage";


function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <NavBarSecond />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/contact" render={() => <h1>Contact</h1>} />
          <Route exact path="/poems/create" render={() => <PoemCreateForm />} />
          <Route exact path="/new-poems" render={() => <NewPoems />} />
          <Route exact path="/poems/:id" render={() => <PoemPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;