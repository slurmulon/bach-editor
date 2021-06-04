import { compose } from 'bach-js'
import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader!./worker'

const worker = new Worker()
const channel = new PromiseWorker(worker)

export async function composer (bach) {
  if (channel) {
    return channel.postMessage({
      action: 'compose',
      data: bach
    })
  }

  return compose(bach)
}
