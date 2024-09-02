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
  Input, 
  Image,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import HomeCarousel from './HomeCarousel';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

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
      <Box mb={5}>
        <Image alt="Health Logo" boxSize="50px" />
      </Box>    
    </Box>
  );
}

export function StatisticsComponent() {
  const [anamnesisList, setAnamnesisList] = useState<Anamnese[]>([]);

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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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

  // Configurações do gráfico
  const chartOptions = {
    series: anamnesisList.map(() => Math.random() * 100), // Simula dados aleatórios para demonstração
    options: {
      chart: {
        type: 'polarArea',
      },
      labels: anamnesisList.map((anamnese) => anamnese.historico_medico || 'N/A'),
      fill: {
        opacity: 1,
        colors: ['#006400', '#008000', '#32CD32', '#7CFC00', '#ADFF2F'], // Escala de verdes
      },
      stroke: {
        width: 1,
        colors: ['#006400'],
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.6,
        },
      },
    },
  };

  return (
    <Box p={6}>
      <Heading>Estatísticas de Anamnese</Heading>
      <Text>Veja as análises e relatórios sobre sua saúde e bem-estar.</Text>
      <Box display='flex' justifyContent='center' mt={6}>
        <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="polarArea" width={600} />
      </Box>
    </Box>
  );
}

interface Anamnese {
  id: string;
  historico_medico: string;
  alergias: string;
  medicamentos: string;
  user_id: string;
}

export function DataComponent() {
  const [anamnesisList, setAnamnesisList] = useState<Anamnese[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<Anamnese | null>(null);

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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado no localStorage');
      }

      const response = await fetch(`http://localhost:5000/api/anamnesis/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete anamnese: ${response.statusText}`);
      }

      setAnamnesisList((prevList) => prevList.filter((anamnese) => anamnese._id !== id));
    } catch (error) {
      console.error('Error deleting anamnese:', error);
    }
  };

  const handleViewData = (anamnese: Anamnese) => {
    setSelectedAnamnesis(anamnese);
    setIsDataModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAnamnesis(null);
    setIsDataModalOpen(false);
  };

  return (
    <Box p={6}>
      <Heading>Seus Dados de Anamnese</Heading>
      {anamnesisList.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
          {anamnesisList.map((anamnese) => (
            <Box key={anamnese.id} borderWidth="1px" p={4} borderRadius="md">
              <Box>
                <Text fontWeight="bold">Histórico Médico:</Text>
                <Text isTruncated noOfLines={1}>
                  {anamnese.historico_medico}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Alergias:</Text>
                <Text>{anamnese.alergias}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Medicamentos em Uso:</Text>
                <Text>{anamnese.medicamentos}</Text>
              </Box>
              <Button mt={2} mr={2} colorScheme="green" onClick={() => handleViewData(anamnese)}>
                Visualizar Dados
              </Button>
              <Button mt={2} colorScheme="red" onClick={() => deleteAnamnesis(anamnese.id)}>
                Excluir Dados
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Nenhum dado capturado. Faça alguma requisição!</Text>
      )}

      <Button mt={6} mr={4} bgColor="lightgray" onClick={onOpen}>
        Uso dos Dados
      </Button>

      {/* Modal para visualizar os dados completos da anamnese */}
      <Modal isOpen={isDataModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes da Anamnese</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAnamnesis && (
              <>
                <Box>
                  <Text fontWeight="bold">Histórico Médico:</Text>
                  <Text>{selectedAnamnesis.historico_medico}</Text>
                </Box>
                <Box mt={4}>
                  <Text fontWeight="bold">Alergias:</Text>
                  <Text>{selectedAnamnesis.alergias}</Text>
                </Box>
                <Box mt={4}>
                  <Text fontWeight="bold">Medicamentos em Uso:</Text>
                  <Text>{selectedAnamnesis.medicamentos}</Text>
                </Box>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal sobre o uso dos dados */}
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clareza dos Dados e Exclusão Total</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Este modal fornece informações sobre como seus dados são utilizados e a política de exclusão total. Seus
              dados de anamnese são armazenados de forma segura e são acessíveis somente por você. Se desejar excluir
              seus dados, eles serão removidos de todos os registros e backups, garantindo a exclusão total e
              irreversível.
            </Box>
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
  const toast = useToast();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/anamnesis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          historico_medico: historicoMedico,
          alergias: alergias,
          medicamentos: medicamentos,
        }),
      });
      
      toast({
        title: "anamnese concluída",
        status: "success",
        duration: 3000,
        isClosable: true,
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
