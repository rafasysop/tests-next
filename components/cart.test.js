import { renderHook, act, screen, render, waitFor } from '@testing-library/react';
import { makeServer } from '../miragejs/server';
import { useCartStore } from '../store/cart';
import { setAutoFreeze } from 'immer';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

setAutoFreeze(false);

describe('Cart', () => {
  let server, result, add, spy, toggle, reset;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    reset = result.current.actions.reset;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    act(() => {
      result.current.actions.reset();
    });
    jest.clearAllMocks();
  });

  it('should add css class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should add css class "hidden" in the component', () => {
    act(() => {
      toggle();
    });
    render(<Cart />);

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call toggle 1 time', () => {
    act(() => {
      toggle();
    });
    render(<Cart />);
    const button = screen.getByTestId('close-button');
    act(() => {
      userEvent.click(button);
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not call 2 times toggle', () => {
    act(() => {
      toggle();
    });
    render(<Cart />);
    const button = screen.getByTestId('close-button');
    act(() => {
      userEvent.click(button);
      userEvent.click(button);
    });
    expect(spy).not.toHaveBeenCalledTimes(2);
  });

  it('should display 2 products', () => {
    const products = server.createList('product', 2);
    render(<Cart />);
    act(() => {
      for (const product of products) {
        add(product);
      }
    });
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });

  it('should display 0 products when click removeAll', async () => {
    const products = server.createList('product', 2);
    render(<Cart />);
    act(() => {
      for (const product of products) {
        add(product);
      }
    });
    expect(screen.queryAllByTestId('cart-item')).toHaveLength(2);

    const button = screen.getByTestId('remove-all');

    await userEvent.click(button);
    expect(screen.queryAllByTestId('cart-item')).toHaveLength(0);
  });
});
