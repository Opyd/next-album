<template>
  <div
    class="bg-white md:w-1/5 mx-5 my-2 sm:w-1/3 p-2 rounded-md flex flex-wrap"
  >
    <div class="flex w-full border-b-2">
      <div class="w-3/5">
        <span class="text-sm text-gray-500 italic pr-1">Finished:</span>
        <font-awesome-icon
          :icon="list.finished ? 'fa-solid fa-check' : 'fa-solid fa-xmark'"
          :class="list.finished ? 'text-green-500' : 'text-yellow-500'"
        />
      </div>
    </div>
    <div class="w-full flex m-5 justify-center">
      <font-awesome-icon icon="fa-solid fa-music" class="text-4xl" />
    </div>
    <div class="w-full flex mt-1">
      <p class="mx-auto">{{ list.name }}</p>
    </div>
    <div class="w-full flex flex-wrap mt-1 justify-center">
      <span
        v-for="tag in list.tags"
        :key="tag"
        class="text-sm border-2 border-pink-100 rounded px-2"
        >{{ tag }}</span
      >
    </div>
    <div class="w-full flex mt-5">
      <span class="mx-auto">Nr. of albums: {{ list.albums.length }}</span>
    </div>
    <div class="w-full flex justify-center mt-5">
      <nuxt-link
        :to="{ name: list, params: { id: list._id } }"
        type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Open
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListShort',
  props: {
    list: Object,
  },
}
</script>

<style scoped></style>
