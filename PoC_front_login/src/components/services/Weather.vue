<template>
    <div v-if="this.act_reac === 'action'">
        <div class="event-selector">
        <h2>Select an Event</h2>
        <ul>
            <input type="text" v-model="Wea_City" placeholder="Select City to check">

            <input type="text" v-model="Wea_Temp" placeholder="Enter degree to set">
            <button @click="setCustomWeather(Wea_Temp)">Set Custom Degree</button>
            
            <input type="text" v-model="Wea_AirQuality" placeholder="Enter Air Quality to check">
            <button @click="setCustomAirQuality(Wea_AirQuality)">Set Custom Air Quality</button>

            <input type="text" v-model="Wea_Humidity" placeholder="Enter humidity to set">
            <button @click="setCustomHumidity(Wea_Humidity)">Set Custom Humidity</button>
        </ul>
        </div>
    </div>

    <div v-if="this.act_reac === 'reaction'">
        <div class="event-selector">
        <ul>
          <input>
          <button></button>
        </ul>
        </div>
    </div>

    <div>
      <button @click="goToChooseActRea">Do you want to go back choose your action or reaction ?</button>
    </div>

</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    info() {
      return this.$route.params.info;
    },
    ...mapMutations(['setActionChoose', 'setReactionChoose', 
    'setOpenWeatherThreashold', 'setOpenWeather_City', 
    'setOpenWeather_Humidity', 'setOpenWeather_AirQuality']),

    ...mapState(['act_reac', 'action_choose', 'reaction_choose', 
    'OpenWeatherThreashold', 'OpenWeather_City',
    'OpenWeather_Humidity', 'OpenWeather_AirQuality'])
  },
  
  data() {
    return {
      Weather_reaction: ['WeatherTempAtTime', 'WeatherTempAtInterval'],

      Wea_Temp: '',
      Wea_City: '',
      Wea_Humidity: '',
      Wea_AirQuality: '',
    };
  },
  
  methods: {
    goToChooseActRea() {
      this.$router.push(`/area/${this.act_reac}`);
    },

    setCustomWeather(event) {
      this.$store.commit('setOpenWeather_Temp', event)
      this.$store.commit('setOpenWeather_City', this.Wea_City)
      this.$store.commit('setActionChoose', 'OpenWeatherGetTemp')
      console.log(this.OpenWeatherThreashold)
      this.$router.push('/area');

    },

    setCustomHumidity(event) {
      if (event != '' && event > 0) {
        this.$store.commit('setOpenWeather_Humidity', event)
        this.$store.commit('setOpenWeather_City', this.Wea_City)
        this.$store.commit('setActionChoose', 'OpenWeatherGetHumidity')
        this.$router.push('/area');

      } else
        alert('Humidity value is empty')
    },

    setCustomAirQuality(event) {
      if (event != '' && event > 0) {
        this.$store.commit('setOpenWeather_AirQuality', event)
        this.$store.commit('setOpenWeather_City', this.Wea_City)
        this.$store.commit('setActionChoose', 'WeatherGetQuality')
        this.$router.push('/area');

      } else
        alert('Air Quality value is empty')
    },
  }
};

</script>

<style scoped>
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
#button1 {
  background-color: #2e1d24;
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
  min-height: 75vh;
}

.button-row {
  display: flex;
  justify-content: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
.event-selector {
  background-color: #AD5379;
  padding: 20px;
  border: 10px solid #ccc;
  border-radius: 25px;
  box-shadow: 2 5px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
}

h2 {
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
</style>