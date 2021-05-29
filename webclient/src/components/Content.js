import React from "react";
// import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";

import AllUsers from "./AllUsers";

const Content = () => (
 <div>
  
  <Container
    fluid
     className="content">
       <Topbar/>
      
       
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/AllUsers" component={AllUsers} />
      <Route exact path="/LogOut" component={() => "Logout"} />
      
      
    </Switch>
    
  </Container>
  
</div>
);

export default Content;
