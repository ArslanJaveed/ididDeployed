import React from "react";
import Image from "react-bootstrap/Image";
import mainPg from "../Images/mainPg.png";
import "../Styles/client.css"

const Signin = ({ signInGoogle }) => {
  return (

      <div className="wrapper container-fluid "> 
        <div className="row " id="primaryRow" style={{}}>
          <div className="col-sm-12 col-md-6 col-lg-6" >
            <div className="row">
              <Image src={mainPg} fluid/>
            </div>
            <div className="row">
              <button className="btn btn-primary btn-lg" id="button" onClick={signInGoogle}>Sign In</button>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6" id="scndryCol" style={{}}>
            <h1 className="text-center" id="txt" style={{}}>iDid</h1>
          </div>          
        </div>
      </div>
        
  );
};

export default Signin;
