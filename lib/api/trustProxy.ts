import { NextApiRequest, NextApiResponse } from 'next'
import { URL } from 'url'

const trustProxy = (req, res, next) => {
  let originHostname
  let originProtocol
  if (req.headers.origin) {
    const originUrl = new URL(req.headers.origin)
    originHostname = originUrl.host
    originProtocol = originUrl.protocol.replace(':', '')
  }

  try {
    req.hostname = originHostname || req.headers['x-forwarded-host'] || req.headers.host || req.hostname
    req.ip = req.headers['x-forwarded-for'] || req.ip
    req.protocol = originProtocol || req.headers['x-forwarded-proto'] || 'http'
    req.secure = req.protocol.startsWith('https')
  } catch (__) { }

  next()
}

export default trustProxy