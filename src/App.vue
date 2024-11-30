<template>
  <div class="flex p-10 items-center flex-col divide-y divide-black-500">
    <h1 class="text-4xl font-extrabold py-5">
      Soa2 - <span class="text-red-600">Space Marines</span>
    </h1>

    <div class="sm:w-11/12 md:w-7/12 py-5">
      <menu-bar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menu from './components/Menu.vue'
import AddSpaceMarine from './components/AddSpaceMarine.vue'
import SpaceMarineList from './components/SpaceMarineList.vue'
export default {
  components: {
    'menu-bar': menu,
    'add-space-marine': AddSpaceMarine,
    'space-marine-list': SpaceMarineList,
  },
}
</script>

<style>
body {
  background: #f3f4f6;
}
</style>
