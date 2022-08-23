<template>
  <div v-if="lists.length === 0">
    <loading-indicator />
  </div>
  <div v-else>
    <div v-if="reqFinished && lists.length === 0" class="flex">
      <span class="text-white text-lg mx-auto pt-10">
        There is nothing to show!
      </span>
    </div>
    <div
      v-if="reqFinished && lists.length !== 0"
      class="flex flex-wrap justify-center"
    >
      <ListShort v-for="list in lists" :key="list._id" :list="list"></ListShort>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ListShort from '@/components/lists/ListShort'
import LoadingIndicator from '@/components/utils/loading'
export default {
  name: 'ListPage',
  components: { LoadingIndicator, ListShort },
  data() {
    return {
      lists: [],
      reqFinished: false,
    }
  },
  mounted() {
    this.getUsersLists()
  },
  methods: {
    async getUsersLists() {
      try {
        const response = await axios.get('http://localhost:3100/v1/lists', {
          headers: {
            Authorization: `${this.$auth.strategy.token.get()}`,
          },
        })
        this.lists = response.data
        console.log(response.data)
        this.reqFinished = true
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
