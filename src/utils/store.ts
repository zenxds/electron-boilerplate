import fs from 'fs'
import path from 'path'
import { remote, app } from 'electron'

import { encrypt, decrypt } from './cfb'

interface StoreOptions {
  name: string
  password: string
  iv: string
}

export default class Store {
  public options: StoreOptions
  public path: string
  private password: string
  private iv: string

  constructor(options: StoreOptions) {
    const userDataPath = (remote.app || app).getPath('userData')

    this.options = options
    this.path = path.join(userDataPath, options.name)
    this.password = options.password
    this.iv = options.iv
  }

  public load(): any {
    if (!fs.existsSync(this.path)) {
      return null
    }

    const buffer = fs.readFileSync(this.path)
    return JSON.parse(decrypt(buffer, this.password, this.iv).toString('utf8'))
  }

  public dump(data: any): void {
    const buffer = Buffer.from(JSON.stringify(data))
    fs.writeFileSync(this.path, encrypt(buffer, this.password, this.iv))
  }
}
