import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      roles: ['master_admin', 'receptionist', 'pathologist']
    },
    {
      name: 'Patients',
      href: '/patients',
      icon: '👥',
      roles: ['master_admin', 'receptionist']
    },
    {
      name: 'Test Catalog',
      href: '/tests',
      icon: '🧪',
      roles: ['master_admin']
    },
    {
      name: 'Lab Orders',
      href: '/orders',
      icon: '📋',
      roles: ['master_admin', 'receptionist']
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: '📄',
      roles: ['master_admin', 'pathologist']
    },
    {
      name: 'Billing',
      href: '/billing',
      icon: '💰',
      roles: ['master_admin', 'receptionist']
    },
    {
      name: 'Inventory',
      href: '/inventory',
      icon: '📦',
      roles: ['master_admin']
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: '📈',
      roles: ['master_admin']
    },
    {
      name: 'User Management',
      href: '/users',
      icon: '👨‍💼',
      roles: ['master_admin']
    },
  ];

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(user?.role)
  );

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="bg-gray-800 w-64 min-h-screen flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-300 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
