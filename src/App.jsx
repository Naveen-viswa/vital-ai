// import { BrowserRouter } from 'react-router-dom'
// import AppRoutes from './routes/AppRoutes'


// import * as pdfjsLib from 'pdfjs-dist'

// // If using Vite / Next, adjust path as needed
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js'

// pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.js'


// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   )
// }

import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import * as pdfjsLib from 'pdfjs-dist'

// In Vite, use the .mjs file you copied to public
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

