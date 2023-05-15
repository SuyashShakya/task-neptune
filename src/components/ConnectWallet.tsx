import React from "react"
import isEmpty from 'lodash/isEmpty'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { ethers } from "ethers";

const ConnectWallet = () => {
    const [address, setAddress] = React.useState([])
    const [walletDetails, setWalletDetails] = React.useState<{name: string, chainId: number}>()
    const [walletBalance, setWalletBalance] = React.useState(0)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const connectWallet = async () => {
        if(window.ethereum){
            await window.ethereum.request({
            method: 'eth_requestAccounts',
        }).then((res: string[]) => setAddress(res))
        } else {
            console.error('Install metamask')        
        }
    }

    const showWalletDetails = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const walletDetails = await provider._networkPromise
        setWalletDetails(walletDetails)
        await window.ethereum.request({method: 'eth_getBalance', params: [address[0], 'latest']}).then((balance: any) => {
            setWalletBalance(ethers.utils.formatEther(balance) as unknown as number)
            onOpen()
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
                                            <Td>{address}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Name</Td>
                                            <Td>{walletDetails?.name}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Chain Id</Td>
                                            <Td>{walletDetails?.chainId}</Td>
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