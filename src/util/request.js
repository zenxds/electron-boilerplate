import axios from 'axios'

export default (options={}) => {
  return axios(options).then(response => {
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.msg || `request error`)
    }
  })
}
