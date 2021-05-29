import React from 'react';
import { StyleSheet,View,TouchableOpacity} from 'react-native';
import { Input,Button,Card,Text } from "react-native-elements";
import Spacer from '../Spacer';
import  { AuthContext } from '../../App';

export default SignIn=({navigation})=>{
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
 
    
    return(
      <View style={styles.view}>
          
         <Card> 
        
         <Spacer/>
          <Input 
          label="Email"
          onChangeText={text => onChangeEmail(text)}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
         />
         <Spacer/>
         <Input
         secureTextEntry
         label="Password"
         autoCapitalize="none"
         autoCorrect={false}
         onChangeText={text => onChangePassword(text)}
         value={password}
       />
       <Spacer/>
          <Button  onPress={() => {signIn({ email,password });
          onChangeEmail('');
          onChangePassword('');}}
          title="Sign In"
          color="#841584"
          />
           <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
          <Spacer>
           <Text style={styles.link}>Dont have an account? Sign up instead</Text>
          </Spacer>
          </TouchableOpacity>
        </Card>
      </View>
    )
  }

  const styles = StyleSheet.create({
    view:{
        width:'100%',
        height:'100%',
        flex:1,
        paddingVertical: 20 ,
        justifyContent: 'center',
      },
      link: {
        color: "blue",
        
    },
     
  input:{
    height: 40, borderColor: 'gray', borderWidth: 1,width: '70%',marginLeft:'5%'
  }
});
