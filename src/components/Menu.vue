<template>
  <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/space-marine-list"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black bg-white"
      >
        Space Marine List
      </router-link>
    </li>
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/add-space-marine"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black"
      >
        Add Space Marine
      </router-link>
    </li>
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/unload"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black"
      >
        Unload Space Marine
      </router-link>
    </li>
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/unload-all"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black"
      >
        Unload All Space Marines
      </router-link>
    </li>
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/min-creation-date"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black"
      >
        Get Any Space Marine With Min Creation Date
      </router-link>
    </li>
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/get-unique-weapons"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black"
      >
        Get Unique weapons
      </router-link>
    </li>
    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <router-link
        to="/delete-by-chapter"
        class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black"
      >
        Delete Any Space Marine By Chapter
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {}
</script>

<style scoped>
.router-link-active {
  background-color: #960f05;
  color: white;
}
</style>
