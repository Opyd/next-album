<template>
  <div>
    <div v-if="lists.length === 0" class="flex">
      <span class="text-white text-lg mx-auto pt-10">
        There is nothing to show!
      </span>
    </div>
    <div
      v-for="(list, index) in lists"
      v-else
      :key="list._id"
      class="flex mt-5 flex-wrap justify-center"
    >
      <ListShort :list="list"></ListShort>
      <ListShort :list="list"></ListShort>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  data() {
    return {
      lists: [
        {
          author: '62fa661a67df5a1d6d499915',
          name: 'Lista test',
          finished: false,
          tags: ['rap', 'bored'],
          albums: [
            {
              _id: 'dupa001001',
              mbid: 'cb453955-e748-31c2-91e6-db01681886a5',
              finished: false,
            },
          ],
          _id: '63026cc1907dd48ab414bf13',
          createdAt: '2022-08-21T17:34:57.080Z',
          updatedAt: '2022-08-21T17:34:57.080Z',
          __v: 0,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
