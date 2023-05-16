import React from "react"
import isEmpty from 'lodash/isEmpty'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import Web3 from "web3";

const ConnectWallet = () => {
    const [address, setAddress] = React.useState<string[]>([])
    const [chainId, setChainId] = React.useState(0)
    const [walletBalance, setWalletBalance] = React.useState(0)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const detectProvider = () => {
        let provider;
        if (window.ethereum) {
          provider = window.ethereum;
        } else if (window.web3) {
          provider = window.web3.currentProvider;
        } else {
          console.error('Install metamask')
        }
        return provider;
    };

    const connectWallet = async () => {
        const provider = detectProvider()
        if (provider) {
            if (provider !== window.ethereum) {
              console.error(
                "No provider available!!"
              );
            } else {
                const address = await provider.request({
                    method: "eth_requestAccounts",
                  });
                setAddress(address)  
            } 
        }
    }

    const showWalletDetails = async () => {
        const provider = detectProvider()
        const web3 = new Web3(provider);
        await web3.eth.getChainId().then(async (chainId) => {
            setChainId(chainId)
            await web3.eth.getBalance(address[0]).then((balance) => {
                setWalletBalance(balance as unknown as number)
                onOpen();
            })
        })
    }
    
    const disconnectWallet = async () => {
        await window.ethereum._handleDisconnect()
        await window.ethereum._handleStreamDisconnect()
        window.location.reload()
    }
    return (
        <>
            {isEmpty(address) ? 
                    <Button bg='purple.900' color='white' onClick={connectWallet}>Connect Wallet</Button>
                    :
                    <Button bg='purple.900' color='white' onClick={showWalletDetails}>Show Wallet Details</Button>
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Wallet Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display='flex' flexDirection='column' gap={5}>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Key</Th>
                                            <Th>Value</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Account</Td>
                                            <Td>{!isEmpty(address[0]) && `${address[0].substring(0, 4)}...${address[0].substring(address[0].length - 4)}` }</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Chain Id</Td>
                                            <Td>{chainId}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Balance</Td>
                                            <Td>{walletBalance}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Button bg='purple.900' color='white' onClick={disconnectWallet}>Disconnect Wallet</Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConnectWallet;