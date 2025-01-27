import React, { useState } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { appStructure, AppItem } from '../../pages/home/appStructure'

interface AppTrayProps {
  isOpen: boolean
  onClose: () => void
}

const AppTray: React.FC<AppTrayProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState(['Science Development', 'Front Office'])

  const toggleExpand = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  const MenuItem = ({ item, level = 0 }: { item: AppItem; level?: number }) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.name)

    return (
      <div className="mb-1">
        <div 
          className={`flex items-center py-1.5 px-4 rounded-md cursor-pointer ${
            item.name === 'Simulation Ecosystem' ? 'bg-[#5ee5d4] text-[#1D1D25]' : 'text-[#fcfcfc] hover:bg-[#3f3f4d]'
          }`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
          onClick={() => hasChildren ? toggleExpand(item.name) : null}
        >
          {hasChildren && (
            isExpanded ? <ChevronDown className="w-3 h-3 mr-2 flex-shrink-0" /> : <ChevronRight className="w-3 h-3 mr-2 flex-shrink-0" />
          )}
          {item.href ? (
            <Link 
              to={item.href} 
              className="flex-grow whitespace-nowrap text-xs"
              onClick={onClose}
            >
              <span>{item.name}</span>
            </Link>
          ) : (
            <span className="text-xs whitespace-nowrap">{item.name}</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children.map(child => (
              <MenuItem key={child.name} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-96 bg-[#21212a] shadow-lg z-50 overflow-y-auto">
        <div className="p-4">
          <Link 
            to="/" 
            className="text-sm font-semibold mb-4 text-[#fcfcfc] hover:text-[#5ee5d4] transition-colors block"
            onClick={onClose}
          >
            EQ Portal
          </Link>
          {appStructure.map(item => (
            <MenuItem key={item.name} item={item} />
          ))}
        </div>
        <button 
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-[#3f3f4d] text-[#fcfcfc]"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}

export default AppTray