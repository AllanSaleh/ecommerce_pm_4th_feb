import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '../types/types';

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' };

// The reducer function handles the logic for updating the cart state based on the action type
const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedAddItems;

      if (existingItemIndex >= 0) {
        // If the item already exists, increase the quantity
        const updatedItem = {
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + 1,
        };
        updatedAddItems = [...state.items];
        updatedAddItems[existingItemIndex] = updatedItem;
      } else {
        // If the item does not exist, add it with quantity 1
        updatedAddItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      sessionStorage.setItem('cart', JSON.stringify(updatedAddItems));
      return { items: updatedAddItems };
    }
    case 'REMOVE_FROM_CART': {
      const updatedRemoveItems = state.items.filter(
        (item: CartItem) => item.id !== action.payload
      );
      sessionStorage.setItem('cart', JSON.stringify(updatedRemoveItems));
      return { items: updatedRemoveItems };
    }
    case 'CLEAR_CART':
      sessionStorage.setItem('cart', JSON.stringify([]));
      return { items: [] };
    default:
      return state;
  }
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // useReducer is a React hook for managing complex state logic
  // useReducer manages the cart state using the cartReducer function and the initial state
  // state is the current state of the cart, which includes the items array
  // dispatch is a function to trigger actions that modify the cart state by passing an action object
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  return (
    <CartContext.Provider
      value={{ cartItems: state.items, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
