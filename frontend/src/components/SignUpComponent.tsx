import { Heading, Text, Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

interface SignUpComponentProps {
  setShowSignUp: (show: boolean) => void;
}

function SignUpComponent({ setShowSignUp }: SignUpComponentProps) {
  return (
    <Box 
      w='100%' 
      maxW='400px'
      p={8}
      bg='white'
      borderRadius='md'
      boxShadow='lg'
      display='flex' 
      flexDir='column' 
      gap={6}
      border='2px'
      borderColor='green.700'
    >
      <Heading size='lg' color='green.900' fontFamily='Arial, sans-serif' textAlign='center'>
        Sign Up
      </Heading>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Email</FormLabel>
        <Input 
          type='text' 
          placeholder='Enter your email'
          focusBorderColor='green.700'
          bg='gray.50'
        />
      </FormControl>
      <FormControl>
        <FormLabel color='green.700' fontWeight='bold'>Password</FormLabel>
        <Input 
          type='password' 
          placeholder='Enter your password'
          focusBorderColor='green.700'
          bg='gray.50'
        />
      </FormControl>
      <Button 
        bg='green.900' 
        color='white' 
        _hover={{ bg: 'green.800' }} 
        w='100%'
        mt={4}
        fontFamily='Arial, sans-serif'
        fontWeight='bold'
      >
        Sign Up
      </Button>
      <Text textAlign='center' color='green.700'>
        Already have an account? <Text as='span' cursor='pointer' color='green.700' fontWeight='bold' onClick={() => setShowSignUp(false)}>Login</Text>
      </Text>
    </Box>
  );
}

export default SignUpComponent;
