<template>
    <edit-space-marine
      :showing="editModalShowing"
      :editSpaceMarineID="editEntityID"
      @close="editModalShowing = false"
    ></edit-space-marine>
    <div class="-mx-4 sm:-mx-32 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              >
                Weapon Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fetchUniqueWeapons" :key="item">
              <td @click="" class="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 text-center">
                    {{ item }}
                  </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-center space-x-2 mt-4" v-if="errorMsg != ''">
          <p>{{this.errorMsg}}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { isArray } from '@vue/shared';
  import { XMLParser } from 'fast-xml-parser'
  import spaceMarineService from '../api/spaceMarineService';
  
  export default {
    data() {
      return {
        errorMsg: "",
        uniqueWeapons: [],
      }
    },
    created() {
      this.fetchUniqueWeapons()
    },
  
    methods: {
      async fetchUniqueWeapons() {
        this.errorMsg = ""
        spaceMarineService.GetUniqueWeaponTypes()
            .then(response => {
              const parser = new XMLParser()
              const result = parser.parse(response.data)
  
              if (!isArray(result.weaponTypes.uniqueWeapons)) {
                result.weaponTypes = [result.weaponTypes]
              }

              this.uniqueWeapons = result.weaponTypes
            })
            .catch(error => {
              this.errorMsg = "Нет соединения с сервером"
            })
            .finally()
      },
    },
  }
  </script>
  
  <style></style>
  