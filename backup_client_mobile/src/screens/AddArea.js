import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import ServiceWidgets from '../components/Shared/ServiceWidgets';
import MainButton from '../components/Buttons/MainButton';
import { useAreas } from './AreaContext';


const AddArea = ({ navigation, route }) => {
  const [actionWidget, setActionWidget] = useState(null);
  const [reactionWidget, setReactionWidget] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { addArea } = useAreas();

  const createAction = () => {
    if (actionWidget && reactionWidget) {
      addArea({
        id: 'new_id', // generate a unique id
        action: actionWidget.name,
        reaction: reactionWidget.name,
        source1: actionWidget.source,
        source2: reactionWidget.source,
        style: actionWidget.style,
        connected: true,
      });
      navigation.navigate("YourArea");
    }
  };

  useEffect(() => {
    if (route.params?.selectedWidget && route.params?.actionOrReaction) {
      if (route.params.actionOrReaction === 'action') {
        setActionWidget(route.params.selectedWidget);
      } else if (route.params.actionOrReaction === 'reaction') {
        setReactionWidget(route.params.selectedWidget);
      }
  
      // Important: Reset your route params after handling them
      navigation.setParams({ selectedWidget: null, actionOrReaction: null });
    }
    if (actionWidget && reactionWidget) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [route.params, navigation, actionWidget, reactionWidget]);

  return (
    <View style={styles.container}>
      <Topbar navigation={navigation} showBackButton={true} showProfileButton={true} />
      <View style={styles.content}>
          <Title
              TextString="Add AREA"
              textStyle={{ marginLeft: 20, fontSize: 40, fontWeight: 'bold' }}
          />
          <SubTitle
              TextString={"Make your own Area."}
              textStyle={{ marginLeft: 20, fontSize: 15 }}
          />
      </View>
      <View style={styles.ButtonContainer}>
      <TouchableOpacity 
          style={styles.areaContainerButton} 
          onPress={() => {
              navigation.navigate("Service", { actionOrReaction: 'action' });
          }}>
          {actionWidget ? (
              <View style={styles.serviceContainer}>
                  <Image source={actionWidget.source} style={styles.serviceLogo} />
                  <Text style={styles.first}>{actionWidget.name}</Text>
              </View>
          ) : (
              <>
                  <Text style={styles.first}>Add</Text>
                  <Text style={styles.last}>ACTION</Text>
              </>
          )}
      </TouchableOpacity>
          <Image source={require('././../../assets/down_arrow.png')} style={styles.arrow} />
          <TouchableOpacity 
              style={styles.areaContainerButton} 
              onPress={() => {
                  navigation.navigate("Service", { actionOrReaction: 'reaction' });
              }}>
              {reactionWidget ? (
                  <View style={styles.serviceContainer}>
                      <Image source={reactionWidget.source} style={styles.serviceLogo} />
                      <Text style={styles.first}>{reactionWidget.name}</Text>
                  </View>
              ) : (
              <>
                  <Text style={styles.first}>Add</Text>
                  <Text style={styles.last}>REACTION</Text>
              </>
          )}
      </TouchableOpacity>
      <MainButton
        TextString="CREATE"
        onPress={createAction}
        buttonStyle={
          actionWidget && reactionWidget 
          ? {backgroundColor: '#AD5379'} // Active color
          : {backgroundColor: 'grey'}    // Disabled color
        }
        textStyle={{color: 'white', fontWeight: 'bold', fontSize: 16}}
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
  ButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  areaContainerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#29294A',
    width: '90%',
    alignSelf: 'center',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceLogo: {
    width: 50,
    height: 50,
    marginRight: 30,
  },
  arrow: {
    width: 100,
    height: 100,
  },
  first: {
    // fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    paddingRight: 10,
  },
  last: {
    // fontFamily: 'Inter-Bold',
    fontWeight: '800',
    color: '#AD5379',
    fontSize: 30,
  },
  emailsContainer: {
    width: '100%',
    marginTop: 30,
  },
  infoIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  areaContainer: {
    flexDirection: 'row',
  },
  Label: {
    color: '#A5A4A4',
    fontSize: 12,
    padding: 2,
  },
  Address: {
    color: 'white',
    fontSize: 15,
    padding: 2,
    fontWeight: 'bold',
  },
  changepass : {
    color: '#A5A4A4',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 15,
  },
  MainButtonCreate: {
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
  },
  MainButtonDisabled: {
    // ... (your existing styles)
    backgroundColor: 'grey', // Grey Color
  },
});

export default AddArea;
