import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AppContext'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    terms: false
  })
  const [errors, setErrors] = useState({})
  const { signup, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email,
      preferences: {
        newsletter: formData.newsletter,
        notifications: true
      }
    }

    const result = await signup(userData)
    
    if (result.success) {
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please sign in.' 
        }
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-900 to-black px-4 py-8">
      <div className="max-w-md w-full">
        <SignupForm 
          formData={formData}
          errors={errors}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <SocialSignupOptions />
        <LoginLink />
      </div>
    </div>
  )
}

// Signup Form Component
const SignupForm = ({ formData, errors, loading, error, handleChange, handleSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-red-700/30 mb-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 font-custom">
          Join the <span className="text-red-400">Community!</span>
        </h1>
        <p className="text-gray-300">
          Create your account and become part of Samay's chess comedy revolution
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-white font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-yellow-400 focus:border-yellow-400'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

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
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-white font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.confirmPassword 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-yellow-400 focus:border-yellow-400'
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Newsletter Checkbox */}
        <div>
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mr-3 rounded border-gray-600 bg-black/20 text-yellow-400 focus:ring-yellow-400"
            />
            <span className="text-sm">
              Subscribe to Samay's newsletter for exclusive content and updates
            </span>
          </label>
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start text-gray-300">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className={`mr-3 mt-1 rounded border-gray-600 bg-black/20 text-yellow-400 focus:ring-yellow-400 ${
                errors.terms ? 'border-red-500' : ''
              }`}
            />
            <span className="text-sm">
              I agree to the{' '}
              <Link to="/terms" className="text-yellow-400 hover:text-yellow-300 underline">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300 underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
          )}
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
              Creating Account...
            </>
          ) : (
            <>
              <span>🎯</span>
              Create Account
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

// Social Signup Options Component
const SocialSignupOptions = () => {
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
            Or sign up with
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

// Login Link Component
const LoginLink = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center"
    >
      <p className="text-gray-300">
        Already have an account?{' '}
        <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-bold">
          Sign in here
        </Link>
      </p>
    </motion.div>
  )
}

export default Signup
