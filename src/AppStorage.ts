class AppStorage<T> {
  private key: string
  private data: T
  constructor(key: string, defaultData: T) {
    this.key = key
    const jsonString = localStorage.getItem(this.key) ?? ''
    try {
      const data = JSON.parse(jsonString) as T
      this.data = data
    } catch {
      this.data = defaultData
    }
  }
  getData(): T {
    return this.data
  }
  setData(data: T): void {
    this.data = data
    localStorage.setItem(this.key, JSON.stringify(this.data))
  }
}

export default AppStorage
