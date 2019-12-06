import React from "react";
import logo from "./logo.svg";
import List from "./components/list";
import "./App.css";

function App() {
  const label = "List Demo";
  const placeholder = "Enter new list item";
  const required = true;
  const disabled = false;
  const max = 5;
  return (
    <List
      listLabel={label}
      listPlaceholder={placeholder}
      listRequired={required}
      listDisabled={disabled}
      listMax={max}
    ></List>
  );
}

export default App;
