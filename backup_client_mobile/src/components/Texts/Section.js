import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Theme from '../../configuration/Theme';
import SubTitle from './SubTitle';

const Section = ({
    SubtitleString,
    SubtitleStyle,
    TextString,
    textStyle,
}) => {
    return (
        <>
            <Text
                style={{...styles.sectionTitle, ...textStyle}}>
                {TextString}
            </Text>
            <Text
                style={{...styles.secondSectionTitle, ...SubtitleStyle}}>
                {SubtitleString}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        color: Theme.palette.color1,
        fontSize: 35,
        fontWeight: 'bold',
    },
    secondSectionTitle: {
        color: Theme.palette.color3,
        fontSize: 16,
    },
});

export default Section;