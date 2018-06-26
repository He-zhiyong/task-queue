import Task from './Task.js'

export default class Queue {
  constructor(id) {
    this.id = id
    this.locked = false
    this.store = []
  }
  getId() {
    return new Date().getTime() + parseInt(Math.random() * 10000)
  }
  isEmpty () {
    return this.store.length === 0
  }
  size () {
    return this.store.length
  }
  addTask (task, params, hooks) {
    return new Promise((resolve,reject)=>{
      this.store.push(new Task({task, params, hooks, resolve, reject}))
      !this.locked && this.runTask(this.store.shift())
    })   
  }
  runTask(task) {
    if (task) {
      this.locked = true
      task.start(this.id)
          .then(({reslut, id}) => {     
            task.resolve(reslut)
            this.id = id || this.getId()
            !this.isEmpty() && this.runTask(this.store.shift())
          })
          .catch(({err, id}) => {
            task.reject(err)
            this.id = id || this.getId()
            !this.isEmpty() && this.runTask(this.store.shift())
          })
    } else {
      this.locked = false
    }
  }
}
