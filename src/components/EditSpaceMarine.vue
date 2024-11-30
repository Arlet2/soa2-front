<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="modal-mask overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      @click.self="close"
    >
      <div class="relative w-6/12 bg-red-100 shadow-lg rounded-md p-5">
        <button
          aria-label="close"
          class="absolute top-0 right-0 text-4xl text-gray-500 my-2 mx-4"
          @click.prevent="close"
        >
          ×
        </button>
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
                v-model="localState.name"
                ref="name"
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
                v-model="localState.coordinates.x"
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
                v-model="localState.coordinates.y"
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
              v-model="localState.health"
              ref="health"
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
              v-model="localState.heartCount"
              ref="heartCount"
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
              v-model="localState.achievements"
              ref="achievements"
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
              v-model="localState.weaponType"
              ref="weaponType"
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
              v-model="localState.chapter.name"
              ref="chapterName"
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
          
        <button
          type="submit"
          class="bg-black my-5 px-4 py-2 text-lg font-semibold tracking-wider text-white rounded hover:bg-green-600 w-4/12"
        >
          Submit
        </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script>
import { XMLParser } from 'fast-xml-parser';
import { isArray } from '@vue/shared'
import spaceMarineService from '../api/spaceMarineService';
import { watchEffect, ref } from 'vue';

export default {
  props: {
    showing: {
      required: true,
      type: Boolean,
    },
    editSpaceMarineID: {
      required: true,
      type: Number,
    },
  },
  setup(props, { emit }) {
    const localState = ref({})

    const fetchUser = () => {
      if (props.editSpaceMarineID == null)
        return

      spaceMarineService.GetSpaceMarine(props.editSpaceMarineID)
      .then(response => {
          const parser = new XMLParser();
          const result = parser.parse(response.data);

          localState.value = {
            name: result.spaceMarine.name,
            coordinates: {
              x: result.spaceMarine.coordinates.x,
              y: result.spaceMarine.coordinates.y,
            },
            health: result.spaceMarine.health,
            heartCount: result.spaceMarine.heartCount,
            achievements: result.spaceMarine.achievements,
            weaponType: result.spaceMarine.weaponType,
            chapter: {
              name: result.spaceMarine.chapter.name,
              marinesCount: result.spaceMarine.chapter.marinesCount,
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
    }

    const submitSpaceMarineData = () => {
      console.log(localState.value)
      spaceMarineService.UpdateSpaceMarine(props.editSpaceMarineID, localState.value)
        .then(response => {
          emit('close')
        })
        .catch(error => {
          console.log(error)
        })
        .finally()
    }

    watchEffect(() => {
      fetchUser()
    });

    return { localState, fetchUser, submitSpaceMarineData }
  },
  data() {
    return {
      errorMsgs: [],
      weaponTypes: [],
    }
  },
  methods: {
    close() {
      this.$emit('close')
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
  },

}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-mask {
  z-index: 9998;
  background-color: rgba(19, 15, 15, 0.5);
  transition: opacity 0.3s ease;
}
</style>
