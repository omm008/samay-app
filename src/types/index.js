// Data models and types for the Samay Raina app

// User data model
export const createUser = (userData) => ({
  id: userData.id || Date.now().toString(),
  email: userData.email,
  name: userData.name,
  avatar: userData.avatar || null,
  createdAt: userData.createdAt || new Date(),
  preferences: {
    newsletter: userData.preferences?.newsletter || false,
    notifications: userData.preferences?.notifications || true,
    ...userData.preferences
  }
});

// Product data model
export const createProduct = (productData) => ({
  id: productData.id,
  name: productData.name,
  description: productData.description,
  price: productData.price,
  images: productData.images || [],
  category: productData.category, // 'apparel', 'accessories', 'digital'
  inStock: productData.inStock !== undefined ? productData.inStock : true,
  stockCount: productData.stockCount || 0,
  variants: {
    size: productData.variants?.size || [],
    color: productData.variants?.color || []
  }
});

// Cart item data model
export const createCartItem = (product, quantity = 1, selectedVariants = {}) => ({
  id: `${product.id}-${Date.now()}`,
  product,
  quantity,
  selectedVariants: {
    size: selectedVariants.size || null,
    color: selectedVariants.color || null
  },
  addedAt: new Date()
});

// Order data model (for future use)
export const createOrder = (orderData) => ({
  id: orderData.id || Date.now().toString(),
  userId: orderData.userId,
  items: orderData.items || [],
  total: orderData.total || 0,
  status: orderData.status || 'pending', // 'pending', 'confirmed', 'shipped', 'delivered'
  shippingAddress: orderData.shippingAddress || {},
  createdAt: orderData.createdAt || new Date()
});

// Product categories
export const PRODUCT_CATEGORIES = {
  APPAREL: 'apparel',
  ACCESSORIES: 'accessories',
  DIGITAL: 'digital'
};

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered'
};