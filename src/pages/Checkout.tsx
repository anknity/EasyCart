import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Lock, CreditCard } from 'lucide-react';

export default function Checkout() {
  const cart = useStore(state => state.cart);
  const clearCart = useStore(state => state.clearCart);
  const user = useStore(state => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 20000 ? 0 : 500) : 0;
  const total = subtotal + shipping;

  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      clearCart();
      // Wait for clearCart to apply before navigating, but we actually just use the order logic
      navigate('/order-confirmation', { state: { orderPlaced: true, total, items: cart.length } });
    }, 1000);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-[60px] font-serif font-black leading-[0.85] tracking-tighter mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Info */}
            <div className="border border-[#DCD6C8] p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-[#DCD6C8] pb-4 mb-6">Contact & Shipping Info</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">ZIP / Postal Code</label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border border-[#DCD6C8] p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#DCD6C8]">
                 <h2 className="text-sm font-bold uppercase tracking-widest">Payment Details</h2>
                <div className="flex opacity-50 gap-2">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Card Number</label>
                  <input required type="text" name="cardNumber" maxLength={19} placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all font-mono placeholder:opacity-50 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Expiry Date</label>
                    <input required type="text" name="expiry" placeholder="MM/YY" maxLength={5} value={formData.expiry} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all font-mono placeholder:opacity-50 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">CVC</label>
                    <input required type="text" name="cvc" placeholder="123" maxLength={4} value={formData.cvc} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all font-mono placeholder:opacity-50 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors">
              <Lock className="w-4 h-4 ml-1" />
              Pay ₹{total.toLocaleString('en-IN')}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="border border-[#DCD6C8] p-8 sticky top-24 bg-[#E8E4DB]">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-8">Order Summary</h2>
            
            <div className="space-y-4 text-[11px] uppercase tracking-widest font-bold opacity-70 mb-8 border-b border-[#DCD6C8] pb-8 max-h-[40vh] overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-[#F5F2ED] border border-[#DCD6C8] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h3 className="font-serif italic text-sm line-clamp-1 lowercase capitalize-first">{item.name}</h3>
                      <p className="mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-[#1A1A1A] font-serif text-sm">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-[11px] uppercase tracking-widest font-bold opacity-70 mb-8 border-b border-[#DCD6C8] pb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1A1A1A] font-serif text-sm">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="underline underline-offset-4 font-bold">Free</span> : <span className="text-[#1A1A1A] font-serif text-sm">₹{shipping.toLocaleString('en-IN')}</span>}</span>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                <span className="text-3xl font-serif">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
