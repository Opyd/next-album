<template>
  <div class="flex justify-center m-5">
    <div class="flex md:w-4/5 flex-wrap shadow-2xl sm:w-full">
      <div class="flex bg-white rounded-md flex-wrap md:w-1/3 sm:w-full">
        <div class="w-full flex justify-center items-center p-2">
          <font-awesome-icon icon="fa-solid fa-list" class="text-4xl" />
        </div>
        <div class="w-full flex justify-center items-center border-t-2 p-2">
          <p class="text-2xl">{{ list.name }}</p>
        </div>
        <div class="w-full flex flex-wrap mt-1 justify-center items-center">
          <span
            v-for="tag in list.tags"
            :key="tag"
            class="text-sm border-2 border-pink-100 rounded px-2"
            >{{ tag }}</span
          >
        </div>
        <div class="w-full flex flex-wrap mt-1 justify-center items-center">
          <span class="italic text-gray-500 text-sm">Created</span>
        </div>
        <div class="w-full flex flex-wrap mt-1 justify-center items-center">
          <span>{{ createdAt }}</span>
        </div>
        <div class="w-full flex flex-wrap mt-1 justify-center items-center">
          <span class="italic text-gray-500 text-sm">Updated</span>
        </div>
        <div class="w-full flex flex-wrap mt-1 justify-center items-center">
          <span>{{ updatedAt }}</span>
        </div>
      </div>
      <div
        class="flex-wrap md:pl-5 text-white md:w-2/3 sm:w-full overflow-auto h-128 max-h-128"
        style="display: flex; align-content: flex-start"
      >
        <div class="flex w-full h-10 justify-center border-b italic mb-1">
          <div class="w-1/4 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-image" />
          </div>
          <div class="w-1/5 flex items-center">
            <p>Author</p>
          </div>
          <div class="w-1/5 flex items-center justify-center">
            <p>Title</p>
          </div>
          <div class="w-1/5 flex items-center justify-center">
            <p>Release Date</p>
          </div>
          <div class="w-1/5 flex items-center justify-center">
            <p>More</p>
          </div>
        </div>
        <AlbumRow
          v-for="album in albumDetails"
          :id="album.id"
          :key="album.id"
          :author="album['artist-credit'][0]['artist']['name']"
          :title="album.title"
          :release-date="album.date"
          :img="album.img"
          @delAlbum="delAlbum"
        ></AlbumRow>

        <div v-if="albumDetails.length === 0" class="mx-auto">
          Nothing here!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AlbumRow from '~/components/lists/AlbumRow'
export default {
  name: 'OneListPage',
  components: { AlbumRow },
  middleware: 'logged',
  data() {
    return {
      list: {},
      albumDetails: [],
    }
  },
  computed: {
    createdAt() {
      return new Date(this.list.createdAt).toDateString()
    },
    updatedAt() {
      return new Date(this.list.updatedAt).toDateString()
    },
  },
  watch: {
    albumDetails() {
      const toastid = this.$toast.info(
        `Loading ${this.list.albums.length} albums from musicbrainz...`
      )
      if (this.list.albums.length === this.albumDetails.length) {
        this.$toast.update(toastid, { content: 'All loaded' })
      }
    },
  },
  created() {
    this.getList()
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

        this.loadAllAlbums()
      } catch (e) {
        console.log(e)
      }
    },
    async getAlbumData(mbid) {
      try {
        const res = await axios.get(
          `https://musicbrainz.org/ws/2/release/${mbid}?inc=artist-credits`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        const data = res.data
        data.img = `https://coverartarchive.org/release/${mbid}/front-250`
        this.albumDetails.push(data)
      } catch (e) {
        console.log(e)
      }
    },
    loadAllAlbums() {
      this.list.albums.forEach((mbid, i) => {
        setTimeout(async () => {
          await this.getAlbumData(mbid)
        }, i * 1500)
      })
    },
    async delAlbum(value) {
      try {
        const res = await axios.delete(
          `http://localhost:3100/v1/lists/${this.list._id}/${value}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `${this.$auth.strategy.token.get()}`,
            },
          }
        )
        if (res.status === 200) {
          this.albumDetails = this.albumDetails.filter(
            (val) => val.id !== value
          )
          this.$toast.success('Sucessfully deleted!')
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped></style>
