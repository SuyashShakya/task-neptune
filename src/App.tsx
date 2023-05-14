import React from 'react';
import { Box, Text} from "@chakra-ui/react";
import CurrencyConvertorComponent from './components/CurrencyConvertorComponent';
import ConnectWallet from './components/ConnectWallet';

const App = () => {
    return (
        <Box display='flex' w='100%' minH='100vh' alignItems='center' justifyContent='center' bg='purple.900' >
            <Box display='flex' flexDir='column' p={5} borderRadius={10} bg='white' gap={5}>
                <Text fontSize={24} fontWeight={600}>Neptune Task</Text>
                <CurrencyConvertorComponent />
                <ConnectWallet />
            </Box>
        </Box>
    )
}

export default App