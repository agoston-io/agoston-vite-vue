<template>
  <AppMenu />
  <main class="mt-5">
    <div class="container mt-5 py-5">
      <div class="row justify-content-center mt-5">
        <div class="col-12">
          <h3>{{ $route.meta.pageTitle }}</h3>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view />
    </div>
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