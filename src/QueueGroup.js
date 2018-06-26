import Queue from './Queue.js'

export default class QueueGroup {
  constructor(size, idArray) {
    this.size = size
    this.idArray = idArray || []
    this.group = []
    this.freeQueueIndex = -1
    this.init()
  }
  getId() {
    return new Date().getTime() + parseInt(Math.random() * 10000)
  }
  init() {
    for (let i = 0; i < this.size; i++)
      this.group.push(new Queue(this.idArray[i] || this.getId()))
  }
  freeQueue() {
    this.freeQueueIndex = this.freeQueueIndex + 1 >= this.size ? 0 : this.freeQueueIndex + 1
    return this.group[this.freeQueueIndex]
  }
  addTask(task, params, hooks) {
    return new Promise((reslove, reject) => {
      this.freeQueue().addTask(task, params, hooks)
        .then(reslut => {
          reslove(reslut)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}