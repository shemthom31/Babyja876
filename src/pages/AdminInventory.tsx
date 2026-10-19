import React, { useState } from 'react';
import { Plus, Edit2, Save, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

const AdminInventory: React.FC = () => {
  const { inventory, setInventory } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSaveClick = () => {
    if (editingId) {
      setInventory(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as Product : p));
      setEditingId(null);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditForm({});
  };

  const calculateMargin = (price: number, cost: number) => {
    if (price === 0) return 0;
    return (((price - cost) / price) * 100).toFixed(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Manager</h1>
        <button className="bg-primary hover:bg-[#329a95] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium">
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4">Product</th>
                <th className="p-4 text-right">Stock</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-right">Cost</th>
                <th className="p-4 text-right">Margin</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    {editingId === item.id ? (
                      <input 
                        type="text" 
                        value={editForm.title || ''} 
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="font-medium text-gray-900">{item.title}</div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        value={editForm.stock || 0} 
                        onChange={(e) => setEditForm({...editForm, stock: Number(e.target.value)})}
                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-primary focus:border-primary text-right"
                      />
                    ) : (
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.stock > 10 ? 'bg-green-100 text-green-800' : item.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {item.stock}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right font-medium text-gray-900">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        value={editForm.price || 0} 
                        onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})}
                        className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-primary focus:border-primary text-right"
                      />
                    ) : (
                      `$${item.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="p-4 text-right text-gray-500">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        value={editForm.cost || 0} 
                        onChange={(e) => setEditForm({...editForm, cost: Number(e.target.value)})}
                        className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-primary focus:border-primary text-right"
                      />
                    ) : (
                      `$${item.cost.toFixed(2)}`
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-gray-600 font-medium">
                      {calculateMargin(
                        editingId === item.id ? (editForm.price || 0) : item.price, 
                        editingId === item.id ? (editForm.cost || 0) : item.cost
                      )}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={handleSaveClick} className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200">
                          <Save size={16} />
                        </button>
                        <button onClick={handleCancelClick} className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleEditClick(item)} className="p-1.5 text-gray-400 hover:text-primary bg-gray-50 hover:bg-primary/10 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
