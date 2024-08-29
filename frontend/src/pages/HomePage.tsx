import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SideBarComponent from '../components/SideBarComponent';
import { HomeComponent, UserComponent, StatisticsComponent, DataComponent, AnamnesisFormComponent } from '../components/home/Components';

function HomePage() {
  const [selectedComponent, setSelectedComponent] = useState('Home');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <HomeComponent />;
      case 'user':
        return <UserComponent />;
      case 'statistics':
        return <StatisticsComponent />;
      case 'data':
        return <DataComponent />;
      case 'anamnesis':
        return <AnamnesisFormComponent/>;
      default:
        return <HomeComponent />;
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar fixa à esquerda */}
      <SideBarComponent onSelect={setSelectedComponent} />

      {/* Conteúdo à direita da sidebar */}
      <Box flex="1" ml="7%" p={4} bgColor="gray.50" h="100vh" overflowY="auto">
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}

export default HomePage;
