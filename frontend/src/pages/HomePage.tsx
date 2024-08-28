import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SideBarComponent from '../components/SideBarComponent';
import { HomeComponent, UserComponent, StatisticsComponent, DataComponent } from '../components/home/Components';

function HomePage() {
  const [selectedComponent, setSelectedComponent] = useState('Home');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <HomeComponent />;
      case 'User':
        return <UserComponent />;
      case 'Statistics':
        return <StatisticsComponent />;
      case 'Data':
        return <DataComponent />;
      default:
        return <HomeComponent />;
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar fixa à esquerda */}
      <SideBarComponent onSelect={setSelectedComponent} />

      {/* Conteúdo à direita da sidebar */}
      <Box flex="1" ml="5%" p={4} bgColor="gray.50" h="100vh" overflowY="auto">
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}

export default HomePage;
