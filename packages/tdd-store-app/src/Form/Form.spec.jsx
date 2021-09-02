import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import Form from './Form';
import {
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  INVALID_REQUEST_STATUS,
} from '../const/httpStatus';

const server = setupServer(
  rest.post('/products', (req, res, context) => {
    const {name, size, type} = req.body;
    if (name && size && type) {
      return res(context.status(CREATED_STATUS));
    }
    return res(context.status(INTERNAL_SERVER_ERROR_STATUS));
  }),
);

// Enable Api mocking before tests.
beforeAll(() => server.listen());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

afterEach(() => server.resetHandlers());

beforeEach(() => {
  render(<Form />);
});

describe('Spec Form', () => {
  it('should it exists Form', () => {
    expect(Form).toBeDefined();
  });

  it('should be a product page title', () => {
    const title = screen.getByRole('heading', {name: /create product/i});

    expect(title).toBeInTheDocument();
  });

  it('should exists the fields: name, size and type', () => {
    const inputName = screen.getByLabelText(/name/i);
    const inputSize = screen.getByLabelText(/size/i);
    const selectType = screen.getByLabelText(/type/i);

    expect(inputName).toBeInTheDocument();
    expect(inputSize).toBeInTheDocument();
    expect(selectType).toBeInTheDocument();

    // Options
    const optionElectronic = screen.getByRole('option', {
      name: /electronic/i,
    });
    const optionFurniture = screen.getByRole('option', {
      name: /furniture/i,
    });
    const optionClothing = screen.getByRole('option', {
      name: /clothing/i,
    });

    expect(optionElectronic).toBeInTheDocument();
    expect(optionFurniture).toBeInTheDocument();
    expect(optionClothing).toBeInTheDocument();
  });

  it('should exists submit button', () => {
    const submitButton = screen.getByRole('button', {name: /submit/i});

    expect(submitButton).toBeInTheDocument();
  });
});

describe('when the user submit the form without values', () => {
  it('should display validation message', async () => {
    const submitButton = screen.getByRole('button', {name: /submit/i});
    const nameHelperText = screen.queryByText(/the name is required\./i);
    const sizeHelperText = screen.queryByText(/the size is required\./i);
    const typeHelperText = screen.queryByText(/the type is required\./i);

    expect(nameHelperText).not.toBeInTheDocument();
    expect(sizeHelperText).not.toBeInTheDocument();
    expect(typeHelperText).not.toBeInTheDocument();

    fireEvent.click(submitButton);

    const newNameHelperText = screen.queryByText(/the name is required\./i);
    const newSizeHelperText = screen.queryByText(/the size is required\./i);
    const newTypeHelperText = screen.queryByText(/the type is required\./i);
    expect(newNameHelperText).toBeInTheDocument();
    expect(newSizeHelperText).toBeInTheDocument();
    expect(newTypeHelperText).toBeInTheDocument();

    // resolve Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});

describe('when the user blurs an empty fields', () => {
  it('should display a validation error message for the input name', () => {
    const nameHelperText = screen.queryByText(/the name is required\./i);
    expect(nameHelperText).not.toBeInTheDocument();

    const inputName = screen.getByLabelText(/name/i);
    fireEvent.blur(inputName, {target: {name: 'name', value: ''}});
    const newNameHelperText = screen.queryByText(/the name is required\./i);
    expect(newNameHelperText).toBeInTheDocument();
  });

  it('should display a validation error message for the input size', () => {
    const sizeHelperText = screen.queryByText(/the size is required\./i);
    expect(sizeHelperText).not.toBeInTheDocument();

    const inputSize = screen.getByLabelText(/size/i);
    fireEvent.blur(inputSize, {target: {name: 'size', value: ''}});
    const newSizeHelperText = screen.queryByText(/the size is required\./i);
    expect(newSizeHelperText).toBeInTheDocument();
  });

  // remove this test
  it('should display a validation error message for the input type', () => {
    const typeHelperText = screen.queryByText(/the type is required\./i);
    expect(typeHelperText).not.toBeInTheDocument();

    const inputType = screen.getByLabelText(/type/i);
    fireEvent.blur(inputType, {target: {name: 'type', value: ''}});
    const newTypeHelperText = screen.queryByText(/the type is required\./i);
    expect(newTypeHelperText).toBeInTheDocument();
  });
});

describe('when the user submits the form properly and the server returns created status', () => {
  it('should the submit button be disabled until the request is done', async () => {
    const submitButton = screen.getByRole('button', {name: /submit/i});
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should the form page must display the success massage Product store and clean fields values', async () => {
    const nameInput = screen.getByRole('textbox', {name: /name/i});
    const sizeInput = screen.getByRole('textbox', {name: /size/i});
    const typeSelect = screen.getByRole('combobox', {
      name: /type/i,
    });

    fireEvent.change(nameInput, {
      target: {name: 'name', value: 'test name'},
    });
    fireEvent.change(sizeInput, {
      target: {name: 'size', value: 'test size'},
    });
    fireEvent.change(typeSelect, {
      target: {name: 'type', value: 'electronic'},
    });

    fireEvent.click(screen.getByRole('button', {name: /submit/i}));

    await waitFor(() => {
      expect(screen.getByText(/product stored/i)).toBeInTheDocument();
    });

    expect(nameInput).toHaveValue('');
    expect(sizeInput).toHaveValue('');
    expect(typeSelect).toHaveValue('');
  });
});

describe('when the user submit the form and the server returns an unexpected error', () => {
  it('the form page must display the error message "unexpected error, please try again"', async () => {
    const submitButton = screen.getByRole('button', {name: /submit/i});

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/unexpected error , please try again/i),
      ).toBeInTheDocument();
    });
  });
});

describe('when the user submit the form and the server returns an invalid request error', () => {
  it('the form page must display the error message "The form is invalid, the fields [field1...fieldN] are required"', async () => {
    server.use(
      rest.post('/products', (req, res, context) =>
        res(
          context.status(INVALID_REQUEST_STATUS),
          context.json({
            message:
              'The form is invalid, the fields name, size and type are required',
          }),
        ),
      ),
    );

    const submitButton = screen.getByRole('button', {name: /submit/i});

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          /the form is invalid, the fields name, size and type are required/i,
        ),
      ).toBeInTheDocument();
    });
  });
});

describe('when the user submit the form and the server returns an invalid request error ss', () => {
  it('the form page must display the error message "The form is invalid, the fields [field1...fieldN] are required"', async () => {
    server.use(
      rest.post('/products', (req, res, context) =>
        res.networkError('Connection error, please try later'),
      ),
    );

    const submitButton = screen.getByRole('button', {name: /submit/i});

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/connection error, please try later/i),
      ).toBeInTheDocument();
    });
  });
});
