<template>
  <edit-space-marine
    :showing="editModalShowing"
    :editSpaceMarineID="editEntityID"
    @close="closing()"
  ></edit-space-marine>
  <div class="-mx-4 sm:-mx-32 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('id')"
              >
                ID<span v-if="sortState.id === '+'">&#9650;</span><span v-if="sortState.id === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.id"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('name')"
              >
                Name<span v-if="sortState.name === '+'">&#9650;</span><span v-if="sortState.name === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.name"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('coordinateX')"
              >
                Coordinate X<span v-if="sortState.coordinateX === '+'">&#9650;</span><span v-if="sortState.coordinateX === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.coordinateX"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('coordinateY')"
              >
                Coordinate Y<span v-if="sortState.coordinateY === '+'">&#9650;</span><span v-if="sortState.coordinateY === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.coordinateY"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('creationDate')"
              >
                Creation Date<span v-if="sortState.creationDate === '+'">&#9650;</span><span v-if="sortState.creationDate === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.creationDate"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('health')"
              >
                Health<span v-if="sortState.health === '+'">&#9650;</span><span v-if="sortState.health === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.health"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('heartCount')"
              >
                Heart count<span v-if="sortState.heartCount === '+'">&#9650;</span><span v-if="sortState.heartCount === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.heartCount"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
              >
                Starship ID
            </div>
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('achievements')"
              >
                Achievements<span v-if="sortState.achievements === '+'">&#9650;</span><span v-if="sortState.achievements === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.achievements"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              <div
                @click="changeSortState('weaponType')"
              >
              Weapon type<span v-if="sortState.weaponType === '+'">&#9650;</span><span v-if="sortState.weaponType === '-'">&#9660;</span>
              </div>
              <input
                v-model="filterState.weaponType"
                @keyup.enter="handleFilter()"
                class="px-1 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
              />
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              Chapter name
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-center text-xs font-semibold text-white uppercase tracking-wider"
            >
              Marines count in Chapter
            </th>
            <th
              class="px-5 py-3 border-b-2 border-red-200 bg-black text-right text-xs font-semibold text-white"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getSpaceMarines" :key="item.id">
            <td @click="" class="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 text-center">
                  {{ item.id }}
                </p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.name }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.coordinates.x }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.coordinates.y }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ new Date(item.creationDate).toLocaleString() }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.health }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.heartCount }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.starshipId }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.achievements }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.weaponType }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.chapter.name }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.chapter.marinesCount }}</p>
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
            >
              <button @click="editSpaceMarine(item.id)" class="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button @click="deleteSpaceMarine(item.id)" class="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-center space-x-2 mt-4" v-if="totalPages == 0">
        <p>Ничего не найдено!</p>
      </div>
      <div class="flex items-center justify-center space-x-2 mt-4" v-if="errorMsg != ''">
        <p>{{this.errorMsg}}</p>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <button
      class="w-10 h-10 text-gray-700 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      :disabled="currentPage === 1"
      @click="prevPage"
    >
      ‹
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        v-if="page !== '...'"
        class="w-10 h-10 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center"
        :class="{
          'bg-blue-500 text-white': page === currentPage,
          'bg-gray-200': page !== currentPage,
        }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <div v-else class="w-10 h-10 text-gray-500 flex items-center justify-center">
        ...
      </div>
    </template>

    <button
      class="w-10 h-10 text-gray-700 bg-gray-200 rounded-r hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      ›
    </button>
  </div>
  <div></div>
</template>

<script>
import { isArray } from '@vue/shared';
import { XMLParser } from 'fast-xml-parser'
import EditSpaceMarine from './EditSpaceMarine.vue';
import spaceMarineService from '../api/spaceMarineService';

