import React from "react";
import Image from "react-bootstrap/Image";
import mainPg from "../Images/mainPg.png";

const Signin = ({ signInGoogle }) => {
  return (

      <div className="wrapper container-fluid"> 
        <div className="row" style={{height:"585px"}}>
          <div className="col-6" >
            <div className="row">
              <Image src={mainPg} fluid/>
            </div>
            <div className="row">
              <button className="btn btn-primary btn-lg" style={{ marginLeft:"285px"}} onClick={signInGoogle}>Sign In</button>
            </div>
          </div>
          <div className="col-6" style={{backgroundColor:"Black"}}>
            <h1 className="text-center" style={{paddingTop:"292px",color:"White"}}>iDid</h1>
          </div>          
        </div>
      </div>
        
  );
};

export default Signin;
