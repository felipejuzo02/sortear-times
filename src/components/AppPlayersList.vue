<template>
  <ul class="app-players-list">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="app-players-list__item"
    >
      <p>{{ item.name }}</p>


      <button
        class="actions-button app-players-list__btns"
        type="button"
        @click="$emit('onClickRemove', index)"
      >
        <span class="material-symbols-outlined">remove</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppPlayersList',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  emits: ['onClickRemove']
}
</script>

<style lang="scss">
.app-players-list {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }

  &__btns {
    position: relative;

    &:hover .app-players-list__tooltip {
      display: block;
    }
  }
  
  &__tooltip {
    position: absolute;
    bottom: 0rem;
    left: -4rem;
    display: none;

    background-color: #ddd6d6;
    padding: .4rem .6rem;
    border-radius: .4rem;
  }
}
</style>