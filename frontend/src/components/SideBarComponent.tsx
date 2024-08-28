import { Box, IconButton, VStack, Image, Tooltip } from '@chakra-ui/react';
import { FaHome, FaUser, FaChartBar, FaDatabase, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/health2-removebg.png';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (show: any) => void;
}

function SideBarComponent ({ onSelect }: SideBarProps) {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }
    
  return (
    <Box 
      w='100px' 
      h='100vh' 
      bgColor='green.900' 
      display='flex' 
      flexDirection='column' 
      justifyContent='space-between' 
      alignItems='center'
      position="fixed" // Fixando a sidebar na tela
      top={0} // Mantendo-a no topo
      left={0} // Mantendo-a à esquerda
      py={4}
    >
      {/* Logo */}
      <Box mb={5}>
        <Image src={logo} alt="Health Logo" boxSize="50px" />
      </Box>

      {/* Icones */}
      <VStack spacing={12}>
        <Tooltip label="Home" fontSize="md">
          <IconButton 
            icon={<FaHome size="28px" />} 
            aria-label="Home" 
            color='white'
            bgColor='green.900'
            _hover={{ bg: 'green.700' }}
            onClick={() => onSelect('home')}
            size="lg"
          />
        </Tooltip>
        <Tooltip label="User" fontSize="md">
          <IconButton 
            icon={<FaUser size="28px" />} 
            aria-label="User" 
            color='white'
            bgColor='green.900'
            _hover={{ bg: 'green.700' }}
            onClick={() => onSelect('user')}
            size="lg"
          />
        </Tooltip>
        <Tooltip label="Estatísticas" fontSize="md">
          <IconButton 
            icon={<FaChartBar size="28px" />} 
            aria-label="Estatísticas" 
            color='white'
            bgColor='green.900'
            _hover={{ bg: 'green.700' }}
            onClick={() => onSelect('statistics')}
            size="lg"
          />
        </Tooltip>
        <Tooltip label="Dados" fontSize="md"    >
          <IconButton 
            icon={<FaDatabase size="28px" />} 
            aria-label="Dados" 
            color='white'
            bgColor='green.900'
            _hover={{ bg: 'green.700' }}
            onClick={() => onSelect('data')}
            size="lg"
          />
        </Tooltip>
      </VStack>

      {/* Logout */}
      <Tooltip label="Logout" fontSize="md">
        <IconButton 
          icon={<FaSignOutAlt size="28px" />} 
          aria-label="Logout" 
          color='white'
          bgColor='green.600'
          _hover={{ bg: 'red.500' }}
          onClick={handleLogout}
          size="lg"
          mt={4}
        />
      </Tooltip>
    </Box>
  );
}

export default SideBarComponent;
