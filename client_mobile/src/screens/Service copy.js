import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import ServiceWidgets from '../components/Shared/ServiceWidgets';

const Card = ({ name, source, style, navigation, actionOrReaction, actions }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Action', {
        widgetName: name,
        widgetSource: source,
        widgetActions: actions,   // Use the actions prop here
        actionOrReaction: actionOrReaction // Pass this to Connect
      })}>
      <Image source={source} style={style} />
      <Text style={styles.cardText}>{name}</Text>
    </TouchableOpacity>
  );
};


const Service = ({ navigation, route }) => {
  const actionOrReaction = route.params?.actionOrReaction;

  return (
    <View style={styles.container}>
      <Topbar navigation={navigation} showBackButton={true} showProfileButton={true} />
        <View style={styles.content}>
          <Title
            TextString="Service"
            textStyle={{ marginLeft: 20, fontSize: 40, fontWeight: 'bold' }}
          />
          <SubTitle
            TextString={"Choose a service."}
            textStyle={{ marginLeft: 20, fontSize: 15 }}
          />
          <ScrollView style={styles.scrollView}>
            <View style={styles.cardsContainer}>
            {ServiceWidgets.map(widget => (
              <Card
                key={widget.id}
                name={widget.name}
                source={widget.source}
                style={widget.style}
                navigation={navigation}
                actionOrReaction={actionOrReaction} // Pass this to Card
                actions={widget.actions}
              />
            ))}
            </View>
          </ScrollView>
          <LinearGradient
            colors={['transparent', '#181329']}
            style={styles.gradient}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181329',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%', // Approximately half of the container, adjust if needed
    padding: 10,
    aspectRatio: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B243D',
    marginBottom: 20,
    borderRadius: 10,
  },
  cardText: {
    color: 'white',
    marginTop: 10,
  }
});

export default Service;
