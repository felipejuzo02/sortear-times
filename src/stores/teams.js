import { defineStore } from 'pinia'

export const useTeamsStore = defineStore('teams-store', {
  state: () => ({
    teams: {}
  }),

  getters: {
    getTeams: (state) => state.teams
  },

  actions: {
    setTeams ({ teams }) {
      this.teams = teams
    },
  },
})