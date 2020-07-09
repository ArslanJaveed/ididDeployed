import React, { Component } from "react";
import axios from "axios";


export default class StudentTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  deleteStudent() {
    axios
      .delete(
        "http://ec2-18-224-109-233.us-east-2.compute.amazonaws.com:8080/students/delete-student/" + this.props.obj._id
      )
      .then(res => {
        console.log("Task successfully deleted!");
      })
      .catch(error => {
        console.log(error);
      });

      
  }

  render() {
    console.log("i am here",this.props.obj.task[0].details);
    return (

      <React.Fragment>
        {this.props.obj.task.map(tasks=>(
          <tr>
            <td>{this.props.obj.employeeName}</td>
            <td>{tasks.details}</td>
            <td>{this.props.obj.created}</td>
          </tr>
          ))}

          {/* <Link className="edit-link btn btn-sm btn-success m-2"to={"/edit-student/" + this.props.obj._id}>Edit</Link>
          <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button> */}
      </React.Fragment>
        
        
       
          
        
      
    );
  }
}
