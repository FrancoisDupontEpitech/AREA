<template>
  <div v-if="this.act_reac === 'action'">
    <div class="event-selector">
      <input type="text" v-model="this.playlist" placeholder="Set playlist">
      <button @click="setPlaylist(this.playlist)"></button>
    </div>
  </div>

  <div v-if="this.act_reac === 'reaction'">
    <div class="event-selector">
      <input type="text" v-model="this.MusicURL" placeholder="Add this New Music">
      <button @click="setMusic(this.MusicURL)">Add this music</button>
      <br/>
      <input type="text" v-model="this.NewPlaylistName" placeholder="Create new playlist">
      <button @click="CreatePlaylist(this.NewPlaylistName)">Create Playlist</button>

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
    ...mapMutations(['setActionChoose', 'setReactionChoose',
    'setSpotify_PlaylistName', 'setSpotify_SongUrl', 
    'setSpotifyCreatePlaylist_PlaylistName']),
    
    ...mapState(['act_reac', 'action_choose', 'reaction_choose',
    'Spotify_PlaylistName', 'Spotify_SongUrl', 
    'SpotifyCreatePlaylist_PlaylistName']),
  },
  data() {
    return {
      playlist: '',
      MusicURL: '',
      NewPlaylistName: '',
    }
  },
  methods: {
    goToChooseActRea() {
      this.$router.push(`/area/${this.act_reac}`);
    },
    setPlaylist(playlist) {
      this.$store.commit('setActionChoose', 'Spotify_PlaylistName');
      this.$store.commit('setSpotify_PlaylistName', playlist);
      this.$router.push('/area');
    },
    setMusic(MusicURL) {
      this.$store.commit('setReactionChoose', 'Spotify_SongUrl');
      this.$store.commit('setSpotify_SongUrl', MusicURL);
      this.$router.push('/area');
    },
    CreatePlaylist(NewPlaylistName) {
      this.$store.commit('setReactionChoose', 'SpotifyCreatePlaylist_PlaylistName');
      this.$store.commit('setSpotifyCreatePlaylist_PlaylistName', NewPlaylistName);
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