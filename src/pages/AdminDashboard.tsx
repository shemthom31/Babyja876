import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { orders } = useAppContext();

  const totalOrders = orders.length;
  
  const grossRevenue = orders.reduce((sum, order) => sum + order.subtotal, 0); // Excluding tax/delivery for simplicity of goods revenue
  
  // Calculate total supplier costs from orders
  const totalCost = orders.reduce((sum, order) => {
    const orderCost = order.items.reduce((itemSum, item) => itemSum + (item.cost * item.quantity), 0);
    return sum + orderCost;
  }, 0);

  const netProfit = grossRevenue - totalCost;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  const stats = [
    { title: 'Total Site Visits', value: '1,248', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Orders Placed', value: totalOrders.toString(), icon: ShoppingCart, color: 'bg-purple-500' },
    { title: 'Gross Revenue', value: `$${grossRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-green-500' },
    { title: 'Net Profit Margin', value: `${profitMargin.toFixed(1)}%`, icon: TrendingUp, color: 'bg-accent' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#2D3135] text-white rounded-3xl p-6 md:p-8 flex flex-col shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold flex items-center gap-3 text-xl">
            <TrendingUp className="text-primary w-6 h-6" /> Admin Insights
          </h2>
          <span className="text-xs bg-gray-700 px-3 py-1 rounded font-semibold tracking-wider uppercase">Live</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                <stat.icon size={14} className="text-gray-300" />
                {stat.title}
              </p>
              <p className={`text-2xl font-bold font-mono ${stat.title.includes('Profit') ? 'text-primary' : stat.title.includes('Revenue') ? 'text-secondary' : 'text-white'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          More detailed analytics coming soon.
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
