import { Box, Flex, Text } from '@chakra-ui/layout'
import Player from './player'

const PlayerBar = () => {
  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px" color="white">
      <Flex align="center" justifyContent="space-between">
        <Flex padding="20px" flexDirection="column">
          <Text fontSize="large">Song</Text>
          <Text fontSize="sm">Artist</Text>
        </Flex>
        <Flex>
          <Player />
        </Flex>
        <Flex>options</Flex>
      </Flex>
    </Box>
  )
}

export default PlayerBar
