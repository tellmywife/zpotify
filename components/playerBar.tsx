import { useStoreState } from 'easy-peasy'
import { Box, Flex, Text } from '@chakra-ui/layout'
import Player from './player'

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs)
  const currentSong = useStoreState((state: any) => state.activeSong)

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px" color="white">
      <Flex align="center" justifyContent="space-between">
        {currentSong && (
          <Flex padding="20px" flexDirection="column">
            <Text fontSize="large">{currentSong.name}</Text>
            <Text fontSize="sm">{currentSong.artist.name}</Text>
          </Flex>
        )}
        <Flex width="50%" justify="center">
          {currentSong && <Player songs={songs} activeSong={currentSong} />}
        </Flex>
        <Flex>options</Flex>
      </Flex>
    </Box>
  )
}

export default PlayerBar
