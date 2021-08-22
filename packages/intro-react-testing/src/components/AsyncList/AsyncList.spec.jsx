import {render, screen} from '@testing-library/react';
import AsyncList from './AsyncList';

describe('Spec AsyncList', function () {
  it('exists', () => {
    expect(AsyncList).toBeDefined();
  });

  it('show the fruit data', async () => {
    render(<AsyncList />);
    screen.logTestingPlaygroundURL();
    const apple = await screen.findByText(/🍎/i, undefined, {timeout: 2000});
    const pear = await screen.findByText(/🍐/i, undefined, {timeout: 2000});
    const watermelon = await screen.findByText(/🍉/i, undefined, {
      timeout: 2000
    });

    expect(apple).toBeInTheDocument();
    expect(pear).toBeInTheDocument();
    expect(watermelon).toBeInTheDocument();
  });
});
