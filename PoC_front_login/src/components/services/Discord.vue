<template>
  <div v-if="this.act_reac === 'action'">
    <div class="event-selector">
      <h2>No action available right now</h2>
    </div>
  </div>

  <div v-if="this.act_reac === 'reaction'">
    <div class="event-selector">
      <input type="text" v-model="this.msg" placeholder="What you want to send">
      <button @click="setMessageDiscord(this.msg)">Send this message</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapMutations(['setActionChoose', 'setReactionChoose',
      'setDiscordSendMessage_Body']),
      ...mapState(['act_reac', 'action_choose', 'reaction_choose',
     'DiscordSendMessage_Body']),
    },
    data() {
      return {
        msg: '',
      }
    },
    methods: {
      goToChooseActRea() {
        this.$router.push(`/area/${this.act_reac}`);
      },
      setMessageDiscord(reaction) {
        this.$store.commit('setDiscordSendMessage_Body', reaction);
        this.$store.commit('setReactionChoose', 'DiscordSendMessage');
        console.log(this.reaction_choose);
        this.$router.push('/area');
      },
    }
  }
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