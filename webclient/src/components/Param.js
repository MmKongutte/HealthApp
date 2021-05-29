import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerFull,faHeartbeat,faTint,faDisease,faVial,faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import '../styles/Detail.css';

function Param(props) {

  function colorTemperature(tempra){
    if(tempra>=36 & tempra<=37.69){
      return(
        <span style={{color:"green"}}>{tempra}</span>
      )
    }else{
      return(
        <span style={{color:"red"}}>{tempra}</span>
      )
    }
  }
  function colorHeart(hrate){
    if(hrate<=100 & hrate>=60){
      return(
        <span style={{color:"green"}}>{hrate}</span>
      )
    }else{
      return(
        <span style={{color:"red"}}>{hrate}</span>
      )
    }
  }

  function colorbp(bpsys,bpdy){
    if((bpsys<=120 & bpsys>=90) | (bpdy<=80 & bpdy>=60)){
      return(
        <span style={{color:"green"}}>{bpsys}/{bpdy}</span>
      )
    }else{
      return(
        <span style={{color:"red"}}>{bpsys}/{bpdy}</span>
      )
    }
  }
  
  function colorglu(glu){
    if(glu<=140 & glu>=100){
      return(
        <span style={{color:"green"}}>{glu}</span>
      )
    }else{
      return(
        <span style={{color:"red"}}>{glu}</span>
      )
    }
  }
  function coloroxy(oxy){
    if(oxy<=100 & oxy>=95){
      return(
        <span style={{color:"green"}}>{oxy}</span>
      )
    }else{
      return(
        <span style={{color:"red"}}>{oxy}</span>
      )
    }
  }
  function colorchol(chol){
    if(chol<=200 & chol>=150){
      return(
        <span style={{color:"green"}}>{chol}</span>
      )
    }else{
      return(
        <span style={{color:"red"}}>{chol}</span>
      )
    }
  }
  return (
    <div className="body" >
        <br></br>
    <center>
    <Col md={{ size: 12}}>
    <Row >
      <Col sm="4">
        <Card body className="rowCard">
        <Row>
         <Col sm="1"><span><FontAwesomeIcon icon={faThermometerFull} size="4x" color="white" /></span></Col>
         <Col>
          <CardTitle tag="h5" className="content"> Body Temperature</CardTitle>
          <CardText tag="h2">{colorTemperature(props.hp.temprature)} <span style={{fontSize:"20px",color:"gray"}}>°C</span></CardText>
          </Col>
          </Row>
        </Card>
      </Col>
      <Col sm="4">
        <Card body className="rowCard" >
        <Row>
         <Col sm="2"><span><FontAwesomeIcon icon={faHeartbeat} size="4x" color="white" /></span></Col>
         <Col>
          <CardTitle tag="h5" className="content">Heart Rate</CardTitle>
          <CardText tag="h3"  className="content">{colorHeart(props.hp.heartRate)} <span style={{fontSize:"20px",color:"gray"}}>bpm</span></CardText>
          </Col>
          </Row>
        </Card>
      </Col>
      <Col sm="4">
        <Card body className="rowCard">
        <Row>
         <Col sm="2"><span><FontAwesomeIcon icon={faTint} size="4x" color="white" /></span></Col>
         <Col>
          <CardTitle tag="h5" className="content">Blood Pressure</CardTitle>
          <CardText tag="h2"  className="content">{colorbp(props.hp.sustolicbp,props.hp.diastolicbb)} <span style={{fontSize:"20px",color:"gray"}}>mmHg</span></CardText>
          </Col>c
          </Row>
        </Card>
      </Col>
      
    </Row>
    <br/>
    <Row>
    <Col sm="4">
        <Card body className="rowCard" >
        <Row>
         <Col sm="2"><span><FontAwesomeIcon icon={faDisease} size="4x" color="white" /></span></Col>
         <Col>
          <CardTitle tag="h5" className="content">Cholestrol</CardTitle>
          <CardText tag="h2"  className="content">{colorchol(props.hp.cholestrol)} <span style={{fontSize:"20px",color:"gray"}}>mg/dl</span></CardText>
          </Col>
          </Row>
        </Card>
      </Col>   
    <Col sm="4">
        <Card body className="rowCard" >
        <Row>
         <Col sm="2"><span><FontAwesomeIcon icon={faVial} size="4x" color="white" /></span></Col>
         <Col>
          <CardTitle tag="h5" className="content">Glucose</CardTitle>
          <CardText tag="h2"  className="content">{colorglu(props.hp.glucose)} <span style={{fontSize:"20px",color:"gray"}}>mmol/L</span></CardText>
          </Col>
          </Row>
        </Card>
      </Col>   
      <Col sm="4">
        <Card body className="rowCard" >
        <Row>
         <Col sm="1"><span><FontAwesomeIcon icon={faCircleNotch} size="4x" color="white" /></span></Col>
         <Col>
          <CardTitle tag="h5" className="content">Oxygen</CardTitle>
          <CardText tag="h2"  className="content">{coloroxy(props.hp.oxygen)} <span style={{fontSize:"20px",color:"gray"}}>%</span></CardText>
          </Col>
          </Row>
        </Card>
      </Col>   

    </Row>
    </Col>
    </center>
    </div>
  );
}

export default Param;
