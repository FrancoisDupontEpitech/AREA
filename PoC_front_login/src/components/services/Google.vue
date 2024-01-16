<template>
    <div v-if="this.act_reac === 'action'">
      <div class="event-selector">
      <h2>Select an Event</h2>
      <ul>
        <input type="text" 
        v-model="this.ReceiverMail" 
        placeholder="Set mail of the one who send it to you"
        />
        <button @click="setSenderMail">Mail of sender who trigger action</button>
      </ul>
    </div>
    </div>

    <div v-if="this.act_reac === 'reaction'">
      <div class="event-selector">
        <h2>Select an Event</h2>
        <ul>
          <li v-for="(reaction, index) in Google_reaction" :key="index">
            <button @click="selectEvent(reaction)">{{ reaction }}</button>
          </li>

          <div>
            <div>
              <input type="text" v-model="this.SenderMail" placeholder="Which one send that email">
              <input type="text" v-model="this.ObjectMail" placeholder="What is the object of your mail ?">
              <input type="body-text" v-model="this.BodyMail" placeholder="What contain your mail ?">
              <input type="text" v-model="this.ReceiverMail" placeholder="Which person will receive it ?">
            </div>
            <button @click="setMailToSend(this.SenderMail ,this.BodyMail, this.ReceiverMail, this.ObjectMail)">Finish create your mail ?</button>
          </div>
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
    'setGoogleReceiveEmailFrom_SenderEmail', 'setGoogleSendEmailTo_myEmail', 
    'setGoogleSendEmailTo_EmailBody', 'setGoogleSendEmailTo_ReceiverEmail',
    'setGoogleSendEmailTo_EmailObject']),

    ...mapState(['act_reac', 'action_choose', 'reaction_choose', 
    'GoogleReceiveEmailFrom_SenderEmail', 'GoogleSendEmailTo_myEmail', 
    'GoogleSendEmailTo_EmailBody', 'GoogleSendEmailTo_ReceiverEmail', 
    'GoogleSendEmailTo_EmailObject']),

  },
  
  data() {
    return {
      ReceiverMail: '',

      BodyMail: '',
      SenderMail: '',
      ReceiverMail: '',
      ObjectMail: '',

      // Reaction variable
      Google_reaction: ['GoogleAddToTrash', 'GoogleAddToFavorites'],
    };
  },
  
  methods: {
    goToChooseActRea() {
      this.$router.push(`/area/${this.act_reac}`);
    },
    selectEvent(event) {
      this.$store.commit('setReactionChoose', event)
      alert('Your reaction is ready to be use');
    },
    setSenderMail(event) {
      this.$store.commit('setActionChoose', 'GoogleReceiveEmailFrom');
      this.$store.commit('setGoogleReceiveEmailFrom_SenderEmail', this.ReceiverMail);
      alert('Your action is ready to be use');
      this.$router.push('/area');
    },
    setMailToSend(sender, body, receiver, object) {
      if (sender === '' || body === '' || receiver === '')
        alert('You must fill all the field');
      else {
      this.$store.commit('setActionChoose', 'GoogleSendEmailTo');
      this.$store.commit('setGoogleSendEmailTo_myEmail', sender);
      this.$store.commit('setGoogleSendEmailTo_EmailBody', body);
      this.$store.commit('setGoogleSendEmailTo_ReceiverEmail', receiver);
      this.$store.commit('setGoogleSendEmailTo_EmailObject', object);
      alert('Your mail is ready to be send');
      this.$router.push('/area');
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