<template>
  <div class="input-group">
    <input type="button" value="-" class="button" data-field="quantity" @click="minus()" />
    <input
      type="number"
      step="1"
      min="1"
      max="24"
      name="quantity"
      class="quantity-field"
      :value="portionView"
      @input="$emit('input', $event.target.value)"
    />
    <input type="button" value="+" class="button" data-field="quantity" @click="plus()" />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    value: Number
  },
  setup(props, { emit }) {
    const portion = ref(props.value);
    const portionView = computed(() => portion.value);
    function plus() {
      portion.value++;
      emit('input', portion.value);
    }
    function minus() {
      if (portion.value > 1) portion.value--;
      emit('input', portion.value);
    }
    return { portion, portionView, plus, minus };
  }
});
</script>

<style lang="scss">
.input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
  input,
  textarea {
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    margin: 0;
    outline: none;
    padding: 10px;
  }
  .button {
    cursor: pointer;
    -webkit-appearance: button;
    font-weight: bold;
    height: 38px;
    padding: 0;
    width: 38px;
    position: relative;
    border-radius: 50%;
    background: var(--color-primary);
    color: var(--color-secundary);
    &:hover {
      background: var(--color-primary-dark);
    }
  }
  .quantity-field {
    height: 38px;
    text-align: center;
    width: 62px;
    font-size: 1.8rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>