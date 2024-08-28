import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from '../components/SideBarComponent';
import { HomeComponent, UserComponent, StatisticsComponent, DataComponent } from '../components/home/HomeComponents';

function HomePage() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <HomeComponent />;
      case 'user':
        return <UserComponent />;
      case 'statistics':
        return <StatisticsComponent />;
      case 'data':
        return <DataComponent />;
      default:
        return <HomeComponent />;
    }
  };

  return (
    <Box display='flex'>
      <Sidebar onSelect={setSelectedComponent} />
      <Box flex='1' p={4}>
        {renderComponent()}
      </Box>
    </Box>
  );
}

export default HomePage;
