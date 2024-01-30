<template>
  <div class="container page-players-teams">
    <app-header title="Times sorteados" />

    <p class="page-subtitle">
      Caso queira sortear o time novamente, basta clicar no botão inferior.
    </p>

    <app-team-card
      v-for="(team, index) in drawnTeams"
      :key="index"
      class="page-players-teams__team-card"
      :class="revealClass"
      :team="team"
      :team-name="index"
      @on-handle-lock="handleLock"
    />

    <app-floating-button
      class="page-players-teams__floating-button"
      data-cy="redraw-button"
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
      drawnTeams: {},
      isRevealClasses: false
    }
  },

  computed: {
    ...mapState(useTeamsStore, ['teams']),

    revealClass () {
      return this.isRevealClasses && 'page-players-teams__team-card page-players-teams__team-card--reveal'
    }
  },

  created () {
    this.drawnTeams = Object.assign({}, this.teams)
    this.changeDataRevealClasses()
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
    },

    changeDataRevealClasses () {
      setTimeout(() => {
        this.isRevealClasses = true
      }, 200)
    }
  }
}
</script>

<style lang="scss">
.page-players-teams {
  padding-bottom: 16px;

  &__floating-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  &__team-card {
    opacity: 0;
    transition: all .2s ease-in;
    margin-bottom: 16px;

    &--reveal {
      opacity: 1;
    }
  }
}
</style>