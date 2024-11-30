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
            Chapter name
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-id"
            type="text"
            v-model="chapterName"
            placeholder="Test"
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
        chapterName: '',
        errorMsgs: [],
      }
    },
  
    methods: {
      submitSpaceMarineData() {
          this.errorMsgs = []
  
          spaceMarineService.DeleteSpaceMarineByChapter(this.chapterName)
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
  