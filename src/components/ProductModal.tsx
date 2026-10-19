import React from 'react';
import { X, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95dvh] sm:max-h-[90vh] overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-gray-800 hover:bg-white shadow transition-all"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">

          {/* Product image */}
          <div className="aspect-video w-full bg-gray-100 overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Product Image</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6">
            {/* Category */}
            <span className="inline-block bg-secondary/20 text-[#B18E1D] text-[10px] px-2 py-0.5 rounded font-bold uppercase mb-2">
              {product.category}
            </span>

            {/* Title & Price row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h2>
              <span className="text-2xl font-bold text-primary font-mono shrink-0">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-4">
              {product.stock > 0 ? (
                <>
                  <CheckCircle size={15} className="text-green-500 shrink-0" />
                  <span className="text-sm text-green-600 font-medium">
                    {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle size={15} className="text-red-400 shrink-0" />
                  <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {product.description}
              </p>
            )}

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Specifications</p>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer CTA */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-white">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg ${
              product.stock > 0
                ? 'bg-primary hover:bg-[#329a95] text-white shadow-primary/20'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            <ShoppingCart size={16} />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
