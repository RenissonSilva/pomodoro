import { useState } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { FaHome, FaCog, FaStar } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdGroup } from 'react-icons/md';
import baloo from '@/styles/font';
import { BiTask } from 'react-icons/bi';

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='h-screen'>
      <Sidebar
        collapsed={collapsed}
        className={`h-full shadow-lg transition-all duration-300 ease-in-out`}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#0F0F0F',
            color: '#ccc',
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <div
          className={`p-2 mb-4 flex ${
            !collapsed ? 'justify-end' : 'justify-center'
          }`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className='text-white px-2 py-2 rounded-full transition-all duration-200 hover:bg-gray-700'
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>

        <Menu
          menuItemStyles={{
            button: ({ level, active }) => ({
              backgroundColor: '#0F0F0F',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#272727 !important',
              },
              fontFamily: baloo.style.fontFamily,
            }),
          }}
        >
          <MenuItem icon={<FaHome size={20} />}> Início </MenuItem>
          <MenuItem icon={<BiTask size={20} />}> Tarefas </MenuItem>
          <MenuItem icon={<MdGroup size={20} />}> Grupos </MenuItem>
          <MenuItem icon={<FaCog size={20} />}> Configurações </MenuItem>
          <MenuItem icon={<FaStar size={20} />}> Premium </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
