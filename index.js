import task from './task.js'

window.task = task

for (let i = 0; i < 20; i++) {
  task('https://cnodejs.org/api/v1/topics')
    .then(res => res.json())
    .then(reslut => {
      if (reslut.success)
        console.log(reslut.data[0].title)
      else 
        console.log(reslut.error_msg)
    })
    .catch(err => {
      console.log(err)
    })
}