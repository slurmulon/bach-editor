import { compose } from 'bach-js'
import registerPromiseWorker from 'promise-worker/register'

registerPromiseWorker(message => {
  if (message.action === 'compose') {
    return compose(message.data)
  //   // return `Worker reply: ${JSON.stringify(message)}`
  }
})
