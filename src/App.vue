<template>
  <AppMenu />
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<script>
import AppMenu from './components/AppMenu.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: "App",
  components: {
    AppMenu: AppMenu,
    AppFooter: AppFooter
  },
};
</script>