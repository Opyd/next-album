<template>
  <div
    class="flex w-full justify-center h-24 bg-black shadow-2xl text-white rounded-md bg-opacity-70 mb-1"
  >
    <div class="w-1/5 flex justify-center items-center">
      <transition name="fade">
        <img
          v-show="imgLoaded"
          class="m-5 rounded-lg shadow-md h-20"
          :src="img"
          @load="onImgLoaded"
          @error="$event.target.src = 'https://via.placeholder.com/150'"
        />
      </transition>
      <div v-if="!imgLoaded">
        <svg
          class="animate-spin h-10 fill-current text-green-500 block m-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="w-1/5 flex items-center">
      <p>
        {{ author.length < 40 ? author : author.substring(0, 50) + '...' }}
      </p>
    </div>
    <div class="w-1/5 flex items-center justify-center text-center">
      <p>
        {{ title.length < 40 ? title : title.substring(0, 50) + '...' }}
      </p>
    </div>
    <div class="w-1/5 flex items-center justify-center">
      <p>{{ releaseDate }}</p>
    </div>
    <div class="w-1/5 flex items-center justify-center">
      <button
        class="px-5 py-1 bg-green-500 hover:bg-green-700 rounded-md transition"
        @click="addToList"
      >
        <p>Add to</p>
        <p>list</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultRow',
  components: {},
  props: {
    title: String,
    author: String,
    releaseDate: String,
    img: String,
    id: String,
  },
  data() {
    return {
      imgLoaded: false,
    }
  },
  methods: {
    onImgLoaded() {
      this.imgLoaded = true
    },
    addToList() {
      this.$emit('addAlbum', this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
