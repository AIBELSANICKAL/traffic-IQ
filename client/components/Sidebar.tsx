import Link from 'next/link';
import { Home, BarChart2, Settings, Users } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          TrafficIQ
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/" className="flex items-center space-x-3 px-4 py-3 bg-gray-800 rounded-lg text-emerald-400 transition-colors">
          <Home size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <BarChart2 size={20} />
          <span className="font-medium">Analytics</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <Users size={20} />
          <span className="font-medium">Audience</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@trafficiq.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
