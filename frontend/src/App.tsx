// App.tsx ou Routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Adiciona o import de Navigate
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import Home from './pages/HomePage';
import ProtectedRoute from './components/PrivateRoutes';
import { useState } from 'react'; // Adiciona o import de useState
import LoginPage from './pages/LoginPage';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent setShowSignUp={setShowSignUp} />} />
        <Route path="/signup" element={<SignUpComponent setShowSignUp={setShowSignUp} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;