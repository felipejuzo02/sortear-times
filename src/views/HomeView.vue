<template>
  <main class="container page-home-view">
    <img
      alt="Logo"
      src="../assets/logo.svg"
    >

    <app-button
      data-cy="draw-teams-btn"
      label="Sortear times"
      :loading="loading"
      @click="onClickButton"
    />

    <div class="page-home-view__ads">
      Google ADS
    </div>
  </main>
</template>

<script>
import AppButton from '../components/AppButton.vue';

export default {
  name: 'HomeView',

  components: {
    AppButton
  },

  data () {
    return {
      loading: false
    }
  },

  methods: {
    onClickButton () {
      try {
        this.loading = true

        this.$router.push({ name: 'PlayersAdd' })
      } catch {
        console.log('Errouu')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.page-home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  & > img {
    width: 100%;
    max-width: 220px;
    margin-bottom: 4em;
  }

  &__ads {
    position: absolute;
    bottom: 0;
  }
}
</style>