import client from './redis'

const maxReqMin = 100

export default (req, res, next) => {
  const { headers } = req 
  const { iptoken = '' } = headers
  const userAgent = headers['user-agent']

  let token = iptoken ? iptoken : userAgent

  // I am using token here but it can be ip address, API_KEY, etc
  client
    .multi() // starting a transaction
    .set([token, 0, 'EX', 60, 'NX']) // SET UUID 0 EX 60 NX
    .incr(token) // INCR UUID
    .exec((err, replies) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }
      const reqCount = replies[1]
      if (reqCount > maxReqMin) {
        return res.status(500).send({ message: `Quota of ${maxReqMin} request per min exceeded` })
      }
      return next()
    })
}
