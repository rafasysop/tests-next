import { render, screen } from '@testing-library/react';
import ProductList from '../pages';

const renderProducList = () => render(<ProductList />);

describe('ProductList', () => {
  it('should render product', () => {
    renderProducList();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});
