import React,{useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View ,Image} from 'react-native';
import { Text, Button, Input,Card } from "react-native-elements";
import Logo from '../images/smalllogo.png'

  export default Splash=()=>{
   
   
    return(
    
      <View style = { styles.MainContainer }>  
     
      <View style={styles.SplashScreen_RootView}>  
                 <View style={styles.SplashScreen_ChildView}>  
                       <Image source={Logo}  
                    style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  
                </View>  
             </View>
             <Text h3 style={{textAlign: 'center'}}></Text>  

      </View>  
    
    )
  }

  const styles = StyleSheet.create({
    MainContainer:  
    {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    },  
   
    SplashScreen_RootView:  
    {  
        justifyContent: 'center',  
        flex:1,  
        margin: 10,  
        position: 'absolute',  
        width: '100%',  
        height: '100%',  
      },  
   
    SplashScreen_ChildView:  
    {  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: '#008cec',  
      
        flex:1,  
    },  
  });
  