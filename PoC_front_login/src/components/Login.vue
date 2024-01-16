
<script setup>

</script>

<template>
  <div id="container1">
      <div id="container">
        <h1>Login</h1>
        <text>please sign in to continue.</text>
        <form>
          <input type="text" id="username" placeholder="USERNAME" v-model="username" required/>
          <input type="password" id="password" placeholder="PASSWORD" v-model="password" />
        </form>
        <div>
          <button type="submit" @click="login">Login</button>
          <button type="button" @click="switchToRegister">Don't have an account?</button>
        </div>
        <button @click="authTwitch">Connect Twitch</button>
        <button @click="authSpotify">Connect Spotify</button>
        <button @click="authGithub">Connect Github</button>
        <button @click="authGoogle">Connect Google</button>
      </div>
    </div>
  </template>

<script>
  import axios from 'axios';
  import { mapState, mapMutations, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        userId: '',
      };
    },
    computed: {
      ...mapMutations(['setUserToken']),
      ...mapState(['userToken'])
    },
    methods: {
      async return_twitch () {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
          try {
            const response = await fetch('http://localhost:8080/auth/twitch/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'code': authorizationCode
              }),
            });
            if (response.status === 200) {
              console.log('twitch success');
            }
            } catch (error) {
            console.error('twitch fail')
          }
        }
      },
      async return_spotify() {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
          try {
            const response = await fetch('http://localhost:8080/auth/spotify/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'code': authorizationCode
              }),
            });
            if (response.status === 200) {
              console.log('spotify success');
            }
            } catch (error) {
            console.error('spotify fail')
          }
        }
      },
      async return_github() {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
          try {
            const response = await fetch('http://localhost:8080/auth/github/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'code': authorizationCode
              }),
            });
            if (response.status === 200) {
              console.log('github success');
            }
          } catch (error) {
            console.error('github fail')
          }
        }
      },
      async return_google() {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
          try {
            const response = await fetch('http://localhost:8080/auth/google/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'code': authorizationCode
              }),
            });
            if (response.status === 200 || response.status === 201) {
              alert("Login successful")
              console.log('Registration successful');
              const data_token = await response.json();
              this.$store.commit('setUserToken', data_token);
              this.$router.push('/home');
            }
          } catch(error) {
            console.log(error)
          }
      },
      async authGoogle () {
        const client_id = '378922446474-nlffrd9vsmvgkv53go96r6nh2ip63ds5.apps.googleusercontent.com'
        const redirect_uri = 'http://localhost:8081'
        const scope = 'https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile'
        const response_type = 'code'
        const authurl = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`
        window.location.href = authurl
        await this.return_google();
      },
      async authTwitch() {
        const client_id = 'bthrygm14dnmz04ggw23vh63dmfxa8'
        const redirect_uri = 'http://localhost:8081'
        const response_type = 'code'
        const scope = 'channel:read:subscriptions+channel:read:redemptions+channel_subscriptions+user_subscriptions+channel:moderate+user:read:email+user:read:broadcast+moderator:read:followers+user:manage:blocked_users'
        const authurl = `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`
        window.location.href = authurl;
        await this.return_twitch();
      },
      async authSpotify() {
        const client_id = '1d3ce8c346ce49178fcaf53483366483'
        const redirect_uri = 'http://localhost:8081'
        const response_type = 'code'
        const scope = 'user-read-private+playlist-read-private+user-library-read+playlist-modify-public+playlist-modify-private'
        const authurl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`
        window.location.href = authurl
        await this.return_spotify();
      },
      async authGithub() {
        const client_id = 'd7c82b09f58de0cdc0b2'
        const redirect_uri = 'http://localhost:8081'
        const response_type = 'code'
        const scope = 'user+repo+read:org+read:discussion'
        const authurl = `https://github.com/login/oauth/authorize?redirect_uri=${redirect_uri}&client_id=${client_id}&response_type=${response_type}&scope=${scope}`
        window.location.href = authurl
        await this.return_github();
      },
      switchToRegister() {
        this.$router.push('/register');
      },
      
      switchToHome() {
        this.$router.push('/home');
      },

      async login(evt) {
        try {
          evt.preventDefault();
            const response = await fetch('http://localhost:8080/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                "username": this.username,
                "password": this.password
              })
            ,
          });
          if (response.status === 200) {
            alert("Login successful")
            console.log('Registration successful');
            const response_token = await response.json();
            this.$store.commit('setUserToken', response_token.token);
            console.log(this.userToken);
            this.$router.push('/home');
          } else {
            const errorMessage = await response.text();
            console.error('Login failed:', errorMessage);
          }
        } catch (error) {
          alert("Login failed")
          console.error('An error occurred during registration:', error);
        }
      }
    }
  };
</script>
    
<style scoped>
#container{
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
img {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h1 {
  margin: 10px;
  padding: 50px 0;
  color: #ffff;
  text-align: left;
  font-weight: bold;
  position: fixed;
  top: 0%;
  left: 10%;
  transform: translate(-10%, -110%);
}
text {
  color: #AD5379;
  position: fixed;
  top: 0%;
  left: 10%;
  transform: translate(0%, -200%);
}
input {
  width: 80%;
  background-color: #2B243D;
  border-radius: 10px;
  border-color: #2B243D;
  padding: 15px;
  border: unset;
  color:#ffff;
  margin: 20px;
}
button {
  background-color: #AD5379;
  color: #ffff;
  font-weight: bold;
  font-size: 120%;
  text-align: center;
  border:#AD5379;
  border-radius: 25px;
  padding:8px 25px;
  margin: 18px;
  margin-bottom: 45px;
}
h2 {

  color: #ffff;
  font-weight: bold;
  font-size: 200%;
  text-align: center;
  margin: 10px;
  padding: 50px 0;
  /* position: fixed; */
}
</style>