
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import History from './components/History'
import AllUsers from './components/AllUsers'
import SideBar from "./components/Sidebar";
import Content from "./components/Content";

function App() {
  return (
  
      <Router>
      <div className="App wrapper">

      <div className="sidebar">
        <div className="fixed">
          <SideBar/>
          </div>
      </div>
     

      <div className="main-content">

        <Content/>
      
      </div>
        
      </div>
    </Router>
   
  );
}

export default App;
