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

interface SignUpComponentProps {
  setShowSignUp: (show: boolean) => void;
}

function SignUpComponent({ setShowSignUp }: SignUpComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);

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
      gap={5}
      border='2px'
      borderColor='green.700'
    >
      <Heading size='lg' color='green.900' fontFamily='Arial, sans-serif' textAlign='center'>
        Sign Up
      </Heading>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Email</FormLabel>
        <Input 
          type='text' 
          placeholder='Enter your email'
          focusBorderColor='green.700'
          bg='gray.50'
        />
      </FormControl>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Password</FormLabel>
        <Input 
          type='password' 
          placeholder='Enter your password'
          focusBorderColor='green.700'
          bg='gray.50'
        />
      </FormControl>
      
      {/* Checkbox de Termos e Condições */}
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
        mt={1}
        fontFamily='Arial, sans-serif'
        fontWeight='bold'
        isDisabled={!isChecked} // Desabilita o botão se os termos não forem aceitos
      >
        Sign Up
      </Button>
      
      <Text textAlign='center' color='green.700'>
        Already have an account? <Text as='span' cursor='pointer' color='green.700' fontWeight='bold' onClick={() => setShowSignUp(false)}>Login</Text>
      </Text>

      {/* Modal de Termos e Condições */}
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
          <ModalFooter>
            <Button colorScheme='green' onClick={handleAccept}>
              Aceitar
            </Button>
            <Button variant='ghost' onClick={handleDecline}>
              Recusar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default SignUpComponent;
