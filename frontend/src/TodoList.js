import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import * as apiCall from "./apiCall";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  async componentDidMount() {
    let todos = await apiCall.getTodos();
    this.setState({ todos });
  }

  async createTodo(val) {
    let newTodo = await apiCall.createTodo(val);
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  async deleteTodo(id) {
    await apiCall.deleteTodo(id);
    this.setState({
      todos: this.state.todos.filter(todo => todo._id !== id)
    });
  }

  async completeTodo(id) {
    let res = await apiCall.completeTodo(id);
    console.log(res);
    const completedTodo = this.state.todos.map(todo => {
      if (todo._id === res._id) {
        return { ...todo, completed: res.completed };
      }
      return todo;
    });
    this.setState({ todos: completedTodo });
  }

  async editTodo(id, updatedTask) {
    let res = await apiCall.editTodo(id, updatedTask);
    console.log(res);
    const editedTodo = this.state.todos.map(todo => {
      if (todo._id === res._id) {
        return { ...todo, todo: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: editedTodo });
  }

  render() {
    let { createTodo, deleteTodo, completeTodo, editTodo } = this;
    const todos = this.state.todos.map(todo => (
      <Todo
        task={todo.todo}
        completed={todo.completed}
        key={todo._id}
        id={todo._id}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        editTodo={editTodo}
      />
    ));
    return (
      <div className="TodoList">
        <h1>
          TODO LIST<span>A Simple React Todo List</span>
        </h1>
        <ul>{todos}</ul>
        <NewTodoForm createTodo={createTodo} />
      </div>
    );
  }
}

export default TodoList;
