import React, { Component } from "react";
import queryString from "query-string";
import List from "./list";
import submitHandler from "../utils/helperFunctions";

class SetOptionsSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   items: [
      //     { id: "item1", content: "sample item 1" },
      //     { id: "item2", content: "sample item 2" }
      //   ],
      currentItemContent: "",
      error: "",
      grid: 6,
      uniqueKey: 0,
      label: "",
      placeholder: "",
      required: false,
      disabled: false,
      max: 0
    };
  }

  componentDidMount() {
    const urlInputs = queryString.parse(this.props.location.search);

    this.setParameters(urlInputs);
  }

  setParameters = urlInputs => {
    const label = urlInputs.label ? urlInputs.label : "default label";
    const placeholder = urlInputs.placeholder
      ? urlInputs.placeholder
      : "default placeholder";
    const max = urlInputs.max ? parseInt(urlInputs.max) : 5;

    const requiredString = urlInputs.required
      ? urlInputs.required.toLowerCase()
      : "false";
    const required = requiredString === "true" ? true : false;
    const disabledString = urlInputs.disabled
      ? urlInputs.disabled.toLowerCase()
      : "false";
    const disabled = disabledString === "true" ? true : false;

    this.setState({ label, placeholder, required, disabled, max });
  };

  render() {
    const { label, placeholder, required, disabled, max } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={submitHandler}>
          <List
            label={label}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            max={max}
          ></List>
        </form>
      </React.Fragment>
    );
  }
}

export default SetOptionsSample;
