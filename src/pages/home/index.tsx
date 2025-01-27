import { Link } from 'react-router-dom'
import BaseHeader from '../../components/layout/BaseHeader'
import { appStructure, AppItem } from './appStructure'

const AppButton = ({ item }: { item: AppItem }) => (
  <Link 
    to={item.href || '#'} 
    className="text-center text-[#fcfcfc] bg-[#393843] hover:bg-gradient-to-r hover:from-[#5ee5d4] hover:to-[#f4f5ac] hover:text-[#121212] hover:font-bold rounded-md p-5 transition-all duration-200 flex items-center justify-center font-roboto"
    style={{ gridColumn: item.width === 'double' ? 'span 2' : item.width === 'full' ? 'span 2' : 'span 1' }}
  >
    {item.name}
  </Link>
)

const SectionContent = ({ section }: { section: AppItem }) => {
  if (section.layout === 'column') {
    return (
      <div className="flex flex-col gap-3">
        {section.children?.map((item) => (
          <AppButton key={item.name} item={item} />
        ))}
      </div>
    )
  }

  if (section.layout === 'row') {
    return (
      <div className="grid grid-cols-4 gap-3">
        {section.children?.map((item) => (
          <AppButton key={item.name} item={item} />
        ))}
      </div>
    )
  }

  if (section.layout === 'custom' && section.name === "Front Office") {
    return (
      <div className="grid grid-cols-4 gap-3">
        {section.children?.map((item, index) => {
          let className = ""
          if (index === 0) className = "col-span-4" // Enterprise Portfolio
          else if (index >= 1 && index <= 4) className = "col-span-2" // CFE, Imbalance, BESS, VPPA
          else if (index >= 5 && index <= 8) className = "col-span-1" // Virtuals, PtP, FTR, Futures
          else if (index === 9) className = "col-span-4" // Market Insights
          else if (index === 10) className = "col-span-4" // Market Data

          return (
            <Link 
              key={item.name}
              to={item.href || '#'} 
              className={`text-center text-[#fcfcfc] bg-[#393843] hover:bg-gradient-to-r hover:from-[#5ee5d4] hover:to-[#f4f5ac] hover:text-[#121212] hover:font-bold rounded-md p-5 transition-all duration-200 flex items-center justify-center font-roboto ${className}`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    )
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-2 gap-3">
      {section.children?.map((item) => (
        <AppButton key={item.name} item={item} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#16181f]">
      <BaseHeader title="EQ Portal" />
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-4 auto-rows-auto gap-8">
          {appStructure.map((section) => (
            <div 
              key={section.name} 
              className={`p-6 pb-8 bg-[#21222a] rounded-xl ${section.span ? `col-span-${section.span}` : ''}`}
              style={{ minWidth: section.span === 2 ? '590px' : '280px' }}
            >
              <h2 className="text-[#fcfcfc] text-center pb-4 mb-4 font-pp-formula">{section.name}</h2>
              <SectionContent section={section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}