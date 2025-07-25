import { createUser } from '../types/index.js';

// Mock user data for testing authentication
export const mockUsers = [
  createUser({
    id: 'user-001',
    email: 'fan@samayraina.com',
    name: 'Chess Comedy Fan',
    avatar: '/avatars/fan-avatar.jpg',
    createdAt: new Date('2024-01-15'),
    preferences: {
      newsletter: true,
      notifications: true
    }
  }),
  createUser({
    id: 'user-002',
    email: 'test@example.com',
    name: 'Test User',
    avatar: null,
    createdAt: new Date('2024-02-01'),
    preferences: {
      newsletter: false,
      notifications: true
    }
  })
];

// Mock authentication functions
export const authenticateUser = (email, password) => {
  // Simple mock authentication - in real app, this would be secure
  const user = mockUsers.find(u => u.email === email);
  
  if (user && password === 'password123') {
    return { success: true, user };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

export const registerUser = (userData) => {
  // Check if email already exists
  const existingUser = mockUsers.find(u => u.email === userData.email);
  
  if (existingUser) {
    return { success: false, error: 'Email already registered' };
  }
  
  // Create new user
  const newUser = createUser({
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date()
  });
  
  // In a real app, this would save to database
  mockUsers.push(newUser);
  
  return { success: true, user: newUser };
};

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};