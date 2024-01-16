import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, StatusBar, TouchableWithoutFeedback, ActivityIndicator, BackHandler, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { clientTokenContext } from '../../Context';
import { PaperProvider } from 'react-native-paper';
import Title from '../components/Texts/Title';
import SubTitle from '../components/Texts/SubTitle';
import MainButton from '../components/Buttons/MainButton';
import { LOGIN_URL } from "@env";

export default function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { clientToken, setClientToken } = useContext(clientTokenContext);
    const [error, setError] =useState(false);
    const [loading, setLoading] = useState(false);

    const getClientToken = async () => {
        setLoading(true);
        console.log("Login");
        console.log(LOGIN_URL);
        try {
            const fullUrl = `${LOGIN_URL}/auth/login/`;
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "username" : username,
                        "password" : password
                    }),
            });

            const responseBody = await response.json();
            console.log(responseBody);
            if (response.status === 200) {
                setClientToken(responseBody.token);
                navigation.navigate("YourArea");
            } else {
                setError(responseBody.message || "Login has Failed");
            }
        }
        catch (error) {
            alert("Login has Failed")
            console.log(error);
        } finally {
          setLoading(false);
        }
    }
    return (
      <PaperProvider>
        <View style={styles.container}>
          <Title
                TextString = "Welcome to"
                textStyle = {{marginLeft: 20}}
            />
            <Title
                TextString = "AREA."
                textStyle = {{marginLeft: 20, fontSize: 40, fontWeight: 'bold'}}
            />
            <SubTitle
                TextString = {"POC in react-native"}
                textStyle = {{marginLeft: 20, fontSize: 15}}
            />
            <Title
                TextString = "Your Username"
                textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
            />
            <TextInput
                style={styles.Input}
                placeholder="Enter your username"
                value={username}
                error={error}
                onChangeText={username => setUsername(username)}
                placeholderTextColor= "#fff"
                cursorColor= "#AD5379"
            />
            <Title
                TextString = "Your Password"
                textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
            />
            <TextInput
                placeholder="Enter your password"
                value={password}
                error={error}
                onChangeText={password => setPassword(password)}
                style={styles.Input}
                placeholderTextColor= "#fff"
                secureTextEntry={true}
                cursorColor= "#AD5379"
            />

            <View style={{flexDirection: 'row', gap : -12}}>
              <Title
                  TextString = "Don't have an account ?"
                  textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14}}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Title
                  TextString = "Register"
                  textStyle = {{marginLeft: 20, marginTop: 20, fontSize : 14, color: '#AD5379', textDecorationLine: 'underline'}}
              />
              </TouchableOpacity>
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {loading ? (
              <ActivityIndicator size="large" color="#AD5379" />
          ) : (
              <MainButton
                  TextString="LOGIN"
                  onPress={getClientToken}
              />
          )}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
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
      width: '85%',
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
  }
});