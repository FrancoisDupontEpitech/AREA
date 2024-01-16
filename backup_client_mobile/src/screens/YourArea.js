import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import ServiceWidgets from '../components/Shared/YourAreaCards';
import MainButton from '../components/Buttons/MainButton';
import { useAreas } from './AreaContext'; // Import useAreas hook

const Card = ({ id, action, reaction, source1, source2, connected = true, navigation, onDelete }) => {
  const [isOn, setIsOn] = useState(connected);
  const buttonColor = isOn ? '#AD5379' : 'grey';

  const handleToggle = () => {
    setIsOn(!isOn);
    // Perform any other action such as updating the state in the backend
  };

  const handleLongPress = () => {
    Alert.alert(
      'Delete Area',
      `Are you sure you want to delete this area?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => onDelete(id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onLongPress={handleLongPress} style={styles.cardTouchable}>
      <View style={styles.card} >
        <View style={styles.sourceContainer}>
          <Image source={source1} style={styles.logo} />
          <Text style={styles.plusSign}>+</Text>
          <Image source={source2} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{action}</Text>
          <Text style={styles.text}>{reaction}</Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: buttonColor }]}
          onPress={handleToggle}>
          <Text style={styles.toggleText}>{isOn ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


const YourArea = ({ navigation }) => {
  const { areas, deleteArea } = useAreas(); // Use the hook to get areas

  return (
    <View style={styles.container}>
      <Topbar navigation={navigation} showBackButton={true} showProfileButton={true} />
        <View style={styles.content}>
          <Title
            TextString="Your AREA"
            textStyle={{ marginLeft: 20, fontSize: 40, fontWeight: 'bold' }}
          />
          <SubTitle
            TextString={"All your Area."}
            textStyle={{ marginLeft: 20, fontSize: 15 }}
          />
          <ScrollView style={styles.scrollView}>
            <View style={styles.cardsContainer}>
              {areas.map(area => ( // Render areas from context
                <Card
                  key={area.id}
                  id={area.id}
                  action={area.action}
                  reaction={area.reaction}
                  source1={area.source1}
                  source2={area.source2}
                  style={area.style}
                  connected={area.connected}
                  onDelete={() => deleteArea(area.id)}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
          <LinearGradient
            colors={['transparent', '#181329']}
            style={styles.gradient}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => {
            navigation.navigate("AddArea")
          }}>
            <Text style={styles.addButtonText}>Add AREA</Text>
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
  cardTouchable: {
    width: '48%', // Same width as the card to maintain the previous layout
    aspectRatio: 1, // Same aspect ratio to maintain the square shape
    marginBottom: 20, // Keep the same margin as before
  },
  card: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B243D',
    flex: 1,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 45, // Logo width
    height: 45, // Logo height
    resizeMode: 'contain',
  },
  plusSign: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 24,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute space evenly around text items
    width: '100%', // Take up full width of the card to space out the action and reaction
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  serviceLogo: {
    width: 45, // Adjust width as needed
    height: 45, // Adjust height as needed
    resizeMode: 'contain', // Ensure the logos are contained within their dimensions
  },

    namesContainer: {
      flexDirection: 'row',
      justifyContent: 'center', // Center the service names
      alignItems: 'center', // Center the service names vertically
      marginTop: 10, // Space from the top elements
    },
  
    toggleButton: {
      // Same as before, ensure it's not too wide
      width: '80%', // Contain the width within the card
      // ... other styles ...
    },
  
    cardText: {
      // Adjust text styles as necessary
      color: 'white',
      fontSize: 14, // Choose an appropriate font size
      textAlign: 'center', // Center the text
      // ... other styles ...
    },
  
    // ... rest of your styles ...
  onButton: {
    backgroundColor: 'green',
  },
  offButton: {
    backgroundColor: 'red',
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleButton: {
    width: 70,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    overflow: 'hidden',
  },
  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  addButton: {
    position: 'absolute',  // This allows the button to be placed based on the container's bounds
    right: 40,  // 20 pixels from the right
    bottom: 60,  // 20 pixels from the bottom
    backgroundColor: '#AD5379',
    paddingHorizontal: 30,  // Horizontal padding
    paddingVertical: 20,   // Vertical padding
    borderRadius: 15,  // Rounded corners
    elevation: 10, // Add elevation to Android buttons
    shadowColor: "#000", // Add shadow for iOS buttons
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }

});

export default YourArea;
