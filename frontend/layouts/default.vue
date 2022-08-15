<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'DefaultTemplate',
}
</script>

<style lang="scss">
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
