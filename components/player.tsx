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

const Player = () => {
  return (
    <Box>
      <Box>{/* <ReactHowler /> */}</Box>
      <Center>
        <ButtonGroup color="gray.600" fontSize="24px">
          <IconButton outline="none" variant="link" aria-label="shuffle" icon={<MdShuffle />} />
          <IconButton outline="none" variant="link" aria-label="previous" icon={<MdSkipPrevious />} />
          <IconButton
            outline="none"
            variant="link"
            aria-label="play"
            fontSize="40px"
            color="white"
            icon={<MdOutlinePlayCircleFilled />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="pause"
            fontSize="40px"
            color="white"
            icon={<MdOutlinePauseCircleFilled />}
          />
          <IconButton outline="none" variant="link" aria-label="next" icon={<MdSkipNext />} />
          <IconButton outline="none" variant="link" aria-label="repeat" icon={<MdOutlineRepeat />} />
        </ButtonGroup>
      </Center>
    </Box>
  )
}

export default Player
