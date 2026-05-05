import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { motion } from 'motion/react';

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  
  const login = useStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    login(email);
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#F5F2ED] border border-[#DCD6C8] p-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-black tracking-tighter mb-4">
            {isLogin ? 'Welcome back.' : 'Create an account.'}
          </h2>
          <p className="text-[11px] uppercase tracking-widest font-bold opacity-40">
            {isLogin ? 'Enter your details to access your account' : 'Sign up to start shopping'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50 text-[11px] uppercase tracking-widest text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all"
                placeholder="JOHN DOE"
              />
            </div>
          )}
          
          <div>
            <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all"
              placeholder="YOU@EXAMPLE.COM"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-widest font-bold opacity-70 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#DCD6C8] bg-transparent outline-none focus:border-[#1A1A1A] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors mt-8"
          >
            {isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#DCD6C8] text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-[10px] uppercase tracking-widest font-bold opacity-70 hover:opacity-100 transition-opacity underline underline-offset-4"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
