<template>
  <button 
    class="app-button"
  >
    <span 
      v-if="loading" 
      class="material-symbols-outlined loading"
    >
      refresh
    </span>

    <p v-else>{{ formatedLabel }}</p>
  </button>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    label: {
      type: String,
      default: ''
    },

    loading: {
      type: Boolean
    }
  },

  computed: {
    formatedLabel () {
      return this.label.toUpperCase()
    }
  }
}
</script>

<style lang="scss">
.app-button {
  width: 100%;
  padding: 1rem;
  background-color: $primary;
  color: $white;
  border: none;
  border-radius: 26px;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover:not(:disabled) {
    background-color: $hover;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: rgba($color: $primary, $alpha: .4);
  }
}

.loading {
  font-size: 1.25em;
  animation: spinnerAnimation 1s infinite normal;
}

@keyframes spinnerAnimation {
  to {
    transform: rotate(360deg);
  }
}
</style>