import React from "react";
import DropDownPicker from 'react-native-dropdown-picker';

import { StyleSheet,View, TouchableOpacity, ScrollView} from 'react-native';
import  { AuthContext } from '../../App';
import { Input,Button,Card,Text } from "react-native-elements";
import Spacer from '../Spacer';



  export default SignUp=({navigation})=>{
    const [phone, onChangePhone] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [username,onChangeName]=React.useState('');
    const [gender,onChangeGender]=React.useState('');
    const [yob,onChangeYob]=React.useState('');
    const [bmi,onChangeBmi]=React.useState('');
    

    const {  signUp } = React.useContext(AuthContext);

   
    return(
      <ScrollView>
      <View style={styles.view}>
         
          <Card style={styles.card}>
          <Spacer/>
        <Input
         
         label="Name"
         autoCapitalize="none"
         autoCorrect={false}
         onChangeText={text => onChangeName(text)}
         value={username}
       />
        
        
         <Spacer/>
        <Input 
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        onChangeText={text => onChangeEmail(text)}
        value={email}
       />

      
     <Spacer/>
        <Input
         
         label="Password"
         autoCapitalize="none"
         autoCorrect={false}
         onChangeText={text => onChangePassword(text)}
         value={password}
       />
           <Spacer/>
        <Input
         label="Contact Number"
         onChangeText={text => onChangePhone(text)}
         value={phone}
       />
        <Spacer/>
        <Input
         label="BMI"
         onChangeText={text => onChangeBmi(text)}
         value={bmi}
       />

        <Spacer/>
        
        <DropDownPicker 
        items={[
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'male'},
        ]}
    
    placeholder="Gender"
    placeholderStyle={{color:'gray',fontWeight:'bold'}}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa',color: 'black'}}
    itemStyle={{
        color :'black',
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa',color:'black'}}
    onChangeItem={item => onChangeGender(item.value)}
 
   />

        <Spacer/>
        <Input
         label="Year of Birth"
         onChangeText={text => onChangeYob(text)}
         value={yob}
       />
        
        <Spacer/>
          <Button 
         onPress={() => {signUp({ username,email,phone,password,yob,bmi,gender });
        onChangeBmi('');onChangeEmail('');onChangeGender('');onChangeName('');
        onChangePassword('');onChangePhone('');onChangeYob('');
        }}
    
          title="Sign Up"
          color="#841584"
         />
         

          <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
          <Spacer>
           <Text style={styles.link}>Already Have an account? Sign in instead!</Text>
          </Spacer>
          </TouchableOpacity>
       
        </Card>
      </View>
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    view:{
        width:'100%',
        height:'100%',
        flex:1,
        paddingVertical: 20 ,
        justifyContent:'center',
        
      },
      link: {
        color: "blue",
        
    },
   
     
    input:{
      height: 40, borderColor: 'gray', borderWidth: 1,width: '70%',marginLeft:'5%'
    }
  });
  