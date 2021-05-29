import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  
} from "reactstrap";
// import { Link } from "react-router-dom";


function Topbar() {
  return (
      <div className="topbar">
        
    <Navbar
      color="light"
      light
      className="shadow-sm p-3 mb-5 bg-white mr-auto " style={{minHeight:"60px",minWidth:"100%"}} >

      <ul class="nav navbar-nav navbar-right flex-row justify-content-md-center justify-content-start flex-nowrap">
            <li class="nav-item" style={{marginLeft:"800px"}}> 
            <b style={{color:"#008cec"}}>Admin</b>
            </li>
            <li class="nav-item">
            <span><FontAwesomeIcon icon={faUserCircle} style={{color:"#008cec"}} size="lg" /></span>
             </li>
        </ul>




      </Navbar>  
      </div>
  )
}

export default Topbar

