import React,{useContext,useState,useEffect} from "react";
import { View,StyleSheet,ScrollView } from "react-native";
import { Card, Button, Text,ListItem} from "react-native-elements";
import  { AuthContext } from '../../App';
import io from "socket.io-client";
import axios from 'axios';
import Spacer from '../Spacer';
let socket;

export default (props) => {
  const { signOut } = React.useContext(AuthContext);
  const [report,setReport]=
  useState({
        isDiabetes : false,
        isPreDiabetes:false,
        isBronchiectasis:false,
        isChd:false,
        isHypoxemia :false,
        isAsthma:false
   
  });
  console.log("in reports welcome", props.myid);
    const ENDPOINT = 'http://192.168.43.157:4000/';
    useEffect(() => {
   
      socket = io.connect(ENDPOINT);
     
      socket.on("broadcast", (message) => {
        console.log("socket connect")
        console.log(message);

        axios.post('http://192.168.43.157:4000/user/fetchReports', {
          'id':  props.myid,
         })
        .then((res) => {
             console.log("data fetched successfully in report");
             setReport(res.data);
             
        }).catch((error) => {
          console.log("failed to fetch updated data",error);
        });
     
      });
   })


  return(
    <ScrollView>
      <View style={styles.container}>
    <Card title="John Doe">
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
      </View>
      <Button onPress={() => signOut()}
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        
      />
      </Card>
    
    <Card>
   <Text h4 >Todays Analysis</Text>
         <Spacer/>
       
       <View style={styles.bound} >
       <ListItem  bottomDivider>
         <ListItem.Content style={styles.rows}>
          <ListItem.Title>Diabetes</ListItem.Title>
          <ListItem.Subtitle>
          {report.isDiabetes ? <Text style={{color:"red"}}>At risk</Text>:<Text style={{color:"green"}}>No risk</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <View></View>
      <ListItem  bottomDivider>
         <ListItem.Content style={styles.rows}>
          <ListItem.Title>Pre Diabetes</ListItem.Title>
          <ListItem.Subtitle>
          {report.isPreDiabetes ? <Text style={{color:"red"}}>At risk</Text>:<Text style={{color:"green"}}>No risk</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem  bottomDivider>
         <ListItem.Content style={styles.rows}>
          <ListItem.Title>Bronchiectasis</ListItem.Title>
          <ListItem.Subtitle>
          {report.isBronchiectasis ? <Text style={{color:"red"}}>At risk</Text>:<Text style={{color:"green"}}>No risk</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem  bottomDivider>
         <ListItem.Content style={styles.rows}>
          <ListItem.Title>CHD</ListItem.Title>
          <ListItem.Subtitle>
          {report.isChd ? <Text style={{color:"red"}}>At risk</Text>:<Text style={{color:"green"}}>No risk</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem  bottomDivider>
         <ListItem.Content style={styles.rows}>
          <ListItem.Title>Hypoxemia</ListItem.Title>
          <ListItem.Subtitle>
          {report.isHypoxemia ? <Text style={{color:"red"}}>At risk</Text>:<Text style={{color:"green"}}>No risk</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem  bottomDivider>
         <ListItem.Content style={styles.rows}>
          <ListItem.Title>Asthma</ListItem.Title>
          <ListItem.Subtitle>
          {report.isAsthma ? <Text style={{color:"red"}}>At risk</Text>:<Text style={{color:"green"}}>No risk</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      </View>
      
    </Card>
  </View>
  </ScrollView>)
}
const styles = StyleSheet.create({
  container: {
     width:'100%',
      height:'100%',
      padding:'4%',
      flex:1,
      paddingVertical: 20 ,
    
    },
    rows:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    },
   
   

});
