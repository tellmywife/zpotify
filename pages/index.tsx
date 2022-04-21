import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import prisma from '../lib/prisma'
import { useMe } from '../lib/hooks'
import GradientLayout from '../components/gradientLayout'


const Home = ({ artists }) => {
  const { user } = useMe()
  return (
    <GradientLayout
      color="purple"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} playlists`}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">Top artists this month</Text>
          <Text fontSize="sm">Only visible for you</Text>
        </Box>
        <Flex>
          {artists.map(({ name }) => {
            return (
              <Box paddingX="10px" width="20%">
                <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                  <Image src="/placeholder.png" borderRadius="100%" width="200px" height="200px" />
                  <Box marginTop="20px">
                    <Text fontSize="large">{name}</Text>
                    <Text fontSize="x-small">Artist</Text>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists }
  }
}

export default Home;
