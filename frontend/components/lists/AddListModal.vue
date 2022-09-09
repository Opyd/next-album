<template>
  <form class="flex justify-center align-middle" @submit.prevent="createList">
    <div
      class="container bg-white z-50 p-1 flex-wrap rounded-md m-3 md:w-1/2 sm:w-1/2 flex"
    >
      <div class="w-full p-1 flex justify-end">
        <font-awesome-icon
          icon="fa-solid fa-circle-xmark"
          @click="$emit('show', false)"
        ></font-awesome-icon>
      </div>
      <div class="w-full border-b-2 text-xl font-bold p-1">
        <h1>Create new list</h1>
      </div>
      <div class="w-full p-1">
        <label>Title</label>
      </div>

      <div class="w-full p-1">
        <input v-model="title" type="text" class="border" required />
      </div>
      <div class="w-full p-1">
        <Label>Tags (separated by comma)</Label>
      </div>
      <div class="w-full p-1">
        <input v-model="currentTag" type="text" class="border" />
      </div>
      <div class="w-full flex flex-wrap justify-center">
        <div
          v-for="tag in tags"
          :key="tag"
          class="border-pink-100 border-2 rounded-md m-1 px-1 cursor-pointer flex"
        >
          <div class="w-3/4">
            {{ tag }}
          </div>
          <div
            class="ml-2 mr-1 w-1/4"
            @click="tags = tags.filter((e) => e !== tag)"
          >
            <font-awesome-icon
              icon="fa-solid fa-circle-minus"
              class="text-red-500"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="w-full mt-5">
        <input
          value="Add"
          type="submit"
          class="text-white w-1/3 cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        />
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddListModal',
  components: {},
  data() {
    return {
      title: '',
      currentTag: '',
      tags: [],
      error: false,
      errorMsg: '',
      success: false,
    }
  },
  watch: {
    currentTag(newValue) {
      if (newValue[newValue.length - 1] === ',') {
        this.tags.push(this.currentTag.slice(0, -1))
        this.currentTag = ''
      }
    },
  },
  methods: {
    async createList() {
      const options = {
        url: '/lists',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: this.$auth.strategy.token.get(),
        },
        data: {
          name: this.title,
          tags: this.tags,
        },
      }
      try {
        const res = await this.$axios(options)
        console.log(res.data)
        this.$emit('list', res.data)
        this.$emit('show', false)
      } catch (e) {
        console.log(e)
        this.errorMsg = e
        window.location.reload()
        this.$toast.error('Something went wrong')
      }
    },
  },
}
</script>

<style scoped>
.container {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  text-align: center;
}
</style>
