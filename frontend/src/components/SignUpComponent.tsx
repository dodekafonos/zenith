// SignUpComponent.tsx
import { 
  Heading, 
  Text, 
  Box, 
  Button, 
  Input, 
  FormControl, 
  FormLabel, 
  Checkbox, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton, 
  ModalFooter 
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

interface SignUpComponentProps {
  setShowSignUp: (show: boolean) => void;
}

function SignUpComponent({ setShowSignUp }: SignUpComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

  const handleCheckboxChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      onOpen(); // Abre o modal se o usuário tentar marcar o checkbox
    }
  };

  const handleAccept = () => {
    setIsChecked(true);
    onClose(); // Fecha o modal após aceitar os termos
  };

  const handleDecline = () => {
    setIsChecked(false);
    onClose(); // Fecha o modal ao recusar os termos
  };

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Limpar os campos de entrada
      setName('');
      setEmail('');
      setPassword('');
      // Alternar para a página de login
      setShowSignUp(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        setError('Erro ao registrar usuário.');
      } else {
        console.error('Unexpected error:', error);
        setError('Erro ao conectar ao servidor.');
      }
    }
  };

  return (
    <Box 
      w='100%' 
      maxW='400px'
      p={6}
      bg='white'
      borderRadius='md'
      boxShadow='lg'
      display='flex' 
      flexDir='column' 
      gap={2}
      border='2px'
      borderColor='green.700'
    >
      <Heading size='lg' color='green.900' fontFamily='Arial, sans-serif' textAlign='center'>
        Sign Up
      </Heading>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Name</FormLabel>
        <Input 
          type='text' 
          placeholder='Enter your name'
          focusBorderColor='green.700'
          bg='gray.50'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      
      <Checkbox 
        isChecked={isChecked} 
        onChange={handleCheckboxChange} 
        colorScheme='green'
      >
        Eu aceito os <Text as="span" color="green.900" textDecoration="underline" cursor="pointer" onClick={onOpen}>Termos e Condições</Text>
      </Checkbox>

      <Button 
        bg='green.900' 
        color='white' 
        _hover={{ bg: 'green.800' }} 
        w='100%'
        fontFamily='Arial, sans-serif'
        fontWeight='bold'
        isDisabled={!isChecked} // Desabilita o botão se os termos não forem aceitos
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
      
      <Text textAlign='center' color='green.700'>
        Already have an account? <Text as='span' cursor='pointer' color='green.700' fontWeight='bold' onClick={() => setShowSignUp(false)}>Login</Text>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Termos e Condições</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Aqui você pode colocar os termos e condições completos que o usuário precisa aceitar para continuar com o cadastro.
            </Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button colorScheme='green' onClick={handleAccept}>
              Aceitar
            </Button>
            <Button variant='ghost' bgColor='darkgray' onClick={handleDecline}>
              Recusar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default SignUpComponent;
