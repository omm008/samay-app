import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { mockProducts, getProductsByCategory, searchProducts } from '../data/mockProducts'
import { PRODUCT_CATEGORIES } from '../types/index'
import { useCart } from '../contexts/AppContext'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { addToCart } = useCart()

  const filteredProducts = useMemo(() => {
    let products = mockProducts

    if (selectedCategory !== 'all') {
      products = getProductsByCategory(selectedCategory)
    }

    if (searchQuery) {
      products = searchProducts(searchQuery).filter(product => 
        selectedCategory === 'all' || product.category === selectedCategory
      )
    }

    return products
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-black">
      <ProductHero />
      <CategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ProductGrid products={filteredProducts} addToCart={addToCart} />
    </div>
  )
}

// Product Hero Section
const ProductHero = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-red-900 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🛍️</div>
        <div className="absolute top-20 right-20 text-4xl">♟️</div>
        <div className="absolute bottom-20 left-20 text-5xl">🎤</div>
        <div className="absolute bottom-10 right-10 text-3xl">🎭</div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-custom">
            <span className="text-red-400">Samay's</span>
            <br />
            <span className="text-yellow-400">Merch Store</span>
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Show your love for chess, comedy, and chaos with official Samay Raina merchandise!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto"></div>
        </motion.div>
      </div>
    </section>
  )
}

// Category Filter Component
const CategoryFilter = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: PRODUCT_CATEGORIES.APPAREL, name: 'Apparel', icon: '👕' },
    { id: PRODUCT_CATEGORIES.ACCESSORIES, name: 'Accessories', icon: '♟️' },
    { id: PRODUCT_CATEGORIES.DIGITAL, name: 'Digital', icon: '💻' }
  ]

  return (
    <section className="py-8 px-4 bg-gradient-to-r from-black to-red-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-red-700/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-yellow-400 text-black'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-red-700/30 hover:border-yellow-400/50'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Product Grid Component
const ProductGrid = ({ products, addToCart }) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Product Card Component
const ProductCard = ({ product, index, addToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    // You could add a toast notification here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="bg-gradient-to-br from-red-900/30 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-red-700/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {product.images && product.images[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {product.category === PRODUCT_CATEGORIES.APPAREL && '👕'}
              {product.category === PRODUCT_CATEGORIES.ACCESSORIES && '♟️'}
              {product.category === PRODUCT_CATEGORIES.DIGITAL && '💻'}
            </div>
            
            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Out of Stock
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-yellow-400">
                ₹{product.price}
              </div>
              
              {product.inStock && (
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center gap-2"
                >
                  <span>🛒</span>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Products
