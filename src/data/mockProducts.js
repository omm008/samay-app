import { createProduct, PRODUCT_CATEGORIES } from '../types/index.js';

// Mock product data for the Samay Raina merchandise store
export const mockProducts = [
  createProduct({
    id: 'sr-tshirt-001',
    name: 'Samay Raina Comedy Chess T-Shirt',
    description: 'Premium cotton t-shirt featuring Samay\'s iconic "Comedy Chess" design. Perfect for chess enthusiasts and comedy fans alike.',
    price: 899,
    images: [
      '/products/tshirt-comedy-chess-1.jpg',
      '/products/tshirt-comedy-chess-2.jpg',
      '/products/tshirt-comedy-chess-3.jpg'
    ],
    category: PRODUCT_CATEGORIES.APPAREL,
    inStock: true,
    stockCount: 50,
    variants: {
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: ['Black', 'Navy Blue', 'Maroon']
    }
  }),
  
  createProduct({
    id: 'sr-hoodie-001',
    name: 'Checkmate Hoodie',
    description: 'Cozy hoodie with Samay\'s signature chess-comedy fusion design. Stay warm while you checkmate your opponents.',
    price: 1599,
    images: [
      '/products/hoodie-checkmate-1.jpg',
      '/products/hoodie-checkmate-2.jpg'
    ],
    category: PRODUCT_CATEGORIES.APPAREL,
    inStock: true,
    stockCount: 30,
    variants: {
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: ['Black', 'Grey', 'Maroon']
    }
  }),

  createProduct({
    id: 'sr-cap-001',
    name: 'Samay Raina Chess Cap',
    description: 'Stylish cap with embroidered chess piece and Samay\'s logo. Perfect for outdoor chess matches.',
    price: 599,
    images: [
      '/products/cap-chess-1.jpg',
      '/products/cap-chess-2.jpg'
    ],
    category: PRODUCT_CATEGORIES.APPAREL,
    inStock: true,
    stockCount: 75,
    variants: {
      color: ['Black', 'Navy Blue', 'White']
    }
  }),

  createProduct({
    id: 'sr-chessset-001',
    name: 'Samay Raina Signature Chess Set',
    description: 'Premium wooden chess set with custom pieces designed by Samay. Includes a signed certificate of authenticity.',
    price: 2999,
    images: [
      '/products/chessset-signature-1.jpg',
      '/products/chessset-signature-2.jpg',
      '/products/chessset-signature-3.jpg'
    ],
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    inStock: true,
    stockCount: 20,
    variants: {}
  }),

  createProduct({
    id: 'sr-mug-001',
    name: 'Comedy Chess Mug',
    description: 'Start your day with a laugh! Ceramic mug featuring Samay\'s funniest chess quotes.',
    price: 399,
    images: [
      '/products/mug-comedy-1.jpg',
      '/products/mug-comedy-2.jpg'
    ],
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    inStock: true,
    stockCount: 100,
    variants: {
      color: ['White', 'Black', 'Red']
    }
  }),

  createProduct({
    id: 'sr-stickers-001',
    name: 'Samay Raina Sticker Pack',
    description: 'Collection of 10 waterproof stickers featuring Samay\'s most popular memes and chess moments.',
    price: 199,
    images: [
      '/products/stickers-pack-1.jpg',
      '/products/stickers-pack-2.jpg'
    ],
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    inStock: true,
    stockCount: 200,
    variants: {}
  }),

  createProduct({
    id: 'sr-phonecase-001',
    name: 'Chess Master Phone Case',
    description: 'Protect your phone with style! Available for multiple phone models with Samay\'s chess-themed design.',
    price: 799,
    images: [
      '/products/phonecase-chess-1.jpg',
      '/products/phonecase-chess-2.jpg'
    ],
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    inStock: true,
    stockCount: 60,
    variants: {
      size: ['iPhone 14', 'iPhone 13', 'Samsung Galaxy S23', 'OnePlus 11']
    }
  }),

  createProduct({
    id: 'sr-digital-001',
    name: 'Exclusive Comedy Special Access',
    description: 'Get early access to Samay\'s upcoming comedy special plus behind-the-scenes content.',
    price: 499,
    images: [
      '/products/digital-comedy-1.jpg'
    ],
    category: PRODUCT_CATEGORIES.DIGITAL,
    inStock: true,
    stockCount: 1000,
    variants: {}
  }),

  createProduct({
    id: 'sr-digital-002',
    name: 'Personal Chess Lesson with Samay',
    description: '30-minute one-on-one chess lesson with Samay Raina via video call. Limited slots available!',
    price: 2499,
    images: [
      '/products/digital-lesson-1.jpg'
    ],
    category: PRODUCT_CATEGORIES.DIGITAL,
    inStock: true,
    stockCount: 5,
    variants: {}
  }),

  createProduct({
    id: 'sr-digital-003',
    name: 'Personalized Video Message',
    description: 'Get a personalized video message from Samay for birthdays, celebrations, or just for fun!',
    price: 1999,
    images: [
      '/products/digital-message-1.jpg'
    ],
    category: PRODUCT_CATEGORIES.DIGITAL,
    inStock: false,
    stockCount: 0,
    variants: {}
  })
];

// Helper functions for product data
export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  return mockProducts.filter(product => product.category === category);
};

export const getInStockProducts = () => {
  return mockProducts.filter(product => product.inStock);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};