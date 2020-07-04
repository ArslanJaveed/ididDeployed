import React, { Component } from "react";
import firebase from "firebase";
import {UserProvider} from "./components/userContext";
import { Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { auth, signInWithGoogle } from "./firebase/firebase";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import CreateStudent from "./components/create-student.component";
import EditStudent from "./components/edit-student.component";
import StudentList from "./components/student-list.component";
import Signin from "./components/sign-in";


const ProtectedRoute = ({ component, currentUser }) => {
  const Component = component;
  if (currentUser) {
    return <Component />;
  } else {
    return <Redirect to="/" />;
  }
};

class App extends Component {
  state = {
    isSignedIn: false,
    regEx: false,
    currentUser: null,
    navigate: false,
    userAttempt: false,
    username:""
  };

  handleSignin = async () => {
    await signInWithGoogle();
    this.setState({
      userAttempt: true,
    });
  };

  handleSignOut = () => {
    auth.signOut();
    console.log("signout clicked");
    this.setState({ currentUser: "", userAttempt: false, regEx: false }, () => {
      console.log(this.props.state);
    });

    this.props.history.push("/");
  };

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (!userAuth) return;
      let email = userAuth.email;
      let regex = RegExp("^([a-zd.-]+)@brandpa.([a-z]{2,8})(.[a-z]{2,8})?$");
      let finalRegEx = regex.test(email);

      //checking if the userAuth is null or not null(userAuth is signin or null)
      if (userAuth) {
        this.setState({ currentUser: userAuth, regEx: finalRegEx, username: userAuth.displayName });
        console.log("In user state check function", this.state.username);
        this.props.history.push("/create-student");
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    return (
      <div className="App">
        
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to="/create-student" className="nav-link" style={{color:"white"}}>
                  iDid
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">

                <Nav>
                  {this.state.currentUser && (
                    <Link to="/student-list" className="nav-link btn btn-info" style={{color:"White",marginRight:"10px"}}>
                    Task List
                  </Link>
                  )}
                  
                </Nav>

                {this.state.currentUser && (
                  <button className="btn btn-danger" onClick={this.handleSignOut}>Sign Out</button>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>

        {/* <Container fluid> */}
          
            <UserProvider value = {this.state.username}>
  
                {console.log(this.state.regEx)}
                {console.log(this.state.userAttempt)}

                {/* {!this.state.regEx && this.state.userAttempt && (
                  <p>only brandpa emails are authorized to use this app</p>
                )} */}
                <Switch>
                  
                  <Route path="/" exact>
                    <Signin signInGoogle={this.handleSignin} />
                  </Route>

                  <Route path="/create-student">
                    <ProtectedRoute
                      component={CreateStudent}
                      currentUser={this.state.currentUser}
                    />
                  </Route>

                  <Route path="/edit-student/:id">
                    <ProtectedRoute
                      component={EditStudent}
                      currentUser={this.state.currentUser}
                    />
                  </Route>
                  
                  <Route path="/student-list">
                    <ProtectedRoute
                      component={StudentList}
                      currentUser={this.state.currentUser}
                    />
                  </Route>

                </Switch>
              

              
            </UserProvider>
          
        {/* </Container> */}
      </div>
    );
  }
}

export default withRouter(App);
