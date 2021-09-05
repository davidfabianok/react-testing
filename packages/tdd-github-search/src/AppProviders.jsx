import {ChakraProvider, CSSReset} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
export default function AppProviders({children}) {
  return (
    <ChakraProvider>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}
