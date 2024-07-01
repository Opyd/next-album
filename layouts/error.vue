<template>
  <div class="text-white m-auto text-center mt-10">
    <font-awesome-icon
      icon="fa-solid fa-bug"
      class="text-4xl"
    ></font-awesome-icon>
    <h1 v-if="error.statusCode === 404">Page not found!</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink
      to="/"
      class="bg-green-500 hover:bg-green-700 transition duration-300 rounded m-2 px-5"
      >Home page</NuxtLink
    >
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'default',
  props: ['error'],
}
</script>

<style scoped></style>
