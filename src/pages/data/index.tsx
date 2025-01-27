import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableRow } from "../../components/ui/table"
import AppLayout from '../../components/layout/AppLayout'
import { dataMenuConfig } from '../../config/menuConfig'

const sections = [
  { 
    name: 'Metadata', 
    description: 'Manage core metadata including venues, QSEs, portfolios, and assets', 
    link: '/data/metadata/venues' 
  },
  { 
    name: 'Data Mart', 
    description: 'Access and manage data mart services', 
    link: '/data/datamart/overview' 
  }
]

export default function DataPage() {
  return (
    <AppLayout title="Data" menuConfig={dataMenuConfig}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-[#fcfcfc]">Data Management</h1>
        <div className="bg-[#21212a] rounded-xl p-6">
          <Table>
            <TableBody>
              {sections.map((section) => (
                <TableRow 
                  key={section.name} 
                  className="border-b-0 hover:bg-transparent [&_td]:border-b-0 [&_td]:border-[#3f3f4d]"
                >
                  <TableCell className="font-medium w-1/3 pl-0">
                    <Link 
                      to={section.link} 
                      className="block w-full text-center text-[#fcfcfc] bg-[#2a2b36] hover:bg-[#3f3f4d] hover:text-[#ecde65] hover:border-b hover:border-[#ecde65] py-4 px-6 rounded-lg transition-colors duration-200 font-medium"
                    >
                      {section.name}
                    </Link>
                  </TableCell>
                  <TableCell className="w-2/3 text-[#fcfcfc]">
                    {section.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}