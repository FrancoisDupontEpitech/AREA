import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const Topbar = ({ navigation, showBackButton, showProfileButton }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/back-button.png')} style={styles.back_button} />
          </TouchableOpacity>
        )}
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo-small.png')} style={styles.logo} />
        </View>
        {showProfileButton ? (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../../assets/profile-small.png')} style={styles.profile_button} />
        </TouchableOpacity>
        ) : (
          <View style={styles.profile_button_placeholder}></View>
        )}
      </View>
    </View>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#181329',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  back_button: {
    width: 25,
    height: 25,
    margin: 5,
  },
  profile_button: {
    width: 40,
    height: 40,
    margin: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 90,
  },
  profile_button_placeholder: {
    width: 40, 
    height: 40, 
    margin: 5, 
    backgroundColor: 'transparent' // You can remove this if you want, it's just for clarity.
  },
};

export default Topbar;
