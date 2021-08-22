import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';

export default function Form() {
  return (
    <Center flexDir="column">
      <Heading as="h3" size="lg" mb={10}>
        Create product
      </Heading>
      <form>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input name="name" />
        </FormControl>

        <FormControl id="size">
          <FormLabel>Size</FormLabel>
          <Input name="size" />
        </FormControl>

        <FormControl id="type">
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select type">
            <option value="electronic">Electronic</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
          </Select>
        </FormControl>
      </form>
    </Center>
  );
}
