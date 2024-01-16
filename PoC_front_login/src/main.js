import { createApp } from 'vue';
import Vuex from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Area from './components/Area.vue';
import Home from './components/Home.vue';
import Action from './components/Triggers.vue';
import User from './components/User.vue';
import Timer from './components/services/Timer.vue';
import Github from './components/services/Github.vue';
import Google from './components/services/Google.vue'
import Weather from './components/services/Weather.vue'
import Twitch from './components/services/Twitch.vue'
import Spotify from './components/services/Spotify.vue'
import Discord from './components/services/Discord.vue'

import '@/assets/main.css';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/area', component: Area},
  { path: '/area/:info', component: Action},
  { path: '/home', component: Home},
  { path: '/user', component: User},

  { path: '/area/:info/Timer', component: Timer},
  { path: '/area/:info/Google', component: Google},
  { path: '/area/:info/Weather', component: Weather},
  { path: '/area/:info/Github', component: Github},
  { path: '/area/:info/Twitch', component: Twitch},
  { path: '/area/:info/Spotify', component: Spotify},
  { path: '/area/:info/Discord', component: Discord},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const store = new Vuex.Store({
  state: {
    userToken: null,
    action_choose: null,
    reaction_choose: null,
    service_action: null,
    service_reaction: null,
    act_reac: null,

    //var for auth_token
    google_token: '',
    github_token: '',
    spotify_token: '',
    twitch_token: '',

    ///////////////////////////////
    ///variable for action or reaction
    TimerEveryXSec_Interval: 0,
    TimerAtTime_Time: '',

    // WeatherThreashold_Temp: null,
    OpenWeather_Temp: 0,
    OpenWeather_City: '',
    OpenWeather_Humidity: 0,
    OpenWeather_airQuality: 0,

    GoogleReceiveEmailFrom_SenderEmail: '',
    Google_SenderEmail : '',

    GoogleSendEmailTo_myEmail: '',
    GoogleSendEmailTo_ReceiverEmail: '',
    GoogleSendEmailTo_EmailBody: '',
    GoogleSendEmailTo_EmailObject : '',
    
    Github_RepositoryNameForAction: '',
    Github_OrganisationNameForAction: '',

    Github_RepositoryNameForReaction: '',
    Github_OrganisationNameForReaction: '',

    GithubAddMemberToRepo_Member: '',
    GithubAddMemberToRepo_Role: '',

    DiscordSendMessage_Body: '',

    Spotify_PlaylistName: '',
    Spotify_SongUrl: '',
    SpotifyCreatePlaylist_PlaylistName: '',

    TwitchStreamerIsLive_StreamerName: '',
    Twitch_UserPseudo: '',
    Twitch_ChanelName: '',
  },
  mutations: {
    setUserToken(state, token) {
      state.userToken = token;
    },
    setActionChoose(state, action_choose) {
      state.action_choose = action_choose;
    },
    setReactionChoose(state, reaction_choose) {
      state.reaction_choose = reaction_choose;
    },
    setServiceAction(state, service_action) {
      state.service_action = service_action;
    },
    setServiceReaction(state, service_reaction) {
      state.service_reaction = service_reaction;
    },
    setActReac(state, act_reac) {
      state.act_reac = act_reac;
    },

    setGoogle_Token(state, google_token) {
      state.google_token = google_token;
    },
    setGithub_Token(state, github_token) {
      state.github_token = github_token;
    },
    setSpotify_Token(state, spotify_token) {
      state.spotify_token = spotify_token;
    },
    setTwitch_Token(state, twitch_token) {
      state.twitch_token = twitch_token;
    },

    ///////////////////////////////
    ///variable for action or reaction
    setTimerEveryXSec_Interval(state, TimerEveryXSec_Interval) {
      state.TimerEveryXSec_Interval = TimerEveryXSec_Interval;
    },
    setTimerAtTime_Time(state, TimerAtTime_Time) {
      state.TimerAtTime_Time = TimerAtTime_Time;
    },

    setOpenWeather_Temp(state, OpenWeather_Temp) {
      state.OpenWeather_Temp = OpenWeather_Temp;
    },
    setOpenWeather_City(state, OpenWeather_City) {
      state.OpenWeather_City = OpenWeather_City;
    },
    setOpenWeather_Humidity(state, OpenWeather_Humidity) {
      state.OpenWeather_Humidity = OpenWeather_Humidity;
    },
    setOpenWeather_airQuality(state, OpenWeather_airQuality) {
      state.OpenWeather_airQuality = OpenWeather_airQuality;
    },

    setGoogleReceiveEmailFrom_SenderEmail(state, GoogleReceiveEmailFrom_SenderEmail) {
      state.GoogleReceiveEmailFrom_SenderEmail = GoogleReceiveEmailFrom_SenderEmail;
    },
    setGoogle_SenderEmail(state, Google_SenderEmail) {
      state.Google_SenderEmail = Google_SenderEmail;
    },

    setGoogleSendEmailTo_myEmail(state, GoogleSendEmailTo_myEmail) {
      state.GoogleSendEmailTo_myEmail = GoogleSendEmailTo_myEmail;
    },
    setGoogleSendEmailTo_ReceiverEmail(state, GoogleSendEmailTo_ReceiverEmail) {
      state.GoogleSendEmailTo_ReceiverEmail = GoogleSendEmailTo_ReceiverEmail;
    },
    setGoogleSendEmailTo_EmailBody(state, GoogleSendEmailTo_EmailBody) {
      state.GoogleSendEmailTo_EmailBody = GoogleSendEmailTo_EmailBody;
    },
    setGoogleSendEmailTo_EmailObject(state, GoogleSendEmailTo_EmailObject) {
      state.GoogleSendEmailTo_EmailObject = GoogleSendEmailTo_EmailObject;
    },

    setGithub_RepositoryNameForAction(state, Github_RepositoryNameForAction) {
      state.Github_RepositoryNameForAction = Github_RepositoryNameForAction;
    },
    setGithub_OrganisationNameForAction(state, Github_OrganisationNameForAction) {
      state.Github_OrganisationNameForAction = Github_OrganisationNameForAction;
    },

    setGithub_RepositoryNameForReaction(state, Github_RepositoryNameForReaction) {
      state.Github_RepositoryNameForReaction = Github_RepositoryNameForReaction;
    },
    setGithub_OrganisationNameForReaction(state, Github_OrganisationNameForReaction) {
      state.Github_OrganisationNameForReaction = Github_OrganisationNameForReaction;
    },

    setGithubAddMemberToRepo_Member(state, GithubAddMemberToRepo_Member) {
      state.GithubAddMemberToRepo_Member = GithubAddMemberToRepo_Member;
    },
    setGithubAddMemberToRepo_Role(state, GithubAddMemberToRepo_Role) {
      state.GithubAddMemberToRepo_Role = GithubAddMemberToRepo_Role;
    },

    setDiscordSendMessage_Body(state, DiscordSendMessage_Body) {
      state.DiscordSendMessage_Body = DiscordSendMessage_Body;
    },

    setSpotify_PlaylistName(state, Spotify_PlaylistName) {
      state.Spotify_PlaylistName = Spotify_PlaylistName;
    },
    setSpotify_SongUrl(state, Spotify_SongUrl) {
      state.Spotify_SongUrl = Spotify_SongUrl;
    },
    setSpotifyCreatePlaylist_PlaylistName(state, SpotifyCreatePlaylist_PlaylistName) {
      state.SpotifyCreatePlaylist_PlaylistName = SpotifyCreatePlaylist_PlaylistName;
    },

    setTwitchStreamerIsLive_StreamerName(state, TwitchStreamerIsLive_StreamerName) {
      state.TwitchStreamerIsLive_StreamerName = TwitchStreamerIsLive_StreamerName;
    },
    setTwitch_UserPseudo(state, Twitch_UserPseudo) {
      state.Twitch_UserPseudo = Twitch_UserPseudo;
    },
    setTwitch_ChanelName(state, Twitch_ChanelName) {
      state.Twitch_ChanelName = Twitch_ChanelName;
    },
  },
  actions: {
    updateUserToken({ commit }, token) {
      commit('setUserToken', token);
    },
    updateActionChoose({ commit }, action_choose) {
      commit('setActionChoose', action_choose);
    },
    updateReactionChoose({ commit }, reaction_choose) {
      commit('setReactionChoose', reaction_choose);
    },
    updateServiceAction({ commit }, service_action) {
      commit('setServiceAction', service_action);
    },
    updateServiceReaction({ commit }, service_reaction) {
      commit('setServiceReaction', service_reaction);
    },
    updateActReac({ commit }, act_reac) {
      commit('setActReac', act_reac);
    },

    updateGoogle_Token({ commit }, google_token) {
      commit('setGoogle_Token', google_token);
    },
    updateGithub_Token({ commit }, github_token) {
      commit('setGithub_Token', github_token);
    },
    updateSpotify_Token({ commit }, spotify_token) {
      commit('setSpotify_Token', spotify_token);
    },
    updateTwitch_Token({ commit }, twitch_token) {
      commit('setTwitch_Token', twitch_token);
    },

    ///////////////////////////////
    ///variable for action or reaction
    updateTimerEveryXSec_Interval({ commit }, TimerEveryXSec_Interval) {
      commit('setTimerEveryXSec_Interval', TimerEveryXSec_Interval);
    },
    updateTimerAtTime_Time({ commit }, TimerAtTime_Time) {
      commit('setTimerAtTime_Time', TimerAtTime_Time);
    },

    updateOpenWeather_Temp({ commit }, OpenWeather_Temp) {
      commit('setOpenWeather_Temp', OpenWeather_Temp);
    },
    updateOpenWeather_City({ commit }, OpenWeather_City) {
      commit('setOpenWeather_City', OpenWeather_City);
    },
    updateOpenWeather_Humidity({ commit }, OpenWeather_Humidity) {
      commit('setOpenWeather_Humidity', OpenWeather_Humidity);
    },
    updateOpenWeather_airQuality({ commit }, OpenWeather_airQuality) {
      commit('setOpenWeather_airQuality', OpenWeather_airQuality);
    },

    updateGoogleReceiveEmailFrom_SenderEmail({ commit }, GoogleReceiveEmailFrom_SenderEmail) {
      commit('setGoogleReceiveEmailFrom_SenderEmail', GoogleReceiveEmailFrom_SenderEmail);
    },
    updateGoogle_SenderEmail({ commit }, Google_SenderEmail) {
      commit('setGoogle_SenderEmail', Google_SenderEmail);
    },


    updateGoogleSendEmailTo_myEmail({ commit }, GoogleSendEmailTo_myEmail) {
      commit('setGoogleSendEmailTo_myEmail', GoogleSendEmailTo_myEmail);
    },
    updateGoogleSendEmailTo_ReceiverEmail({ commit }, GoogleSendEmailTo_ReceiverEmail) {
      commit('setGoogleSendEmailTo_ReceiverEmail', GoogleSendEmailTo_ReceiverEmail);
    },
    updateGoogleSendEmailTo_EmailBody({ commit }, GoogleSendEmailTo_EmailBody) {
      commit('setGoogleSendEmailTo_EmailBody', GoogleSendEmailTo_EmailBody);
    },
    updateGoogleSendEmailTo_EmailObject({ commit }, GoogleSendEmailTo_EmailObject) {
      commit('setGoogleSendEmailTo_EmailObject', GoogleSendEmailTo_EmailObject);
    },

    updateGithub_RepositoryNameForAction({ commit }, Github_RepositoryNameForAction) {
      commit('setGithub_RepositoryNameForAction', Github_RepositoryNameForAction);
    },
    updateGithub_OrganisationNameForAction({ commit }, Github_OrganisationNameForAction) {
      commit('setGithub_OrganisationNameForAction', Github_OrganisationNameForAction);
    },

    updateGithub_RepositoryNameForReaction({ commit }, Github_RepositoryNameForReaction) {
      commit('setGithub_RepositoryNameForReaction', Github_RepositoryNameForReaction);
    },
    updateGithub_OrganisationNameForReaction({ commit }, Github_OrganisationNameForReaction) {
      commit('setGithub_OrganisationNameForReaction', Github_OrganisationNameForReaction);
    },

    updateGithubAddMemberToRepo_Member({ commit }, GithubAddMemberToRepo_Member) {
      commit('setGithubAddMemberToRepo_Member', GithubAddMemberToRepo_Member);
    },
    updateGithubAddMemberToRepo_Role({ commit }, GithubAddMemberToRepo_Role) {
      commit('setGithubAddMemberToRepo_Role', GithubAddMemberToRepo_Role);
    },

    updateDiscordSendMessage_Body({ commit }, DiscordSendMessage_Body) {
      commit('setDiscordSendMessage_Body', DiscordSendMessage_Body);
    },

    updateSpotify_PlaylistName({ commit }, Spotify_PlaylistName) {
      commit('setSpotify_PlaylistName', Spotify_PlaylistName);
    },
    updateSpotify_SongUrl({ commit }, Spotify_SongUrl) {
      commit('setSpotify_SongUrl', Spotify_SongUrl);
    },
    updateSpotifyCreatePlaylist_PlaylistName({ commit }, SpotifyCreatePlaylist_PlaylistName) {
      commit('setSpotifyCreatePlaylist_PlaylistName', SpotifyCreatePlaylist_PlaylistName);
    },

    updateTwitchStreamerIsLive_StreamerName({ commit }, TwitchStreamerIsLive_StreamerName) {
      commit('setTwitchStreamerIsLive_StreamerName', TwitchStreamerIsLive_StreamerName);
    },
    updateTwitch_UserPseudo({ commit }, Twitch_UserPseudo) {
      commit('setTwitch_UserPseudo', Twitch_UserPseudo);
    },
    updateTwitch_ChanelName({ commit }, Twitch_ChanelName) {
      commit('setTwitch_ChanelName', Twitch_ChanelName);
    },

  },
  getters: {
    getUserToken: (state) => state.userToken,
    getActionChoose: (state) => state.action_choose,
    getReactionChoose: (state) => state.reaction_choose,
    getServiceAction: (state) => state.service_action,
    getServiceReaction: (state) => state.service_reaction,
    getActReac: (state) => state.act_reac,

    getGoogle_Token: (state) => state.google_token,
    getGithub_Token: (state) => state.github_token,
    getSpotify_Token: (state) => state.spotify_token,
    getTwitch_Token: (state) => state.twitch_token,

    ///////////////////////////////
    ///variable for action or reaction
    getTimerEveryXSec_Interval: (state) => state.TimerEveryXSec_Interval,
    getTimerAtTime_Time: (state) => state.TimerAtTime_Time,

    getOpenWeather_Temp: (state) => state.OpenWeather_Temp,
    getOpenWeather_City: (state) => state.OpenWeather_City,
    getOpenWeather_Humidity: (state) => state.OpenWeather_Humidity,
    getOpenWeather_airQuality: (state) => state.OpenWeather_airQuality,

    getGoogleReceiveEmailFrom_SenderEmail: (state) => state.GoogleReceiveEmailFrom_SenderEmail,
    getGoogle_SenderEmail: (state) => state.Google_SenderEmail,
  
    getGoogleSendEmailTo_EmailBody: (state) => state.GoogleSendEmailTo_EmailBody,
    getGoogleSendEmailTo_myEmail: (state) => state.GoogleSendEmailTo_myEmail,
    getGoogleSendEmailTo_ReceiverEmail: (state) => state.GoogleSendEmailTo_ReceiverEmail,
    getGoogleSendEmailTo_EmailObject: (state) => state.GoogleSendEmailTo_EmailObject,

    getGithub_RepositoryNameForAction: (state) => state.Github_RepositoryNameForAction,
    getGithub_OrganisationNameForAction: (state) => state.Github_OrganisationNameForAction,

    getGithub_RepositoryNameForReaction: (state) => state.Github_RepositoryNameForReaction,
    getGithub_OrganisationNameForReaction: (state) => state.Github_OrganisationNameForReaction,

    getGithubAddMemberToRepo_Member: (state) => state.GithubAddMemberToRepo_Member,
    getGithubAddMemberToRepo_Role: (state) => state.GithubAddMemberToRepo_Role,
  
    getDiscordSendMessage_Body: (state) => state.DiscordSendMessage_Body,

    getSpotify_PlaylistName: (state) => state.Spotify_PlaylistName,
    getSpotify_SongUrl: (state) => state.Spotify_SongUrl,
    getSpotifyCreatePlaylist_PlaylistName: (state) => state.SpotifyCreatePlaylist_PlaylistName,
  },
});

const app = createApp(App);

app.use(store);

// app.use(GoogleSignInPlugin, {
//     clientId: '447998894360-217d87m20ep2j0f13iec8hocatt2ua5l.apps.googleusercontent.com'
//     //site google personnel => faire un projet et souhaite possibiliter connecter avec google donc give me access to google setting
// })

app.use(router).mount('#app');