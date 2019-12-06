import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: "",
      error: ""
    };
  }

  handleChange = e => {
    let { value } = e.target;
    const currentItem = value;
    this.setState({ currentItem });
  };

  handleDelete = e => {
    const { listDisabled, listMax } = this.props;
    if (listDisabled === true) {
      return;
    }
    let { id } = e.target;
    const items = this.state.items;
    items.splice(id, 1);
    this.setState({ items });
    if (this.state.items.length < listMax) {
      this.clearMaxError();
    }
  };

  renderListData() {
    return this.state.items.map((item, index) => (
      <li key={index}>
        {item}
        <i
          id={index}
          className="fa fa-times float-right hover"
          onClick={this.handleDelete}
        ></i>
      </li>
    ));
  }

  handleKeyPress = event => {
    const { listDisabled, listMax } = this.props;
    if (event.key === "Enter") {
      if (listDisabled === true) {
        return;
      }
      if (this.state.items.length >= listMax) {
        this.setMaxError();
        return;
      }
      const items = [...this.state.items, this.state.currentItem];
      this.setState({ items, currentItem: "" });
    }
  };

  setMaxError = () => {
    const error = "List has reached max capacity";
    this.setState({ error });
  };

  clearMaxError = () => {
    const error = "";
    this.setState({ error });
  };

  render() {
    const {
      listLabel,
      listPlaceholder,
      listDisabled,
      listRequired
    } = this.props;
    const { error, items } = this.state;

    return (
      <React.Fragment>
        <h2>{listLabel}</h2>
        {listRequired && items.length === 0 && (
          <div className="alert alert-danger">List is empty</div>
        )}
        {listDisabled && (
          <div className="alert alert-danger">
            Disabled Mode: Adding and deleting prohibited
          </div>
        )}
        <input
          className="form-control"
          type="text"
          value={this.state.currentItem}
          onChange={this.handleChange}
          placeholder={listPlaceholder}
          onKeyPress={this.handleKeyPress}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <ul>{this.renderListData()}</ul>
      </React.Fragment>
    );
  }
}

export default List;
