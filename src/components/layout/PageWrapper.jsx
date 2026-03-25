// import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
// import Navbar from './Navbar'

// export default function PageWrapper() {
//   return (
//     <div className="flex h-screen bg-slate-800 text-white overflow-hidden">
//       <Sidebar />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function PageWrapper() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f1f5f9',
      overflow: 'hidden',
    }}>
      <Sidebar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
      }}>
        <Navbar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px',
          backgroundColor: '#f1f5f9',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
