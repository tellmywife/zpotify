import { useStoreActions } from 'easy-peasy'
import { Box } from '@chakra-ui/layout'
import { Table, Td, Tr, Thead, Tbody, IconButton, Th } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { formatDate, formatTime } from '../lib/formatter'

const SongRow = (song, i, onClick) => {
  return (
    <Tr
      sx={{
        transition: 'all .3sec',
        '&:hover': {
          bg: 'rgba(255, 255, 255, 0.1)',
        },
      }}
      key={song.id}
      cursor="pointer"
      onClick={() => onClick(song)}>
      <Td>{i + 1}</Td>
      <Td>{song.name}</Td>
      <Td>{formatDate(song.createdAt)}</Td>
      <Td>{formatTime(song.duration)}</Td>
    </Tr>
  )
}

const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setSong = useStoreActions((store: any) => store.changeActiveSong)

  const handlePlay = (song?) => {
    setSong(song || songs[0])
    playSongs(songs)
  }
  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="20px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            aria-label="play"
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255, 255, 255, 0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>{songs.map((song, i) => SongRow(song, i, handlePlay))}</Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