export default {
  components: {
    'edit-space-marine': EditSpaceMarine,
  },
  data() {
    return {
      editModalShowing: false,
      editEntityID: null,
      errorMsg: "",
      
      currentPage: 1,
      totalPages: 1,
      range: 3,

      params: {
        sort: '',
        page: 0,
        limit: 10,
        filter: '',
      },

      sortState: {
        id: "",
        name: "",
        coordinateX: "",
        coordinateY: "",
        creationDate: "",
        health: "",
        heartCount: "",
        achievements: "",
        weaponType: "",
      },

      filterState: {
        id: "",
        name: "",
        coordinateX: "",
        coordinateY: "",
        creationDate: "",
        health: "",
        heartCount: "",
        achievements: "",
        weaponType: "",
      }
    }
  },
  computed: {
    getSpaceMarines() {
      return this.$store.getters.spaceMarineList
    },
    visiblePages() {
      const pages = [];
      const startRange = Math.max(2, this.currentPage - this.range);
      const endRange = Math.min(this.totalPages - 1, this.currentPage + this.range);

      pages.push(1);

      if (startRange > 2) pages.push('...');

      for (let i = startRange; i <= endRange; i++) {
        pages.push(i);
      }

      if (endRange < this.totalPages - 1) pages.push('...');

      if (this.totalPages > 1) pages.push(this.totalPages);

      this.params.page = this.currentPage-1
      this.fetchSpaceMarines()
      return pages;
    },
  },
  created() {
    this.fetchSpaceMarines()
  },

  methods: {
    closing() {
      this.editModalShowing = false
      this.fetchSpaceMarines()
    },
    deleteSpaceMarine(id) {
      spaceMarineService.DeleteSpaceMarine(id)
          .then(response => {
            this.$store.commit('deleteSpaceMarine', id)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => console.log("end"))
    },
    editSpaceMarine(entityID) {
      this.editEntityID = entityID
      this.editModalShowing = true
    },

    changeSortState(paramName) {
      const currentState = this.sortState[paramName]

      var newState = ''
      switch (currentState) {
        case '':
          newState = '+'
          break
        case '+':
          newState = '-'
          break
        case '-':
          newState = ''
          break
        default:
          newState = ''
          break
      }

      this.sortState[paramName] = newState
      this.fetchSpaceMarines()
    },

    goToPage(page) {
      if (page !== '...') this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    async fetchSpaceMarines() {
      this.params.sort = this.generateSortParam()
      this.errorMsg = ""
      spaceMarineService.GetSpaceMarines(this.params)
          .then(response => {
            const parser = new XMLParser()
            const result = parser.parse(response.data)

            this.totalPages = result.result.totalPages

            if (!isArray(result.result.spaceMarines.spaceMarine)) {
              result.result.spaceMarines.spaceMarine = [result.result.spaceMarines.spaceMarine]
            }

            this.$store.commit('refreshSpaceMarines', result.result.spaceMarines.spaceMarine)
          })
          .catch(error => {
            this.errorMsg = "Нет соединения с сервером"
          })
          .finally()
    },

    generateSortParam() {
      let params = []

      if (this.sortState.id != '') {
        params.push(this.sortState.id + "id");
      }

      if (this.sortState.name != '') {
        params.push(this.sortState.name + "name");
      }

      if (this.sortState.coordinateX != '') {
        params.push(this.sortState.coordinateX + "x");
      }

      if (this.sortState.coordinateY != '') {
        params.push(this.sortState.coordinateY + "y");
      }

      if (this.sortState.creationDate != '') {
        params.push(this.sortState.creationDate + "creation_date");
      }

      if (this.sortState.health != '') {
        params.push(this.sortState.health + "health");
      }

      if (this.sortState.heartCount != '') {
        params.push(this.sortState.heartCount + "heart_count");
      }

      if (this.sortState.achievements != '') {
        params.push(this.sortState.achievements + "achievements");
      }

      if (this.sortState.weaponType != '') {
        params.push(this.sortState.weaponType + "weapon_type");
      }

      return params
    },

    handleFilter() {
      console.log(this.filterState)

      this.params.filter = this.generateFilterParams()

      spaceMarineService.GetSpaceMarines(this.params)
    },

    generateFilterParams() {
      let params = []

      if (this.filterState.id != '') {
        params.push("id"+this.filterState.id);
      }

      if (this.filterState.name != '') {
        params.push("name"+this.filterState.name);
      }

      if (this.filterState.coordinateX != '') {
        params.push("x"+this.filterState.coordinateX);
      }

      if (this.filterState.coordinateY != '') {
        params.push("y"+this.filterState.coordinateY);
      }

      if (this.filterState.creationDate != '') {
        params.push("creation_date"+this.filterState.creationDate);
      }

      if (this.filterState.health != '') {
        params.push("health"+this.filterState.health);
      }

      if (this.filterState.heartCount != '') {
        params.push("heart_count"+this.filterState.heartCount);
      }

      if (this.filterState.achievements != '') {
        params.push("achievements"+this.filterState.achievements);
      }

      if (this.filterState.weaponType != '') {
        params.push("weapon_type"+this.filterState.weaponType);
      }

      return params
    },
  },
}
</script>

<style></style>
