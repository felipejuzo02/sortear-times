<template>
  <button
    class="app-floating-button"
    type="button"
  >
    <span class="material-symbols-outlined">refresh</span>
  </button>
</template>

<script>
export default {
  name: 'AppFloatingButton',

  props: {
    tooltip: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.app-floating-button {
  width: 60px;
  height: 60px;
  flex-shrink: 0;

  color: white;
  border: none;
  border-radius: 60px;
  background: $primary;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background-color: $hover;
  }
}
</style>