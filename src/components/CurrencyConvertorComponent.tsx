import React, { ChangeEvent } from 'react';
import { Box, Text } from "@chakra-ui/react";

import Input from "./common/Input";

const CurrencyConvertorComponent = () => {
    let initialValue = 0
    const [nepValue, setNepValue] = React.useState(initialValue);
    const [busdValue, setBusdValue] = React.useState(initialValue * 3);

    const handleNepChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nep = parseFloat(event.target.value);
        const busd = isNaN(nep) ? "" : (nep * 3).toFixed(2);
        setNepValue(nep);
        setBusdValue(busd as unknown as number);
    };

    const handleBusdChange = (event : ChangeEvent<HTMLInputElement>) => {
        const busd = parseFloat(event.target.value);
        const nep = isNaN(busd) ? "" : (busd / 3).toFixed(2);
        setNepValue(nep as unknown as number);
        setBusdValue(busd);
    };
    return (
        <Box display='flex' flexDir='column' gap={5} >
            <Text fontSize={18} fontWeight='500'>Currency Convertor</Text>
            <Input 
                type="number"
                textAlign="right"
                leftAddonText="NEP"
                value={nepValue}
                onChange={handleNepChange}
            />
            <Input 
                type="number"
                textAlign="right"
                leftAddonText="BUSD"
                value={busdValue}
                onChange={handleBusdChange}
            />
        </Box>

    )
}

export default CurrencyConvertorComponent