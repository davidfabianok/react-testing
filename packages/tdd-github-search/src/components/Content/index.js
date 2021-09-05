import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  WrapItem,
} from '@chakra-ui/react';

const Content = ({isSearchApplied}) =>
  isSearchApplied ? (
    <Table>
      <Thead>
        <Tr>
          <Th>Repository</Th>
          <Th isNumeric>Starts</Th>
          <Th isNumeric>Forks</Th>
          <Th isNumeric>Open issues</Th>
          <Th>Updated at</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <WrapItem alignItems="center">
              <Avatar name="test" src="https://bit.ly/kent-c-dodds" />
              <Link href="https://github.com/" ml="0.8rem">
                Test repo
              </Link>
            </WrapItem>
          </Td>
          <Td isNumeric>10</Td>
          <Td isNumeric>5</Td>
          <Td isNumeric>2</Td>
          <Td>2021-01-01</Td>
        </Tr>
      </Tbody>
    </Table>
  ) : (
    <Box alignItems="center" display="flex" h="20rem" justifyContent="center">
      <Text>Please provide a search option and click in the search button</Text>
    </Box>
  );

Content.propTypes = {
  isSearchApplied: PropTypes.bool.isRequired,
};

export default Content;
