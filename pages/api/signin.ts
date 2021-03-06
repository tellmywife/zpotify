import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

import prisma from '../../lib/prisma'
import { IS_PROD } from '../../lib/env'
import { JWT_SECRET, JWT_AUTH_AGE, COOKIE_AUTH_AGE, COOKIE_ACCESS_NAME } from '../../lib/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  
  const user = await prisma.user.findUnique({ where: { email } })
  const isValid = user && bcrypt.compareSync(password, user.password)
  if (!isValid) {
    return res.status(401).json({
      error: 'Email or Password is wrong',
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      time: Date.now(),
    },
    JWT_SECRET,
    { expiresIn: JWT_AUTH_AGE }
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(
      COOKIE_ACCESS_NAME,
      token,
      {
        httpOnly: true,
        maxAge: COOKIE_AUTH_AGE,
        path: '/',
        sameSite: 'lax',
        secure: IS_PROD,
      },
    )
  )

  return res.json(user)
}
