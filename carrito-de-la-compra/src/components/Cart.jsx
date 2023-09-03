import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './icons';
import './Cart.css';
import { useCart } from '../hooks/useCart';

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart () {
  const { cart, clearCart, addToCart } = useCart();
  const cartCheckboxiId = useId();
  return (
    <>
      <label htmlFor={cartCheckboxiId} className="cart-button">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxiId} hidden />

      <aside className='cart'>
        <ul>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))
          }
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
