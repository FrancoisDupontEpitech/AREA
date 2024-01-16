import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const AddAreaButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Button 
        style={{
          backgroundColor: '#AD5379', 
          width: '40%',
          padding:'3%',
          marginTop: '20%',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 15,
        }}
        labelStyle={{ color: '#FFFFFF', fontWeight: 'bold'}} // White text
      >
        {label}
      </Button>
    </TouchableOpacity>
  );
};

export default AddAreaButton;