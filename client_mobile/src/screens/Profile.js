import React from 'react';
import { View, StyleSheet, Text, Image, TextInput } from 'react-native';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import MainButton from '../components/Buttons/MainButton';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Topbar navigation={navigation} showBackButton={true} />
      <View style={styles.content}>
        <Title
          TextString = "Profile"
          textStyle = {{marginLeft: 20, fontSize: 40, fontWeight: 'bold'}}
        />
        <SubTitle
          TextString = {"See your profile."}
          textStyle = {{marginLeft: 20, fontSize: 15}}
        />
        <View style={styles.profileInfoBackground}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/profile-small.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.firstName}>John</Text>
          <Text style={styles.lastName}>Doe</Text>
          <View style={styles.emailsContainer}>
            <View style={styles.emailContainer}>
              <Image
                source={require('../../assets/mail-icon.png')}
                style={styles.infoIcon}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.Label}>EMAIL</Text>
                <Text style={styles.Address}>your.email@mail.com</Text>
              </View>
            </View>
            <View style={styles.emailContainer}>
              <Image
                source={require('../../assets/lock-white-icon.png')}
                style={styles.infoIcon}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.Label}>PASSWORD</Text>
                <Text style={styles.Address}>**************</Text>
              </View>
            </View>
            <Text style={styles.changepass}>CHANGE PASSWORD</Text>
          </View>
          <MainButton
              TextString="LOGOUT"
              onPress={() => navigation.navigate("Login")}
          />
        </View>
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
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileInfoBackground: {
    flex: 1,
    backgroundColor: '#2B243D',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
  },
  firstName: {
    // fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  lastName: {
    // fontFamily: 'Inter-Bold',
    fontWeight: '800',
    color: '#AD5379',
    fontSize: 25,
  },
  emailsContainer: {
    width: '100%',
    marginTop: 30,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181329',
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    width: '100%',
  },
  infoIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  infoContainer: {
    flexDirection: 'column',
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
});

export default Profile;
