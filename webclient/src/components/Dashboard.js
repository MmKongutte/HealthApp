import React,{useState,useEffect} from 'react'
import axios from 'axios';
import CountAnal from './CountAnal';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Piecount from './Piecount';

function Dashboard() {
    const [analysis,setAnalysis]=useState({
        id:0,
        diabetesCount:0,
        preDiabetesCount:0 ,
        hypoximeaCount: 0,
        asthamaCount:0 ,
        bronchiCount:0,
        chdCount: 0,
        });
        const [userCount,setUserCount]=useState(0);
        const [riskCount,setRiskCount]=useState(0);
        const percentAtRisk=Math.floor((riskCount/userCount)*100);

        const data = [
            { name: "Diabetes", pv: analysis.diabetesCount },
            { name: "Prediabetes", pv: analysis.preDiabetesCount},
            { name: "Hypoxemia", pv: analysis.hypoximeaCount },
            { name: "Asthama", pv: analysis.asthamaCount},
            { name: "Bronchitis", pv: analysis.bronchiCount},
            { name: "CHD", pv: analysis.chdCount},
           
          ];
          const datap = [
            { name: "Diabetes", value: analysis.diabetesCount },
            { name: "Prediabetes", value: analysis.preDiabetesCount},
            { name: "Hypoxemia", value: analysis.hypoximeaCount },
            { name: "Asthama", value: analysis.asthamaCount},
            { name: "Bronchitis", value: analysis.bronchiCount},
            { name: "CHD", value: analysis.chdCount},
          
          ];
    
    useEffect(()=>{
        axios.post('http://192.168.43.157:4000/user/fetchAnalysis').then((res) => {
          setAnalysis(res.data.data);
         
        }).catch(err => console.log(err))  ;

        axios.post('http://192.168.43.157:4000/user/fetchRiskCount').then((res) => {
          setRiskCount(res.data);
         
        }).catch(err => console.log(err))  ;

        axios.post('http://192.168.43.157:4000/user/userAnalysis').then((res) => {
            setUserCount(res.data);
            console.log(res.data);
          }).catch(err => console.log(err))  ;
      },[]);
    return (
 <div >

<Col className="cardsbody" md={{ size: 16, offset:1}}>
    <Row>
      <Col sm="3" md={{ offset:0}}>
        <Card body className="dashCard text-center" >
        <Row >
         <Col>
          <CardText tag="h1"  className="nocontent">{userCount} </CardText>
          <CardTitle tag="h5" className="lbcontent">Employees</CardTitle>
         </Col>
        
          </Row>
        </Card>
      </Col>
      <Col sm="3" md={{ offset:1}}>
        <Card body className="dashCard text-center"  >
        <Row>
         <Col>
          <CardText tag="h1"  className="nocontent">{riskCount} </CardText>
          <CardTitle tag="h5" className="lbcontent">At Risk</CardTitle>
         </Col>
        
          </Row>
        </Card>
      </Col>
      <Col sm="3" md={{ offset:1}}>
        <Card body className="dashCard text-center"  >
        <Row>
         <Col>
          <CardText tag="h1"  className="nocontent">{percentAtRisk}<span>%</span> </CardText>
          <CardTitle tag="h5" className="lbcontent">% At Risk</CardTitle>
         </Col>
        
          </Row>
        </Card>
      </Col>
    </Row>
    </Col>

    <div className="analytics">
     <div className="horizantalbar">
      
       <CountAnal   data={data} xKey="name" yKey="pv"/>
       <center><p style={{color:"gray"}}>Disease Vs Number of employees at risk</p></center>
     </div>
     <div className="piebar">
      <Piecount data={datap}></Piecount>
     </div>

    </div>
            
        </div>
    )
}

export default Dashboard
