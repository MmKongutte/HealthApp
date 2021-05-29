import React,{useState,useEffect}from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input,Card,ListItem } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Spacer from '../Spacer';

  export default Reports=({navigation})=>{
   
    
   
    return(
    
      <View style={styles.container}>
        
      <Spacer/>
      
         <Button
         style={styles.upbtn}
         onPress={() => navigation.navigate('Upload')}
         type="outline"
         icon={
      
         <Icon
          name="upload"
          size={20}
          color='#007aff'
      />
    }
   title=" UPLOAD REPORTS"
/>

     
      </View>

    )
  }

  const styles = StyleSheet.create({
    container: {
       width:'100%',
        height:'100%',
        padding:'4%',
        flex:1,
        paddingVertical: 20 ,
      
      },
     
     
     

  });
  