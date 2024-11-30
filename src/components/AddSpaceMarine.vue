<template>
  <form
    @submit.prevent="submitSpaceMarineData"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
  >
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-name"
        >
          Name
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
          id="grid-name"
          type="text"
          v-model="name"
          placeholder="Ilya ShipIM"
        />
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-coordinate-x"
        >
          Coordinate X
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          id="grid-coordinate-x"
          v-model="coordinateX"
          type="number"
          placeholder="0.1"
        />
      </div>
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-coordinate-y"
        >
          Coordinate Y
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          id="grid-coordinate-y"
          v-model="coordinateY"
          type="number"
          placeholder="0.1"
        />
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-health"
        >
          Health
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          id="grid-health"
          v-model="health"
          type="number"
          placeholder="100"
        />
      </div>
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-heart-count"
        >
          Heart count
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          id="grid-heart-count"
          v-model="heartCount"
          type="number"
          placeholder="3"
        />
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-achievements"
        >
          Achievements
        </label>
        <input
          class="block appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          id="grid-achievements"
          type="text"
          v-model="achievements"
          placeholder="Enter Space Marine achievements"
        />
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-weapon-type"
        >
          Weapon type
        </label>
        <select
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          id="grid-weapon-type"
          v-model="weaponType"
        >
          <option v-for="item in weaponTypes">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-chapter-name"
        >
          Chapter name
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          id="grid-chapter-name"
          v-model="chapterName"
          type="text"
          placeholder="Shitposts"
        />
      </div>
    </div>
    <div v-for="msg in errorMsgs" class="-mx-3 md:flex mb-6">
      <p style="color: red;">
        {{ msg.reason }}
      </p>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <button
          type="submit"
          class="bg-black my-5 px-4 py-2 text-lg font-semibold tracking-wider text-white rounded hover:bg-red-600 w-4/12"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { XMLParser } from 'fast-xml-parser'
import { isArray } from '@vue/shared'
import spaceMarineService from '../api/spaceMarineService'

export default {
  data() {
    return {
      id: '',
      name: '',
      coordinateX: '',
      coordinateY: '',
      health: '',
      heartCount: '',
      achievements: '',
      weaponType: '',
      chapterName: '',

      weaponTypes: [],

      errorMsgs: [],
    }
  },

  methods: {
    submitSpaceMarineData() {
      const spaceMarine = {
        name: this.name,
        coordinateX: this.coordinateX,
        coordinateY: this.coordinateY,
        health: this.health,
        heartCount: this.heartCount,
        achievements: this.achievements,
        weaponType: this.weaponType,
        chapterName: this.chapterName,
      }
        this.errorMsgs = []

        spaceMarineService.AddSpaceMarine(spaceMarine)
          .then(response => {
            this.id = response.data.id

            this.$router.push({ path: '/space-marine-list' })
          })
          .catch(error => {
            const parser = new XMLParser();
            let result = ''
            try {
              result = parser.parse(error.response.data)
            } catch (err) {
              this.errorMsgs = ["Ошибка соединения с сервером"]
              return
            }
            

            if (!isArray(result.validationErrors.error)) {
              result.validationErrors.error = [result.validationErrors.error]
            }

            console.log(result)
            this.errorMsgs = result.validationErrors.error
          })
          .finally(() => {})
    },
  },

  created() {
    spaceMarineService.GetWeaponTypes()
      .then(response => {
        const parser = new XMLParser();
        const result = parser.parse(response.data);

        if (!isArray(result.weaponTypes.weapon)) {
         result.weaponTypes.weapon = [result.weaponTypes.weapon]
        }

        this.weaponTypes = result.weaponTypes.weapon
      })
      .catch(error => {
        console.log(error)
      })
      .finally()
  }
}
</script>

<style></style>
