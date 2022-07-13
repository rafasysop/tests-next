import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  id: 1,
  title: 'titulo',
  image: 'https://image',
  price: '22.00',
};

describe('product-card', () => {
  it('render ProductCard', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('render ProductCard', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });
});
