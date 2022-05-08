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
import { formatTime } from '../lib/formatter'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [isSeeking, setSeeking] = useState(false)
  const [index, setIndex] = useState(songs.findIndex((s) => s.id === activeSong.id))
  const [seek, setSeek] = useState(0.0)
  const [duration, setDuration] = useState(0.0)

  const repeatRef = useRef(repeat)
  const $sound = useRef(null)

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  useEffect(() => {
    let timerId
    if (playing && !isSeeking) {
      const f = () => {
        setSeek($sound.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }

    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])

  const toggle = (some) => !some
  const togglePlay = () => setPlaying(toggle)
  const toggleShuffle = () => setShuffle(toggle)
  const toggleRepeat = () => setRepeat(toggle)

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === index) {
          return nextSong()
        }
        return next
      }
      return state === songs.length - 1 ? 0 : state + 1
    })
  }

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      $sound.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = $sound.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (event) => {
    const v = event[0]
    setSeek(parseFloat(v))
    $sound.current.seek(v)
  }

  return (
    <Box width="100%">
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} ref={$sound} onLoad={onLoad} onEnd={onEnd} />
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
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
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
          <IconButton outline="none" variant="link" aria-label="next" icon={<MdSkipNext />} onClick={nextSong} />
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
            <Text>{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              area-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setSeeking(true)}
              onChangeEnd={() => setSeeking(false)}
              id="player-range">
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" margin="" fontSize="xs" textAlign="right">
            <Text>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
