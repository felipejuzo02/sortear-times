<template>
  <div class="page-players-teams container">
    <app-header title="Times sorteados" />

    <p class="page-subtitle">Caso queira sortear o time novamente, basta clicar no botão inferior.</p>

    <app-team-card
      class="page-players-teams__team-card"
      v-for="(team, index) in drawnTeams"
      :key="index"
      :team-name="index"
      :team="team"
      @on-handle-lock="handleLock"
    />

    <app-floating-button
      class="page-players-teams__floating-button"
      @click="onRedrawTeams"
    />
  </div>
</template>

<script>
import AppTeamCard from '../components/AppTeamCard.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFloatingButton from '../components/AppFloatingButton.vue'

import { useTeamsStore } from '@/stores/teams'
import { mapState } from 'pinia'
import { redrawTeams } from '../helpers/index'

export default {
  name: 'PlayersTeams',

  components: {
    AppTeamCard,
    AppHeader,
    AppFloatingButton
  },

  data () {
    return {
      drawnTeams: {}
    }
  },

  computed: {
    ...mapState(useTeamsStore, ['teams']),
  },

  created () {
    this.drawnTeams = Object.assign({}, this.teams)
  },

  methods: {
    handleLock (player) {
      const team = this.getPlayerTeam(player)

      let playerToChange = this.teams[team].find(element => element.id === player.id)

      playerToChange.locked = !playerToChange.locked
    },

    getPlayerTeam (player) {
      let teamName;

      for (const key in this.teams) {
        this.teams[key].forEach(team => {
          if (team.id === player.id) {
            teamName = key
          }
        })
      }

      return teamName;
    },

    onRedrawTeams () {
      this.drawnTeams = redrawTeams(this.drawnTeams)
    }
  }
}
</script>

<style lang="scss">
.page-players-teams {
  &__floating-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  &__team-card {
    margin-bottom: 16px;
  }
}
</style>