import task from './task.js'

function appendList(num, status, text) {
  let li = document.createElement('li')
  li.innerHTML = `<span style="display:inline-block;width: 150px;">任务序号：${num} </span>
                  <span style="display:inline-block;width: 150px;">状态：${status} </span>
                  <span>结果：${text}</span>`
  list.append(li)
}

startTask.onclick = function () {
  for (let i = 0; i < taskCount.value; i++) {
    task(taskParams.value + `?num=${i}`)
      .then(res => res.json())
      .then(reslut => {
        if (reslut.success)
          appendList(i, 'success', reslut.data[0].title)
        else
          appendList(i, 'failed', reslut.error_msg)
      })
      .catch(err => {
        appendList(i, 'error', err)
      })
  }
}