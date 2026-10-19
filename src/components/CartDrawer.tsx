import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartTotal } = useAppContext();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Shopping Cart
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 pr-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p className="text-lg font-medium">Your cart is empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-primary hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center border-b border-gray-50 pb-3 group">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center relative">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover object-center" />
                    ) : (
                      <ShoppingBag size={16} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-gray-700 line-clamp-1 pr-2">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                       <p className="text-gray-400">Qty: {item.quantity}</p>
                       <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 rounded">
                         <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-0.5 hover:text-primary"><Minus size={12} /></button>
                         <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-0.5 hover:text-primary"><Plus size={12} /></button>
                         <button onClick={() => removeFromCart(item.id)} className="p-0.5 hover:text-red-500 ml-1"><Trash2 size={12} /></button>
                       </div>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 mt-auto border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-800 font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs mb-4">
                <span className="text-gray-400">Shipping</span>
                <span className="text-primary font-semibold">Calculated at checkout</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-accent text-white rounded-xl font-bold shadow-md hover:bg-[#ff7565] mt-2 transition-colors"
              >
                Checkout Now
              </button>
              <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
