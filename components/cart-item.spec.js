import { fireEvent, render, screen } from '@testing-library/react';
import CartItem from './cart-item';

const product = {
  id: 1,
  title: 'titulo',
  image: 'https://image',
  price: '22.00',
};

const renderCartItem = () => render(<CartItem product={product} />);

describe('card-item', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('card-item')).toBeInTheDocument();
  });

  it('should get title, price and image', () => {
    renderCartItem();

    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increese quantity by 1 when second button is cliocked', async () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');
    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });
});
