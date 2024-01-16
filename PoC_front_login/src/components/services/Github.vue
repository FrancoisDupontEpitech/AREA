<template>
  <div v-if="this.act_reac === 'action'">
    <div class="event-selector">
      <h2>Select an Event</h2>
      <ul>
        <div>
          <input type="text" v-model="this.Github_OrganisationAction" placeholder="Set Organisation">
          <input type="text" v-model="this.Github_RepositoryAction" placeholder="Set repository">
          <br/>

          <button @click="setGithubNewCommit(Github_OrganisationAction, Github_RepositoryAction)">Wanna check if New Commit is made</button>
          <button @click="setGithubNewBranch(Github_OrganisationAction, Github_RepositoryAction)">Wanna check when New Branch is made</button>
          <button @click="setGithubNewMember(Github_OrganisationAction, Github_RepositoryAction)">Wanna check when a new member is add</button>
        </div>
        <!-- githubdeletememberofrepos -->
      </ul>
    </div>
  </div>

  <div v-if="this.act_reac === 'reaction'">
    <div class="event-selector">
      <li v-for="reaction in Github_reaction" :key="reaction">
        <button @click="ReactionChoose(reaction)">{{ reaction }}</button>
      </li>
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
    'setGithubAddMemberToRepo_Member', 'setGithubAddMemberToRepo_Role',
    'setGithub_RepositoryNameForAction', 'setGithub_OrganisationNameForAction',
    'setGithub_RepositoryNameForReaction', 'setGithub_OrganisationNameForReaction']),
  
    ...mapState(['act_reac', 'action_choose', 'reaction_choose',
    'GithubAddMemberToRepo_Member', 'GithubAddMemberToRepo_Role',
    'Github_RepositoryNameForAction', 'Github_OrganisationNameForAction',
    'Github_RepositoryNameForReaction', 'Github_OrganisationNameForReaction'])
  },
  
  data() {
    return {
      Github_reaction: ['GithubAddRepo', 'GithubAddMemberToRepo', 
      'GithubDeleteMemberOfRepos'],

      Github_RepositoryAction: '',
      Github_OrganisationAction: '',
      
      Github_RepositoryReaction: '',
      Github_OrganisationReaction: '',
      
      GithubAddRepo_Member: '',
      GithubAddRepo_Role: '',
    };
  },
  
  methods: {
    goToChooseActRea() {
      this.$router.push(`/area/${this.act_reac}`);
    },
    /// Action
    setGithubNewCommit(orga, repo) {
      if (repo === '')
        alert('repository or organisation is empty')
      else {
        this.$store.commit('setGithub_RepositoryNameForAction', repo);
        this.$store.commit('setGithub_OrganisationNameForAction', orga);
        this.$store.commit('setActionChoose', 'GithubNewRepoCommit');
        console.log(this.Github_RepositoryNameForAction);
        console.log(this.Github_OrganisationNameForAction);
        console.log(this.action_choose);
      }
    },

    setGithubNewBranch(orga, repo) {
      if (repo === '')
        alert('repository or organisation is empty')
      else {
        this.$store.commit('setGithub_RepositoryNameForAction', repo);
        this.$store.commit('setGithub_OrganisationNameForAction', orga);
        this.$store.commit('setActionChoose', 'GithubNewBranch');
        console.log(this.Github_RepositoryNameForAction);
        console.log(this.Github_OrganisationNameForAction);
        console.log(this.action_choose);
        this.$router.push('/area');
      }
    },

    setGithubNewMember(orga, repo) {
      if (repo === '')
        alert('repository or organisation is empty')
      else {
        this.$store.commit('setGithub_RepositoryNameForAction', repo);
        this.$store.commit('setGithub_OrganisationNameForAction', orga);
        this.$store.commit('setActionChoose', 'GithubNewRepoMember');
        console.log(this.Github_RepositoryNameForAction);
        console.log(this.Github_OrganisationNameForAction);
        console.log(this.action_choose);
        this.$router.push('/area');
      }
    },

    /// Reaction
    addMemberGithub(member, role) {
      this.$store.commit('setGithubAddMemberToRepo_Member', member);
      this.$store.commit('setGithubAddMemberToRepo_Role', role);
      console.log(this.GithubAddMemberToRepo_Member);
      console.log(this.GithubAddMemberToRepo_Role);
      this.$router.push('/area');
    },

    ReactionChoose(reaction) {
      this.$store.commit('setReactionChoose', reaction);
      console.log(this.reaction_choose);
      this.$router.push('/area');
    },
  },
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