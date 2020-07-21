import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import StudentTableRow from "./studentTableRow";
import {UserConsumer} from "./userContext";

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      username: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://www.idid.today/students/"+ this.state.username)
      .then(res => {
        this.setState({
          tasks: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.tasks.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (

      
      <div className="table-wrapper">
        <UserConsumer>
        { username => {
          this.state.username = username;
        }}
      </UserConsumer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Date</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
