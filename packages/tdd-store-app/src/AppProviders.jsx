import {ChakraProvider} from '@chakra-ui/react';
import CSSReset from '@chakra-ui/css-reset';
import App from './App';

export default function AppProviders() {
  return (
    <ChakraProvider>
      <CSSReset />
      <App />
    </ChakraProvider>
  );
}
