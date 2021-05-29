import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Gallery from "./Gallery";

import axios from 'axios';
import '../styles/Detail.css';
import Param from './Param';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col,Label,Badge
  } from 'reactstrap';
  
function Detail(props) {
  let positive=[];
  let negative=[];
  const[btnClick,setBtnClick]=useState(false);
  const [predictions,setPredictions]=useState({
  temprature: 0,
  glucose: 0,
  heartRate: 0,
  oxygen: 0,
  cholestrol: 0,
  sustolicbp: 0,
  diastolicbb: 0,
  isDiabetes: false,
  isPreDiabetes: false,
  isBronchiectasis: false,
  isChd: false,
  isHypoxemia:false,
  isAsthma: false,
  _id: 0,
  date: 0
  });

  console.log("check",props.currentUser.predictionId);
  
  useEffect(()=>{
    axios.post('http://192.168.43.157:4000/user/healthHistory', {
      'predictionId': props.currentUser.predictionId,
    }).then((res) => {
      setPredictions(res.data);
      console.log("datacheck",res.data);
    }).catch(err => console.log(err))  ;
  },[]);

  if(predictions.isDiabetes){positive.push("Diabetes")}else{negative.push("Diabetes")}
  if(predictions.isPreDiabetes){positive.push("Pre Diabetes")}else{negative.push("Pre Diabetes")}
  if(predictions.isBronchiectasis){positive.push("Bronchiectasis")}else{negative.push("Bronchiectasis")}
  if(predictions.isChd){positive.push("CHD")}else{negative.push("CHD")}
  if(predictions.isHypoxemia){positive.push("Hypoxemia")}else{negative.push("Hypoxemia")}
  if(predictions.isAsthma){positive.push("Asthma")}else{negative.push("Asthma")}
  var d=new Date();
  var currentyear=d.getFullYear();
  function changeProp()
   {
     setBtnClick(false);
   }


  return (
    <div className="body">
        {btnClick ?
        <div>
        
        <Gallery changepr={changeProp} uid={props.currentUser.uploadsId}></Gallery> 
        </div>
        :
    <div>    
  <Col sm="12" md={{ size: 12}} style={{padding:'2px'}}>
    <Card >
       <CardBody>
        
       <CardTitle  tag="h4"><Row>
         <Col md="1" > <span style={{marginLeft:"25px"}} onClick={()=>{props.changePr()}}><FontAwesomeIcon icon={faArrowLeft} size="sm" /> </span></Col>
         <Col md="6">{props.currentUser.name}</Col>
         <Col md="2" md={{ offset: 3 }}>
           <Button color="info" onClick={()=>{ setBtnClick(true); }}
            outline>
            Reports
           <Badge color="secondary"></Badge>
      </Button></Col>
         
         </Row></CardTitle>
          <br/>
          <CardSubtitle tag="h6" >
            <Row>
          <Col sm="4">
             <Label className="label">Contact Number:</Label>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
             <b className="b">{props.currentUser.phone}</b>
          </Col>
          <Col  sm="4">
             <Label className="label">Email:</Label>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
             <b className="b">{props.currentUser.email}</b>
          </Col>
           </Row>
           
       <Row>
          <Col sm="4">
          <Label className="label" >Age:</Label>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <b className="b">{currentyear-props.currentUser.yob}</b>
          </Col>
          <Col sm="4">
          <Label className="label">BMI:</Label>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <b className="b">{props.currentUser.bmi}</b>
        </Col>
        <Col sm="4">
          <Label className="label">Gender:</Label>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <b className="b">{props.currentUser.gender}</b>
        </Col>
        </Row>
          </CardSubtitle>
          
        
        </CardBody>
      </Card>
      </Col>
      <Param hp={predictions}></Param>
      <br/>
      <div>
      
      <Col sm="12" md={{ size: 8, offset: 1}}>
      <Row><h3>At Risk :</h3></Row>
      <Row> {positive.map((disease,index) => 
        <Col sm="4"  key={index} style={{paddingTop:"8px"}}>
          <Badge style={{fontSize:"23px"}} tag="h2" color="danger" pill>{disease}</Badge>
        </Col>
      )}</Row>
      </Col>
  <br/>
      <Col sm="10" md={{ size: 8, offset: 1}}>
      <Row><h3>No Risk :</h3></Row>
      <Row>
      {negative.map((disease,index) =>
        <Col sm="4"  key={index}  style={{paddingTop:"8px"}}>
          <Badge style={{fontSize:"23px"}} color="success" pill>{disease}</Badge>
        </Col>
     )} </Row>
      </Col>
      </div>
     
      </div>
      }
    </div>
      
  );
}

export default Detail;
