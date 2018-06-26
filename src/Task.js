export default class Task {
  constructor(option) {
    this.status = 'wait'
    let defaultOption = {
      task: new Function(),
      params: new Object(),
    }
    this.option = Object.assign({}, defaultOption, option)
    for (let key in this.option) {
      if (key === 'hooks') {
        for(let hook in this.option[key])
          this[hook] = this.option[key][hook]
      } else {
        this[key] = this.option[key]
      }
    }
  }
  beforeStart(ctx) {
    return ctx
  }
  beforeEnd(ctx) {
    return ctx
  }
  onError(ctx) {
    return ctx
  }
  start(id) {
    this.id = id
    return new Promise((resolve, reject) => {
      this.beforeStart(this)
      this.status = 'running'
      this.task(this.params)
        .then(reslut => {
          this.status = 'over'
          this.beforeEnd(this)
          resolve({
            reslut,
            id: this.newId
          })
        })
        .catch(err => {
          this.onError(this)
          reject({
            err,
            id: this.newId
          })
        })
    })
  }
}