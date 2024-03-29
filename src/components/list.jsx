import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: "item1", content: "sample item 1" },
        { id: "item2", content: "sample item 2" }
      ],
      currentItemContent: "",
      error: "",
      grid: 6,
      uniqueKey: 0
    };
  }

  handleChange = e => {
    let { value } = e.target;
    const currentItemContent = value;
    this.setState({ currentItemContent });
  };

  handleDelete = e => {
    const { disabled, max } = this.props;
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
    const { disabled, max } = this.props;
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

  setMaxError = () => {
    const error = "List has reached max capacity";
    this.setState({ error });
  };

  clearMaxError = () => {
    const error = "";
    this.setState({ error });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: this.state.grid,
    margin: `0 0 ${this.state.grid}px 0`,

    background: "lightgrey",

    ...draggableStyle
  });

  getListStyle = isDraggingOver => ({
    background: "white",
    padding: this.state.grid
  });

  onDragEnd = result => {
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

  render() {
    const { label, placeholder, disabled, required } = this.props;
    const { items, error } = this.state;
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
