import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { deliveryOptions } from '../data';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, addOrder } = useAppContext();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">
          Return to shop
        </button>
      </div>
    );
  }

  const deliveryFee = selectedDelivery ? deliveryOptions.find(d => d.id === selectedDelivery)?.price || 0 : 0;
  const tax = cartTotal * 0.15; // 15% estimated tax
  const finalTotal = cartTotal + tax + deliveryFee;

  const handlePlaceOrder = () => {
    const order: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerEmail: email,
      customerPhone: phone,
      items: [...cart],
      subtotal: cartTotal,
      tax,
      deliveryFee,
      total: finalTotal,
      status: 'Pending',
      deliveryOption: selectedDelivery,
      createdAt: new Date().toISOString()
    };
    
    addOrder(order);
    setNewOrderId(order.id);
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-6">Thank you for your purchase. Your order number is <span className="font-semibold text-gray-900">{newOrderId}</span>.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary hover:bg-[#329a95] text-white font-medium py-3 rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Checkout Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Progress Bar */}
              <div className="flex items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mr-2">1</span>
                  <span className="font-medium">Details</span>
                </div>
                <ChevronRight size={16} className="mx-4 text-gray-300" />
                <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mr-2">2</span>
                  <span className="font-medium">Delivery</span>
                </div>
                <ChevronRight size={16} className="mx-4 text-gray-300" />
                <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mr-2">3</span>
                  <span className="font-medium">Review</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Jane" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="876-555-0199" />
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!email || !firstName || !lastName}
                      className="mt-8 w-full bg-primary hover:bg-[#329a95] text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Delivery
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Delivery Options</h3>
                    <div className="space-y-3">
                      {deliveryOptions.map(option => (
                        <label 
                          key={option.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDelivery === option.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="delivery" 
                              value={option.id}
                              checked={selectedDelivery === option.id}
                              onChange={() => setSelectedDelivery(option.id)}
                              className="text-primary focus:ring-primary w-5 h-5"
                            />
                            <span className="font-medium text-gray-900">{option.label}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-8 flex gap-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        disabled={!selectedDelivery}
                        className="flex-1 bg-primary hover:bg-[#329a95] text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Review & Complete</h3>
                    
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                      <p className="text-gray-600 text-sm mb-4">{firstName} {lastName} ({email})</p>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">Delivery Method</h4>
                      <p className="text-gray-600 text-sm">{deliveryOptions.find(d => d.id === selectedDelivery)?.label}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-blue-50 text-blue-700 p-4 rounded-lg">
                      <ShieldCheck size={20} className="flex-shrink-0" />
                      <p>This is a secure, encrypted guest checkout. No account required.</p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-accent hover:bg-[#fa7563] text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-accent/20"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                         {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-2">{item.title}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (15%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? (selectedDelivery ? 'Free' : '-') : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
