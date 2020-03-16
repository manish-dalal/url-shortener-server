/* @flow */
const REGEX = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

const validate = url => {
  // TODO Add check that url !== hostname
  return REGEX.test(url)
}

export default validate
