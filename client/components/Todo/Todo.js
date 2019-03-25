import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";

import "./Todo.css";

const dragSource = DragSource(
  "todo",
  {
    beginDrag(props) {
      return props;
    }
  },
  (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
  }
);

const dropTarget = DropTarget(
  "todo",
  {
    drop(dropProps, monitor) {
      const dragProps = monitor.getItem();
      if (dropProps.id !== dragProps.id) {
        dragProps.onDrop(dragProps.id, dropProps.id);
      }
    }
  },
  connect => {
    return {
      connectDropTarget: connect.dropTarget()
    };
  }
);

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  getItemStyles() {
    const { isDragging } = this.props;

    return {
      opacity: isDragging ? 0.4 : 1
    };
  }

  render() {
    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <article className="todo" onClick={this.props.selectTodo} style={this.getItemStyles()}>
          <h1>{this.props.title}</h1>
        </article>
      )
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  selectTodo: PropTypes.func.isRequired
};

export default dragSource(dropTarget(Todo));
