import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import ServiceWidgets from '../components/Shared/ServiceWidgets';

const Card = ({ title, description, navigation, widgetName, widgetSource, actionOrReaction }) => {
  return (
      <TouchableOpacity 
          style={styles.card} 
          onPress={() => {
              navigation.navigate('Connect', {
                  widgetName: widgetName,
                  widgetSource: widgetSource,
                  actionOrReaction: actionOrReaction,
              });
          }}
      >
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
      </TouchableOpacity>
  );
};

const Action = ({ route, navigation }) => {
  const { widgetActions = [], widgetName, widgetSource, actionOrReaction } = route.params;

  return (
    <View style={styles.container}>
      <Topbar navigation={navigation} showBackButton={true} showProfileButton={true} />
        <View style={styles.content}>
          <Title
            TextString="Action"
            textStyle={{ marginLeft: 20, fontSize: 40, fontWeight: 'bold' }}
          />
          <SubTitle
            TextString={"Choose an action."}
            textStyle={{ marginLeft: 20, fontSize: 15 }}
          />
          <View style={styles.widgetInfo}>
            <Image source={widgetSource} style={styles.widgetLogo} />
            <Text style={styles.widgetName}>{widgetName}</Text>
        </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.cardsContainer}>
            {widgetActions.map(item => (
              <Card
                key={item.id} // Use the unique id of the action or reaction for the key
                title={item.name} // Assuming you have 'name' property in the action/reaction objects
                description={item.description}
                navigation={navigation}
                widgetName={widgetName}
                widgetSource={widgetSource}
                actionOrReaction={actionOrReaction}
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
  },
  cardTitle: {
    color: '#AD5379',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: 'white',
    fontSize: 14,
  },
  widgetInfo: {
    alignItems: 'center', // Centering the items horizontally
    marginVertical: 20,  // Adding some vertical space above and below the widget info
  },
  widgetLogo: {
    width: 60,  // Adjust this as per your needs
    height: 60, // Adjust this as per your needs
    marginBottom: 10, // Spacing between logo and widget name
  },
  widgetName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Action;
