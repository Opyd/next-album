<template>
  <div class="flex w-full justify-center m-5">
    <div class="flex bg-white overflow-hidden w-4/5 flex-wrap">
      <div class="flex flex-wrap border-2 md:w-1/3 sm:w-full">
        <div class="w-full flex justify-center items-center p-2">
          <font-awesome-icon icon="fa-solid fa-list" class="text-4xl" />
        </div>
        <div class="w-full flex justify-center items-center border-t-2 p-2">
          <p>{{ list.name }}</p>
        </div>
      </div>
      <div class="flex flex-wrap border-2 md:w-2/3 sm:w-full">
        <p v-for="album in list.albums" class="w-full">{{ album }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OneListPage',
  middleware: 'logged',
  data() {
    return {
      list: null,
    }
  },
  async created() {
    await this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await axios.get(
          `http://localhost:3100/v1/lists/${this.$route.params.list}`,
          {
            headers: {
              Authorization: `${this.$auth.strategy.token.get()}`,
            },
          }
        )
        this.list = res.data
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped></style>
