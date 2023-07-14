<template>
  <div class="app-team-card">
    <header class="app-team-card__title">{{ formattedTeamName }}</header>

    <ul class="app-team-card__list">
      <li
        v-for="(player, index) in team"
        :key="index"
        class="app-team-card__item"
      >
        <p>{{ player.name }}</p>

        <button class="app-team-card__actions-button" @click="$emit('onHandleLock', player)">
          <span
            :class="getLockIconColor(player)"
            class="material-symbols-outlined"
          >
            {{ lockIcon(player) }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppTeamCard',

  props: {
    team: {
      type: Object,
      default: () => ({})
    },

    teamName: {
      type: String,
      default: ''
    }
  },

  emits: ['onHandleLock'],

  computed: {
    formattedTeamName () {
      const teamNumber = Number(this.teamName.replace(/[^0-9]/g,''));

      return `Time ${teamNumber + 1}`
    }
  },

  methods: {
    lockIcon ({ locked }) {
      return locked ? 'lock' : 'lock_open'
    },

    getLockIconColor ({ locked }) {
      return locked && 'app-team-card__locked'
    }
  }
}
</script>

<style lang="scss">
.app-team-card {
  border-radius: 1em;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.42);
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.42);
  
  &__title {
    color: $white;
    text-align: center;
    border-radius: 1em 1em 0 0;
    background-color: $primary;
    padding: 1em 0;
  }

  &__actions-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
  }

  &__locked {
    color: $primary;
  }
}
</style>