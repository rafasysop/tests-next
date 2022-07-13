import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Search from './search';

const doSearch = jest.fn();

describe('Search', () => {
  it('should render a form', () => {
    render(<Search />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should call props.doSearch() when form is submited', async () => {
    render(<Search doSearch={doSearch} />);
    const form = screen.getByRole('form');

    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call doSearch() with the user input', async () => {
    render(<Search doSearch={doSearch} />);
    const inputText = 'Inv';
    const form = screen.getByRole('form');
    const input = screen.getByRole('textbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });
});
