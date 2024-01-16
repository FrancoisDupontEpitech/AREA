<template>
    <div v-if="this.act_reac === 'action'">
      <div class="event-selector">
      <h2>Select an Event</h2>
      <ul>
        <input type="number" v-model="this.second" placeholder="Set Timer Every X Sec">
        <button @click="setCustomTime(this.second)">Set Custom Time</button>
        <br/>
        <input type="text" v-model="this.Date_Time" placeholder="YYYY-MM-DD HH:MM:SS">
        <button @click="setCustomDate(this.Date_Time)">Set Custom Hour</button>
      </ul>
      </div>
    </div>

    <div v-if="this.act_reac === 'reaction'">
      <h2>No reaction available for this service</h2>
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
      'setTimerEveryXSec_Interval', 'setTimerAtTime_Time']),
      ...mapState(['act_reac', 'action_choose', 'reaction_choose', 
      'TimerEveryXSec_Interval', 'TimerAtTime_Time'])
    },
    
    data() {
      return {
        second: 0,
        Date_Time: '',
      };
    },
    
    methods: {
      goToChooseActRea() {
        this.$router.push(`/area/${this.act_reac}`);
      },
      
      setCustomTime(event) {
        if (event > 0) {
          this.$store.commit('setActionChoose', 'TimerEveryXSec');
          this.$store.commit('setTimerEveryXSec_Interval', event);
          // console.log(this.second);
          console.log(this.TimerEveryXSec_Interval);
          this.$router.push('/area');
        } else {
          alert('Invalid input for custom time');
        }
      },

      setCustomDate(event) {
        if (event.length === 19) {
          this.$store.commit('setActionChoose', 'TimerAtTime');
          this.$store.commit('setTimerAtTime_Time', event);
          console.log(this.TimerAtTime_Time);
          this.$router.push('/area');
        } else {
          alert('Invalid input for custom date');
        }
      }
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