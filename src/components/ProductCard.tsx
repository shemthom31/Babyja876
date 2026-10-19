import React from 'react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useAppContext();

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 flex flex-col shadow-sm transition-shadow hover:shadow-md h-full overflow-hidden cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden group">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Product Image</span>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-secondary/20 text-[#B18E1D] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2 mb-1">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {product.specs && product.specs.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.specs.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4 mt-auto pt-2 border-t border-gray-50">
          <span className="text-primary font-bold font-mono text-base">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-500'}`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          disabled={product.stock <= 0}
          className={`w-full py-2 border-2 rounded-lg text-sm font-bold transition-colors ${
            product.stock > 0
              ? 'border-primary text-primary hover:bg-primary hover:text-white'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
