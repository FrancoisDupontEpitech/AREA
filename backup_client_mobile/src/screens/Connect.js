import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import { FontAwesome } from '@expo/vector-icons';
import ServiceWidgets from '../components/Shared/ServiceWidgets';

const Connect = ({ route, navigation }) => {
  const { widgetName, widgetSource, actionOrReaction } = route.params;

  return (
    <View style={styles.container}>
      <Topbar navigation={navigation} showBackButton={true} showProfileButton={true}/>
      <View style={styles.content}>
        <Image source={widgetSource} style={{...styles.githubIcon, width: 150, height: 150}} />
        <Text style={styles.title}>{widgetName}</Text>
        <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}
            onPress={() => {
                navigation.navigate('AddArea', {
                    selectedWidget: {
                        name: widgetName,
                        source: widgetSource,
                    },
                    actionOrReaction: actionOrReaction,
                });
            }}
        >CONNECT</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181329',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  githubIcon: {
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  connectButton: {
    marginTop: 60,
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
    backgroundColor: '#AD5379',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
});

export default Connect;