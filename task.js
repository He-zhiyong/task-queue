import QueueGroup from './src/QueueGroup.js'

const queueGroupSize = 4
const fetchTask = params => fetch(...params)

/* const getId = () => 'a' + new Date().getTime() + parseInt(Math.random() * 10000)
const idArray = []
for (let i = 0; i < queueGroupSize; i++)
  idArray.push(getId())

const queueGroup = new QueueGroup(queueGroupSize, idArray)
const taskHooks = {
  beforeStart(ctx) {
    ctx.params[0] = ctx.params[0] + `?id=${ctx.id}`
  },
  beforeEnd(ctx) {
    ctx.newId = getId()
  },
  onError(ctx) {
    ctx.newId = getId()
  }
} */

const queueGroup = new QueueGroup(queueGroupSize)
const taskHooks = {
 /*  beforeStart(ctx) {
    console.log(`${ctx.id}任务开始`)
  },
  beforeEnd(ctx) {
    console.log(`${ctx.id}任务结束`)
  },
  onError(ctx) {
    console.log(`${ctx.id}任务错误`)
  } */
}

export default function () {
  return queueGroup.addTask(fetchTask, arguments, taskHooks)
}