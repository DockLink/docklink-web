import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

const productItems = [
  { icon: '📊', name: 'ERP System', benefit: 'Run every department from one screen', href: '/products/erp' },
  { icon: '🏪', name: 'POS System', benefit: 'Faster billing, smarter inventory', href: '/products/pos' },
  { icon: '🩺', name: 'Doctor App', benefit: 'Your practice in your pocket', href: '/products/doctor' },
]

const serviceItems = [
  { icon: '🌐', name: 'Web Development', benefit: 'Sites and apps that actually convert', flagship: false, href: '/services/web' },
  { icon: '⚙️', name: 'Software Development', benefit: 'Bespoke systems built around your workflow', flagship: true, href: '/services/software' },
  { icon: '📱', name: 'Mobile App Development', benefit: 'iOS & Android — one codebase', flagship: false, href: '/services/mobile' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md shadow-[0_1px_0_0_#E5E7EB]'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[62px] flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-auto lg:mr-0">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <span className="text-white font-black text-sm font-display tracking-tight">DL</span>
          </div>
          <span className="font-display font-bold text-slate-900 text-[15px] tracking-tight leading-none">
            DocLink<span className="text-[#1D4ED8]"> Technologies</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          <Link
            to="/"
            className={`px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors ${
              location.pathname === '/' ? 'text-[#1D4ED8] bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          {/* Products */}
          <div className="nav-item relative">
            <button className="flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
              Products
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white rounded-2xl shadow-xl border border-slate-100/80 p-4">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-1 mb-3">Products</p>
              <div className="space-y-1">
                {productItems.map((p) => (
                  <Link key={p.name} to={p.href} className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F5F8FF] transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">{p.icon}</div>
                    <div>
                      <div className="text-[13px] font-semibold text-slate-800 group-hover:text-[#1D4ED8] leading-tight">{p.name}</div>
                      <div className="text-[11.5px] text-slate-400 mt-0.5 leading-tight">{p.benefit}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <Link to="/products" className="text-[12px] font-semibold text-[#1D4ED8] hover:text-blue-800 flex items-center gap-1">
                  View all products →
                </Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="nav-item relative">
            <button className="flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
              Services
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white rounded-2xl shadow-xl border border-slate-100/80 p-4">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-1 mb-3">Services</p>
              <div className="space-y-1">
                {serviceItems.map((s) => (
                  <Link key={s.name} to={s.href} className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F5F8FF] transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-lg shrink-0">{s.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-slate-800 group-hover:text-[#1D4ED8] leading-tight">{s.name}</span>
                        {s.flagship && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#1D4ED8] text-white rounded-full leading-none">FLAGSHIP</span>
                        )}
                      </div>
                      <div className="text-[11.5px] text-slate-400 mt-0.5 leading-tight">{s.benefit}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/services" className={`px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors ${location.pathname.startsWith('/services') ? 'text-[#1D4ED8] bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Services</Link>
          <Link to="/case-studies" className={`px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors ${location.pathname.startsWith('/case-studies') ? 'text-[#1D4ED8] bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Case Studies</Link>
          <Link to="/about" className={`px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors ${location.pathname === '/about' ? 'text-[#1D4ED8] bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>About</Link>
          <Link to="/contact" className={`px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors ${location.pathname === '/contact' ? 'text-[#1D4ED8] bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Contact</Link>
        </div>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 gradient-brand text-white text-[13px] font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
        >
          Book a Consultation
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 space-y-1">
          <Link to="/" className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl">Home</Link>
          <Link to="/products" className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl">Products</Link>
          <Link to="/services" className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl">Services</Link>
          <Link to="/case-studies" className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl">Case Studies</Link>
          <Link to="/about" className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl">About</Link>
          <Link to="/contact" className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50 rounded-xl">Contact</Link>
          <div className="pt-3 border-t border-slate-100">
            <Link to="/contact" className="block text-center px-5 py-3 gradient-brand text-white text-[14px] font-semibold rounded-full">
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
