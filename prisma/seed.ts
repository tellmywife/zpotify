import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import { artistsData } from './songsData'

const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(artistsData.map(async ({ name, songs }) =>{
    return prisma.artist.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        songs: {
          create: songs.map(song => ({
            name: song.name,
            duration: song.duration,
            url: song.url,
          }))
        }
      }
    })
  }))

  const email = 'user@test.com'
  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: {email},
    update: {},
    create: {
      email,
      password: bcrypt.hashSync('password', salt),
    }
  })

  const songs = await prisma.song.findMany({})
  await Promise.all(new Array(10).fill(1).map(async (_, i) => {
    return prisma.playlist.create({
      data: {
        name: `Playlist #${i + 1}`,
        user: {
          connect: { id: user.id }
        },
        songs: {
          connect: songs.map(({ id }) => ({ id }))
        }
      }
    })
  }))
}

run()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())