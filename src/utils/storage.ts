type StorageType = 'local' | 'session'

class MyStorage {
  static instance: MyStorage
  private storage: Storage
  constructor(type?: StorageType) {
    this.storage = type === 'session' ? sessionStorage : localStorage
  }
  get(key: string) {
    const value = this.storage.getItem(key)
    try {
      return value ? JSON.parse(value) : value
    } catch {
      return value
    }
  }
  set(key: string, value: any) {
    return this.storage.setItem(key, JSON.stringify(value))
  }
  remove(key: string) {
    return this.storage.removeItem(key)
  }
  clear() {
    return this.storage.clear()
  }
  static getInstance() {
    return MyStorage.instance ?? new MyStorage()
  }
}

export default MyStorage.getInstance()
