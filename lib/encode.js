import crypto from 'crypto'

const encode = url => {
  return crypto
    .createHash('md5')
    .update(url)
    .digest('hex')
}

export default encode
