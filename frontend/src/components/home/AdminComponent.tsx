import { Box, Heading, Text, Input, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Tfoot } from "@chakra-ui/react"

export const AdminComponent = () => {
    return(
      <Box p={6}>
        <Heading>Bem vindo Administrador</Heading>
        <Text>Bem-vindo ao painel de controle da Zenith! Onde você e apenas você, pode alterar os termos e condições do usuário:</Text>
        <Box>
          <Text>Termos e condições:</Text>
          <Input my={10} placeholder="Digite aqui os novos termos..."></Input>
          <TableContainer>
          <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
        </TableContainer>        
      </Box>
      </Box>
    )
}