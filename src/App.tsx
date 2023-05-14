import { Container } from '@chakra-ui/react';
import React from 'react';
import { Route,   BrowserRouter as Router, Routes } from 'react-router-dom';
import CurrencyConvertorComponent from './components/CurrencyConvertorComponent';

import Homepage from './pages/Homepage';

function App() {
  return (
    <Container maxW='4xl' p={5} bg='gray.50' minH='100vh'>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/currency-convertor" element={<CurrencyConvertorComponent />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
