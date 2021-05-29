import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClipboardList,faSignOutAlt,faCrown } 
from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import Logo from '../images/smalllogo.png';
import { Link } from "react-router-dom";
import '../App.css';

const SideBar = () => (
  <div className="sidebar">
    
    <div className="side-menu" >
<Nav vertical style={{marginTop:"30px"}}className="list-unstyled pb-3">
     
      <center> <img style={{width:"160px"}}  src={Logo}/> </center> 
      <br/>
      <center> <h3 style={{color:"white"}}>LiveHealth</h3> </center>
        <NavItem>
        <NavLink tag={Link} to={"/"}  className="inactive"  >
           
            <FontAwesomeIcon icon={faCrown} className="mr-2" />
            Dashboard
          </NavLink>
        </NavItem>

    <NavItem>
         
          <NavLink tag={Link} to={"/AllUsers"}  className="inactive"  >
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
            UserBoard
          </NavLink>
    </NavItem>

    <NavItem>
          <NavLink tag={Link} to={"/LogOut"} className="inactive">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            LogOut
          </NavLink>
    </NavItem>

        
</Nav>
   
    </div>

</div>

);


export default SideBar;
