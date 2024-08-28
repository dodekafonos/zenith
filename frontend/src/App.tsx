import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box} from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
