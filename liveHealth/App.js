import React, { createContext, useReducer,useState,useContext, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import Reports from './src/components/Reports';
import Upload from './src/components/Upload';
import Splash from './src/components/Splash';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View,LogBox } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionBarImage from './src/components/ActionBarImage';
import {reducer, initialState} from './src/reducer';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ReportStack = createStackNavigator();
import FlashMessage from "react-native-flash-message";

export const AuthContext = createContext('')
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
  




function MainFlow(props) {
  
  return (
    <Tab.Navigator>
      <Tab.Screen
              name="home" children={()=><Home myName={props.myName} myid={props.uid}></Home> }
              options={{
                  tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }} />
       <Tab.Screen name="Upload" children={()=><Upload myid={props.uid}></Upload>}
              options={{
             
                headerShown: false ,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="clipboard" color={color} size={size} />
                ),
              }}/>
        <Tab.Screen name="profile" children={()=><Profile myid={props.uid}></Profile>}
              options={{
              
                headerShown: false ,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}/>
     
    </Tab.Navigator>
  );
}

export default App=({navigation})=> {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [myId,setMyId]= useState('');
  const [myname,setMyname]=useState('');
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;


      try {
        userToken = await AsyncStorage.getItem('token')
        .then((data)=>{ 
          
          axios.get('http://192.168.43.157:4000/user/login/verify',
          { headers: {"x-auth-token" : `Bearer ${data}`} })  .then((res) => { 
              //console.log(res.data);
             
              setMyId(res.data._id);
              setMyname(res.data.name);
              console.log("autosuccess");
              dispatch({type: 'RESTORE_TOKEN', token: data })
              
             })
            .catch(err => {dispatch({type: 'RESTORE_TOKEN', token:null });
            console.log("unable to autologin",err.message)})  
          console.log(data);
       
      })
      .catch((err)=>{
        console.log("autofail",err);
        dispatch({type: 'RESTORE_TOKEN', token:null })

      });
      } catch (e) {
        // Restoring token failed

     }  
  };
    bootstrapAsync();
}, []);


const authContext = React.useMemo(
  () => ({
    signIn: async data => {
      let userToken;
      axios.post('http://192.168.43.157:4000/user/login',{
         'email': data.email,
         'password':data.password,
          })  .then((res) => {
           console.log(res.data);
           setMyId(res.data.user.id);
           setMyname(res.data.user.name);
           AsyncStorage.setItem( 'token',res.data.token)
           userToken=res.data.token;
           dispatch({ type: 'SIGN_IN', token: res.data.token });
          })
         .catch(err => console.log(err))  
      
    },


    signOut: () => {
      AsyncStorage.removeItem('token');
      dispatch({ type: 'SIGN_OUT' })},



    signUp: async data => {
      let userToken;
      console.log(data.gender,data.bmi,data.yob);
      axios.post('http://192.168.43.157:4000/user/register',  {
        'name': data.username,
        'email': data.email,
        'phone':data.phone,
        'password':data.password,
        'bmi':data.bmi,
        'yob':data.yob,
        'gender':data.gender
    })
      .then((res) => {
           console.log("registration successful",res.data);
           AsyncStorage.setItem( 'token',res.data.token);
           userToken=res.data.token;

      }).catch((error) => {
        
        console.log("registration failed"+error.message);
      });
    
      dispatch({ type: 'SIGN_IN', token: userToken});
    },
  }),
  []
);




if (state.isLoading){
    return <Splash/>
  }
return (
  <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerLeft: () => <ActionBarImage />}}>
        { state.userToken==null  ? (
           <>
           <Stack.Screen
             name='signUp'
             component={SignUp}
             options={{
              title: 'LiveHealth',
              headerStyle: {
                backgroundColor: '#1a75ff',
              },
              headerTintColor: '#fff',
              headerShown: true}}
           />
           <Stack.Screen
             name='signIn'
             component={SignIn}
             options={{
              title: 'LiveHealth',
              headerStyle: {
                backgroundColor: '#1a75ff',
              },
              headerTintColor: '#fff',
              headerShown: true}}
           />
         </>
         ) : (
          <Stack.Screen
          name="mainFlow"
          children={()=><MainFlow myName={myname} uid={myId}></MainFlow>}
          options={{
            title: 'LiveHealth',
            headerStyle: {
              backgroundColor: '#1a75ff',
            },
            headerTintColor: '#fff',
            headerShown: true}}
        />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="top" />
    </AuthContext.Provider>
  
); }  
  
 

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
