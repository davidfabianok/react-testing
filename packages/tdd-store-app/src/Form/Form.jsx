import {useState} from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';

import {saveProduct} from '../services/productServices';
import {
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  INVALID_REQUEST_STATUS,
} from '../const/httpStatus';

const INITIAL_FORM_STATE = {
  name: '',
  size: '',
  type: '',
};

export default function Form() {
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validateField({name, value} = {}) {
    setFormErrors(prevFormErrors => ({
      ...prevFormErrors,
      [name]: value.length ? '' : `The ${name} is required.`,
    }));
  }

  function validateForm({name, size, type} = {}) {
    validateField({name: 'name', value: name});
    validateField({name: 'size', value: size});
    validateField({name: 'type', value: type});
  }

  const getFormValues = ({name, size, type}) => ({
    name: name.value,
    size: size.value,
    type: type.value,
  });

  async function handleFetchErrors(error) {
    if (error.status === INTERNAL_SERVER_ERROR_STATUS) {
      setErrorMessage('Unexpected error , please try again');
      return;
    }

    if (error.status === INVALID_REQUEST_STATUS) {
      const responseObject = await error.json();
      setErrorMessage(responseObject.message);
      return;
    }

    setErrorMessage('Connection error, please try later');
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSaving(true);

    const {name, size, type} = event.target.elements;
    validateForm(getFormValues({name, size, type}));

    try {
      const response = await saveProduct(getFormValues({name, size, type}));
      if (!response.ok) {
        throw response;
      }

      if (response.status === CREATED_STATUS) {
        event.target.reset();
        setIsSuccess(true);
      }
    } catch (error) {
      await handleFetchErrors(error);
    }

    setIsSaving(false);
  };

  const handleBlur = event => {
    const {name, value} = event.target;
    validateField({name, value});
  };

  return (
    <Container centerContent maxW="xs">
      <Heading as="h3" mb={10} size="lg">
        Create product
      </Heading>

      {isSuccess && (
        <Alert mb={10} status="success" width="md">
          <AlertIcon />
          <AlertTitle mr={2}>Product stored</AlertTitle>
        </Alert>
      )}
      {errorMessage && (
        <Alert mb={10} status="error" width="md">
          <AlertIcon />
          <AlertTitle mr={2}>{errorMessage}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={1} spacingX={1} spacingY={6}>
          <FormControl id="name" isInvalid={!!formErrors.name}>
            <FormLabel aria-required>Name</FormLabel>
            <Input name="name" onBlur={handleBlur} />
            <FormErrorMessage>{formErrors.name}</FormErrorMessage>
          </FormControl>

          <FormControl id="size" isInvalid={!!formErrors.size}>
            <FormLabel>Size</FormLabel>
            <Input name="size" onBlur={handleBlur} />
            <FormErrorMessage>{formErrors.size}</FormErrorMessage>
          </FormControl>

          <FormControl id="type" isInvalid={!!formErrors.type}>
            <FormLabel>Type</FormLabel>
            <Select name="type" onBlur={handleBlur} placeholder="Select type">
              <option value="electronic">Electronic</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
            </Select>
            <FormErrorMessage>{formErrors.type}</FormErrorMessage>
          </FormControl>

          <Button
            disabled={isSaving}
            type="submit"
            variant="outline"
            width="full"
          >
            Submit
          </Button>
        </SimpleGrid>
      </form>
    </Container>
  );
}
