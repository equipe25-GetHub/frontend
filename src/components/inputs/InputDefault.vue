<template>
  <div class="input-block">
    <span v-if="icon != undefined" :class="`mdi mdi-${icon} icon`"></span>
    <input
      :type="type"
      :placeholder="title"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :required="required"
      class="input-default"
      :disabled="disabled"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    value: { type: [String, Number] },
    title: { type: String, required: true },
    icon: { type: String },
    required: { type: Boolean },
    disabled: { type: Boolean },
    type: { type: String }
  }
});
</script>

<style lang='scss'>
.input-block {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  .icon {
    position: relative;
    left: 35px;
    z-index: 1;
    font-size: 2rem;
  }
  .input-default {
    background: var(--color-input-background);
    border-radius: 2rem;
    min-height: 47px;
    min-width: 300px;
    font-size: 1.8rem;
    border: 1px solid var(--color-input-border);
    text-indent: 50px;
    margin-top: 20px;
    &:focus {
      border: none;
      outline-style: none;
    }
    &::placeholder {
      color: var(--color-input-placeholder);
    }
  }
}
</style>