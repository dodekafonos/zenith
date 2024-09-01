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
import { useEffect, useState } from 'react';
import axios from 'axios';

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
interface Anamnese {
  _id: string;
  historico_medico: string;
  alergias: string;
  medicamentos: string;
}

export function DataComponent() {
  const [anamnesisList, setAnamnesisList] = useState<Anamnese[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAnamnesisData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado no localStorage');
        }

        const response = await fetch('http://localhost:5000/api/anamnesis/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setAnamnesisList(data);
      } catch (error) {
        console.error('Error fetching anamnese data:', error);
      }
    };

    fetchAnamnesisData();
  }, []);

  const deleteAnamnesis = async (id: string) => {
    if (!id) {
      console.error('ID inválido ou não definido.');
      return;
    }
  
    console.log('ID da anamnese a ser excluída:', id);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado no localStorage');
      }
  
      console.log('Token:', token);  // Verifique se o token está sendo recuperado corretamente
  
      const response = await fetch(`http://localhost:5000/api/anamnesis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete anamnese: ${response.statusText}`);
      }
  
      setAnamnesisList(prevList => prevList.filter(anamnese => anamnese._id !== id));
    } catch (error) {
      console.error('Error deleting anamnese:', error);
    }
  };
  

  return (
    <Box p={6}>
      <Heading>Seus Dados de Anamnese</Heading>
      {anamnesisList.length > 0 ? (
        <VStack align="start" mt={4} spacing={4}>
          {anamnesisList.map(anamnese => (
            <Box key={anamnese._id} borderWidth="1px" p={4} borderRadius="md">
              <Box>
                <Text fontWeight="bold">Histórico Médico:</Text>
                <Text>{anamnese.historico_medico}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Alergias:</Text>
                <Text>{anamnese.alergias}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Medicamentos em Uso:</Text>
                <Text>{anamnese.medicamentos}</Text>
              </Box>
              <Button mt={2} colorScheme="red" onClick={() => deleteAnamnesis(anamnese._id)}>Excluir Dados</Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>Carregando dados...</Text>
      )}
      <Button mt={6} mr={4} bgColor="lightgray" onClick={onOpen}>Uso dos Dados</Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clareza dos Dados e Exclusão Total</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>Este modal fornece informações sobre como seus dados são utilizados e a política de exclusão total. Seus dados de anamnese são armazenados de forma segura e são acessíveis somente por você. Se desejar excluir seus dados, eles serão removidos de todos os registros e backups, garantindo a exclusão total e irreversível.</Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}


export function AnamnesisFormComponent() {
  const [historicoMedico, setHistoricoMedico] = useState('');
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  // Obtendo o token do localStorage
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/anamnesis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Adicionando o cabeçalho de autorização
        },
        body: JSON.stringify({
          historico_medico: historicoMedico,
          alergias: alergias,
          medicamentos: medicamentos,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Anamnese criada com sucesso:', result);
        // Resetar os campos após o sucesso
        setHistoricoMedico('');
        setAlergias('');
        setMedicamentos('');
      } else {
        console.error('Erro ao criar anamnese', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar anamnese', error.message);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={5}>Insira seus dados para Anamnese:</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="historico-medico" isRequired>
            <FormLabel>Histórico Médico</FormLabel>
            <Textarea 
              placeholder="Descreva seu histórico médico..."
              value={historicoMedico}
              onChange={(e) => setHistoricoMedico(e.target.value)}
            />
          </FormControl>
          <FormControl id="alergias">
            <FormLabel>Alergias</FormLabel>
            <Input 
              placeholder="Informe suas alergias" 
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
            />
          </FormControl>
          <FormControl id="medicamentos">
            <FormLabel>Medicamentos em Uso</FormLabel>
            <Input 
              placeholder="Informe os medicamentos em uso" 
              value={medicamentos}
              onChange={(e) => setMedicamentos(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="green">Salvar Dados</Button>
        </VStack>
      </form>
    </Box>
  );
}
