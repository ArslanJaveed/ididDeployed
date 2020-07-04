import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      projectName: "",
      task: ""
    };
  }

  componentDidMount() {
    console.log(this.props.match);
    if(this.props.match && this.props.match.params.id){
      axios
      .get(
        "http://localhost:4000/students/edit-student/" +
          this.props.match.parameter.id
      )
      .then(res => {
        this.setState({
          projectName: res.data.projectName,
          task: res.data.task
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
    
  }

  onChangeProjectName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeTask(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const studentObject = {
      projectName: this.state.projectName,
      task: this.state.task
    };

    console.log(this.props.match);

    if(this.props.match && this.props.match.params.id){
      axios
      .put(
        "http://localhost:4000/students/update-student/" +
          this.props.match.params.id,
        studentObject
      )
      .then(res => {
        console.log(res.data);
        console.log("Student successfully updated");
      })
      .catch(error => {
        console.log(error);
      });

    // Redirect to Student List
    this.props.history.push("/student-list");
    }
    
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Idid</Form.Label>
            <Form.Control
              type="text"
              value={this.state.task}
              onChange={this.onChangeTask}
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>For</Form.Label>
            <Form.Control
              type="text"
              value={this.state.projectName}
              onChange={this.onChangeProjectName}
            />
          </Form.Group>

          <Button variant="success" size="lg" block="block" type="submit">
            Update Task
          </Button>
        </Form>
      </div>
    );
  }
}
