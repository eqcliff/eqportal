import React from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface UserTrayProps {
  isOpen: boolean
  onClose: () => void
}

const UserTray: React.FC<UserTrayProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login')
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 min-w-[256px] w-64 bg-[#21212a] shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#fcfcfc]">User</h2>
              <p className="text-sm text-[#fcfcfc]/70">EQ</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-[#3f3f4d] text-[#fcfcfc]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left py-2 px-4 rounded text-[#fcfcfc] hover:bg-[#3f3f4d] hover:text-[#ecde65] transition-colors duration-200">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left py-2 px-4 rounded text-[#fcfcfc] hover:bg-[#3f3f4d] hover:text-[#ecde65] transition-colors duration-200">
                  Preferences
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 rounded text-red-400 hover:bg-[#3f3f4d] hover:text-red-300 transition-colors duration-200"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default UserTray