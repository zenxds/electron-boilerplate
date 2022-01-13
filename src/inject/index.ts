import JSONStore from '@utils/JSONStore'

const dataStore = new JSONStore({
  name: '.app-config',
})

export default {
  dataStore
}
