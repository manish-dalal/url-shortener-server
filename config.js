/* @flow */
const config = {}
// local redis
config.redis = {
  host: '127.0.0.1',
  port: '6379'
}

// redislabs connection
// config.redis = {
//   host: 'redis-16861.c91.us-east-1-3.ec2.cloud.redislabs.com',
//   password: 'J2LJnhUeX08kT8v1rxJCSghWGJjb52gU',
//   port: '16861'
// }

module.exports = config
