<template>
  <div class="flex justify-center align-middle mt-16">
    <PopupModal
      v-if="success"
      text="User has been created!"
      destination="Go to Login page"
      path="/auth/login"
      icon-name="fa-solid fa-check"
      icon-color="green"
    ></PopupModal>
    <PopupModal
      v-if="error"
      text="Credentials are already taken!"
      destination="Go to Login page"
      path="/auth/login"
      icon-name="fa-solid fa-exclamation"
      icon-color="red"
    ></PopupModal>
    <div :class="success || error ? 'blur-bg' : 'unblur-bg'">
      <div
        class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
      >
        <div
          class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white"
        >
          Create a new account
        </div>
        <span
          class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400"
        >
          Already have an account?
          <nuxt-link
            to="/auth/login"
            class="text-sm text-blue-500 underline hover:text-blue-700"
            >Log in</nuxt-link
          >
        </span>
        <div class="p-6 mt-8">
          <form @submit.prevent="register">
            <div class="flex flex-col mb-2">
              <div class="relative">
                <input
                  id="create-account-pseudo"
                  v-model="username"
                  required
                  type="text"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="pseudo"
                  :disabled="success || error"
                  placeholder="Username"
                />
              </div>
            </div>
            <div class="flex gap-4 mb-2">
              <div class="relative">
                <input
                  id="create-account-first-name"
                  v-model="password"
                  required
                  :class="arePasswordsSame ? 'good' : 'bad'"
                  type="password"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="Password"
                  :disabled="success || error"
                  placeholder="Password"
                />
              </div>
              <div class="relative">
                <input
                  id="create-account-last-name"
                  v-model="repeatedPassword"
                  required
                  :class="arePasswordsSame ? 'good' : 'bad'"
                  type="password"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="Repeat password"
                  :disabled="success || error"
                  placeholder="Repeat password"
                />
              </div>
            </div>
            <span
              v-if="!arePasswordsSame"
              class="text-red-500 text-sm italic align-text-top"
            >
              <font-awesome-icon icon="fa-solid fa-x" />
              Passwords must be the same!</span
            >
            <span v-else class="text-green-500 text-sm italic align-text-top">
              <font-awesome-icon icon="fa-solid fa-check-double" /> Passwords
              match
            </span>
            <div class="flex flex-col mb-2">
              <div class="relative">
                <input
                  id="create-account-email"
                  v-model="email"
                  type="email"
                  class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Email"
                  :disabled="success || error"
                  required
                />
              </div>
            </div>
            <div class="flex w-full my-4">
              <button
                type="submit"
                :disabled="success || error || !arePasswordsSame"
                :style="
                  success || error || !arePasswordsSame
                    ? { backgroundColor: 'grey' }
                    : ''
                "
                class="py-2 px-4 bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
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
import PopupModal from '~/components/utils/Popup'

export default {
  name: 'RegisterPage',
  components: { PopupModal },

  data() {
    return {
      username: '',
      password: '',
      repeatedPassword: '',
      email: '',
      success: false,
      error: false,
      errorText: '',
    }
  },
  computed: {
    arePasswordsSame() {
      return (
        this.password === this.repeatedPassword &&
        this.password !== '' &&
        this.repeatedPassword !== ''
      )
    },
  },
  methods: {
    // ...mapMutations(['jwt/setToken', 'jwt/setLogin']),
    async register() {
      if (!this.arePasswordsSame) {
      }
      const options = {
        url: 'auth/signup',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: {
          name: this.username,
          email: this.email,
          password: this.password,
        },
      }
      try {
        const response = await this.$axios(options)
        if (response.status === 201) {
          this.success = true
          // eslint-disable-next-line camelcase
          // const { access_token, name } = response.data
          // this.$store.commit('jwt/setLogin', name)
          // this.$store.commit('jwt/setToken', access_token)
        }
      } catch (e) {
        this.errorText = e.response.data.message
        this.error = true
        this.reset()
      }
    },
    reset() {
      this.username = ''
      this.email = ''
      this.password = ''
      this.repeatedPassword = ''
    },
  },
  template: 'DefaultTemplate',
}
</script>

<style lang="scss" scoped>
.good {
  border: 3px solid green;
}
.bad {
  border: 3px solid red;
}
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
