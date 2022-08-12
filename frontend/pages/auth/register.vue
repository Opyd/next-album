<template>
<div class="flex justify-center align-middle mt-16">
  <Transition appear name="bounce">
  <div
v-if="popup"
class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto absolute z-50">
    <div class="w-full h-full text-center">
      <div class="flex h-full flex-col justify-between">
        <svg class="h-12 w-12 mt-4 m-auto text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
          </path>
        </svg>
        <p class="text-gray-600 dark:text-gray-100 text-md py-2 px-6"> User
          <span class="text-gray-800 dark:text-white font-bold"> {{username}}</span>
          has been registered.
        </p>
        <div class="flex items-center justify-between gap-4 w-full mt-8">
          <button type="button" class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
           <nuxt-link to="/auth/login">Go to login page</nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </div>
  </Transition>
  <div :class="popup ? 'blur-bg' : 'unblur-bg'">
  <div class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
    <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
      Create a new account
    </div>
    <span class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Already have an account?
        <a href="#" target="_blank" class="text-sm text-blue-500 underline hover:text-blue-700">
            <nuxt-link to="/auth/login">Log in</nuxt-link>
        </a>
    </span>
    <div class="p-6 mt-8">
      <form @submit.prevent="register">
        <div class="flex flex-col mb-2">
          <div class=" relative ">
            <input id="create-account-pseudo" v-model="username" type="text" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Username"/>
          </div>
        </div>
        <div class="flex gap-4 mb-2">
          <div class=" relative ">
            <input id="create-account-first-name" v-model="password" :class="arePasswordsSame? 'good': 'bad'" type="password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Password" placeholder="Password"/>
          </div>
          <div class=" relative ">
            <input id="create-account-last-name" v-model="repeatedPassword" :class="arePasswordsSame? 'good': 'bad'" type="password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Repeat password" placeholder="Repeat password"/>
          </div>
        </div>
        <div class="flex flex-col mb-2">
          <div class=" relative ">
            <input id="create-account-email" v-model="email" type="email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
          </div>
        </div>
        <div class="flex w-full my-4">
          <button type="submit" :disabled="popup" class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: "RegisterPage",

  data() {
    return {
      username: "",
      password: "",
      repeatedPassword: "",
      email: "",
      popup: false,
    }
  },
  computed: {
    arePasswordsSame() {
      return (this.password === this.repeatedPassword && this.password !== '' && this.repeatedPassword !== '')
    }
  },
  methods: {
    ...mapMutations(['jwt/setToken', "jwt/setLogin"]),
    async register() {
      const options = {
        url: 'http://localhost:3100/auth/signup',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          name: this.username,
          email: this.email,
          password: this.password
        }
      }
      const response = await axios(options);
      if(response.status === 201) {
        this.popup = true
        // eslint-disable-next-line camelcase
        const {access_token, name} = response.data;
        this.$store.commit('jwt/setLogin', name)
        this.$store.commit('jwt/setToken', access_token)
      }
    }
  },
  template: "DefaultTemplate",
}
</script>

<style lang="scss" scoped>
.good {
  border-color: green;
}
.bad {
  border-color: red;
}
.popup {
  filter: blur(8px) brightness(50%);
}
.bounce-enter-active,
.bounce-leave-active {
  /*@apply transition-opacity duration-300 ease-out;*/
  animation: bounce-in .5s;
}

.bounce-enter,
.bounce-leave-to {
  /*@apply opacity-0;*/
  animation: bounce-in .5s reverse;
}

.blur-bg {
  transition: ease-out 300ms;
  filter: blur(10px) brightness(30%);
}
.unblur-bg {
  transition: ease-out 300ms;
  filter: none;
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
