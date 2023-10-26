<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">

        <router-link class="-m-1.5 p-1.5" :to="{ name: 'AppLandingPage' }">
          <span class="sr-only">Amazing App</span>
          <span>Amazing App</span>
        </router-link>

      </div>
      <div class="lg:flex lg:gap-x-12">
        <router-link class="text-sm font-semibold leading-6 text-gray-900"
          :to="{ name: 'AppLogin' }">Profile</router-link>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">My to-do list</a>
      </div>
      <div class="lg:flex lg:flex-1 lg:justify-end">
        <div v-if="!$agostonClient.isAuthenticated()">
          <router-link class="fw-bold" :to="{ name: 'AppLogin' }">Log in <span
              aria-hidden="true">&rarr;</span></router-link>
        </div>
        <div v-else>
          <router-link class="text-sm font-semibold leading-6 text-gray-900" :to="{ name: 'AppLogin' }"><span
              class="fw-bold me-1">{{ $session.auth_subject }}</span></router-link>
          | <a class="fw-bold" href="#" @click="$agostonClient.logout({ options: { redirectLogout: '/' } })">Logout</a>
        </div>
      </div>

    </nav>
  </header>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>