import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminSidebar: React.FC = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/inventory', icon: Package, label: 'Inventory' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  ];

  return (
    <>
      {/* Mobile top nav bar */}
      <div className="md:hidden bg-[var(--color-admin-bg)] text-white">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="text-lg font-bold tracking-tight">
            Babyja<span className="text-secondary">876</span>
            <span className="ml-2 text-xs text-gray-400 font-normal uppercase tracking-wider">Admin</span>
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
        <nav className="flex overflow-x-auto px-4 py-2 gap-1 hide-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={15} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 bg-[var(--color-admin-bg)] text-white flex-col h-screen sticky top-0 flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Babyja<span className="text-secondary">876</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
