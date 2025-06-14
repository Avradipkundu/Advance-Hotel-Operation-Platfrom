import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Bed,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 45,
    availableRooms: 12,
    bookings: 28,
    revenue: 125000,
    guestSatisfaction: 4.8,
    staffCount: 15,
  });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  // Simulate API call
  useEffect(() => {
    // const fetchAdminStats = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await axios.get('/api/dashboard/admin');
    //     setStats(res.data);
    //     setLoading(false);
    //   } catch (err) {
    //     console.error('Error fetching admin stats:', err);
    //     toast.error('Failed to load dashboard data.');
    //     setLoading(false);
    //   }
    // };
    // fetchAdminStats();
  }, []);

  const sidebarItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Rooms', href: '/admin/rooms', icon: Bed },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },    
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
        } lg:w-64 flex flex-col`}>
        {/* Logo/Brand */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-xl text-gray-800 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'
              } lg:opacity-100`}>
              Hotel Admin
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'
                      } lg:opacity-100`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
            <div className={`transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'
              } lg:opacity-100`}>
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@hotel.com</p>
            </div>
          </div>
          <button onClick={handleLogout} className={`mt-3 flex items-center space-x-2 text-red-600 hover:text-red-700 transition-opacity cursor-pointer ${sidebarOpen ? 'opacity-100' : 'opacity-0'
            } lg:opacity-100`}>
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>            
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            <StatCard title="Total Rooms" value={stats.totalRooms} color="bg-blue-50" textColor="text-blue-700" />
            <StatCard title="Available Rooms" value={stats.availableRooms} color="bg-green-50" textColor="text-green-700" />
            <StatCard title="Active Bookings" value={stats.bookings} color="bg-yellow-50" textColor="text-yellow-700" />
            <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} color="bg-purple-50" textColor="text-purple-700" />
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ManagementCard
              title="Manage Rooms"
              description="Add, update, or remove room listings and check availability."
              linkTo="/admin/rooms"
              buttonText="Go to Rooms"
              icon={Bed}
            />
            <ManagementCard
              title="Manage Bookings"
              description="View, confirm, or cancel guest bookings and update statuses."
              linkTo="/admin/bookings"
              buttonText="Go to Bookings"
              icon={Calendar}
            />            
          </div>          
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, textColor }) => (
  <div className={`${color} rounded-lg p-6 border border-gray-200`}>
    <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
  </div>
);

const ManagementCard = ({ title, description, linkTo, buttonText, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-blue-600 mr-3" />
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link
      to={linkTo}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {buttonText}
    </Link>
  </div>
);
export default AdminDashboard;