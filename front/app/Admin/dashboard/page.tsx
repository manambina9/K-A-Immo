'use client';

import { useState } from 'react';
import { Home, Users, FileText, Tag, Settings, Calendar, MessageSquare, BarChart2, Shield, LogOut } from 'lucide-react';
import { ProtectedRoute } from '../../../component/ProtectedRoute';

// Importation des composants 
import PropertiesContent from '../../../component/Admin/PropertiesContent';
import ClientsContent from '../../../component/Admin/ClientsContent';
import AgentsContent from '../../../component/Admin/AgentsContent';
import AppointmentsContent from '../../../component/Admin/AppointmentsContent';
import OffersContent from '../../../component/Admin/OffersContent';
import MessagesContent from '../../../component/Admin/MessagesContent';
import StatisticsContent from '../../../component/Admin/StatisticsContent';
import SecurityContent from '../../../component/Admin/SecurityContent';
import SettingsContent from '../../../component/Admin/SettingsContent';
import DashboardContent from '../../../component/Admin/DashboardContent';
import ClientHeader from '../../../component/client/ClientHeader'

export function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menus = [
    { id: 'dashboard', icon: <Home />, name: 'Tableau de bord' },
    { id: 'properties', icon: <FileText />, name: 'Biens immobiliers' },
    { id: 'clients', icon: <Users />, name: 'Clients' },
    { id: 'agents', icon: <Users />, name: 'Agents' },
    { id: 'appointments', icon: <Calendar />, name: 'Rendez-vous' },
    { id: 'offers', icon: <Tag />, name: 'Offres' },
    { id: 'messages', icon: <MessageSquare />, name: 'Messages' },
    { id: 'statistics', icon: <BarChart2 />, name: 'Statistiques' },
    { id: 'security', icon: <Shield />, name: 'Sécurité' },
    { id: 'settings', icon: <Settings />, name: 'Paramètres' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'properties':
        return <PropertiesContent />;
      case 'clients':
        return <ClientsContent />;
      case 'agents':
        return <AgentsContent />;
      case 'appointments':
        return <AppointmentsContent />;
      case 'offers':
        return <OffersContent />;
      case 'messages':
        return <MessagesContent />;
      case 'statistics':
        return <StatisticsContent />;
      case 'security':
        return <SecurityContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return ( 
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">Immobilier Admin</h1>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>

            <nav className="mt-6">
              <ul>
                {menus.map((menu) => (
                  <li key={menu.id} className="mb-2">
                    <button
                      onClick={() => setActiveMenu(menu.id)}
                      className={`flex items-center w-full px-4 py-2 rounded-md ${
                        activeMenu === menu.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{menu.icon}</span>
                      <span>{menu.name}</span>
                    </button>
                  </li>
                ))}
                <li className="mt-6">
                  <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-md">
                    <LogOut className="mr-3" />
                    <span>Déconnexion</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {menus.find(menu => menu.id === activeMenu)?.name || 'Tableau de bord'}
              </h2>
            </div>
          </header>

          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div> 
    </>
  );
}

export default AdminDashboard;