import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableRow } from "../../components/ui/table"
import AppLayout from '../../components/layout/AppLayout'
import { virtualsMenuConfig } from '../../config/menuConfig'

const sections = [
  { name: 'Live Ops', description: 'For managing the Live Operations', link: '/virtuals/liveops/overview' },
  { name: 'Shadow Mode', description: 'For running your strategies in shadow mode, to emulate live operations but without sending real bids/offers to the ISO', link: '/virtuals/shadow/overview' },
  { name: 'Simulation', description: 'For running backtests, forward-projections, and "what if" scenarios', link: '/virtuals/sim/overview' },
  { name: 'Strategy Dev', description: 'For developing and optimizing strategies', link: '/virtuals/stratdev/overview' }
]

const VirtualsPage: React.FC = () => {
  return (
    <AppLayout title="Virtuals Cockpit" menuConfig={virtualsMenuConfig}>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#21222a] shadow-md rounded-lg p-6 [&_tr:hover]:bg-transparent">
          <Table>
            <TableBody>
              {sections.map((section) => (
                <TableRow key={section.name} className="border-b-0 hover:bg-transparent">
                  <TableCell className="font-medium w-1/3 pl-0">
                    <Link 
                      to={section.link} 
                      className="block w-full text-center text-[#fcfcfc] bg-[#2a2b36] hover:bg-[#3f3f4d] hover:text-[#ecde65] hover:border-b hover:border-[#ecde65] py-4 px-6 rounded-lg transition-colors duration-200 font-medium font-pp-formula"
                    >
                      {section.name}
                    </Link>
                  </TableCell>
                  <TableCell className="w-2/3 text-[#fcfcfc]">{section.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}

export default VirtualsPage