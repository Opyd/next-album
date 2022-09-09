<template>
  <div>
    <SearchModal
      v-if="searching"
      @showSearching="searching = false"
      @addAlbum="addAlbum"
    ></SearchModal>
    <div
      :class="searching ? 'blur-bg' : 'unblur-bg'"
      class="flex justify-center m-5"
    >
      <div class="flex md:w-4/5 flex-wrap sm:w-full">
        <div class="flex bg-white rounded-md flex-wrap p-2 md:w-1/3 sm:w-full">
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
          <div class="w-full flex flex-wrap mt-1 justify-center items-center">
            <button
              class="text-white rounded-md px-5 py-2"
              :class="
                searching
                  ? 'cursor-not-allowed bg-gray-500'
                  : 'bg-green-500 hover:bg-green-600 transition'
              "
              :disabled="searching"
              @click.prevent="searching = !searching"
            >
              Add album
            </button>
          </div>
        </div>
        <div
          class="flex-wrap md:pl-5 text-white md:w-2/3 sm:w-full overflow-auto h-128 max-h-128"
          style="display: flex; align-content: flex-start"
        >
          <div
            class="flex w-full h-10 justify-center border-b text-gray-400 mb-1"
          >
            <div class="w-1/5 flex items-center justify-center">
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
          <transition-group class="w-full" name="slide">
            <AlbumRow
              v-for="album in albumDetails"
              :id="album.id"
              :key="album.id"
              :author="album['artist-credit'][0]['artist']['name']"
              :title="album.title"
              :release-date="album.date"
              :img="
                'https://coverartarchive.org/release/' + album.id + '/front-250'
              "
              @delAlbum="delAlbum"
            ></AlbumRow>
          </transition-group>
          <div v-if="albumDetails.length === 0" class="mx-auto">
            Nothing here!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AlbumRow from '~/components/lists/AlbumRow'
import SearchModal from '~/components/lists/SearchModal'
export default {
  name: 'OneListPage',
  components: { SearchModal, AlbumRow },
  middleware: 'logged',
  data() {
    return {
      list: {},
      albumDetails: [],
      searching: false,
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
      if (this.list.albums.length === this.albumDetails.length) {
        this.$toast.success('All loaded', { timeout: 2000 })
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await this.$axios.get(`lists/${this.$route.params.list}`, {
          headers: {
            Authorization: `${this.$auth.strategy.token.get()}`,
          },
        })
        this.list = res.data

        this.loadAllAlbums()
        this.$toast.info(
          `Loading ${this.list.albums.length} albums from musicbrainz...`
        )
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
        const res = await this.$axios.delete(
          `lists/${this.list._id}/${value}`,
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
    async addAlbum(value) {
      this.albumDetails.push(value)
      this.list.albums.push(value.id)
      try {
        await this.$axios.patch(
          `lists/${this.list._id}`,
          {
            albums: this.list.albums,
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `${this.$auth.strategy.token.get()}`,
            },
          }
        )
        this.$toast.success('Album added', { timeout: 2000 })
      } catch (e) {
        this.$toast.error('Something went wrong...')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
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
