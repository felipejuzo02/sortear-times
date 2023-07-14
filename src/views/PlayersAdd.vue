<template>
  <div class="page-players-add container">
    <div>
      <app-header title="Adicionar jogadores" />

      <p class="page-subtitle">Insira o nome dos jogares e quantidade de jogadores por time.</p>

      <div>
        <app-input
          class="page-players-add__input"
          v-model="player"
          label="Adicionar jogador..."
          use-add
          @on-click-add="onClickAdd"
          name="player"
        />

        <app-input
          v-model="playersQuantity"
          label="Quantidade de jogadores por time..."
          type="number"
        />
      </div>

      <app-players-list
        class="page-players-add__list" 
        :items="allPlayers"
        @on-click-remove="onClickRemove"
      />
    </div>

    <app-button
      class="page-players-add__button"
      label="Sortear"
      @click="onClickSort"
      :disabled="notEnoughPlayers"
      :loading="isLoadingSortButton"
    />
  </div>
</template>

<script>
import AppButton from '../components/AppButton.vue';
import AppHeader from '../components/AppHeader.vue';
import AppInput from '../components/AppInput.vue';
import AppPlayersList from '../components/AppPlayersList.vue';

import { useTeamsStore } from '@/stores/teams'
import { mapActions } from 'pinia';
import { drawTeams, normalizeTeams } from '../helpers/index.js'

export default {
  name: 'PlayersAdd',

  components: {
    AppHeader,
    AppButton,
    AppInput,
    AppPlayersList
  },

  data () {
    return {
      player: '',
      playersQuantity: null,
      allPlayers: [],
      isLoadingSortButton: false
    }
  },

  computed: {
    getIndexPlayer() {
      return this.allPlayers.length + 1
    },

    notEnoughPlayers () {
      return this.allPlayers.length < 4 || this.playersQuantity === null
    }
  },

  methods: {
    ...mapActions(useTeamsStore, ['setTeams']),

    onClickAdd () {
      if (this.player.length < 3) return

      this.allPlayers.push({ name: this.player, id: this.getIndexPlayer})
      this.resetPlayerModel()
    },

    onClickRemove (index) {
      this.allPlayers.splice(index, 1)
    },

    resetPlayerModel () {
      this.player = ''
    },

    onClickSort () {
      try {
        this.isLoadingSortButton = true

        const teams = drawTeams(this.allPlayers, this.playersQuantity)

        const normalizedTeams = normalizeTeams(teams)

        this.setTeams({ teams: normalizedTeams })
        this.$router.push({ name: 'PlayersTeams' })
      } catch {
        console.log('Deu erro ao ')
      } finally {
        this.isLoadingSortButton = false
      }
    },
    
    randomNumber (playersQuantity) {
      return Math.floor(Math.random() * playersQuantity)
    }
  }
}
</script>

<style lang="scss">
.page-players-add {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  &__input {
    margin-bottom: .6em;
  }

  &__button {
    margin-bottom: 1.5em;
  }

  &__list {
    margin: 1.5em 0;
  }
}
</style>