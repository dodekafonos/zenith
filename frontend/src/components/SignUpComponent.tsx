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
  ModalFooter,
  useToast
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
  const toast = useToast()

  const handleCheckboxChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      onOpen(); 
    }
  };

  const handleAccept = () => {
    setIsChecked(true);
    onClose(); 
  };

  const handleDecline = () => {
    setIsChecked(false);
    onClose(); 
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
      toast({
        title: "Cadastro bem-sucedido",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
     
      setName('');
      setEmail('');
      setPassword('');
      
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
        isDisabled={!isChecked} 
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
    <ModalBody overflowY="auto" maxHeight="400px">
      <Text>
        Termos e Condições

        1. Aceitação dos Termos
        Ao utilizar nossos serviços, você concorda com os seguintes termos e condições. Por favor, leia-os com atenção. Se você não concordar com estes termos, não deverá utilizar os nossos serviços.

        2. Coleta e Uso de Dados
        Nós coletamos e armazenamos os dados fornecidos por você para fins exclusivos de armazenamento e análise interna. Seus dados de anamnese serão utilizados para gerar insights e recomendações personalizadas, com o único objetivo de melhorar sua experiência e proporcionar um melhor entendimento de sua saúde.

        3. Proteção de Dados Pessoais
        Estamos comprometidos em proteger a privacidade e segurança de seus dados pessoais. Seguimos as diretrizes da Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018), garantindo que seus dados sejam tratados de forma segura e confidencial.

        4. Compartilhamento de Dados
        Seus dados não serão compartilhados com terceiros, exceto quando estritamente necessário para o cumprimento de obrigações legais, como em casos de solicitações judiciais.

        5. Exclusão de Dados
        Você tem o direito de solicitar a exclusão de seus dados a qualquer momento. Conforme descrito na nossa política de privacidade, ao solicitar a exclusão, seus dados serão removidos de todos os nossos registros e backups, garantindo a exclusão total e irreversível, salvo nos casos em que a retenção seja exigida por lei.

        6. Alterações nos Termos e Condições
        Reservamo-nos o direito de alterar estes termos e condições a qualquer momento. Qualquer alteração será comunicada a você antes de entrar em vigor. O uso continuado dos nossos serviços após a notificação de alterações constitui sua aceitação dos novos termos.

        7. Limitação de Responsabilidade
        Nosso serviço é fornecido "como está" e "conforme disponível". Não garantimos que o serviço estará disponível de forma ininterrupta ou livre de erros. Na medida permitida por lei, não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, ou consequenciais resultantes do uso ou da incapacidade de usar o serviço.

        8. Contato
        Se você tiver alguma dúvida sobre estes termos, entre em contato conosco através do suporte ao cliente.
      </Text>
    </ModalBody>
    <ModalFooter gap={2}>
      <Button colorScheme="green" onClick={handleAccept}>
        Aceitar
      </Button>
      <Button variant="ghost" bgColor="darkgray" onClick={handleDecline}>
        Recusar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  );
}

export default SignUpComponent;
