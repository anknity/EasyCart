import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useStore(state => state.products.find(p => p.id === id));
  const addToCart = useStore(state => state.addToCart);
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return (
      <div className="text-center py-24 border border-[#DCD6C8]">
        <h2 className="text-2xl font-serif italic mb-4">Product not found</h2>
        <button onClick={() => navigate('/products')} className="text-[11px] uppercase tracking-widest font-bold underline underline-offset-4">
          Return to directory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="bg-[#F5F2ED] border border-[#DCD6C8]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:min-h-[600px]">
        {/* Image Section */}
        <div className="relative aspect-square md:aspect-auto bg-[#E8E4DB] border-b md:border-b-0 md:border-r border-[#DCD6C8]">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-10 p-3 bg-[#F5F2ED] border border-[#DCD6C8] hover:bg-[#E8E4DB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#1A1A1A]" />
          </button>
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
          />
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4">
            {product.category}
          </div>
          <h1 className="text-4xl md:text-[60px] font-serif font-black leading-[0.85] tracking-tighter mb-8">
            {product.name}
          </h1>
          <div className="text-3xl font-serif mb-12">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          
          <div className="text-[12px] leading-relaxed opacity-70 font-sans mb-12 flex-1">
            <p>{product.description}</p>
          </div>

          <div className="border-t border-[#DCD6C8] pt-10 mt-auto">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#DCD6C8] bg-[#F5F2ED] w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 text-[#1A1A1A] hover:bg-[#E8E4DB] transition-colors border-r border-[#DCD6C8]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-16 text-center font-serif text-lg">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 text-[#1A1A1A] hover:bg-[#E8E4DB] transition-colors border-l border-[#DCD6C8]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/cart');
                }}
                className="flex-1 flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}
