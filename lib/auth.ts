import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from './prisma'
import { COOKIE_ACCESS_NAME, JWT_SECRET } from './constants'

export const getToken = ({ cookies }) => {
  return cookies[COOKIE_ACCESS_NAME]
}

export const validateToken = (token) => {
  if (!token) return false
  return jwt.verify(token, JWT_SECRET)
}

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getToken(req)

    if (!token) return res.status(401).json({ error: 'Not Authorized' })

    let user
    try {
      const { id } = validateToken(token)
      user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) throw new Error('user not found')
    } catch (error) {
      return res.status(401).json({ error: 'Not Authorized' })
    }

    return handler(req, res, user)
  }
}