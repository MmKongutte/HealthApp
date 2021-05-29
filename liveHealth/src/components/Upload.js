import React, { Component,useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image,ScrollView } from 'react-native';
import { Input,Button,Text,Card} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import Spacer from '../Spacer';
import UploadForm from '../components/UploadForm';


export default class Upload extends Component {

  

  state = {
    image: null,
    imgurl: null,
    
  };
unsetUrlState=()=>{
    this.setState({ image: null});
  };

  
pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3,4],
      base64: true
    });
    

    if (!result.cancelled) {
      this.setState({ image: result.uri })
      
      let base64Img = `data:image/jpg;base64,${result.base64}`
      
      //Add your cloud name
      let apiUrl = 'your cloudinary url';
  
      let data = {
        "file": base64Img,
        "upload_preset": "ml_default",
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
          let data = await r.json()
          console.log(data.secure_url)
          this.setState({ imgurl: data.secure_url})
          return data.secure_url
    }).catch(err=>console.log(err))
  }
  
}

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      <Button  onPress={()=>this.pickImage()}  title="select image" />
      <Spacer/>
      <View style={{backgroundColor:'transparent'}}>
            {this.state.image?
              <Image source={{uri: this.state.image}} style={{width: 150, height: 200, alignSelf:'center'}}/> 
              :
              <Text style={{color:'gray'}}>Upload preview...</Text>
            }
      </View>
      <UploadForm changeProp={this.unsetUrlState} imgUrl={this.state.imgurl} userid={this.props.myid}/>
      
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    img:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',

    },
  container: {
    width:'100%',
    height:'100%',
    flex:1,
    paddingVertical: 20 ,
    justifyContent:'center',
    padding:'10%'
    
  }
});
