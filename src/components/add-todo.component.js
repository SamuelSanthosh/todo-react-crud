import React, { Component } from "react";
import TodoDataService from "../services/todo.service";

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      id: null,
      category: "",
      description: "",
      categoryError: "",
      descriptionError: "", 
      published: false,

      submitted: false
    };
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  validate(){
    let categoryError = "";
    let descriptionError = "";

    if(!this.state.category){
      categoryError = "category cannot be blank";
    }

    if(!this.state.description){
      descriptionError = "description cannot be blank";
    }

    if(categoryError || descriptionError){
      this.setState({categoryError, descriptionError});
      return false;
    }

    return true;

  };

  saveTodo() {
    const isValid = this.validate();
        if(isValid){
          console.log("todo success");
        }
    var data = {
      category: this.state.category,
      description: this.state.description
    };

    TodoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          category: response.data.category,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTodo() {
    this.setState({
      id: null,
      category: "",
      description: "",
      categoryError: "",
      descriptionError: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Todo submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newTodo}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  required
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  name="category"
                />
                {this.state.categoryError ? <div style={{fontSize: 14, color: "red"}}>
                  {this.state.categoryError}
                </div> : null }
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
                 {this.state.descriptionError ? <div style={{fontSize: 14, color: "red"}}>
                  {this.state.descriptionError}
                </div> : null }
              </div>
  
              <button onClick={this.saveTodo} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}