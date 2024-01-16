import React from 'react';
import { Button } from 'react-native-paper';
import { Border, FontFamily, Color, FontSize } from "../../../GlobalStyles";
import { StyleSheet, View, Text, Image, Switch, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


  /*
  const YourAreaCard = ({info})=> (  
    <View >

        <Text>
            {info.title} lol
        </Text>
    </View>
);*/

  const YourAreaCard = ({info}) => {
    return (
        <View style={styles.card} >
            <View style={styles.imageContainer}>
                <Image
                    contentFit="cover"
                    source={require("../../../assets/github-icon-pink.png")}
                    style={styles.image}
                />
                <Image
                    contentFit="cover"
                    source={require("../../../assets/add-icon.png")}
                    style={styles.image}
                />
                <Image
                    contentFit="cover"
                    source={require("../../../assets/cloudy-icon.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>First Image</Text>
                <Text style={styles.text}>Last Image</Text>
            </View>
            <View style={styles.switchContainer}>
                <Switch />
            </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      card: {
        backgroundColor: '#2B243D',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
      },
      imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
      },
      textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      text: {
        fontSize: 16,
        color: '#fff',
      },
      switchContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
    });

export default YourAreaCard;
