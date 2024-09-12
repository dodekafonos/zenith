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
    Text,
    SimpleGrid,
    useToast,
  } from '@chakra-ui/react'
  import { useEffect, useState } from 'react';

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
    const toast = useToast();
  
    useEffect(() => {
      const fetchAnamnesisData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token não encontrado no localStorage');
          }
  
          const response = await fetch('http://localhost:5000/api/anamnesis', {
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
  
        setAnamnesisList((prevList) => prevList.filter((anamnese) => anamnese.id !== id));
        toast({
          title: "Deletada de todos os registros",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
  
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Clareza dos Dados e Exclusão Total</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
              "De acordo com o Artigo 18, Inciso VI da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD), você tem o direito de solicitar a exclusão de seus dados pessoais armazenados em nossos sistemas. Ao exercer esse direito, todos os seus dados de anamnese serão eliminados de nossos registros, bases de dados e quaisquer backups, garantindo a exclusão total e irreversível, salvo nos casos previstos pela lei onde a retenção seja necessária."
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