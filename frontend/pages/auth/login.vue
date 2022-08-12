<template>
<div class="w-52 m-5">
  <div class=" relative ">
    <label for="with-indications" class="text-gray-700">
      Password
      <span class="text-red-500 required-dot">* </span>
    </label>
    <input id="with-indications" type="text" class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="passwor" placeholder="Password"/>
    <div class="grid w-full h-1 grid-cols-12 gap-4 mt-3">
      <div class="h-full col-span-3 bg-green-500 rounded">
      </div>
      <div class="h-full col-span-3 bg-green-500 rounded">
      </div>
      <div class="h-full col-span-3 bg-green-500 rounded">
      </div>
      <div class="h-full col-span-3 bg-green-500 rounded dark:bg-dark-1">
      </div>
    </div>
    <div class="mt-2 text-green-500">
      Valid password
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "LoginPage"
}
</script>

<style scoped>

</style>
