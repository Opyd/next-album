<template>
  <div class="flex justify-center align-middle mt-16 text-white">
    <div v-if="isLogged">
      <p class="pb-10">You are already logged</p>
      <nuxt-link
        to="/"
        class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >Go to Home page
      </nuxt-link>
    </div>
    <Popup
      v-if="success"
      text="Successfully logged in!"
      destination="Redirecting to Home page..."
      path="/"
      icon-name="fa-solid fa-door-open"
      icon-color="green"
    ></Popup>
    <Popup
      v-if="error"
      text="Wrong credentials!"
      destination="Try again"
      path="/auth/login"
      icon-name="fa-solid fa-door-closed"
      icon-color="red"
    ></Popup>
    <div v-if="!isLogged" :class="success || error ? 'blur-bg' : 'unblur-bg'">
      <div
        class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
      >
        <div
          class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white"
        >
          Log in
        </div>
        <span
          class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400"
        >
          Don't have an account?
          <nuxt-link
            to="/auth/register"
            class="text-sm text-blue-500 underline hover:text-blue-700"
            >Create one</nuxt-link
          >
        </span>
        <div class="p-6 mt-8">
          <form @submit.prevent="logIn">
            <div class="flex flex-col mb-2">
              <div class="relative">
                <input
                  id="create-account-pseudo"
                  v-model="email"
                  required
                  type="email"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="pseudo"
                  :disabled="success || error"
                  placeholder="E-Mail"
                />
              </div>
            </div>
            <div class="flex gap-4 mb-2">
              <div class="relative">
                <input
                  id="create-account-first-name"
                  v-model="password"
                  required
                  type="password"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="Password"
                  :disabled="success || error"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="flex w-full my-4">
              <button
                type="submit"
                :disabled="success || error"
                :style="success || error ? { backgroundColor: 'grey' } : ''"
                class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      success: false,
      error: false,
      errorText: '',
      isLogged: false,
    }
  },
  mounted() {
    this.isLogged = this.$store.getters['jwt/isLogged']
  },
  methods: {
    ...mapMutations(['jwt/setToken', 'jwt/setLogin']),
    async logIn() {
      const options = {
        url: 'http://localhost:3100/auth/signin',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: {
          email: this.email,
          password: this.password,
        },
      }
      try {
        const response = await axios(options)
        if (response.status === 201) {
          this.success = true
          // eslint-disable-next-line camelcase
          const { access_token, name } = response.data
          this.$store.commit('jwt/setLogin', name)
          this.$store.commit('jwt/setToken', access_token)
          setTimeout(() => {
            this.$router.push({
              path: '/',
            })
          }, 3000)
        }
      } catch (e) {
        console.log(e)
        this.error = true
        this.reset()
        setTimeout(() => window.location.reload(), 1000)
      }
    },
    reset() {
      this.email = ''
      this.password = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  filter: blur(8px) brightness(50%);
}

.blur-bg {
  transition: ease-out 300ms;
  filter: blur(10px) brightness(30%);
}
.unblur-bg {
  transition: ease-out 300ms;
  filter: none;
}
</style>
