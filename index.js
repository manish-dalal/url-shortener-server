import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './routes/api'
import rateLimiter from './lib/rateLimiter'
const app = express()

app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(rateLimiter)
app.use('/', api)

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port: ${app.get('port')}`)
})
