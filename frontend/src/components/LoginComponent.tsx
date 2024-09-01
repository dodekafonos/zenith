// LoginComponent.tsx
import { Heading, Text, Box, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginComponentProps {
  setShowSignUp: (show: boolean) => void;
}

function LoginComponent({ setShowSignUp }: LoginComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      const { access_token } = response.data;
      toast({
        title: "Login bem-sucedido",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem('token', access_token);
      navigate('/home');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: "Erro no login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setError('Credenciais inválidas. Tente novamente.');
    }
  };
  
  return (
    <Box 
      w='100%' 
      maxW='400px'
      p={8}
      bg='white'
      borderRadius='md'
      boxShadow='lg'
      display='flex' 
      flexDir='column' 
      gap={7}
      border='2px'
      borderColor='green.700'
    >
      <Heading size='lg' color='green.900' fontFamily='Arial, sans-serif' textAlign='center'>
        Login
      </Heading>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Email</FormLabel>
        <Input 
          type='text' 
          placeholder='Enter your email'
          focusBorderColor='green.700'
          bg='gray.50'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Password</FormLabel>
        <Input 
          type='password' 
          placeholder='Enter your password'
          focusBorderColor='green.700'
          bg='gray.50'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      {error && <Text color='red.500' textAlign='center'>{error}</Text>}
      <Button 
        bg='green.900' 
        color='white' 
        _hover={{ bg: 'green.800' }} 
        w='100%'
        mt={4}
        fontFamily='Arial, sans-serif'
        fontWeight='bold'
        onClick={handleLogin}
      >
        Login
      </Button>
      <Text textAlign='center' color='green.700'>
        Don't have an account? <Text as='span' cursor='pointer' color='green.700' fontWeight='bold' onClick={() => setShowSignUp(true)}>Sign Up</Text>
      </Text>
    </Box>
  );
}

export default LoginComponent;
