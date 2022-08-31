<template>
  <div
    class="flex w-full justify-center h-24 bg-black rounded-md bg-opacity-50 mb-1"
  >
    <div class="w-1/5 flex justify-center items-center">
      <img class="m-5 rounded-lg shadow-md h-20" :src="img" />
    </div>
    <div class="w-1/5 flex items-center just">
      <p>{{ author }}</p>
    </div>
    <div class="w-1/5 flex items-center text-center">
      <p>{{ title }}</p>
    </div>
    <div class="w-1/5 flex items-center justify-center">
      <p>{{ releaseDate }}</p>
    </div>
    <div class="w-1/5 flex items-center justify-center">
      <a :href="'https://musicbrainz.org/release/' + id" target="_blank">
        <font-awesome-icon icon="fa-solid fa-circle-info"
      /></a>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        class="text-red-500 cursor-pointer pl-5"
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
