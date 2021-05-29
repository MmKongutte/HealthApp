import React,{useEffect,useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input,Card } from "react-native-elements";
import axios from 'axios';
import Spacer from '../Spacer';
import DropDownPicker from 'react-native-dropdown-picker';
import { showMessage, hideMessage } from "react-native-flash-message";


const saveImg=(uid,imgurl,des,repType)=>{
    console.log("inputs are-",imgurl,des,repType);
    axios.post('http://192.168.43.157:4000/user/imgUpload',{
        'id':uid,
        'toUrl': imgurl,
        'toDescription':des,
        'toReportType':repType,
         })  .then((res) => {
          console.log(res.data);
          console.log("saved image successfully");
         })
        .catch(err => console.log("error in uploading image",err))  

}

  export default UploadForm=(props)=>{
   const [description,setDescription]=React.useState('');;
   const [reportType,setReportType]=React.useState('');;
   
    return(
    
      <View style={styles.container}>
           
           
       <DropDownPicker 
        items={[
        {label: 'Radiology reports', value: 'Radiology reports'},
        {label: 'Laboratory reports', value: 'Laboratory reports'},
        {label: 'Pathology reports', value: 'Pathology reports'},
        {label:'Other',value:'Other'}
        ]}
    
    placeholder="Select report type"
    placeholderStyle={{color:'gray',fontWeight:'bold'}}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa',color: 'black'}}
    itemStyle={{
        color :'black',
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa',color:'black'}}
    onChangeItem={item => setReportType(item.value)}
 
   />
       
         <Spacer/>
         <Input
          label="Comments"
          multiline={true}
          onChangeText={text => setDescription(text)}
          value={description}
       />
       <Spacer/>
       <Button 
         onPress={() => {saveImg(props.userid,props.imgUrl,description,reportType);
          showMessage({
            message: "Image Uploaded successfully!!",
            type: "success",
          });
          setDescription('');
          setReportType('');
          props.changeProp();
        }}
        
          title="Upload"
          color="#841584"
         />

      </View>

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
  });
  