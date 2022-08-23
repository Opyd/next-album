<template>
  <Transition appear name="bounce">
    <div
      class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto absolute z-50"
    >
      <div class="w-full h-full text-center">
        <div class="flex h-full flex-col justify-between">
          <font-awesome-icon
            :icon="iconName"
            class="h-12 w-12 mt-4 m-auto"
            :style="{ color: iconColor, fontSize: '50px' }"
          ></font-awesome-icon>
          <p class="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
            {{ text }}
          </p>
          <div class="flex items-center justify-between gap-4 w-full mt-8">
            <button
              type="button"
              class="py-2 px-4 bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              <nuxt-link :to="path">{{ destination }}</nuxt-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'PopupModal',
  props: {
    text: String,
    destination: String,
    path: String,
    iconName: String,
    iconColor: String,
  },
}
</script>

<style lang="scss" scoped>
.bounce-enter-active,
.bounce-leave-active {
  /*@apply transition-opacity duration-300 ease-out;*/
  animation: bounce-in 0.5s;
}

.bounce-enter,
.bounce-leave-to {
  /*@apply opacity-0;*/
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
