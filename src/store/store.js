import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      spaceMarineList: [],
    }
  },
  getters: {
    spaceMarineList: (state) => {
      return state.spaceMarineList
    },
  },
  mutations: {
    deleteSpaceMarine(state, id) {
      const index = state.spaceMarineList
        .map((x) => {
          return x.id
        })
        .indexOf(id)
      state.spaceMarineList.splice(index, 1)
    },
    addContact(state, obj) {
      const contact = {
        id: Date.now(),
        ...obj,
      }
      state.contactList.push(contact)
    },

    editContact(state, item) {
      const items = state.contactList
      var foundIndex = items.findIndex((x) => x.id == item.id)
      items[foundIndex] = item
    },

    refreshSpaceMarines(state, items) {
      state.spaceMarineList = items
    }
  },
})

export default store
