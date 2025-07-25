import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createCartItem } from '../types/index.js';
import { authenticateUser, registerUser } from '../data/mockUsers.js';

// Create contexts
const AppContext = createContext();
const AuthContext = createContext();
const CartContext = createContext();

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SIGNUP_START: 'SIGNUP_START',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE'
};

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducers
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.SIGNUP_START:
      return { ...state, loading: true, error: null };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
        isAuthenticated: false
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, selectedVariants } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      } else {
        const newItem = createCartItem(product, quantity, selectedVariants);
        return { ...state, items: [...state.items, newItem] };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== itemId)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };
    
    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload.items || [] };
    
    default:
      return state;
  }
};

// Initial states
const initialAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const initialCartState = {
  items: []
};

// Main App Provider
export const AppProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  // Load persisted data on mount
  useEffect(() => {
    // Load user session
    const savedUser = localStorage.getItem('samay-app-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        authDispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user }
        });
      } catch (error) {
        console.error('Error loading user session:', error);
        localStorage.removeItem('samay-app-user');
      }
    }

    // Load cart
    const savedCart = localStorage.getItem('samay-app-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        cartDispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: { items: cartItems }
        });
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem('samay-app-cart');
      }
    }
  }, []);

  // Persist user session
  useEffect(() => {
    if (authState.user) {
      localStorage.setItem('samay-app-user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('samay-app-user');
    }
  }, [authState.user]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('samay-app-cart', JSON.stringify(cartState.items));
  }, [cartState.items]);

  // Auth actions
  const login = async (email, password) => {
    authDispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = authenticateUser(email, password);
    
    if (result.success) {
      authDispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: result.user }
      });
      return { success: true };
    } else {
      authDispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: result.error }
      });
      return { success: false, error: result.error };
    }
  };

  const signup = async (userData) => {
    authDispatch({ type: AUTH_ACTIONS.SIGNUP_START });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = registerUser(userData);
    
    if (result.success) {
      authDispatch({
        type: AUTH_ACTIONS.SIGNUP_SUCCESS,
        payload: { user: result.user }
      });
      return { success: true };
    } else {
      authDispatch({
        type: AUTH_ACTIONS.SIGNUP_FAILURE,
        payload: { error: result.error }
      });
      return { success: false, error: result.error };
    }
  };

  const logout = () => {
    authDispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Cart actions
  const addToCart = (product, quantity = 1, selectedVariants = {}) => {
    cartDispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedVariants }
    });
  };

  const removeFromCart = (itemId) => {
    cartDispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId }
    });
  };

  const updateCartQuantity = (itemId, quantity) => {
    cartDispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity }
    });
  };

  const clearCart = () => {
    cartDispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Calculate cart total
  const cartTotal = cartState.items.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const cartItemCount = cartState.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // App context value (includes original webContext data)
  const appValue = {
    name: "Samay Raina",
    description: "India's Standup Chess Grandmaster"
  };

  // Auth context value
  const authValue = {
    ...authState,
    login,
    signup,
    logout
  };

  // Cart context value
  const cartValue = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    total: cartTotal,
    itemCount: cartItemCount
  };

  return (
    <AppContext.Provider value={appValue}>
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};

// Custom hooks
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AppProvider');
  }
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within AppProvider');
  }
  return context;
};

// Export contexts for direct access if needed
export { AppContext, AuthContext, CartContext };