<template>
    <div>
      <div id="container">
        <h1>Register</h1>
        <text>please sign up to continue.</text>
        <form>
          <input type="text" id="username" placeholder="Username" v-model="username" required/>
            <input type="text" id="email" placeholder="Email" v-model="email" required/>
            <input type="password" id="password1" placeholder="PASSWORD" v-model="password1" required/>
            <input type="password" id="password2" placeholder="CONFIRM PASSWORD" v-model="password2" required/>
            <button type="submit" @click="signUp">Register</button>
            <button type="button" @click="switchToLogin">Already have an account?</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>

  import { RouterLink } from 'vue-router';
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    data() {
        return {
          username: '',
          email: '',
          password1: '',
          password2: '',
          userId: '',
        };
    },
    computed: {
      ...mapMutations(['setUserToken']),
      ...mapState(['userToken'])
    },
    methods: {
        switchToLogin() {
            this.$router.push('/');
        },
        async signUp(evt) {
          try {
            evt.preventDefault();
              if (this.password1 !== this.password2) {
                alert('Passwords do not match');
                return;
              }
              const response = await fetch('http://localhost:8080/auth/register/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                {
                  "username": this.username,
                  "password": this.password1,
                  "email": this.email
                }
              ),
          });
          if (response.status === 200) {
            alert("Registration successful")
            console.log('Registration successful');
            const response_token = await response.json();
            this.$store.commit('setUserToken', response_token.token);
            console.log(this.userToken);
            this.$router.push('/home');
          } else {
          const errorMessage = await response.text();
          console.error('Registration failed:', errorMessage);
          }
        } catch (error) {
          alert("Registration failed")
          console.error('An error occurred during registration:', error);
        }
      },
    },
    components: { RouterLink }
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
      border-radius: 15px;
      padding:8px 50px;
      margin: 20px;
    }
  </style>