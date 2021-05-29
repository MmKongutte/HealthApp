import React from 'react';
import Logo from '../images/mobilelogo.png';
import {View, Image} from 'react-native';

const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={Logo}
        style={{
          width: 40,
          height: 40,
         
          marginLeft: 15,
        }}
      />
    </View>
  );
};

export default ActionBarImage;