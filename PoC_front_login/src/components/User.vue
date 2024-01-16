<template>
    <div>
      <h1>User Profile</h1>
      <div>
        <p><strong>First Name:</strong> {{ user.FirstName }}</p>
        <p><strong>Last Name:</strong> {{ user.LastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapMutations } from 'vuex';
  
  export default {
    data() {
      return {
        user: {},
      };
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      ...mapMutations(['clearUserToken']),
      async fetchUserData() {
        try {
          const response = await axios.get('http://localhost:5173/api/user-data');
            if (response.status === 200) {
            this.user = response.data;
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('An error occurred while fetching user data:', error);
        }
      },
      async logout () {
        try {
          this.clearUserToken();
          this.$router.push('/');
        } catch (error) {
          console.error('An error occurred during logout:', error);
        }
      }
    },
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