// import { compose as parse } from 'bach-js'

import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader!./worker'

const worker = new Worker()
const channel = new PromiseWorker(worker)

// const post = bach => channel.postMessage({
//   action: 'compose',
//   data: bach
// })

export async function compose (bach) {
  if (channel) {
    console.log('@ async compose', bach)
    return channel.postMessage({
      action: 'compose',
      data: bach
    })
  }

  return parse(bach)
}



// const worker = window.Worker ? new Worker('./worker.js') null

// export asyc function compose (bach) {
//   return new Promise((resolve, reject) => {
//     if (worker) {
//       worker.postMessage(bach)
//       worker.onmessage = resolve
//     }

//     try {
//       return parse(bach)
//     } catch (e) {
//       reject(e)
//     }
//   }
// }

// if (window.Worker) {
//   const worker = new Worker('/script/worker.js')

//   worker.postMessage('')
// }
