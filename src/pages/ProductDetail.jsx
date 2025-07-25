import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductById, mockProducts } from '../data/mockProducts'
import { PRODUCT_CATEGORIES } from '../types/index'
import { useCart } from '../contexts/AppContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
      // Initialize selected variants with first available option
      const initialVariants = {}
      if (foundProduct.variants.size?.length > 0) {
        initialVariants.size = foundProduct.variants.size[0]
      }
      if (foundProduct.variants.color?.length > 0) {
        initialVariants.color = foundProduct.variants.color[0]
      }
      setSelectedVariants(initialVariants)
    }
    setLoading(false)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedVariants)
      // You could add a toast notification here
    }
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-red-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-red-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Product Not Found</h2>
          <Link to="/products" className="text-yellow-400 hover:text-yellow-300">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900">
      {/* Breadcrumb */}
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-gray-400 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery 
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Product Info */}
          <ProductInfo 
            product={product}
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </div>
    </div>
  )
}

// Product Image Gallery Component
const ProductImageGallery = ({ product, selectedImage, setSelectedImage }) => {
  const images = product.images.length > 0 ? product.images : ['/placeholder-product.jpg']

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-red-700/30">
        <img
          src={images[selectedImage]}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg'
          }}
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-yellow-400' 
                  : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Product Info Component
const ProductInfo = ({ 
  product, 
  selectedVariants, 
  setSelectedVariants, 
  quantity, 
  setQuantity, 
  handleAddToCart 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Product Title and Price */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4 font-custom">
          {product.name}
        </h1>
        <div className="text-3xl font-bold text-yellow-400 mb-4">
          ₹{product.price}
        </div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
          product.inStock 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-red-700/30">
        <h3 className="text-xl font-bold text-white mb-3">Description</h3>
        <p className="text-gray-300 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Variant Selectors */}
      <VariantSelector 
        product={product}
        selectedVariants={selectedVariants}
        setSelectedVariants={setSelectedVariants}
      />

      {/* Quantity and Add to Cart */}
      {product.inStock && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-white font-bold">Quantity:</label>
            <div className="flex items-center border border-red-700/30 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-white hover:bg-red-600/20 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 text-white bg-black/20 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-white hover:bg-red-600/20 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🛒</span>
            Add to Cart
          </button>
        </div>
      )}

      {/* Product Category */}
      <div className="text-gray-400">
        <span className="font-bold">Category: </span>
        <span className="capitalize">{product.category}</span>
      </div>
    </motion.div>
  )
}

// Variant Selector Component
const VariantSelector = ({ product, selectedVariants, setSelectedVariants }) => {
  const handleVariantChange = (type, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <div className="space-y-4">
      {/* Size Selector */}
      {product.variants.size?.length > 0 && (
        <div>
          <label className="block text-white font-bold mb-2">Size:</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.size.map((size) => (
              <button
                key={size}
                onClick={() => handleVariantChange('size', size)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedVariants.size === size
                    ? 'border-yellow-400 bg-yellow-400 text-black'
                    : 'border-gray-600 text-white hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {product.variants.color?.length > 0 && (
        <div>
          <label className="block text-white font-bold mb-2">Color:</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.color.map((color) => (
              <button
                key={color}
                onClick={() => handleVariantChange('color', color)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedVariants.color === color
                    ? 'border-yellow-400 bg-yellow-400 text-black'
                    : 'border-gray-600 text-white hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Related Products Component
const RelatedProducts = ({ products }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-white mb-8 font-custom">
        Related Products
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-red-900/30 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-red-700/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-4xl">
                  {product.category === PRODUCT_CATEGORIES.APPAREL && '👕'}
                  {product.category === PRODUCT_CATEGORIES.ACCESSORIES && '♟️'}
                  {product.category === PRODUCT_CATEGORIES.DIGITAL && '💻'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{product.name}</h3>
                <div className="text-yellow-400 font-bold">₹{product.price}</div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.section>
  )
}

export default ProductDetail
