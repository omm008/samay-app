import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AppContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-900 to-black px-4">
      <div className="max-w-md w-full">
        <LoginForm 
          formData={formData}
          errors={errors}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <SocialLoginOptions />
        <SignupLink />
      </div>
    </div>
  )
}

// Login Form Component
const LoginForm = ({ formData, errors, loading, error, handleChange, handleSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-red-700/30 mb-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 font-custom">
          Welcome <span className="text-red-400">Back!</span>
        </h1>
        <p className="text-gray-300">
          Sign in to access your account and exclusive content
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-white font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-yellow-400 focus:border-yellow-400'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-white font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-yellow-400 focus:border-yellow-400'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              className="mr-2 rounded border-gray-600 bg-black/20 text-yellow-400 focus:ring-yellow-400"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-yellow-400 hover:text-yellow-300 text-sm">
            Forgot password?
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Signing In...
            </>
          ) : (
            <>
              <span>🔐</span>
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
        <p className="text-yellow-300 text-sm font-bold mb-2">Demo Credentials:</p>
        <p className="text-gray-300 text-xs">Email: fan@samayraina.com</p>
        <p className="text-gray-300 text-xs">Password: password123</p>
      </div>
    </motion.div>
  )
}

// Social Login Options Component
const SocialLoginOptions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-8"
    >
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gradient-to-b from-black via-red-900 to-black text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-600 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
          <span className="mr-2">📱</span>
          Google
        </button>
        <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-600 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
          <span className="mr-2">📘</span>
          Facebook
        </button>
      </div>
    </motion.div>
  )
}

// Signup Link Component
const SignupLink = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center"
    >
      <p className="text-gray-300">
        Don't have an account?{' '}
        <Link to="/signup" className="text-yellow-400 hover:text-yellow-300 font-bold">
          Sign up here
        </Link>
      </p>
    </motion.div>
  )
}

export default Login
