import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

import prisma from '../../lib/prisma'
import { IS_PROD } from '../../lib/env'
import { JWT_SECRET, JWT_AUTH_AGE, COOKIE_AUTH_AGE } from '../../lib/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body
  
  let user
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      error: 'User already exists',
    })
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    JWT_SECRET,
    { expiresIn: JWT_AUTH_AGE },
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(
      'ZPOTIFY_ACCESS_TOKEN',
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
