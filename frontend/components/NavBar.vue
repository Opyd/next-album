<template>
  <!-- Navbar goes here -->
  <nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-7">
          <div>
            <!-- Website Logo -->
            <nuxt-link
              to="/"
              class="flex items-center py-4 px-2"
              @click.native="mobileMenu = false"
            >
              <span class="font-semibold text-gray-500 text-lg">
                <font-awesome-icon
                  icon="fa-solid fa-record-vinyl"
                  :style="{ fontSize: '18px' }"
                >
                </font-awesome-icon>
                Next album</span
              >
            </nuxt-link>
          </div>
          <!-- Primary Navbar items -->
          <div class="hidden md:flex items-center space-x-1">
            <nuxt-link
              to="/"
              class="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300 font-semibold"
              >Home</nuxt-link
            >
            <nuxt-link
              to="/lists"
              class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >Lists</nuxt-link
            >
            <nuxt-link
              to="/search"
              class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >Search</nuxt-link
            >
          </div>
        </div>
        <!-- Secondary Navbar items -->
        <div class="hidden md:flex items-center space-x-3">
          <nuxt-link
            to="/auth/login"
            class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
            >Log In</nuxt-link
          >
          <nuxt-link
            to="/auth/register"
            class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >Sign Up</nuxt-link
          >
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            class="outline-none mobile-menu-button"
            @click="mobileMenu = !mobileMenu"
          >
            <svg
              class="w-6 h-6 text-gray-500 hover:text-green-500"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- mobile menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="mobileMenu"
        class="origin-top-right md:hidden absolute right-0 w-full shadow-lg text-sm overflow-hidden border z-20"
      >
        <div
          class="bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div>
            <div v-if="isLogged" class="bg-gray-100 p-4 flex items-center">
              <div class="w-full">
                <nuxt-link to="/user">
                  <font-awesome-icon
                    icon="fa-solid fa-user"
                    :style="{ fontSize: '30px', marginLeft: '2px' }"
                    class="mb-2"
                  ></font-awesome-icon>
                  <p class="font-semibold text-base">{{ userName }}</p>
                </nuxt-link>
                <p class="text-gray-600">{{ userEmail }}</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="py-1">
            <div v-if="isLogged">
              <nuxt-link
                to="/"
                class="p-4 flex items-center space-x-2"
                @click.native="mobileMenu = false"
              >
                <font-awesome-icon
                  icon="fa-solid fa-compact-disc"
                  :style="{ fontSize: '20px' }"
                />
                <span> Your Lists </span>
              </nuxt-link>
            </div>
            <nuxt-link to="/search" class="p-4 flex items-center space-x-2">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                :style="{ fontSize: '20px' }"
              />
              <span> Search </span>
            </nuxt-link>
          </div>
          <div class="border-t border-gray-100"></div>
          <div v-if="!isLogged">
            <div class="py-1">
              <nuxt-link
                to="/auth/login"
                class="p-4 flex items-center space-x-2"
                @click.native="mobileMenu = false"
              >
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right-to-bracket"
                  :style="{ fontSize: '20px' }"
                ></font-awesome-icon>
                <span> Log-in </span>
              </nuxt-link>
            </div>
            <div class="py-1">
              <nuxt-link
                to="/auth/register"
                class="p-4 flex items-center space-x-2 justify-center"
                @click.native="mobileMenu = false"
              >
                <span
                  class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-user-pen"
                    :style="{ fontSize: '20px' }"
                  >
                  </font-awesome-icon>
                  <span class="ml-2">Create Account </span>
                </span>
              </nuxt-link>
            </div>
          </div>
          <div v-if="isLogged">
            <div class="py-1">
              <span
                class="p-4 flex items-center space-x-2 cursor-pointer"
                @click="logout"
              >
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right-from-bracket"
                  :style="{ fontSize: '20px' }"
                >
                </font-awesome-icon>
                <span> Log-out </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      mobileMenu: false,
      isLogged: this.$auth.loggedIn,
      userName: '',
      userEmail: '',
    }
  },
  computed: {
    this() {
      return this.$auth.loggedIn
    },
  },
  watch: {
    this(newVal) {
      this.isLogged = newVal
      if (this.isLogged) {
        this.userName = this.$auth.user.name
        this.userEmail = this.$auth.user.email
      }
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/auth/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.list-menu {
  list-style-type: none;
  transform-origin: top;
  transition: transform 0.4s ease-in-out;
  overflow: hidden;
  li {
    background: white;
  }
}
.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
}
</style>
