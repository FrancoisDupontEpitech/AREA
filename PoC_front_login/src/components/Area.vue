<template>
  <div id="container">
    <button @click="GoToHome">Go to Home</button>
    <br/>

    <div>
      <button @click="navigateToPage('action')">Add Action</button>
      <button @click="navigateToPage('reaction')">Add Reaction</button>
      <button @click="addArea">Add Area</button>
      <!-- <button @click="print_info">Print info</button> -->
    </div>
  </div>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import Card from './Card.vue';

export default {
    computed: {
      ...mapMutations(['setActReac', 'setActionChoose', 'setReactionChoose'
      , 'setServiceAction', 'setServiceReaction', 'setGithubAddMemberToRepo_Member',
      'setGithubAddMemberToRepo_Role', 'setGithub_RepositoryNameForAction',
      'setGithub_OrganisationNameForAction', 'setGithub_RepositoryNameForReaction',
      'setGithub_OrganisationNameForReaction', 'setGoogle_SenderEmail',
      'setGoogleSendEmailTo_myEmail', 'setGoogleSendEmailTo_ReceiverEmail',
      'setGoogleSendEmailTo_EmailBody', 'setGoogleSendEmailTo_EmailObject',
      'setOpenWeather_City', 'setOpenWeather_Temp', 'setOpenWeather_Humidity',
      'setOpenWeather_airQuality', 'setSpotify_PlaylistName', 'setSpotify_SongUrl',
      'setSpotifyCreatePlaylist_PlaylistName', 'setTwitchStreamerIsLive_StreamerName',
      'setTwitch_UserPseudo', 'setTwitch_ChanelName', 'setTimerEveryXSec_Interval',
      'setTimerAtTime_Time', 'setDiscordSendMessage_Body', 'setUserToken']),


      ...mapState(['act_reac', 'action_choose', 'reaction_choose', 
      'service_action', 'service_reaction', 'GithubAddMemberToRepo_Member',
      'GithubAddMemberToRepo_Role', 'Github_RepositoryNameForAction',
      'Github_OrganisationNameForAction', 'Github_RepositoryNameForReaction',
      'Github_OrganisationNameForReaction', 'Google_SenderEmail',
      'GoogleSendEmailTo_myEmail', 'GoogleSendEmailTo_ReceiverEmail',
      'GoogleSendEmailTo_EmailBody', 'GoogleSendEmailTo_EmailObject',
      'OpenWeather_City', 'OpenWeather_Temp', 'OpenWeather_Humidity',
      'OpenWeather_airQuality', 'Spotify_PlaylistName', 'Spotify_SongUrl',
      'SpotifyCreatePlaylist_PlaylistName', 'TwitchStreamerIsLive_StreamerName',
      'Twitch_UserPseudo', 'Twitch_ChanelName', 'TimerEveryXSec_Interval',
      'TimerAtTime_Time', 'DiscordSendMessage_Body', 'userToken'])
    },
    methods: {
      GoToHome() {
          this.$router.push('/home');
      },

      navigateToPage(info) {
        if (info === 'action') {
          this.$store.commit('setActReac', 'action');
          this.$router.push(`/area/${info}`);
        }
        else if (info === 'reaction') {
          this.$store.commit('setActReac', 'reaction');
          this.$router.push(`/area/${info}`);
        }
      },
      print_info() {
        console.log(this.userToken)
        console.log(this.action_choose)
        console.log(this.reaction_choose)
        console.log(this.service_action)
        console.log(this.service_reaction)
        console.log(this.TimerEveryXSec_Interval)
        console.log(this.DiscordSendMessage_Body)
      },

      // adding area to user
      async addArea(evt) {
        try {
          evt.preventDefault();
          const area =  await fetch('http://localhost:8080/api/areas/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.userToken}`,
          },
          body: JSON.stringify({
            "isActivated": true,
            "ActionService": this.service_action,
            "ReactionService": this.service_reaction,
            "ActionMethod": this.action_choose,
            "ReactionMethod": this.reaction_choose,
            "Github_RepositoryNameForAction": this.Github_RepositoryNameForAction,
            "Github_OrganisationNameForAction": this.Github_OrganisationNameForAction,
            "Github_RepositoryNameForReaction": this.Github_RepositoryNameForReaction,
            "Github_OrganisationNameForReaction": this.Github_OrganisationNameForReaction,
            "GithubAddMemberToRepo_Member": this.GithubAddMemberToRepo_Member,
            "GithubAddMemberToRepo_Role": this.GithubAddMemberToRepo_Role,
            "Google_SenderEmail": this.Google_SenderEmail,
            "GoogleSendEmailTo_myEmail": this.GoogleSendEmailTo_myEmail,
            "GoogleSendEmailTo_ReceiverEmail": this.GoogleSendEmailTo_ReceiverEmail,
           "GoogleSendEmailTo_EmailBody": this.GoogleSendEmailTo_EmailBody,
           "GoogleSendEmailTo_EmailObject": this.GoogleSendEmailTo_EmailObject,
           "OpenWeather_City": this.OpenWeather_City,
           "OpenWeather_Temp": this.OpenWeather_Temp,
           "OpenWeather_Humidity": this.OpenWeather_Humidity,
           "OpenWeather_airQuality": this.OpenWeather_airQuality,
           "Spotify_PlaylistName": this.Spotify_PlaylistName,
           "Spotify_SongUrl": this.Spotify_SongUrl,
           "SpotifyCreatePlaylist_PlaylistName": this.SpotifyCreatePlaylist_PlaylistName,
           "TwitchStreamerIsLive_StreamerName": this.TwitchStreamerIsLive_StreamerName,
           "Twitch_UserPseudo": this.Twitch_UserPseudo,
           "Twitch_ChanelName": this.Twitch_ChanelName,
           "TimerEveryXSec_Interval": this.TimerEveryXSec_Interval,
           "TimerAtTime_Time": this.TimerAtTime_Time
          }),
        });
        if (area.status === 201) {
          alert("Area added")
          // reset_variable();
          this.$router.push('/home');
        } else {
          alert("Area not added")
        }
      } catch (error) {
        alert("Area not added")
        console.error('An error occurred during registration:', error);
      }
    },
      reset_variable() {
        this.$store.commit('setActReac', '0');
        this.$store.commit('setActionChoose', '0');
        this.$store.commit('setReactionChoose', '0');
        this.$store.commit('setServiceAction', '0');
        this.$store.commit('setServiceReaction', '0');
        this.$store.commit('setGithubAddMemberToRepo_Member', '0');
        this.$store.commit('setGithubAddMemberToRepo_Role', '0');
        this.$store.commit('setGithub_RepositoryNameForAction', '0');
        this.$store.commit('setGithub_OrganisationNameForAction', '0');
        this.$store.commit('setGithub_RepositoryNameForReaction', '0');
        this.$store.commit('setGithub_OrganisationNameForReaction', '0');
        this.$store.commit('setGoogle_SenderEmail', '0');
        this.$store.commit('setGoogleSendEmailTo_myEmail', '0');
        this.$store.commit('setGoogleSendEmailTo_ReceiverEmail', '0');
        this.$store.commit('setGoogleSendEmailTo_EmailBody', '0');
        this.$store.commit('setGoogleSendEmailTo_EmailObject', '0');
        this.$store.commit('setOpenWeather_City', '0');
        this.$store.commit('setOpenWeather_Temp', 0);
        this.$store.commit('setOpenWeather_Humidity', 0);
        this.$store.commit('setOpenWeather_airQuality', 0);
        this.$store.commit('setSpotify_PlaylistName', '0');
        this.$store.commit('setSpotify_SongUrl', '0');
        this.$store.commit('setSpotifyCreatePlaylist_PlaylistName', '0');
        this.$store.commit('setTwitchStreamerIsLive_StreamerName', '0');
        this.$store.commit('setTwitch_UserPseudo', '0');
        this.$store.commit('setTwitch_ChanelName', '0');
        this.$store.commit('setTimerEveryXSec_Interval', 0);
        this.$store.commit('setTimerAtTime_Time', '0');
      }
    }
};
</script>

<style scoped>
#container{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#container1 {
  top: 5%;
  left: 90%;
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
#button1 {
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