<template>
  <p>Tylko dla zarejestrowanego zioma</p>
</template>

<script>
export default {
  name: 'UserPage',
  middleware: 'logged',
}
</script>

<style scoped></style>
