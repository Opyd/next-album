<template>
  <div class="flex flex-wrap justify-center w-full">
    <div class="flex flex-wrap justify-center w-full mt-16 text-white">
      <div
        class="flex flex-wrap w-1/2 bg-black bg-opacity-50 rounded-md shadow-lg sm:p-5 md:p-20"
      >
        <div class="md:w-1/2 sm:w-full">
          <p class="w-full sm:text-2xl md:text-4xl">Discover music...</p>
          <p class="w-full sm:text-4xl md:text-6xl font-extrabold">
            easier<span class="animate-pulse text-green-500">.</span>
          </p>
        </div>
        <div class="sm:mt-5 md:w-1/2">
          <img src="~/assets/index/music.svg" />
        </div>
      </div>
    </div>
    <div class="flex w-full justify-center text-white mt-10">
      <p class="md:text-4xl sm:text-2xl">
        Create new playlists and fill them with albums!
      </p>
    </div>
    <div class="flex w-full justify-center text-white mt-10">
      <nuxt-link
        to="/auth/register"
        class="bg-green-500 pulse-animation rounded-md shadow-lg p-5 sm:w-3/5 md:w-1/3 text-center text-3xl font-extrabold"
      >
        <p>Get started</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style lang="scss">
.pulse-animation {
  animation: pulse 2s infinite 3s cubic-bezier(0.25, 0, 0, 1);
  box-shadow: 0 0 0 0 white;
}
@keyframes pulse {
  to {
    box-shadow: 0 0 0 18px rgba(255, 255, 255, 0);
  }
}
</style>
