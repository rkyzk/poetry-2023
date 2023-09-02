import styles from "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/poems/Home";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
