<template>
  <div class="layout-auth">
    <div class="header-auth">
      <img src="/img/gethub_logo_branco.png" alt="logo" />
    </div>
    <div class="content">
      <router-view></router-view>
      <Navigation />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api';
import Navigation from '@/components/buttons/Navigation.vue';
export default defineComponent({
  components: {
    Navigation
  }
});
</script>

<style lang='scss'>
.header-auth {
  display: flex;
  width: 100vw;
  height: 10%;
  align-items: center;
  justify-content: center;

  background: var(--color-primary);

  img {
    min-width: 146px;
    min-height: 82px;
  }
}
.content {
  height: 90%;
}
</style>