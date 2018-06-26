import QueueGroup from './src/QueueGroup.js'

const queueGroupSize = 6
const fetchTask = url => fetch(url)

/* const getId = () => new Date().getTime() + parseInt(Math.random() * 10000)
const idArray = []
for (let i = 0; i < queueGroupSize; i++)
  idArray.push(getId())

const queueGroup = new QueueGroup(queueGroupSize, idArray)
const taskHooks = {
   beforeStart(ctx) {
    ctx.params = ctx.params + `?id=${ctx.id}`
  },
  beforeEnd(ctx) {
    ctx.newId = getId()
  } 
} */

const queueGroup = new QueueGroup(queueGroupSize)
const taskHooks = {
  /* beforeStart(ctx) {
    console.log(`${ctx.id}任务开始`)
  },
  beforeEnd(ctx) {
    console.log(`${ctx.id}任务结束`)
  },
  onError(ctx) {
    console.log(`${ctx.id}任务错误`)
  } */
}

export default function (url, task = fetchTask) {
  return queueGroup.addTask(task, url, taskHooks)
}