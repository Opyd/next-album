<template>
  <div
    class="flex w-full justify-center h-24 bg-black rounded-md bg-opacity-50 mb-1"
  >
    <div class="w-1/4 flex justify-center items-center">
      <img
        class="m-5 rounded-t-lg border-t-8 shadow-md border-black h-20"
        :src="img"
      />
    </div>
    <div class="w-1/5 flex items-center">
      <p>{{ author }}</p>
    </div>
    <div class="w-1/5 flex items-center">
      <p>{{ title }}</p>
    </div>
    <div class="w-1/5 flex items-center">
      <p>{{ releaseDate }}</p>
    </div>
    <div class="w-1/5 flex items-center justify-around">
      <a :href="'https://musicbrainz.org/release/' + id" target="_blank">
        <font-awesome-icon icon="fa-solid fa-circle-info"
      /></a>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        class="text-red-500 cursor-pointer"
        @click="$emit('delAlbum', id)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumRow',
  props: {
    title: String,
    author: String,
    releaseDate: String,
    img: String,
    id: String,
  },
}
</script>

<style scoped></style>
