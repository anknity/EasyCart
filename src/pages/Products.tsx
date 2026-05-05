import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../store';
import { Search, Filter, ShoppingCart } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = !categoryFilter || categoryFilter === 'All' || product.category === categoryFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#DCD6C8]">
        <div>
          <h1 className="text-4xl md:text-[60px] font-serif font-black leading-[0.85] tracking-tighter">Products</h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] font-bold opacity-70">Find exactly what you're looking for.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#1A1A1A] opacity-50" />
            </div>
            <input
              type="text"
              className="block w-full sm:w-64 pl-10 pr-3 py-3 border border-[#DCD6C8] bg-transparent focus:border-[#1A1A1A] rounded-none text-[11px] uppercase tracking-widest font-bold placeholder-[#1A1A1A] placeholder-opacity-40 transition-all outline-none"
              placeholder="SEARCH PRODUCTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-[#1A1A1A] opacity-50" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-3 border border-[#DCD6C8] bg-transparent focus:border-[#1A1A1A] rounded-none text-[11px] uppercase tracking-widest font-bold appearance-none outline-none"
              value={categoryFilter || 'All'}
              onChange={(e) => {
                if (e.target.value === 'All') {
                  searchParams.delete('category');
                } else {
                  searchParams.set('category', e.target.value);
                }
                setSearchParams(searchParams);
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 border border-[#DCD6C8] bg-[#F5F2ED]">
          <p className="text-xl font-serif italic text-[#1A1A1A] opacity-60">No products found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); searchParams.delete('category'); setSearchParams(searchParams); }}
            className="mt-6 text-[11px] uppercase tracking-widest font-bold underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-[#DCD6C8]">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-[#F5F2ED] border-r border-b border-[#DCD6C8] flex flex-col h-full hover:bg-white transition-colors relative w-full overflow-hidden">
              <Link to={`/product/${product.id}`} className="block aspect-[4/5] relative overflow-hidden bg-[#E8E4DB] border-b border-[#DCD6C8]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-multiply group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <div className="p-6 flex flex-col flex-1 relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest mb-2 transition-opacity duration-300 group-hover:opacity-70">{product.category}</div>
                <Link to={`/product/${product.id}`} className="text-sm font-serif italic mb-2 line-clamp-1 block hover:underline">
                  {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm font-serif">₹{product.price.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="flex items-center justify-center p-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors z-10 shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
