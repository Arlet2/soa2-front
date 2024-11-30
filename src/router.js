import { createRouter, createWebHashHistory } from 'vue-router'
import AddSpaceMarine from './components/AddSpaceMarine.vue'
import SpaceMarineList from './components/SpaceMarineList.vue'
import UnloadSpaceMarine from './components/UnloadSpaceMarine.vue'
import UnloadAllSpaceMarines from './components/UnloadAllSpaceMarines.vue'
import DeleteAnySpaceMarine from './components/DeleteAnySpaceMarine.vue'
import UniqueWeapons from './components/UniqueWeapons.vue'
import GetAnySpaceMarine from './components/GetAnySpaceMarine.vue'

const routes = [
  {
    path: '/',
    redirect: '/space-marine-list',
  },

  {
    path: '/space-marine-list',
    component: SpaceMarineList,
    name: SpaceMarineList,
  },

  {
    path: '/add-space-marine',
    component: AddSpaceMarine,
    name: AddSpaceMarine,
  },

  {
    path: '/unload',
    component: UnloadSpaceMarine,
    name: UnloadSpaceMarine,
  },

  {
    path: '/unload-all',
    component: UnloadAllSpaceMarines,
    name: UnloadAllSpaceMarines,
  },

  {
    path: '/min-creation-date',
    component: GetAnySpaceMarine,
    name: GetAnySpaceMarine,
  },

  {
    path: '/get-unique-weapons',
    component: UniqueWeapons,
    name: UniqueWeapons,
  },

  {
    path: '/delete-by-chapter',
    component: DeleteAnySpaceMarine,
    name: DeleteAnySpaceMarine,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
