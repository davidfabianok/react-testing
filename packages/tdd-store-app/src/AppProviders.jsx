import {ChakraProvider, CSSReset} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function AppProviders({children}) {
  return (
    <ChakraProvider>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
