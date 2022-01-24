import axios from 'axios'

export function requestGetUser() {
  return axios.request({
    method: 'get',
    url: 'https://esi.evetech.net/dev/universe/systems/30000590/?datasource=tranquility&language=zh'
  })
}
