import React, { useState, useEffect } from 'react';
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
  const [services, setServices] = useState([]); // State to store the fetched services
  const actionOrReaction = route.params?.actionOrReaction;

  useEffect(() => {
    // Define an async function to fetch services
    const fetchServices = async () => {
      try {
        const response = await fetch('http://0.0.0.0:8080/app/services_list/');
        const data = await response.json();
        setServices(data); // Update the state with the fetched services
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices(); // Call the fetch function
  }, []); // Empty dependency array to only run once on component mount

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
            {services.map(service => (
              <Card
                key={service.id}
                name={service.name}
                source={{ uri: service.image_path }} // Assuming `image_path` is a complete URL
                style={{ width: 45, height: 45 }} // Set a default style or modify as needed
                navigation={navigation}
                actionOrReaction={actionOrReaction}
                actions={service.actions_list} // Pass the actions related to the service
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
