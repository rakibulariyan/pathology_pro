import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPatientsToday: 0,
    testsPending: 0,
    revenueThisMonth: 0,
    lowStockItems: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, you'd have actual API endpoints for these
      // For now, we'll use mock data
      const mockStats = {
        totalPatientsToday: 24,
        testsPending: 18,
        revenueThisMonth: 12540.00,
        lowStockItems: 7
      };

      const mockActivities = [
        { id: 1, action: 'New patient registered', user: 'Receptionist 1', time: '2 hours ago' },
        { id: 2, action: 'Lab report verified', user: 'Dr. Smith', time: '3 hours ago' },
        { id: 3, action: 'Payment received', user: 'System', time: '4 hours ago' },
        { id: 4, action: 'Inventory restocked', user: 'Admin', time: '5 hours ago' },
        { id: 5, action: 'New test order created', user: 'Receptionist 2', time: '6 hours ago' }
      ];

      setStats(mockStats);
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className={`text-2xl ${color}`}>{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">
                {typeof value === 'number' && title.includes('Revenue') 
                  ? `$${value.toLocaleString()}`
                  : value
                }
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients Today"
          value={stats.totalPatientsToday}
          icon="👥"
          color="text-blue-500"
        />
        <StatCard
          title="Tests Pending"
          value={stats.testsPending}
          icon="🧪"
          color="text-yellow-500"
        />
        <StatCard
          title="Revenue This Month"
          value={stats.revenueThisMonth}
          icon="💰"
          color="text-green-500"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          icon="📦"
          color="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2 block">👥</span>
                <span className="text-sm font-medium text-gray-900">Add Patient</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2 block">📋</span>
                <span className="text-sm font-medium text-gray-900">Create Order</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2 block">📄</span>
                <span className="text-sm font-medium text-gray-900">View Reports</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2 block">💰</span>
                <span className="text-sm font-medium text-gray-900">Process Payment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Activities
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                            <span className="text-sm">📝</span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-700">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-500">
                              by {activity.user}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{activity.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
