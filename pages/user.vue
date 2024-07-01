<template>
  <div class="flex flex-wrap">
    <div class="flex flex-wrap rounded-md justify-center mt-5 mx-auto w-2/3">
      <div
        class="flex flex-col justify-center bg-white max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100"
      >
        <font-awesome-icon
          icon="fa-solid fa-user"
          class="text-6xl rounded-full"
        ></font-awesome-icon>
        <div class="space-y-4 text-center divide-y divide-gray-700">
          <div class="my-2 space-y-1">
            <h2 class="text-xl font-semibold sm:text-2xl">{{ name }}</h2>
            <p class="px-5 text-xs sm:text-base dark:text-gray-400">
              {{ email }}
            </p>
          </div>
          <div class="flex justify-center pt-2 space-x-4 align-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  middleware: 'logged',
  data() {
    return {
      name: '',
      email: '',
    }
  },
  created() {
    this.name = this.$auth.user.name
    this.email = this.$auth.user.email
  },
}
</script>

<style scoped></style>
