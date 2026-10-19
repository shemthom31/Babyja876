import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

const Home: React.FC = () => {
  const { inventory } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', ...Array.from(new Set(inventory.map((item) => item.category)))];

  const filteredInventory = activeCategory === 'All'
    ? inventory
    : inventory.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <main id="shop" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Essentials</h2>
            <p className="text-gray-500 mt-2">Carefully curated for your little one's comfort.</p>
          </div>

          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0 hide-scrollbar w-full md:w-auto">
            <div className="flex space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredInventory.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInventory.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl font-bold text-primary mb-2">Babyja876</p>
          <p className="text-sm text-gray-500">Nurturing families across Jamaica with premium baby essentials.</p>
          <p className="text-sm text-gray-400 mt-6">&copy; {new Date().getFullYear()} Babyja876. All rights reserved.</p>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
