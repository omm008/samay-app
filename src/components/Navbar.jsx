import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' }
  ]

  return (
    <nav className="w-full bg-black bg-opacity-90 text-white px-6 py-4 shadow-md fixed z-50 top-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        Samay Raina
        <Link to="/" className="text-2xl font-bold text-red-600 tracking-wide">
          SAMAY
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-lg font-medium transition hover:text-red-300 ${
                  isActive ? 'text-red-600 underline' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu (optional for future) */}
        {/* <MobileNav /> */}
      </div>
    </nav>
  )
}

export default NavBar
