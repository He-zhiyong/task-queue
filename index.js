import task from './task.js'

const url = 'https://cnodejs.org/api/v1/topics'

for (let i = 0; i < 20; i++) {
  task(url)
    .then(res => res.json())
    .then(reslut => {
      console.log(reslut.data[0].title)
    })
    .catch(err => {
      console.log(err)
    })
}