import {useState} from 'react';
import {
  Container,
  FormControl,
  Heading,
  Input,
  FormLabel,
  Button,
  InputRightElement,
  InputGroup,
  Box,
} from '@chakra-ui/react';

import Content from '../../components/Content';

export default function GithubSearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    await Promise.resolve('search results');
    setIsSearchApplied(true);
    setIsSearching(false);
  };

  return (
    <Container maxW="container.md">
      <Box my="2rem">
        <Heading as="h1" size="lg">
          Github repositories list
        </Heading>
      </Box>

      <Box>
        <FormControl id="filterBy">
          <FormLabel>Filter By</FormLabel>
          <InputGroup variant="flushed">
            <Input name="filterBy" placeholder="Search repository..." />
            <InputRightElement width="5rem">
              <Button
                h="1.75rem"
                isDisabled={isSearching}
                onClick={handleSearch}
                size="sm"
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>

      <Box my="2rem">
        <Content isSearchApplied={isSearchApplied} />
      </Box>
    </Container>
  );
}
