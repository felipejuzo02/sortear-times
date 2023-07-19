<template>
  <header class="app-header">
    <button
      class="actions-button"
      type="button"
      @click="$router.go(-1)"
    >
      <span class="material-symbols-outlined">chevron_left</span>
    </button>

    <p class="app-header__title">
      {{ title }}
    </p>

    <button
      class="actions-button"
      :class="shareClasses"
      :disabled="!useShare"
      type="button"
      @click="onShareScreen"
    >
      <span class="material-symbols-outlined">share</span>
    </button>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',

  props: {
    title: {
      type: String,
      default: ''
    },

    useShare: {
      type: Boolean
    }
  },

  computed: {
    shareClasses () {
      return !this.useShare && 'app-header__share-visibility'
    }
  }
}
</script>

<style lang="scss">
.app-header {
  display: flex;
  justify-content: space-between;
  padding: 1.25em 0;

  &__share-visibility {
    cursor: default;
    opacity: 0;
  }

  &__title {
    font-weight: 600;
  }
}
</style>