import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Theme from '../../configuration/Theme';

const SubTitle = ({
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
        color: Theme.palette.color3,
        fontSize: 16,
    },
});

export default SubTitle;