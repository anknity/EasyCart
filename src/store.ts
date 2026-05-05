import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  user: any | null; // For simple auth
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string) => void;
  logout: () => void;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 24999, description: 'High-quality wireless headphones with noise cancellation and premium finish.', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
  { id: '2', name: 'Minimalist Watch', price: 12999, description: 'Elegant men\'s watch with leather strap and brushed metal face.', category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: '3', name: 'Running Sneakers', price: 9999, description: 'Lightweight running shoes for everyday jogging and stylish casual wear.', category: 'Clothing', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80' },
  { id: '4', name: 'Smart Home Hub', price: 7499, description: 'Voice-controlled smart hub for connecting your devices and automating your home.', category: 'Electronics', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80' },
  { id: '5', name: 'Cotton T-Shirt', price: 2499, description: '100% organic cotton basic t-shirt in a classic neutral tone.', category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
  { id: '6', name: 'Leather Backpack', price: 18999, description: 'Handcrafted leather backpack with premium brass hardware for work and travel.', category: 'Accessories', image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80' },
  { id: '7', name: 'Ceramic Pour-Over', price: 3999, description: 'Minimalist ceramic pour-over coffee dripper for the perfect morning brew.', category: 'Kitchenware', image: 'https://images.unsplash.com/photo-1544681280-d2dc9075e89c?w=800&q=80' },
  { id: '8', name: 'Linen Throw Pillow', price: 4499, description: 'Textured linen throw pillow to add warmth to any living space.', category: 'Living Room', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&q=80' },
  { id: '9', name: 'Matte Steel Lamp', price: 9499, description: 'Modern desk lamp with a sleek matte finish and adjustable arm.', category: 'Living Room', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
  { id: '10', name: 'Cast Iron Skillet', price: 6999, description: 'Durable, pre-seasoned cast iron skillet for lifelong culinary adventures.', category: 'Kitchenware', image: 'https://images.unsplash.com/photo-1588628566587-bf0e3863474e?w=800&q=80' },
  { id: '11', name: 'Wool Fedora Hat', price: 5499, description: 'Classic wool fedora perfect for crisp autumn days.', category: 'Clothing', image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80' },
  { id: '12', name: 'Portable Bluetooth Speaker', price: 7999, description: 'Compact and powerful speaker with 12-hour battery life.', category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80' },
];

export const useStore = create<AppState>((set) => ({
  products: mockProducts,
  cart: [],
  user: null, // If user is logged in
  
  addProduct: (product) => set((state) => ({ 
    products: [...state.products, { ...product, id: Math.random().toString(36).substr(2, 9) }] 
  })),
  
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
  })),

  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),

  addToCart: (product, quantity = 1) => set((state) => {
    const existingIndex = state.cart.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      const newCart = [...state.cart];
      newCart[existingIndex].quantity += quantity;
      return { cart: newCart };
    }
    return { cart: [...state.cart, { ...product, quantity }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  updateCartQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
  })),

  clearCart: () => set({ cart: [] }),
  
  login: (email) => set({ user: { email } }),
  logout: () => set({ user: null }),
}));
