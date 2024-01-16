import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Theme from '../../configuration/Theme';

const Title = ({
  TextString,
  textStyle,
}) => {
  return (
    <Text
        style={{...styles.title, ...textStyle}}>
        {TextString}
    </Text>
  );
};

const styles = StyleSheet.create({
    title: {
      color: Theme.palette.color1,
      fontWeight: 'bold',
      fontSize: 25,
    },
});

export default Title;