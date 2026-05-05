import React from 'react';
import { useStore, Product } from '../store';
import { Navigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

export default function Admin() {
  const user = useStore(state => state.user);
  const products = useStore(state => state.products);
  const addProduct = useStore(state => state.addProduct);
  const updateProduct = useStore(state => state.updateProduct);
  const deleteProduct = useStore(state => state.deleteProduct);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  
  const [formData, setFormData] = React.useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', price: 0, description: '', category: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-[#DCD6C8] pb-6 gap-6">
        <div>
          <h1 className="text-4xl md:text-[60px] font-serif font-black leading-[0.85] tracking-tighter">Admin Dashboard</h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] font-bold opacity-70">Manage your product catalog.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors"
        >
          <Plus className="w-4 h-4 ml-1" /> Add Product
        </button>
      </div>

      <div className="border border-[#DCD6C8] bg-[#F5F2ED] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#DCD6C8]">
            <thead className="bg-[#E8E4DB]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[9px] uppercase tracking-widest font-bold opacity-70">Product</th>
                <th scope="col" className="px-6 py-4 text-left text-[9px] uppercase tracking-widest font-bold opacity-70">Category</th>
                <th scope="col" className="px-6 py-4 text-left text-[9px] uppercase tracking-widest font-bold opacity-70">Price</th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-[#DCD6C8]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#E8E4DB] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-10 flex-shrink-0 border border-[#DCD6C8] overflow-hidden bg-[#F5F2ED]">
                        <img className="h-full w-full object-cover mix-blend-multiply opacity-90" src={product.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-serif italic line-clamp-1 max-w-[200px] sm:max-w-xs">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-serif text-[#1A1A1A]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(product)} className="text-[#1A1A1A] hover:opacity-70 p-1 transition-opacity">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="text-[#1A1A1A] hover:opacity-70 p-1 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-[11px] uppercase tracking-widest font-bold opacity-40">
              No products found. Add some to get started.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#F5F2ED]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#F5F2ED] border border-[#DCD6C8] w-full max-w-lg relative z-10 p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8 border-b border-[#DCD6C8] pb-4">
              <h2 className="text-xl font-serif font-black">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#1A1A1A] opacity-50 hover:opacity-100 transition-opacity">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Product Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Price (₹)</label>
                  <input required type="number" step="1" min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Category</label>
                  <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Description</label>
                <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Image URL</label>
                <input required type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all text-sm" placeholder="https://example.com/image.jpg" />
              </div>
              <div className="pt-8 flex justify-end gap-4 mt-8 border-t border-[#DCD6C8]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] font-bold opacity-70 hover:opacity-100 transition-opacity">
                  Cancel
                </button>
                <button type="submit" className="px-8 py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors">
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
