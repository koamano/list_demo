import React from "react";
import logo from "./logo.svg";
import List from "./components/list";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route
          path="/:label?/:placeholder?/:requiredString?/:disabledString?/:max?"
          component={List}
        ></Route>
        <Route path="/" component={List} />
      </Switch>
    </div>
  );
}

export default App;
