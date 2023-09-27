<template>
  <div class="app-input">
    <label>
      <span
        :id="name"
        class="app-input__label"
      >
        {{ label }}
      </span>

      <input
        class="app-input__input"
        :type="type"
        :value="modelValue"
        @focus="handleFocus"
        @focusout="handleFocusOut"
        @input="$emit('update:modelValue', $event.target.value)"
      >

      <button
        v-if="useAdd"
        class="app-input__add"
        data-cy="add-player-btn"
        :disabled="isDisabledAdd"
        type="button"
        @click="onClickAdd"
      >
        <span class="material-symbols-outlined">add</span>
      </button>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'number'].includes(value)
    },

    useAdd: {
      type: Boolean
    },

    isDisabledAdd: {
      type: Boolean
    }
  },

  emits: ['update:modelValue', 'onClickAdd'],

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    }
  },

  methods: {
    handleFocus ({ target }) {
      const label = target.previousElementSibling

      label.classList.add('app-input__label--active')
    },

    handleFocusOut ({ target }) {
      if (this.modelValue) return

      const label = target.previousElementSibling

      label.classList.remove('app-input__label--active')
    },

    onClickAdd ({ target }) {
      const button = target.classList.contains('material-symbols-outlined') 
        ? target.parentNode
        : target
      const input = button.previousElementSibling
      const label = input.previousElementSibling

      label.classList.remove('app-input__label--active')
      this.$emit('onClickAdd')
    }
  }
}
</script>

<style lang="scss">
.app-input {
  border-radius: 28px;
  position: relative;
  
  &__label {
    position: absolute;
    color: #b4b4b4;

    margin: 18px;
    cursor: text;
    transition: all .3s ease;

    // Bloquear seleção
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &--active {
      font-size: .8em;
      margin: 10px;
    }
  }
  
  &__add {
    position: absolute;
    right: 0;
    height: 100%;
    width: 4em;
    border-radius: 0 12px 12px 0;
    border: 1px solid $grey-1;
    cursor: pointer;
    color: $white;
    background-color: $primary;
  
    &:disabled {
      cursor: not-allowed;
      background-color: rgba($color: $primary, $alpha: .4);
    }
  }

  &__input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 28px 10px 10px;
    background-color: $white;
    border: 1px solid $grey-1;
    outline: none;
  }
}
</style>