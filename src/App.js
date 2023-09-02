import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/poems/Home";
import NavBar from "./components/NavBar";
import NavBarSecond from "./components/NavBarSecond";
import Container from "react-bootstrap/Container";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import PoemCreateForm from "./pages/poems/PoemCreateForm";

function App() {
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
        </Switch>
      </Container>
    </div>
  );
}

export default App;
