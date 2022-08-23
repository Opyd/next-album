<template>
  <div>
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "~/components/utils/NavBar";
export default {
  name: 'DefaultTemplate',
  components: {NavBar},
}
</script>

<style lang="scss">
html {
  font-family: 'Poppins', sans-serif;
}
body {
  background-color: #082032;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
