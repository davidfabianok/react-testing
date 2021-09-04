import {ChakraProvider} from '@chakra-ui/react';
import CSSReset from '@chakra-ui/css-reset';

// eslint-disable-next-line react/prop-types
export default function AppProviders({children}) {
  return (
    <ChakraProvider>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}
