import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../configuration/Theme';

const MainButton = ({
  TextString,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
      }}
      onPress={onPress}>
      <Text
        style={{...styles.title, ...textStyle}}>
        {TextString}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.buttons.background,
        width: '55%',
        marginTop: 50,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    title: {
        color: Theme.buttons.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MainButton;
