import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { Link } from "react-router-dom";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.searchCategory = this.searchCategory.bind(this);

    this.state = {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      searchCategory: ""
    };
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  onChangeSearchCategory(e) {
    const searchCategory = e.target.value;

    this.setState({
      searchCategory: searchCategory
    });
  }

  retrieveTodos() {
    TodoDataService.getAll()
      .then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });
  }

  setActiveTodo(todo, index) {
    this.setState({
      currentTodo: todo,
      currentIndex: index
    });
  }

  removeAllTodos() {
    TodoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCategory() {
    TodoDataService.findByCategory(this.state.searchCategory)
      .then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchCategory, todos, currentTodo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by category"
              value={searchCategory}
              onChange={this.onChangeSearchCategory}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCategory}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Todos List</h4>

          <ul className="list-group">
            {todos &&
              todos.map((todo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTodo(todo, index)}
                  key={index}
                >
                  {todo.category}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTodos}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTodo ? (
            <div>
              <h4>Todo</h4>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentTodo.category}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTodo.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTodo.published ? "Completed" : "Pending"}
              </div>

              <Link
                to={"/todos/" + currentTodo.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Todo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}