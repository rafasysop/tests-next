import { render, screen } from '@testing-library/react';
import ProductList from '../pages';

describe('ProductList', () => {
  it('should render product', () => {
    render(<ProductList />);

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it.todo('should render the product card component 10 times');

  it.todo('should render the no product message');

  it.todo('should render the search component');

  it.todo('should filter the product list when a search is performed');

  it.todo('should display error message when promise rejects');

  it.todo('should display the total quantity of products');

  it.todo('should display product singular when there is only 1 product');
});
