<template>
      <div v-if="info === 'action'">
        <div class="button-container">

          <div class="button-row">
            <button @click="save_service('Timer')">Timer</button>
            <button @click="save_service('Spotify')">Spotify</button>
            <button @click="save_service('Github')">GitHub</button>
            <button @click="save_service('Weather')">Weather</button>
          </div>

          <div class="button-row">
            <button @click="save_service('Google')">Google</button>
            <button @click="save_service('Discord')">Discord</button>
            <button @click="save_service('Twitch')">Twitch</button>
          </div>

        </div>
      </div>

      <div v-if="info === 'reaction'">
        <div class="button-container">
          
          <div class="button-row">
            <button @click="save_service('Timer')">Timer</button>
            <button @click="save_service('Spotify')">Spotify</button>
            <button @click="save_service('Github')">GitHub</button>
            <button @click="save_service('Weather')">Weather</button>
          </div>

          <div class="button-row">
            <button @click="save_service('Google')">Google</button>
            <button @click="save_service('Discord')">Discord</button>
            <button @click="save_service('Twitch')">Twitch</button>
          </div>

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
      ...mapMutations(['setServiceReaction', 'setServiceAction', 'setActionChoose', 'setReactionChoose']),
      ...mapState(['service_reaction', 'service_action', 'act_reac', 'action_choose', 'reaction_choose'])
    },

    methods: {
      goToChooseActRea() {
        this.$router.push('/area');
      },
      
      show_info() {
        if (this.act_reac === 'action')
          console.log(this.act_reac);
        else if (this.act_reac === 'reaction')
          console.log(this.act_reac);
      },

      save_service(service) {
        if (this.act_reac === 'action') {
          this.$store.commit('setServiceAction', service);
          this.$router.push(`/area/${this.act_reac}/${service}`)

        } else if (this.act_reac === 'reaction') {
          this.$store.commit('setServiceReaction', service);
          this.$router.push(`/area/${this.act_reac}/${service}`)
        }
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
</style>