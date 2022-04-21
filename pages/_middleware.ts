import { NextResponse } from 'next/server'
import { COOKIE_ACCESS_NAME } from '../lib/constants'

const userPages = ['/playlist', '/library']

export default function middleware(req) {
  if (!userPages.find(p => {
    const path = req.nextUrl.pathname
    return (path === '/' || path.indexOf(p) === 0)
  })) return;

  const { [COOKIE_ACCESS_NAME]: token } = req.cookies
  if (token) return;

  const url = req.nextUrl.clone()
  url.pathname = '/signin'
  return NextResponse.redirect(url)
}