<template>
  <div>
    <AddListModal
      v-if="showAddListModal"
      @list="addToListArray"
      @show="hideModal"
    ></AddListModal>
    <div :class="showAddListModal ? 'blur-bg' : 'unblur-bg'">
      <div class="flex m-3">
        <button
          class="bg-white rounded-full flex cursor-pointer"
          @click.prevent="showAddListModal = !showAddListModal"
        >
          <font-awesome-icon
            icon="fa-solid fa-plus"
            class="text-green-500 transition p-2 m-auto hover:text-green-700"
          ></font-awesome-icon>
        </button>
      </div>
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
          <ListShort
            v-for="list in lists"
            :key="list._id"
            :list="list"
            :disabled="showAddListModal"
            @removeList="removeList"
          ></ListShort>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ListShort from '~/components/lists/ListShort'
import LoadingIndicator from '~/components/utils/loading'
import AddListModal from '~/components/lists/AddListModal'
export default {
  name: 'ListPage',
  components: { AddListModal, LoadingIndicator, ListShort },
  middleware: ['logged'],
  data() {
    return {
      lists: [],
      reqFinished: false,
      showAddListModal: false,
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
    addToListArray(value) {
      this.lists.push(value)
      this.$toast.success('Created new list!')
    },
    hideModal(value) {
      this.showAddListModal = value
    },
    removeList(val) {
      this.lists = this.lists.filter((e) => e._id !== val)
      this.$toast.success('Successfully deleted list')
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
.blur-bg {
  transition: ease-out 300ms;
  filter: blur(10px) brightness(30%);
}
.unblur-bg {
  transition: ease-in 300ms;
  filter: none;
}
</style>
