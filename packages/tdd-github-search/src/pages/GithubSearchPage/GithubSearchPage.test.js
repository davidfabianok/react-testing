import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import GithubSearchPage from './GithubSearchPage';

beforeEach(() => render(<GithubSearchPage />));

describe('when the Github Search Page is mounted', () => {
  it('should render correctly title', () => {
    expect(
      screen.getByRole('heading', {name: /github repositories list/i}),
    ).toBeInTheDocument();
  });

  it('should must be an input text with label "filter by" field', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  });

  it('should must be a search button', () => {
    expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument();
  });

  it('should must be a initial message "Please provide a search option and click in the search button"', () => {
    expect(
      screen.getByText(
        /please provide a search option and click in the search button/i,
      ),
    ).toBeInTheDocument();
  });
});

describe('when the developer does a search', () => {
  const fireClickSearch = () =>
    fireEvent.click(screen.getByRole('button', {name: /search/i}));

  it('should the search button should be disabled until the search is done', async () => {
    const searchButton = screen.getByRole('button', {name: /search/i});
    expect(searchButton).not.toBeDisabled();

    fireClickSearch();

    expect(searchButton).toBeDisabled();

    await waitFor(() => {
      expect(searchButton).not.toBeDisabled();
    });
  });

  it('should the data should be displayed as a sticky table', async () => {
    fireClickSearch();

    await waitFor(() => {
      expect(
        screen.queryByText(
          /please provide a search option and click in the search button/i,
        ),
      ).not.toBeInTheDocument();
    });

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should the header table should contain: Repository, starts, forks, open issues and updated at', async () => {
    fireClickSearch();

    const table = await screen.findByRole('table');

    const tableHeaders = within(table).getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);

    const [repository, starts, forks, openIssue, updatedAt] = tableHeaders;
    expect(repository).toHaveTextContent(/repository/i);
    expect(starts).toHaveTextContent(/starts/i);
    expect(forks).toHaveTextContent(/forks/i);
    expect(openIssue).toHaveTextContent(/open issue/i);
    expect(updatedAt).toHaveTextContent(/updated at/i);
  });

  it(`should each result must contain: image, name, stars, updated at, forks, open issues,
  It should have a link that opens in a new tab the github repository selected`, async () => {
    fireClickSearch();
    const table = await screen.findByRole('table');

    const withinTable = within(table);

    const tableCells = withinTable.getAllByRole('gridcell');
    expect(tableCells).toHaveLength(5);

    const [repository, starts, forks, openIssue, updatedAt] = tableCells;

    expect(
      within(repository).getByRole('img', {name: /test/i}),
    ).toBeInTheDocument();

    expect(repository).toHaveTextContent(/test repo/i);
    expect(starts).toHaveTextContent(/10/i);
    expect(forks).toHaveTextContent(/5/i);
    expect(openIssue).toHaveTextContent(/2/i);
    expect(updatedAt).toHaveTextContent(/2021-01-01/i);

    expect(withinTable.getByText(/test repo/i).closest('a')).toHaveAttribute(
      'href',
      'https://github.com/',
    );
  });
});
