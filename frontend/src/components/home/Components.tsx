import { Box, Heading, Text } from '@chakra-ui/react';
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
  return (
    <Box p={6}>
      <Heading>Dados</Heading>
      <Text>Acesse seus dados de saúde e registros médicos.</Text>
    </Box>
  );
}
