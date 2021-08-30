import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import {useState} from 'react';

import {saveProduct} from '../services/productServices';
import {CREATED_STATUS} from '../const/httpStatus';

const INITIAL_FORM_STATE = {
  name: '',
  size: '',
  type: '',
};

export default function Form() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_STATE);

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

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSaving(true);

    const {name, size, type} = event.target.elements;
    validateForm(getFormValues({name, size, type}));

    const response = await saveProduct(getFormValues({name, size, type}));
    if (response.status === CREATED_STATUS) {
      event.target.reset();
      setIsSuccess(true);
    }

    setIsSaving(false);
  };

  const handleBlur = event => {
    const {name, value} = event.target;
    validateField({name, value});
  };

  return (
    <Center flexDir="column">
      <Heading as="h3" mb={10} size="lg">
        Create product
      </Heading>

      {isSuccess && (
        <Alert mb={10} status="success" width="md">
          <AlertIcon />
          <AlertTitle mr={2}>product stored</AlertTitle>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isInvalid={formErrors.name}>
          <FormLabel aria-required>Name</FormLabel>
          <Input name="name" onBlur={handleBlur} />
          <FormErrorMessage>{formErrors.name}</FormErrorMessage>
        </FormControl>

        <FormControl id="size" isInvalid={formErrors.size}>
          <FormLabel>Size</FormLabel>
          <Input name="size" onBlur={handleBlur} />
          <FormErrorMessage>{formErrors.size}</FormErrorMessage>
        </FormControl>

        <FormControl id="type" isInvalid={formErrors.type}>
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
          mt={10}
          type="submit"
          variant="outline"
          width="full"
        >
          Submit
        </Button>
      </form>
    </Center>
  );
}
