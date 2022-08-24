<template>
  <div
    class="bg-white md:w-1/5 mx-5 my-2 sm:w-1/3 p-2 rounded-md flex flex-wrap"
  >
    <div class="flex w-full border-b-2">
      <div class="w-3/5 flex mb-1">
        <span class="text-sm text-gray-500 italic pr-2">Finished:</span>
        <font-awesome-icon
          :icon="list.finished ? 'fa-solid fa-check' : 'fa-solid fa-xmark'"
          :class="list.finished ? 'text-green-500' : 'text-yellow-500'"
        />
      </div>
      <div class="w-1/5">
        <div class="flex justify-end cursor-pointer">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </div>
      </div>
      <div class="w-1/5 flex justify-center cursor-pointer">
        <font-awesome-icon
          icon="fa-solid fa-circle-minus"
          class="text-red-500"
          @click="removeList"
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
        :event="disabled ? '' : 'click'"
        :to="{ name: list, params: { id: list._id } }"
        :class="disabled ? ['cursor-not-allowed', 'bg-gray-500'] : ''"
        type="button"
        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Open
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListShort',
  props: {
    list: Object,
    disabled: Boolean,
  },
  methods: {
    removeList() {
      try {
        const res = axios.delete(
          `http://localhost:3100/v1/lists/${this.list._id}`,
          {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
          }
        )
        console.log(res.data)
        this.$emit('removeList', this.list._id)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped></style>
