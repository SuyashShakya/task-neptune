
import { Box, Button, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    return (
        <Box display='flex' flexDir='column' gap={5}>
            <Text fontSize={18} fontWeight={500}>Neptune</Text>
            <Button 
                w='-webkit-fit-content' 
                colorScheme='blue'
                onClick={() => navigate("/currency-convertor", { replace: false })}
            >
                Currency Convertor
            </Button>
        </Box>
    )
}

export default Homepage