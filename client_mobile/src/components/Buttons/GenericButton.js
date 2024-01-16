import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const GenericButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Button 
        style={{
          backgroundColor: '#2B243D', 
          width: '90%',
          padding:'15%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
        }}
        labelStyle={{ color: '#FFFFFF', fontWeight: 'bold',
        fontSize: 18,}} // White text
      >
        {label}
      </Button>
    </TouchableOpacity>
  );
};

export default GenericButton;