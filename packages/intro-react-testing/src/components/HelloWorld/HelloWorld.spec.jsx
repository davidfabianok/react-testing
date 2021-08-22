import {render, screen} from '@testing-library/react';
import HelloWorld from './HelloWorld';

describe('Spec Hello world', () => {
  it('renders hello world', () => {
    render(<HelloWorld />);

    const title = screen.getByText(/hello world/i);
    expect(title).toBeInTheDocument();
    expect(HelloWorld).toBeDefined();
  });
});
