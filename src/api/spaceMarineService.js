import axios from 'axios'
import qs from 'qs'
import config from '../../config';

let spaceMarineService = {
    GetWeaponTypes() {
        return axios
          .get(config.firstApiPath+'/api/v1/weapon-types', 
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
          })
    },

    GetSpaceMarine(id) {
      return axios
          .get(config.firstApiPath+'/api/v1/space-marines/'+id, 
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
          })
    },

    UpdateSpaceMarine(id, spaceMarine) {
      return axios
        .patch(config.firstApiPath+'/api/v1/space-marines/'+id,
          `
            <spaceMarine>
              <name>${spaceMarine.name}</name>
              <coordinates>
                <x>${spaceMarine.coordinates.x}</x>
                <y>${spaceMarine.coordinates.y}</y>
              </coordinates>
              <health>${spaceMarine.health}</health>
              <heartCount>${spaceMarine.heartCount}</heartCount>
              <achievements>${spaceMarine.achievements}</achievements>
              <weaponType>${spaceMarine.weaponType}</weaponType>
              <chapter>
                <name>${spaceMarine.chapter.name}</name>
              </chapter>
            </spaceMarine>
          `,
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }
        )
    },

    UnloadSpaceMarine(id, starshipID) {
      return axios
        .post(config.secondApiPath+'/api/v1/starships/'+starshipID+"/unload/"+id, null,
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }
        )
    },

    UnloadAllSpaceMarines(starshipID) {
      return axios
        .post(config.secondApiPath+'/api/v1/starships/'+starshipID+"/unload-all", null,
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }
        )
    },

    DeleteSpaceMarineByChapter(chapterName) {
      return axios
        .delete(config.firstApiPath+'/api/v1/space-marines/chapters/'+chapterName, null,
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }
        )
    },

    GetSpaceMarineWithMinDate() {
      return axios
        .get(config.firstApiPath+'/api/v1/space-marines/creation-date/min', null,
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }
        )
    },

    GetUniqueWeaponTypes() {
      return axios
        .get(config.firstApiPath+'/api/v1/weapon-types/unique', null,
          {
            params: this.params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }
        )
    },

    AddSpaceMarine(spaceMarine) {
      return axios
      .post(config.firstApiPath+'/api/v1/space-marines', 
      `
        <spaceMarine>
          <name>${spaceMarine.name}</name>
          <coordinates>
            <x>${spaceMarine.coordinateX}</x>
            <y>${spaceMarine.coordinateY}</y>
          </coordinates>
          <health>${spaceMarine.health}</health>
          <heartCount>${spaceMarine.heartCount}</heartCount>
          <achievements>${spaceMarine.achievements}</achievements>
          <weaponType>${spaceMarine.weaponType}</weaponType>
          <chapterName>${spaceMarine.chapterName}</chapterName>
        </spaceMarine>
      `, 
      {
        headers: {
            "Content-Type": "application/xml"
        }
      })
    },

    DeleteSpaceMarine(id) {
      return axios
          .delete(config.firstApiPath+'/api/v1/space-marines/'+id, 
          {
            
          })
    },

    GetSpaceMarines(params) {
      return axios
          .get(config.firstApiPath+'/api/v1/space-marines', 
          {
            params: params,
            headers: {
                "Content-Type": "application/xml"
            },
            paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
          })
    },
};

export default spaceMarineService