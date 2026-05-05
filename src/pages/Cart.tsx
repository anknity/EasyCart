import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const cart = useStore(state => state.cart);
  const updateQuantity = useStore(state => state.updateCartQuantity);
  const removeFromCart = useStore(state => state.removeFromCart);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 20000 ? 0 : 500) : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="text-center py-24 border border-[#DCD6C8] bg-[#F5F2ED] w-full max-w-2xl">
          <ShoppingCart className="w-12 h-12 text-[#1A1A1A] opacity-20 mx-auto mb-6" />
          <h2 className="text-2xl font-serif italic mb-2">Your cart is empty</h2>
          <p className="text-[11px] uppercase tracking-widest font-bold opacity-40 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="inline-flex items-center justify-center px-10 py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-[60px] font-serif font-black leading-[0.85] tracking-tighter mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-[#DCD6C8] p-6 flex flex-col sm:flex-row items-center gap-8 mb-4 bg-transparent"
            >
              <Link to={`/product/${item.id}`} className="w-24 h-32 aspect-[4/5] bg-[#E8E4DB] border border-[#DCD6C8] overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </Link>
              
              <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                <div className="mb-4">
                  <Link to={`/product/${item.id}`} className="text-xl font-serif italic mb-2 hover:underline line-clamp-1 block">
                    {item.name}
                  </Link>
                  <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest mb-4">{item.category}</div>
                  <div className="font-serif text-lg text-[#1A1A1A] sm:hidden">₹{item.price.toLocaleString('en-IN')}</div>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-[#DCD6C8] bg-[#F5F2ED]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-[#1A1A1A] hover:bg-[#E8E4DB] transition-colors border-r border-[#DCD6C8]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-10 text-center font-serif text-lg">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-[#1A1A1A] hover:bg-[#E8E4DB] transition-colors border-l border-[#DCD6C8]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right flex flex-col sm:items-end justify-between h-full min-h-[8rem]">
                  <span className="text-2xl font-serif hidden sm:block">₹{item.price.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="mt-auto text-[9px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center gap-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-[#DCD6C8] p-8 sticky top-24 bg-[#E8E4DB]">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8">Order Summary</h2>
            
            <div className="space-y-4 text-[11px] uppercase tracking-widest font-bold opacity-70 mb-8 border-b border-[#DCD6C8] pb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1A1A1A] font-serif text-sm">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="underline underline-offset-4 font-bold">Free</span> : <span className="text-[#1A1A1A] font-serif text-sm">₹{shipping.toLocaleString('en-IN')}</span>}</span>
              </div>
              {shipping > 0 && (
                <div className="text-[9px] uppercase tracking-widest border border-[#DCD6C8] bg-[#F5F2ED] p-3 text-center mt-4">
                  Add ₹{(20000 - subtotal).toLocaleString('en-IN')} more for free shipping!
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                <span className="text-3xl font-serif">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[9px] uppercase tracking-widest opacity-40 mt-2">Including VAT and taxes.</p>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
