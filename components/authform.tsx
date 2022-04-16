import { useRouter } from 'next/router'
import NextImage from 'next/image'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const user = await auth(mode, { email, password })
    setLoading(false)
    console.log(user)
    if (user.status === 401) {
      return setError('something went wrong')
    }
    router.push('/')
  }


  return (<Box width="100vw" height="100vh" bg="black" color="white">
    <Flex justify="center" align="center" height="100px" borderBottom="white 1px solid">
      <NextImage src="/logo.svg" height={60} width={60} />
    </Flex>
    <Flex justify="center" align="center" height="calc(100vh - 100px)" direction="column">
      {mode} form
      <Box padding="50px" bg="gray.900" borderRadius="5px">
        {error}
        <form onSubmit={handleSubmit}>
          <Input
            onChange={ (e) => setEmail(e.target.value) }
            placeholder="email"
            type="email"
            marginBottom="20px"
          />
          <Input
            onChange={ (e) => setPassword(e.target.value) }
            placeholder="password"
            type="password"
            marginBottom="20px"
          />
          <Button
            isLoading={isLoading}
            sx={{
              '&:hover': {
                bg: 'green.300'
              }
            }}
            type="submit"
            bg="green.500"
          >
            {mode.toUpperCase()}
          </Button>
        </form>
      </Box>
    </Flex>
  </Box>)
}

export default AuthForm