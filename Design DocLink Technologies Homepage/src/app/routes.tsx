import { createBrowserRouter, Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductERP from '../pages/ProductERP'
import ProductPOS from '../pages/ProductPOS'
import ProductDoctor from '../pages/ProductDoctor'
import CaseStudies from '../pages/CaseStudies'
import CaseStudyDetail from '../pages/CaseStudyDetail'
import Services from '../pages/Services'
import ServiceWeb from '../pages/ServiceWeb'
import ServiceSoftware from '../pages/ServiceSoftware'
import ServiceMobile from '../pages/ServiceMobile'
import About from '../pages/About'
import Contact from '../pages/Contact'

function Root() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'products/erp', Component: ProductERP },
      { path: 'products/pos', Component: ProductPOS },
      { path: 'products/doctor', Component: ProductDoctor },
      { path: 'case-studies', Component: CaseStudies },
      { path: 'case-studies/:id', Component: CaseStudyDetail },
      { path: 'services', Component: Services },
      { path: 'services/web', Component: ServiceWeb },
      { path: 'services/software', Component: ServiceSoftware },
      { path: 'services/mobile', Component: ServiceMobile },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
])
