import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppTray from './AppTray'
import UserTray from './UserTray'

interface BaseHeaderProps {
  children?: React.ReactNode
  title: string
  titleHref?: string
  rightContent?: React.ReactNode
}

const BaseHeader: React.FC<BaseHeaderProps> = ({ children, title, titleHref, rightContent }) => {
  const [isAppTrayOpen, setIsAppTrayOpen] = useState(false)
  const [isUserTrayOpen, setIsUserTrayOpen] = useState(false)
  const location = useLocation()
  
  // Get the root section path (e.g., /imbmgmt/liveops/overview -> /imbmgmt)
  const rootPath = location.pathname.startsWith('/home') ? '/' : ('/' + location.pathname.split('/')[1])

  return (
    <>
      <div className="w-full bg-[#1c1e24]">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <div 
              onClick={() => setIsAppTrayOpen(true)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <svg width="40" height="40" viewBox="0 0 294 158" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="76.3371" x2="292" y2="76.3371" gradientUnits="userSpaceOnUse" spreadMethod="pad">
                    <stop offset="0" stopColor="#5EE5D4" stopOpacity="1"/>
                    <stop offset="1" stopColor="#F1F4B1" stopOpacity="1"/>
                  </linearGradient>
                </defs>
                <path d="M92.5924 150.928C51.4412 159.851 10.6915 133.697 1.75676 92.6249-7.20157 51.5529 18.9879 10.8586 60.1159 1.91253 98.1237-6.34906 126.89 14.895 132.279 19.2383L138.448 24.2424C138.732 24.4785 138.803 24.7854 138.803 24.9742 138.803 25.3519 138.661 25.7059 138.4 25.9419L81.7435 78.2261 65.8832 69.0911 109.942 29.5771 107.673 28.2789C97.6273 22.5665 81.9326 16.5474 64.1341 20.3949 63.0705 20.631 61.9832 20.9142 60.9195 21.1974 32.8391 29.105 15.0879 56.6751 19.6498 85.3307 22.1553 101.099 30.7826 114.743 43.9719 123.735 57.9177 133.248 71.2488 136.222 85.8563 133.036 94.4361 131.171 100.345 128.055 108.359 121.139L178.962 56.6043 196.121 66.5654 120.839 135.373C112.377 142.666 106.231 147.954 92.5924 150.928ZM231.908 150.74 231.931 150.74C193.924 159.025 165.134 137.781 159.768 133.437L153.575 128.433C153.292 128.197 153.221 127.89 153.221 127.677 153.197 127.324 153.363 126.946 153.623 126.71L210.138 74.4965 225.691 83.5137 182.081 123.098 184.327 124.373C194.373 130.109 210.067 136.128 227.866 132.28 228.93 132.044 230.017 131.761 231.08 131.478 259.161 123.57 276.912 96.0004 272.35 67.3444 269.845 51.5765 261.217 37.9567 248.051 28.9398 234.082 19.4271 220.775 16.4529 206.144 19.6396 197.564 21.5043 191.678 24.6201 183.641 31.5363L112.85 96.2123 95.6892 86.2985 171.185 17.3027C179.647 10.0089 185.792 4.72148 199.431 1.7473 240.559-7.17522 281.309 18.9551 290.243 60.0269 299.202 101.099 273.012 141.817 231.884 150.74L231.908 150.74Z" fill="url(#logo-gradient)" fillRule="nonzero" />
              </svg>
            </div>
            <Link 
              to={rootPath}
              className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#5ee5d4] to-[#f4f5ac] text-transparent bg-clip-text hover:cursor-pointer"
            >
              {title}
            </Link>
            {children}
          </div>
          <div 
            className="text-[#fcfcfc] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsUserTrayOpen(true)}
          >
            {rightContent || (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#user-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="user-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5ee5d4" />
                    <stop offset="100%" stopColor="#f4f5ac" />
                  </linearGradient>
                </defs>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
        </div>
      </div>
      <AppTray isOpen={isAppTrayOpen} onClose={() => setIsAppTrayOpen(false)} />
      <UserTray isOpen={isUserTrayOpen} onClose={() => setIsUserTrayOpen(false)} />
    </>
  )
}

export default BaseHeader