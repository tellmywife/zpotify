import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import { validateToken, getToken } from '../../lib/auth'
import SongTable from '../../components/songsTable'

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
  const { id, name, songs } = playlist
  return (
    <GradientLayout
      color={getBgColor(id)}
      title={name}
      subtitle="playlist"
      description={`${songs.length} songs`}
      image={`https://picsum.photos/400?random=${id}`}
    >
      <SongTable songs={songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let id

  try {
    const token = getToken(req)
    id = validateToken(token).id
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      }
    }
  }

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