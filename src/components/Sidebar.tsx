import { useState } from 'react';
import {
  Home,
  Settings,
  Star,
  Users,
  CheckSquare,
  Menu,
  X,
} from 'lucide-react';

interface AppSidebarProps {
  onSettingsClick: () => void;
}

const AppSidebar = ({ onSettingsClick }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Início', action: () => {} },
    { icon: CheckSquare, label: 'Tarefas', action: () => {} },
    { icon: Users, label: 'Grupos', action: () => {} },
    { icon: Settings, label: 'Configurações', action: onSettingsClick }, // aqui chama a função
    { icon: Star, label: 'Premium', action: () => {} },
  ];

  return (
    <div className='h-screen'>
      <div
        className={`h-full bg-neutral-800 text-gray-300 shadow-lg transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div
          className={`p-4 mb-4 flex ${
            !collapsed ? 'justify-end' : 'justify-center'
          }`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className='text-white p-2 rounded-lg transition-all duration-200 hover:bg-neutral-700'
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className='px-2'>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center px-3 py-3 mb-2 rounded-lg transition-all duration-200 hover:bg-neutral-700 text-left group ${
                collapsed && 'justify-center'
              }`}
            >
              <item.icon size={20} className='flex-shrink-0' />
              {!collapsed && (
                <span className='ml-3 font-medium transition-opacity duration-200'>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;
