export const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

const updateLocalStorate = state => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
};

export const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex(item => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity++;
        updateLocalStorate(newState);
        return newState;
      }

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ];

      updateLocalStorate(newState);
      return newState;
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState = state.filter(item => item.id !== id);
      updateLocalStorate(newState);
      return newState;
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorate([]);
      return [];
    }
  }
};
