import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import ServiceWidgets from '../components/Shared/ServiceWidgets';
import { IP } from "@env";

const serviceLogos = {
  'Discord': require('../../assets/discord.png'),
  'GitHub': require('../../assets/github.png'),
  'Google': require('../../assets/google.png'),
  'OpenWeather': require('../../assets/openweather.png'),
  'Spotify': require('../../assets/spotify.png'),
  'Timer': require('../../assets/timer.png'),
  'Twitch': require('../../assets/twitch.png'),
};

const Card = ({ name, source, style, navigation, actionOrReaction, actions }) => {
  const logoSource = serviceLogos[name] || serviceLogos['default']; // Fallback to a default logo if name not found

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Action', {
        widgetName: name,
        widgetSource: logoSource, // Use the retrieved logo source here
        widgetActions: actions,
        actionOrReaction: actionOrReaction
      })}>
      <Image source={logoSource} style={{ width: 45, height: 45 }} />
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
        fullUrl = `http://${IP}:8080/api/services/`;
        console.log(fullUrl);
        const response = await fetch(fullUrl);
        const data = await response.json();
        const updatedServices = data.map(service => {
          // Include only the relevant list (actions or reactions)
          return {
            ...service,
            list: actionOrReaction === 'action' ? service.actions_list : service.reactions_list,
          };
        });
        setServices(updatedServices);
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
                source={{ uri: service.image_path }}
                style={{ width: 45, height: 45 }}
                navigation={navigation}
                actionOrReaction={actionOrReaction}
                actions={service.list} // Pass only the relevant list (actions or reactions)
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
