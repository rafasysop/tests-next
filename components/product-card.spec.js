import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  id: 1,
  title: 'titulo',
  image: 'https://image',
  price: '22.00',
};

// jest.mock('../store/cart', () => ({
//   store: {
//     actions: {
//       add: jest.fn(),
//     },
//   },
// }));

const renderProductCard = () => render(<ProductCard product={product} />);

describe('product-card', () => {
  it('render ProductCard', () => {
    renderProductCard();

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('render ProductCard', () => {
    renderProductCard();

    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it.skip('should call addToCard whn button gets clicked', async () => {
    renderProductCard();

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(add).toHaveBeenCalledTimes(1);
  });
});
