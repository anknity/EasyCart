import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2ED] font-sans text-[#1A1A1A]">
      <header className="bg-[#F5F2ED] border-b border-[#DCD6C8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-serif italic font-black tracking-tighter">EasyCart.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center space-x-8">
              <Link to="/" className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-70 hover:opacity-100 transition-opacity">Home</Link>
              <Link to="/products" className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-70 hover:opacity-100 transition-opacity">Products</Link>
              {user && (
                 <Link to="/admin" className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4"/> Admin
                 </Link>
              )}
            </nav>

            {/* Desktop Search & Icons */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative flex items-center">
                <span className="text-[10px] uppercase tracking-widest opacity-50 mr-2">Search</span>
                <div className="inline-block w-8 sm:w-16 h-[1px] bg-[#1A1A1A] align-middle opacity-20"></div>
                <Link to="/products" className="absolute inset-0 z-10"></Link>
              </div>
              
              {user ? (
                <div className="flex items-center gap-6">
                  <span className="text-[11px] uppercase tracking-widest font-bold opacity-70">Hi, {user.email.split('@')[0]}</span>
                  <button onClick={handleLogout} className="text-[11px] uppercase tracking-widest font-bold hover:underline" title="Logout">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1">
                  Login
                </Link>
              )}

              <Link to="/cart" className="relative flex items-center space-x-1 hover:opacity-70 transition-opacity">
                <span className="text-[11px] font-bold uppercase tracking-widest">Cart</span>
                <span className="bg-[#1A1A1A] text-white text-[9px] w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-6">
              <Link to="/cart" className="relative flex items-center space-x-1 hover:opacity-70 transition-opacity">
                <span className="text-[11px] font-bold uppercase tracking-widest">Cart</span>
                <span className="bg-[#1A1A1A] text-white text-[9px] w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#1A1A1A] hover:opacity-70 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#DCD6C8] overflow-hidden bg-[#F5F2ED]"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#E8E4DB]">Home</Link>
                <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#E8E4DB]">Products</Link>
                
                {user ? (
                  <>
                     <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#E8E4DB]">Admin Panel</Link>
                     <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#E8E4DB]">Logout</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#E8E4DB]">Login / Register</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      <footer className="bg-[#F5F2ED] border-t border-[#DCD6C8] mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-serif italic font-black tracking-tighter flex items-center gap-2 mb-4">
              EasyCart.
            </span>
            <p className="text-[#1A1A1A] opacity-60 text-[11px] leading-relaxed uppercase tracking-widest">Curated simplicity for the modern home. Quality products, fast delivery.</p>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4">Shop</h3>
            <ul className="space-y-4 font-serif text-lg italic">
              <li><Link to="/products?category=Electronics" className="opacity-50 hover:opacity-100 transition-opacity">Electronics</Link></li>
              <li><Link to="/products?category=Clothing" className="opacity-50 hover:opacity-100 transition-opacity">Clothing</Link></li>
              <li><Link to="/products?category=Accessories" className="opacity-50 hover:opacity-100 transition-opacity">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4">Support</h3>
            <ul className="space-y-2 text-[11px] font-bold uppercase tracking-widest opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4">Connect</h3>
            <ul className="space-y-2 text-[11px] font-bold uppercase tracking-widest opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Twitter</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Instagram</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#DCD6C8] flex items-center justify-between text-[9px] uppercase tracking-widest font-bold opacity-40">
          <span>&copy; {new Date().getFullYear()} EasyCart.</span>
          <div className="flex space-x-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
