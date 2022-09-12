<template>
  <div class="container z-50 flex-wrap md:w-2/3 sm:w-full flex">
    <div class="flex w-full justify-end p-2 items-center bg-white rounded-t-md">
      <font-awesome-icon
        icon="fa-solid fa-circle-xmark"
        class="cursor-pointer"
        @click="$emit('showSearching', false)"
      />
    </div>
    <div
      class="flex w-full justify-center p-2 items-center bg-white rounded-b-md"
    >
      <font-awesome-icon icon="fa-magnifying-glass" class="mr-2" />
      <input
        v-model.lazy="query"
        type="text"
        class="w-full px-5 py-2 rounded-2xl border border-gray-700"
      />
    </div>
    <div class="flex flex-wrap w-full border-t mt-3 pt-3">
      <p v-if="noResults" class="m-auto text-white text-2xl font-extrabold">
        No matches!
      </p>
      <ResultRow
        v-for="album in currentAlbums"
        :id="album.id"
        :key="album.id"
        :title="album.title"
        :release-date="album.date"
        :author="album['artist-credit'][0].artist.name"
        :img="'https://coverartarchive.org/release/' + album.id + '/front-250'"
        @addAlbum="addAlbum"
      />
    </div>
    <div
      v-if="currentAlbums.length !== 0"
      class="flex flex-wrap w-full justify-center items-center text-2xl text-white"
    >
      <p v-if="offset > 0" class="cursor-pointer" @click="prevAlbums">
        {{ '<' }}
      </p>
      <p class="cursor-pointer" @click="nextAlbums">{{ '>' }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ResultRow from '~/components/lists/ResultRow'
export default {
  name: 'SearchModal',
  components: { ResultRow },
  data() {
    return {
      query: '',
      currentAlbums: [],
      offset: 0,
      noResults: false,
    }
  },
  watch: {
    async query(newVal) {
      try {
        this.currentAlbums = await this.getAlbum(newVal, 0)
      } catch (e) {}
    },
  },
  methods: {
    addAlbum(value) {
      const album = this.currentAlbums.filter((a) => a.id === value)
      this.$emit('addAlbum', album[0])
    },
    async nextAlbums() {
      this.offset += 6
      this.currentAlbums = await this.getAlbum(this.query, this.offset)
    },
    async prevAlbums() {
      this.offset -= 1
      this.currentAlbums = await this.getAlbum(this.query, this.offset)
    },
    async getAlbum(query, offset) {
      try {
        const res = await axios.get(
          `https://musicbrainz.org/ws/2/release?query=${query}&limit=6&offset=${offset}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        if (res.data.releases.length === 0) {
          this.noResults = true
        } else {
          this.noResults = false
        }
        return res.data.releases
      } catch (e) {
        this.$toast.error('Error occurred')
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
