import {fireEvent, render, screen} from '@testing-library/react';
import Counter from './Counter';

describe('Spec Counter', function () {
  it('exists', () => {
    expect(Counter).toBeDefined();
  });

  it('display zero initial counts', () => {
    render(<Counter />);
    const initialCount = screen.getByRole('heading', {name: /counter: 0/i});

    expect(initialCount).toBeInTheDocument();
  });

  it('display new counter after one click', () => {
    render(<Counter />);
    const increment = screen.getByRole('button', {name: /increment/i});
    const decrement = screen.getByRole('button', {name: /decrement/i});

    const initialCount = screen.getByRole('heading', {name: /counter: 0/i});
    expect(initialCount).toBeInTheDocument();

    fireEvent.click(increment);
    const addedCount = screen.getByRole('heading', {name: /counter: 1/i});
    expect(addedCount).toBeInTheDocument();

    fireEvent.click(decrement);
    expect(initialCount).toBeInTheDocument();
  });
});
