import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Heading,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Input
} from '@chakra-ui/react'
import HomeCarousel from './HomeCarousel';

export function HomeComponent() {
  return (
    <Box p={6}>
      <Heading>Home</Heading>
      <Text mb={10}>Bem-vindo à página inicial da Zenith!</Text>
      <Box><HomeCarousel /></Box>
    </Box>
  );
}

export function UserComponent() {
  return (
    <Box p={6}>
      <Heading>Usuário</Heading>
      <Text>Aqui você pode gerenciar seu perfil e informações de conta.</Text>
    </Box>
  );
}

export function StatisticsComponent() {
  return (
    <Box p={6}>
      <Heading>Estatísticas</Heading>
      <Text>Veja as análises e relatórios sobre sua saúde e bem-estar.</Text>
    </Box>
  );
}

export function DataComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const anamnesisData = {
    historicoMedico: 'Histórico médico exemplo...',
    alergias: 'Nenhuma',
    medicamentos: 'Nenhum',
  }

  const handleModal = () => {
    onOpen()
  } 

  return (
    <Box p={6}>
      <Heading>Seus Dados de Anamnese</Heading>
      <VStack align="start" mt={4} spacing={4}>
        <Box>
          <Text fontWeight="bold">Histórico Médico:</Text>
          <Text>{anamnesisData.historicoMedico}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Alergias:</Text>
          <Text>{anamnesisData.alergias}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Medicamentos em Uso:</Text>
          <Text>{anamnesisData.medicamentos}</Text>
        </Box>
      </VStack>
      <Button mt={6} mr={4} bgColor="lightgray" onClick={handleModal}>Uso dos dados</Button>
      <Button mt={6} colorScheme="red">Excluir Dados</Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}      
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Como seu dados são utilizados?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>Um baita textão aqui</Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}


export function AnamnesisFormComponent() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você vai adicionar a lógica para salvar os dados de anamnese no banco de dados
  };

  return (
    <Box p={6}>
      <Heading mb={5}>Insira seus dados para Anamnese:</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="historico-medico" isRequired>
            <FormLabel>Histórico Médico</FormLabel>
            <Textarea placeholder="Descreva seu histórico médico..." />
          </FormControl>
          <FormControl id="alergias">
            <FormLabel>Alergias</FormLabel>
            <Input placeholder="Informe suas alergias" />
          </FormControl>
          <FormControl id="medicamentos">
            <FormLabel>Medicamentos em Uso</FormLabel>
            <Input placeholder="Informe os medicamentos em uso" />
          </FormControl>
          <Button type="submit" colorScheme="green">Salvar Dados</Button>
        </VStack>
      </form>
    </Box>
  );
};
