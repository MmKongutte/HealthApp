import React,{useState,useEffect} from "react";
import styled from 'styled-components';
import Detail from './Detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Row,Col,Label,Input,Badge
} from 'reactstrap';
import axios from 'axios';

const Section= styled.div`
display:flex;
flex-direction:column;

`;


function AllUsers() {
  const[employeeName,setEmployeeName]=useState('');
  const [users,setUsers]=useState([]);

  const[cardClick,setCardClick]=useState(false);
  const [clickedIndex,setClickIndex]=useState(-1);
  console.log("data=",users[clickedIndex]);
  useEffect(()=>{
    axios.post('http://192.168.43.157:4000/user/fetchUsers').then((res) => {
      console.log(res.data.data)
      setUsers(users=>[...users,...res.data.data])
   
    }).catch(err => console.log(err))  ;
  },[]);
   
   function changeProp()
   {
  
     setCardClick(false);
   }

   function showStatus(stat){
     if(stat==0){
       return(<span><FontAwesomeIcon icon={faCircle} size="sm" color="green" /></span>)
     }
     if(stat==1){
       return(<span><FontAwesomeIcon icon={faCircle} size="sm" color="orange" /></span>)
     }
     if (stat==2){
      return(<span><FontAwesomeIcon icon={faCircle} size="sm" color="red" /></span>)
     }
   }
  return (
    

    <Section style={{color:"black"}}>

      {cardClick ? 
      <div>
    
      
       <Detail changePr={changeProp} currentUser={users[clickedIndex]}/></div>
      :<div>
       <div>
       <Row>
         <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
            <h2>Users Board</h2>
         </Col>
       </Row>
         <Row>
           <Col sm="1" md={{  offset: 3 }}> <Label className="text-muted">Employee's Name</Label></Col>
           <Col sm="4"><Input value={employeeName}  onChange={text => setEmployeeName (text.target.value)}></Input></Col>
           <Col> <Button color="info" onClick={()=>{ setEmployeeName('') }}
            outline>
            Reset
           <Badge color="secondary"></Badge>
      </Button></Col>
         </Row>
       </div>
 
        <div>
           {users.filter(user => user.name.includes(employeeName)).map((filteredUser,index) => 
         <Col  key={index} sm="12" md={{ size: 8, offset: 2}} style={{padding:'2px'}} >
         <Card onClick={()=>{
           setCardClick(true);
           console.log("index=",index);
           const ind= users.indexOf(filteredUser);
           setClickIndex(ind);
           setEmployeeName('');
           console.log("index of clicked card-",clickedIndex);
           }} >
         <CardBody>
           <Row>
           <Col sm="6">
              <CardTitle tag="h6">{filteredUser.name}</CardTitle>
           </Col>
          <Col sm="2" md={{ offset: 3 }}>
            
            {showStatus(filteredUser.healthStatus)}
          </Col>
           </Row>
           <Row>
           <Col sm="6">
           <CardSubtitle tag="h6"style={{color:"#81a9c4"}}className="mb-2">{filteredUser.email}</CardSubtitle>
           </Col>
           </Row>
         
         </CardBody>
       </Card></Col>)}
       </div>
       </div>
      }
     
    </Section>
  );
}

export default AllUsers;
