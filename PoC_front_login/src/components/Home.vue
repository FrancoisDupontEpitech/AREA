<template> 
  <div>
    <Card v-for="(item, index) in items" :key="index" :item="item" />
  </div>
    <div>
        <div>
            <button id="button" @click="GoToArea">Want to add an Area ?</button>
        </div>
    </div>
  </template>

<script>
  import { mapState } from 'vuex';
  import Card from './Card.vue';

export default {
  computed: {
      ...mapState(['userToken'])
  },
  components: {
    Card,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await fetch('http://localhost:8080/api/areas/');
        if (response.ok) {
          const data = await response.json();
          this.items = data;
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    showvaluelog() {
      console.log(this.userToken);
    },
    GoToArea() {
      this.$router.push('/area');
    }
  }
};
</script>


<style scoped>
#container{
  /* position: absolute; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#container1 {
  /* position: absolute; */
  top: 90%;
  left: 91%;
  transform: translate(-50%, -50%);
  text-align: center;
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
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

</style>