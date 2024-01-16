import React, { useState } from 'react';
import { 
  Text, View, StyleSheet, TextInput, KeyboardAvoidingView, 
  Keyboard, StatusBar, TouchableWithoutFeedback, ActivityIndicator, 
  TouchableOpacity
} from "react-native";
import MainButton from "../components/Buttons/MainButton";
import Title from "../components/Texts/Title";
import { useNavigation } from '@react-navigation/native';
import { REGISTER_URL } from "@env";
import Dashboard_for_dev from './Dashboard_for_dev';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
    }
    setLoading(true);
    console.log("Register");
    console.log(REGISTER_URL);
    try {
        fullUrl = `${REGISTER_URL}/auth/register/`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
            }),
        });

        const responseBody = await response.json();
        if (response.status === 200 || response.status === 201) { // Check if the status code indicates success
            navigation.navigate("Login"); // Navigate to login after successful registration
        } else {
            setError(responseBody.message || "Registration failed.");
        }
    } catch (error) {
        setError("There was an error while trying to register.");
        console.log(error);
    } finally {
        setLoading(false);
    }
}


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title TextString="Welcome to" textStyle={{marginLeft: 20}} />
          <Title TextString="FACE LINKER." textStyle={{marginLeft: 20, fontSize: 40, fontWeight: 'bold'}} />
          <Title TextString="A place where you can talk with your co-workers and more." textStyle={{marginLeft: 20, fontSize: 15}} />

          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Title TextString="First Name" textStyle={styles.label} />
              <TextInput style={styles.InputHalf} placeholder="Enter your first name" value={first_name} onChangeText={setFirstname} placeholderTextColor="#fff" cursorColor="#AD5379" />
            </View>

            <View style={styles.lastnameContainer}>
              <Title TextString="Last Name" textStyle={styles.label} />
              <TextInput style={styles.InputHalf} placeholder="Enter your last name" value={last_name} onChangeText={setLastname} placeholderTextColor="#fff" cursorColor="#AD5379" />
            </View>
          </View>

          <Title TextString="Username" textStyle={styles.label} />
          <TextInput style={styles.InputFull} placeholder="Enter your username" value={username} onChangeText={setUsername} placeholderTextColor="#fff" cursorColor="#AD5379" />

          <Title TextString="Email" textStyle={styles.label} />
          <TextInput style={styles.InputFull} placeholder="Enter your username" value={email} onChangeText={setEmail} placeholderTextColor="#fff" cursorColor="#AD5379" />

          <Title TextString="Password" textStyle={styles.label} />
          <TextInput style={styles.InputFull} placeholder="Enter your password" value={password} onChangeText={setPassword} placeholderTextColor="#fff" secureTextEntry={true} cursorColor="#AD5379" />

          <Title TextString="Confirm Password" textStyle={styles.label} />
          <TextInput style={styles.InputFull} placeholder="Confirm your password" value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor="#fff" secureTextEntry={true} cursorColor="#AD5379" />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Title TextString="Already have an account? Login" textStyle={{marginLeft: 20, marginTop: 20, fontSize: 14, color: '#AD5379', textDecorationLine: 'underline'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard_for_dev')}>
            <Title TextString="Dashboard_for_dev" textStyle={{marginLeft: 20, marginTop: 20, fontSize: 14, color: '#AD5379', textDecorationLine: 'underline'}} />
          </TouchableOpacity>
          <MainButton TextString="Register" onPress={handleRegister} />

          {error && <Text style={styles.errorText}>{error}</Text>}
          {loading && <ActivityIndicator size="large" color="#AD5379" />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#181329'
    },
    Input: {
        marginTop: 10,
        marginLeft: 20,
        width: '90%',
        height: 40,
        backgroundColor: '#181329',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        color: '#fff',
        paddingLeft: 10,
    },
    errorText: {
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    nameContainer: {
        width: '45%',
    },
    lastnameContainer: {
        width: '45%',
    },
    InputHalf: {
        marginTop: 10,
        width: '100%',
        height: 40,
        backgroundColor: '#181329',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        color: '#fff',
        paddingLeft: 10,
    },
    InputFull: {
        marginTop: 10,
        marginLeft: 20,
        width: '90%',
        height: 40,
        backgroundColor: '#181329',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        color: '#fff',
        paddingLeft: 10,
    },
    label: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 14,
    },
    nameTitle: {
        fontSize: 14
    },
    lastnameTitle: {
        fontSize: 14
    }
});