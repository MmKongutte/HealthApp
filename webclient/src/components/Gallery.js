import React,{useState,useEffect} from "react";
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from "reactstrap"
import '../styles/Detail.css';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,Media,
    CardTitle, CardSubtitle, Button,Row,Col,Label,Input
  } from 'reactstrap';
import Moment from 'react-moment';

function Gallery(props) {
const [images,setImages]=useState([]);
const [clickedImage,setClickImage]=useState({});
const [modalIsOpen,setIsOpen] = React.useState(false);
const [dropDownOpen, setDropDown]= React.useState(false);
const [selectedVal,setSelectedVal]= React.useState('');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '90%',
    width                 : '60%'
  }
};
//console.log(selectedVal);
useEffect(()=>{
        axios.post('http://192.168.43.157:4000/user/uploadHistory', {
          'uploadsId': props.uid,
        }).then((res) => {
            console.log("in gallery",res.data.data);
            setImages(images=>[...images,...res.data.data]);

        }).catch(err => console.log(err))  ;
      },[]);
      function openModal() {
        setIsOpen(true);
      }
      function closeModal(){
        setIsOpen(false);
      }
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
       
      }
    function  toggle () {
         setDropDown(!dropDownOpen);
      }
     function handleChange  (code) {
        setSelectedVal(code);   
       }
  return (
    <div className="galleryBody">
    <span style={{marginLeft:"25px",color:"blue"}} onClick={()=>{props.changepr()}}><FontAwesomeIcon icon={faArrowLeft} size="2x"  /> </span>
    <center>
    <ButtonDropdown >
        <Dropdown isOpen={dropDownOpen} toggle={toggle} >
            <DropdownToggle color="primary" caret className="dropdown-toggle  tog togtext">
               Search Reports by Type
            </DropdownToggle>
            <DropdownMenu className="currency-dropdown tog">
                    <DropdownItem onClick={() => handleChange("Radiology reports")}>Radiology reports</DropdownItem>
                    <DropdownItem onClick={() => handleChange("Laboratory reports")} >Laboratory reports</DropdownItem>
                    <DropdownItem onClick={() => handleChange("Pathology reports")}>Pathology reports</DropdownItem>
                   
                    <DropdownItem onClick={() => handleChange("")} style={{color:"#0072f5",fontWeight:"bold"}}> Show All</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonDropdown>
        </center>
   
    <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
       
       <Col md={{offset:"11"}}>
       <span style={{marginLeft:"25px"}}  onClick={closeModal} ><FontAwesomeIcon icon={faTimes} size="2x" /> </span>
       </Col>
       <Row>
         <Col sm="7"><CardImg src={clickedImage.url} /></Col>
         <Col>
           <Row>
             <Col>
             <Label className="text-muted">Uploaded on :</Label>
             <Moment format="YYYY/MM/DD">
                {clickedImage.date}
            </Moment>
              
             </Col>
            
           </Row>
           <Row>
            <Col>
               <Label className="text-muted"> Report Type :</Label>
               <b>{clickedImage.reportType}</b>
             </Col>
            
           </Row>
           <Row>
             <Col>
             <Label className="text-muted">Comments :</Label>
             <p>{clickedImage.description}</p>
             </Col>
            </Row>
           
         
         </Col>
       </Row>
          
         
        </Modal>
    <Col md={{offset:"1",size:"10"}} >
    <Row>
    {images.filter(curimage => curimage.reportType. includes(selectedVal)).map((image,index) =>
   
    <Col sm="3" key={index} style={{marginTop:"20px"}}>
      <Card style={{backgroundColor:"white"}} onClick={()=>{openModal(); setClickImage(image);}}>
       <CardImg src={image.url} />
       <CardText>{image.reportType}</CardText>
       </Card>
    </Col>
   
     )}
     </Row>
     </Col>
    </div>
  );
}

export default Gallery;
