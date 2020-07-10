import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import {UserConsumer} from "./userContext";
import mainPg from "../Images/mainPg.png";
import axios from "axios";
import "../Styles/client.css"

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeCheckType = this.onChangeCheckType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      
      task:[{projectName:"",details:""}],
      employeeName:"",
      checkIn: false,
      checkOut: false,
      date:"",
      chckInTime:"",
      chckOutTime:"",
    };
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let task = [...this.state.task];
    task[i] = {...task[i], [name]: value};
    this.setState({ task });
 }

 removeClick(i){
  let task = [...this.state.task];
  task.splice(i, 1);
  this.setState({ task });
}

  createUI() {

    if(this.state.checkIn){
      return this.state.task.map((el, i) => (
        <div key={i}>

          <div className="form-row">
            <div className="form-group form-inline">
              <label>I will do</label>
              <input type="text" className="form-control" style={{borderTop:"0px",borderLeft:"0px",borderRight:"0px"}} 
              placeholder="Your Task" name="details" value={el.details ||''} 
              onChange={this.handleChange.bind(this, i)} required/>
            </div>
            <div className="form-group form-inline">
              <label>for</label>
              <input type="text" className="form-control" style={{borderTop:"0px",borderLeft:"0px",borderRight:"0px"}} 
              placeholder="Project Name" name="projectName" value={el.projectName ||''} 
              onChange={this.handleChange.bind(this, i)} required/>
              <FontAwesomeIcon icon={faPlusCircle} pull="right" id="icon" onClick={this.addClick.bind(this)}/>
              <FontAwesomeIcon icon={faMinusCircle} pull="right" id="icon" onClick={this.removeClick.bind(this, i)}/>
            </div>
          </div>
        </div>          
      ))
    }
    if(this.state.checkOut) {
      return this.state.task.map((el, i) => (
        <div key={i}>
          <div className="form-row">
            <div className="form-group form-inline">
              <label>I did </label>
              <input type="text" className="form-control" style={{borderTop:"0px",borderLeft:"0px",borderRight:"0px"}} 
              placeholder="Your Task" name="details" value={el.details ||''} 
              onChange={this.handleChange.bind(this, i)} required/>
            </div>
            <div className="form-group form-inline">
              <label>for </label>
              <input type="text" className="form-control" style={{borderTop:"0px",borderLeft:"0px",borderRight:"0px"}} 
              placeholder="Project Name" name="projectName" value={el.projectName ||''} 
              onChange={this.handleChange.bind(this, i)} required/>
              <FontAwesomeIcon icon={faPlusCircle} pull="right" onClick={this.addClick.bind(this)}/>
              <FontAwesomeIcon icon={faMinusCircle} pull="right" onClick={this.removeClick.bind(this, i)}/>
            </div>
          </div>
          {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
        </div>          
      ))
    } else {
      return 
    }

    
  }

  onChangeCheckType(e) {
    if(e.target.value === "Check In") {
      var currentDate = new Date().toLocaleDateString();
      var currentTime = new Date().toLocaleTimeString();
      this.setState({checkIn: true, date: currentDate, chckInTime: currentTime});
    } 
    
    if(e.target.value === "Check Out") {
      currentDate = new Date().toLocaleDateString();
      currentTime = new Date().toLocaleTimeString();
      this.setState({checkOut:true, checkIn:false, date: currentDate, chckOutTime: currentTime});
    }
    
    if(e.target.value === "Choose") {
      this.setState({checkOut:false, checkIn:false});
    }
  }

  addClick(){
    this.setState(prevState => ({ 
    	task: [...prevState.task, { projectName: "", details: "" }]
    }))
  }

  onSubmit(e) {
    e.preventDefault();

    const studentObject = {
      task: this.state.task,
      employeeName: this.state.employeeName,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      created: this.state.date,
      checkInTime: this.state.chckInTime,
      checkOutTime: this.state.checkOutTime,

      
    };
    axios
      .post("http://ec2-18-224-109-233.us-east-2.compute.amazonaws.com:8080/students/create-student", studentObject)
      .then(res => console.log(res.data));

    console.log(studentObject);

    this.setState({ 
      task:[{
        projectName:"",
        details:"",
      }]
    });

    return <Alert variant="success">Task Submitted</Alert>
  }

  render() {
    return (
      <div className="container-fluid">

        
            <div className="row" style={{height:"585px"}}>
                <div className="col-sm-12 col-md-6 col-lg-6" >
                  <Image src={mainPg} fluid />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6" >
                    {/* <div className="row" style={{paddingTop:"100px"}}> */}
                      <UserConsumer>
                        { username => {
                        this.state.employeeName = username;
                        return <div><h1 style={{paddingTop:"100px"}}>Welcome {username}!</h1></div>
                      }}
                      </UserConsumer>
                    {/* </div> */}
                    {/* <div className="row" style={{paddingTop:"50px"}}> */}
                      <div>

                      
                      <form style={{paddingTop:"50px"}}>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Choose Check In or Check Out</label>
                            <select controlId="checkType" className="form-control" onChange={this.onChangeCheckType}>
                              <option selected>Choose</option>
                              <option>Check In</option>
                              <option>Check Out</option>
                            </select>
                          </div>
                        </div>
                        {this.createUI()}
                        <div className="form-row">
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                          </div>
                        </div>
                      </form>
                      </div>

                    {/* </div> */}
                  </div>
              </div>
     
      
      </div>
    );
  }
}
