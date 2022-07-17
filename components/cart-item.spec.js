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

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
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

  it('should decrease quantity by 1 when first button is clicked', async () => {
    renderCartItem();

    const [_, buttonIncrease, buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');
    await fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('2');

    await fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });

  it('should not decrease when quantity is 1', async () => {
    renderCartItem();

    const [_, _s, buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });
});
