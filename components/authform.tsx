import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: string }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()


  return (<Box width="100vw" height="100vh" bg="black" color="white">
    <Flex justify="center" align="center" height="100px">
      hello
    </Flex>
    <Flex justify="center" align="center" height="calc(100vh - 100px)">
      form
    </Flex>
  </Box>)
}

export default AuthForm