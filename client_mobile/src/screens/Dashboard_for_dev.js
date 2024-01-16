import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Topbar from '../components/Frame/Topbar';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';

const Dashboard_for_dev = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Topbar navigation={navigation} showBackButton={true} showProfileButton={true} />
        <View style={styles.content}>
            <Title
            TextString = "Dashboard"
            textStyle = {{marginLeft: 20, fontSize: 40, fontWeight: 'bold'}}
            />
            <SubTitle
            TextString = {"Accéder à toutes les pages."}
            textStyle = {{marginLeft: 20, fontSize: 15}}
            />
            <View style={styles.skipContainer}>
                <View>
                    <Title
                        TextString = "Skip to YourArea"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('YourArea')}>
                    <Title
                        TextString = "YourArea"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14, color: '#AD5379', textDecorationLine: 'underline'}}
                    />
                    </TouchableOpacity>
                </View>
                <View>
                    <Title
                        TextString = "Skip to Connect"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Connect')}>
                    <Title
                        TextString = "Connect"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14, color: '#AD5379', textDecorationLine: 'underline'}}
                    />
                    </TouchableOpacity>
                </View>
                <View>
                    <Title
                        TextString = "Skip to Profile"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Title
                        TextString = "Profile"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14, color: '#AD5379', textDecorationLine: 'underline'}}
                    />
                    </TouchableOpacity>
                </View>
                <View>
                    <Title
                        TextString = "Skip to Service"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Service')}>
                    <Title
                        TextString = "Service"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14, color: '#AD5379', textDecorationLine: 'underline'}}
                    />
                    </TouchableOpacity>
                </View>
                <View>
                    <Title
                        TextString = "Skip to AddArea"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('AddArea')}>
                    <Title
                        TextString = "AddArea"
                        textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14, color: '#AD5379', textDecorationLine: 'underline'}}
                    />
                    </TouchableOpacity>
                </View>
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
  skipContainer: {
    backgroundColor: '#391f3b',
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

export default Dashboard_for_dev;
