import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/poems/Home";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
