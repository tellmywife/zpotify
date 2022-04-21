import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import { validateToken, getToken } from '../../lib/auth'

const getBgColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'teal',
    'yellow',
    'gray',
    'purple',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={getBgColor(playlist.id)}
    >
      {playlist.name}
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  const token = getToken(req)
  const { id } = validateToken(token)

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            }
          }
        }
      }
    }
  })

  return {
    props: {
      playlist
    }
  }
}

export default Playlist