<template>
  <div class="flex flex-wrap">
    <div
      class="flex flex-wrap rounded-md justify-center mt-5 mx-auto bg-white w-2/3"
    >
      <div class="w-full flex-wrap flex justify-center items-center">
        <font-awesome-icon icon="fa-solid fa-user" class="text-6xl p-2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  middleware: 'logged',
  data() {
    return {}
  },
}
</script>

<style scoped></style>
