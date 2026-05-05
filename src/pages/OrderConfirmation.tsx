import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state as { orderPlaced?: boolean, total?: number, items?: number } | null;

  if (!state || !state.orderPlaced) {
    return <Navigate to="/" replace />;
  }

  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 border border-[#DCD6C8] bg-[#E8E4DB] flex items-center justify-center mb-8"
      >
        <CheckCircle className="w-8 h-8 text-[#1A1A1A]" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-[60px] font-serif font-black leading-[0.85] tracking-tighter mb-6 text-center"
      >
        Order Confirmed
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[11px] uppercase tracking-widest font-bold opacity-70 mb-10 text-center max-w-md"
      >
        Thank you for your order. We've received your payment and will begin processing it right away.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border border-[#DCD6C8] bg-[#E8E4DB] p-8 w-full max-w-md mb-10 text-left"
      >
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-6 pb-4 border-b border-[#DCD6C8] flex items-center gap-2">
          <Package className="w-4 h-4" />
          Order Details
        </h2>
        
        <div className="space-y-4 text-[11px] uppercase tracking-widest font-bold opacity-70">
          <div className="flex justify-between">
            <span>Order Number</span>
            <span className="text-[#1A1A1A] font-serif tracking-normal text-sm">#{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Items</span>
            <span className="text-[#1A1A1A] font-serif tracking-normal text-sm">{state.items}</span>
          </div>
          <div className="flex justify-between items-end border-t border-[#DCD6C8] pt-6 mt-6">
            <span className="text-[10px]">Total Amount</span>
            <span className="text-xl font-serif text-[#1A1A1A] tracking-normal">₹{state.total?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link to="/products" className="inline-flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors">
          Continue Shopping <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </motion.div>
    </div>
  );
}
