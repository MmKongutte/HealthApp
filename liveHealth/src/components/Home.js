import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Card} from 'react-native-shadow-cards';
import { StyleSheet, View,ScrollView} from 'react-native';
import { Text, Button, Input} from "react-native-elements";
import Spacer from '../Spacer';
import { HeaderTitle } from '@react-navigation/stack';

import io from "socket.io-client";

let socket;
  export default Home=(props)=>{
    const [health,setHealth]=
    useState({
      temprature: 0,
      glucose: 0,
      heartRate: 0,
      oxygen: 0,
      cholestrol: 0,
      sustolicbp: 0,
      diastolicbb: 0,
     
    });
    const ENDPOINT = 'http://192.168.43.157:4000/';
    useEffect(() => {
       console.log("in useeffect");
      socket = io.connect(ENDPOINT);
      //socket.emit("join",props.myid);
      socket.on("upbroadcast", (message) => {
        console.log("socket connect in home");
        console.log(message);

        axios.post('http://192.168.43.157:4000/user/fetchHealth', {
          'id':  props.myid,
         })
        .then((res) => {
             console.log("data fetched successfully");
             console.log("fetched data is-",res.data);
             setHealth(res.data);
        }).catch((error) => {
          console.log("failed to fetch updated data",error);
        });
     
      });
   })


    
    let bp=0;
    function colorTemperature(tempra){
      if(tempra>=36 & tempra<=37.69){
        return(
          <Text style={{color:"green"}}>{tempra}</Text>
        )
      }else{
        return(
          <Text style={{color:"red"}}>{tempra}</Text>
        )
      }
    }
    function colorHeart(hrate){
      if(hrate<=100 & hrate>=60){
        return(
          <Text style={{color:"green"}}>{hrate}</Text>
        )
      }else{
        return(
          <Text style={{color:"red"}}>{hrate}</Text>
        )
      }
    }
    function colorbp(bpsys,bpdy){
      if((bpsys<=120 & bpsys>=90) | (bpdy<=80 & bpdy>=60)){
        return(
          <Text style={{color:"green"}}>{bpsys}/{bpdy}</Text>
        )
      }else{
        return(
          <Text style={{color:"red"}}>{bpdy}/{bpdy}</Text>
        )
      }
    }
    function colorglu(glu){
      if(glu<=140 & glu>=100){
        return(
          <Text style={{color:"green"}}>{glu}</Text>
        )
      }else{
        return(
          <Text style={{color:"red"}}>{glu}</Text>
        )
      }
    }
    function coloroxy(oxy){
      if(oxy<=100 & oxy>=95){
        return(
          <Text style={{color:"green"}}>{oxy}</Text>
        )
      }else{
        return(
          <Text style={{color:"red"}}>{oxy}</Text>
        )
      }
    }
    console.log("props in home component",props.myid);
    return(
     <ScrollView>
      <View style={styles.container}>
        <Text h4 style={{color:"gray"}}> Hi, {props.myName} !</Text>
        <Spacer/>
          <View style={styles.container}>
      <Card style={styles.healthcard}>
      <HeaderTitle>Body temperatue</HeaderTitle>
      <View style={styles.hp} >
       
        <Text h2 style={styles.hpv}> {colorTemperature(health.temprature)}</Text>
        <Text>c</Text>
       </View>
      </Card>

      <Card style={styles.healthcard}>
      <HeaderTitle>Glucose</HeaderTitle>
       <View style={styles.hp} >
       <Text h2 style={styles.hpv}>{colorglu(health.glucose)}</Text>
       <Text>mg/dl</Text>
       </View>
      </Card>
      <Card style={styles.healthcard}>
      <HeaderTitle>Blood Pressure</HeaderTitle>
      <View style={styles.hp} >
      <Text h2 style={styles.hpv}>{colorbp(health.sustolicbp,health.diastolicbb)}</Text>
      <Text>mmHg</Text>
       </View>
      </Card>
      <Card style={styles.healthcard}>
      <HeaderTitle>Heart Rate</HeaderTitle>
      <View style={styles.hp} >
      <Text h2 style={styles.hpv}>{colorHeart(health.heartRate)}</Text>
      <Text>bpm</Text>
       </View>
      </Card>
      <Card style={styles.healthcard}>
      <HeaderTitle>Oxygen</HeaderTitle>
      <View style={styles.hp} >
      <Text h2 style={styles.hpv}>{coloroxy(health.oxygen)}</Text>
       <Text>%</Text>
       </View>
      </Card>
    </View>
        
      </View>
      </ScrollView>

    )
  }

  const styles = StyleSheet.create({
    container: {
       width:'100%',
        height:'100%',
      
        flex:1,
        paddingVertical: 20 ,
        justifyContent: 'center',
      },
      buttonStack:{
        flexDirection:'row',
        justifyContent:'space-around',

      },
      healthcard:{
        padding: 10, margin: 10, height:100,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        

      },
      hp:{
        alignSelf:'flex-end',
        flexDirection:'row',
        justifyContent:'flex-end'

        
      }
    
  });
  