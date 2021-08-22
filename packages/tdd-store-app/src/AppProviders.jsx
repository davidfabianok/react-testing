import {ChakraProvider} from '@chakra-ui/react';
import App from './App';

export default function AppProviders() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}
