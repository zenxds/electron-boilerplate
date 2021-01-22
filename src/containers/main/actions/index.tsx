import { action } from 'mobx'
import store from '../store'

export class Actions {
  store: Main.Store

  constructor(store: Main.Store) {
    this.store = store
  }

  @action.bound
  public merge(obj: Partial<Main.Store> = {}): Main.Store {
    return Object.assign(this.store, obj)
  }
}

export default new Actions(store)
