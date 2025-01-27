import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import BaseHeader from './BaseHeader'
import { MenuConfig } from '../../types/menu'

interface AppLayoutProps {
  children: React.ReactNode
  title: string
  menuConfig: MenuConfig
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title, menuConfig }) => {
  const location = useLocation()
  const path = location.pathname

  // Get the current section from the path (e.g., /imbmgmt/liveops/overview -> liveops)
  const currentSection = path.split('/')[2]

  // Find active main menu item by checking if the current path starts with any main menu path
  const activeMainMenu = menuConfig.mainMenu.find(item => {
    // Extract the section from the menu item path (e.g., /imbmgmt/liveops -> liveops)
    const menuSection = item.path.split('/')[2]
    return menuSection === currentSection
  })

  // Get the section path (e.g., /imbmgmt/liveops)
  const sectionPath = activeMainMenu ? '/' + path.split('/').slice(1, 3).join('/') : undefined

  // Get submenu for active section if it exists
  const activeSubMenu = sectionPath ? menuConfig.subMenus[sectionPath] : undefined

  return (
    <div className="min-h-screen bg-[#17181e]">
      <BaseHeader title={title} titleHref="/">
        <nav className="ml-8 font-['PP_Formula'] font-semibold">
          <ul className="flex space-x-6">
            {menuConfig.mainMenu.map((item) => {
              // Extract the section from the menu item path
              const menuSection = item.path.split('/')[2]
              // Item is active only if its section matches the current section
              const isActive = currentSection === menuSection
              
              return (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className={`px-2 py-1 hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] text-[#fcfcfc] cursor-pointer
                      ${isActive ? 'text-[#14c8b1] border-b-2 border-[#14c8b1] bg-[#14c8b1]/20' : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </BaseHeader>
      
      {activeSubMenu && (
        <div className="w-full bg-[#1c1e24] border-t border-gray-700">
          <div className="container mx-auto px-8">
            <ul className="flex space-x-6 font-['PP_Formula'] text-sm h-10">
              {activeSubMenu.map((item) => (
                <li key={item.name} className="flex items-center h-full">
                  <Link 
                    to={item.path}
                    className={`px-2 flex items-center h-full text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] cursor-pointer
                      ${path === item.path ? 'text-[#14c8b1] border-b-2 border-[#14c8b1] bg-[#14c8b1]/20' : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {children}
    </div>
  )
}

export default AppLayout