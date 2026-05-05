import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const products = useStore((state) => state.products);
  const featuredProducts = products.slice(0, 6);
  
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white border-b border-[#DCD6C8] py-32 md:py-48">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-[80px] lg:text-[100px] font-serif font-black leading-[0.85] tracking-tighter mb-8"
            >
              THE NEW<br/>STANDARD
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-80 mb-8"
            >
              Discover our curated collection of premium products. Quality you can trust, prices you'll love.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/products" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-colors">
                Shop the Collection <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32 w-full">
        {/* Categories */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-8"
          >
            Categories
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-[#DCD6C8]">
            {categories.map((category, index) => (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group relative bg-[#F5F2ED] border-r border-b border-[#DCD6C8] aspect-square flex flex-col items-center justify-center hover:bg-[#E8E4DB] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                <div className="text-center p-4 relative z-10 transition-colors duration-500 group-hover:text-[#F5F2ED]">
                  <h3 className="font-serif text-xl italic">{category}</h3>
                  <span className="text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-60 transition-opacity duration-500 mt-2 block">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40"
            >
              Featured Products
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/products" className="text-[10px] underline cursor-pointer uppercase font-bold opacity-70 hover:opacity-100 flex items-center gap-1 group">
                View all <ArrowRight className="w-3 h-3 group-hover:block transition-all" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#DCD6C8]">
            {featuredProducts.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={product.id}
              >
                <Link to={`/product/${product.id}`} className="group bg-[#F5F2ED] border-r border-b border-[#DCD6C8] flex flex-col h-full hover:bg-white transition-colors relative block w-full overflow-hidden">
                  <div className="aspect-[4/5] bg-[#E8E4DB] overflow-hidden relative border-b border-[#DCD6C8]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-multiply group-hover:opacity-100"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest mb-2 transition-opacity duration-300 group-hover:opacity-70">{product.category}</div>
                    <h3 className="text-sm font-serif italic mb-2 line-clamp-1">{product.name}</h3>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-sm font-serif">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 border border-[#1A1A1A] px-3 py-1">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* About Info Section */}
        <section className="bg-[#1A1A1A] text-[#F5F2ED] p-12 lg:p-24 border border-[#1A1A1A]">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40"
            >
              Our Philosophy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl font-serif italic leading-relaxed"
            >
              "We believe in objects that last—pieces crafted with intention, functional beauty, and a quiet confidence that elevates the everyday."
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-8"
            >
              <Link to="/products" className="inline-flex items-center justify-center px-10 py-4 bg-[#F5F2ED] text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors">
                Learn More About Us
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
