import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        // { id: "item1", content: "item one content" },
        // { id: "item2", content: "item two content" }
      ],
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
    this.setParameters();
  }

  setParameters = () => {
    let {
      label,
      placeholder,
      requiredString,
      disabledString,
      max
    } = this.props.match.params;

    label = label ? label : "default label";
    placeholder = placeholder ? placeholder : "default placeholder";
    max = max ? parseInt(max) : 5;

    requiredString = requiredString ? requiredString.toLowerCase() : "false";
    const required = requiredString === "true" ? true : false;
    disabledString = disabledString ? disabledString.toLowerCase() : "false";
    const disabled = disabledString === "true" ? true : false;

    this.setState({ label, placeholder, required, disabled, max });
  };

  handleChange = e => {
    let { value } = e.target;
    const currentItemContent = value;
    this.setState({ currentItemContent });
  };

  handleDelete = e => {
    const { disabled, max } = this.state;
    if (disabled === true) {
      return;
    }
    let { id } = e.target;
    const items = this.state.items;
    items.splice(id, 1);
    this.setState({ items });
    if (this.state.items.length < max) {
      this.clearMaxError();
    }
  };

  handleKeyPress = e => {
    const { disabled, max } = this.state;
    if (e.key === "Enter") {
      if (disabled === true) {
        return;
      }
      if (this.state.items.length >= max) {
        this.setMaxError();
        return;
      }

      const currentItem = {
        id: `${this.state.uniqueKey}`,
        content: this.state.currentItemContent
      };
      const items = [...this.state.items, currentItem];
      const uniqueKey = this.state.uniqueKey + 1;
      this.setState({ items, currentItemContent: "", uniqueKey });
    }
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: this.state.grid,
    margin: `0 0 ${this.state.grid}px 0`,

    // change background colour if dragging
    //background: isDragging ? "white" : "white",
    background: "lightgrey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? "lightblue" : "lightgrey",
    background: "white",
    padding: this.state.grid
    //width: 500
  });

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  renderListData() {
    // return this.state.items.map((item, index) => (
    //   <li key={index}>
    //     {item}
    //     <i
    //       id={index}
    //       className="fa fa-times float-right hover"
    //       onClick={this.handleDelete}
    //     ></i>
    //   </li>
    // ));

    return this.state.items.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={this.getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {item.content}
            <i
              id={index}
              className="fa fa-times float-right hover"
              onClick={this.handleDelete}
            ></i>
          </div>
        )}
      </Draggable>
    ));
  }

  setMaxError = () => {
    const error = "List has reached max capacity";
    this.setState({ error });
  };

  clearMaxError = () => {
    const error = "";
    this.setState({ error });
  };

  render() {
    const { label, placeholder, disabled, required, error, items } = this.state;
    return (
      <React.Fragment>
        <div>
          <h4>{label}</h4>
          {required && items.length === 0 && (
            <div className="alert alert-danger">List is empty</div>
          )}
          {disabled && (
            <div className="alert alert-danger">
              Disabled Mode: Adding and deleting prohibited
            </div>
          )}
          <input
            className="form-control"
            type="text"
            value={this.state.currentItemContent}
            onChange={this.handleChange}
            placeholder={placeholder}
            onKeyPress={this.handleKeyPress}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={this.getListStyle(snapshot.isDraggingOver)}
                >
                  <ul>{this.renderListData()}</ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </React.Fragment>
    );
  }
}

export default List;
