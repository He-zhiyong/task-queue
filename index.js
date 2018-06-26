import task from './task.js'

window.task = task

for (let i = 0; i < 20; i++) {
  task('https://cnodejs.org/api/v1/topics')
    .then(res => res.json())
    .then(reslut => {
      console.log(reslut.data[0].title)
    })
    .catch(err => {
      console.log(err)
    })
}