import React,{useState} from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default History = ()=> {
 
  const [startDate, setStartDate] = useState(new Date());
  const [employeeId,setEmployeeId]=useState('');
  const handleFinalSubmit = e => {
    console.log(startDate,employeeId);
  };
  return (
  <div>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
        <h2>Leaderboard</h2>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Form>
          
        <FormGroup>
        <Label> Date </Label>
        <DatePicker  selected={startDate}  onChange={date => setStartDate(date)} />
      
       </FormGroup>
          <FormGroup>
            <Label for="id"></Label>
            <Input value={employeeId}  onChange={text => setEmployeeId(text.target.value)}
            ></Input>
          </FormGroup>
          <Button onClick={handleFinalSubmit}>Submit</Button>
        </Form>
      </Col>
    </Row>
  </div> 
  );
};