import {render, screen} from '@testing-library/react';
import Form from './Form';

describe('Spec Form', function () {
  beforeEach(function () {
    render(<Form />);
  });

  it('it exists', () => {
    expect(Form).toBeDefined();
  });

  it('should be a product page', () => {
    const title = screen.getByRole('heading', {name: /create product/i});

    expect(title).toBeInTheDocument();
  });

  it('should exists the fields: name, size and type', () => {
    screen.logTestingPlaygroundURL();
    const inputName = screen.getByLabelText(/name/i);
    const inputSize = screen.getByLabelText(/size/i);
    const inputType = screen.getByLabelText(/type/i);

    expect(inputName).toBeInTheDocument();
    expect(inputSize).toBeInTheDocument();
    expect(inputType).toBeInTheDocument();

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
});
