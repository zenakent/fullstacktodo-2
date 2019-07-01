import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { task: this.props.task, isEditing: false };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleEditor = this.handleEditor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleDelete() {
    this.props.deleteTodo(this.props.id);
  }

  handleComplete() {
    this.props.completeTodo(this.props.id);
  }

  handleEditTodo(evt) {
    evt.preventDefault();
    this.props.editTodo(this.props.id, this.state.task);
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleEditor() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    let {
      handleDelete,
      handleComplete,
      handleChange,
      handleEditor,
      handleEditTodo
    } = this;
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="Todo">
          <form onSubmit={handleEditTodo} className="Todo-edit-form">
            <input
              onChange={handleChange}
              name="task"
              value={this.state.task}
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="Todo">
          <li
            onClick={handleComplete}
            className={this.props.completed ? "completed" : " "}
          >
            {this.state.task}
          </li>
          <div className="Todo-buttons">
            <button onClick={handleEditor}>
              <i class="fas fa-pen" />
            </button>
            <button onClick={handleDelete}>
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
      );
    }
    return result;
  }
}

export default Todo;
