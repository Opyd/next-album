<template>
  <div class="flex w-full justify-center">
    <div class="w-1/4 flex justify-center">
      <img
        class="m-5 rounded-t-lg border-t-8 shadow-md border-black w-12"
        :src="img"
      />
    </div>
    <div class="w-1/4 flex items-center">
      <p>{{ author }}</p>
    </div>
    <div class="w-1/4 flex items-center">
      <p>{{ title }}</p>
    </div>
    <div class="w-1/4 flex items-center">
      <p>{{ releaseDate }}</p>
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
  },
}
</script>

<style scoped></style>
