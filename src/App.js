import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SetOptionsSample from "./components/setOptionsSample";
import Samples from "./components/samples";
import NavBar from "./components/navbar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route path="/samples" component={Samples} />
        <Route path="/" component={SetOptionsSample} />
      </Switch>
    </div>
  );
}

export default App;
