import { Router } from 'express'
import client from '../lib/redis'
import encode from '../lib/encode'
import validate from '../lib/validate'

const router = Router()

router.get('/:hash', (req, res) => {
  const { hash } = req.params
  if (hash) {
    client.get(hash, (err, url) => {
      if (!err && url) {
        return res.redirect(url)
      } else {
        return res.status(400).send({ message: 'THE LINK YOU ARE TRYING TO ACCESS HAS EXPIRED' })
      }
    })
  } else {
    return res.status(400).send({ message: 'No hash provided' })
  }
})

router.post('/', (req, res) => {
  const { url, expireTime = -1 } = req.body
  if (url && validate(url)) {
    const hash = encode(url)
    if (expireTime <= -1) {
      client.get(hash, (err, shortUrl) => {
        if (!err) {
          if (shortUrl) {
            res.status(200).send({ hash: shortUrl })
          } else {
            shortUrl = new Date().getTime().toString(36)
            client
              .multi([
                ['set', hash, shortUrl],
                ['set', shortUrl, url]
              ])
              .exec(function(err, result) {
                if (err) {
                  res.status(500).send({ message: err })
                } else {
                  res.status(200).send({ hash: shortUrl })
                }
              })
          }
        } else {
          res.status(500).send({ message: err })
        }
      })
    } else {
      // Always create new hash
      const newShortUrl = new Date().getTime().toString(36)
      client.multi([['set', newShortUrl, url, 'EX', expireTime]]).exec(function(err, result) {
        if (err) {
          res.status(500).send({ message: err })
        } else {
          res.status(200).send({ hash: newShortUrl })
        }
      })
    }
  } else {
    res.status(400).send({ message: 'Url not valid' })
  }
})

export default router
