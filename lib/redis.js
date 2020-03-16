/* @flow */
import redis from 'redis'
import config from '../config'

const client = redis.createClient(config.redis)

client.on('error', function(error) {
  console.error('connect error', error)
})

client.on('connect', function() {
  console.log('redis connected success')
  // client.quit()
})

export default client
