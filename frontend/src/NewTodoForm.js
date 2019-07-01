import React, { Component } from "react";
import "./NewTodoForm.css";

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createTodo(this.state.task);
    this.setState({ task: "" });
  }

  render() {
    let { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit} className="NewTodoForm">
        <label htmlFor="task">New Todo</label>
        <input
          name="task"
          placeholder="Add new todo here"
          value={this.state.task}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default NewTodoForm;
