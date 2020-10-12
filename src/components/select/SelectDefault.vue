<template>
  <div class="select-box">
    <select name="select-default" id="select" @change="$emit('select', $event.target.value)">
      <option value="" disabled selected>Selecione um filtro</option>
      <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
});
</script>

<style lang="scss">
select {
  border-radius: none;
  background: none;
}
.select-box {
  select {
    border-radius: 2rem;
    border: 1px solid var(--color-input-border);
    min-height: 50px;
    min-width: 200px;
    background-color: var(--color-select-background);
    font-size: 1.9rem;
    &:focus {
      outline-style: none;
    }
  }
}
</style>
