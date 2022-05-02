import { useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import { useStoreActions } from 'easy-peasy'
import {
  Box,
  Flex,
  Center,
  Text,
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import {
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [duration, setDuration] = useState(0.0)

  const pivot = (some) => !some
  const togglePlay = () => setPlaying(pivot)
  const toggleShuffle = () => setShuffle(pivot)
  const toggleRepeat = () => setRepeat(pivot)

  return (
    <Box width="100%">
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} />
      </Box>
      <Center>
        <ButtonGroup color="gray.600" fontSize="24px">
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            icon={<MdShuffle />}
            color={shuffle ? 'white' : ''}
            onClick={toggleShuffle}
          />
          <IconButton outline="none" variant="link" aria-label="previous" icon={<MdSkipPrevious />} />
          {!playing && (
            <IconButton
              onClick={togglePlay}
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}
          {playing && (
            <IconButton
              onClick={togglePlay}
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
            />
          )}
          <IconButton outline="none" variant="link" aria-label="next" icon={<MdSkipNext />} />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            icon={<MdOutlineRepeat />}
            color={repeat ? 'white' : ''}
            onClick={toggleRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%" margin="" fontSize="xs">
            <Text>1:21</Text>
          </Box>
          <Box width="80%">
            <RangeSlider area-label={['min', 'max']} step={0.1} min={0} max={100} id="player-range">
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" margin="" fontSize="xs" textAlign="right">
            <Text>3:21</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
