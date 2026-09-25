import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo + tagline — spans 2 cols on lg */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <span className="text-white font-black text-sm font-display">DL</span>
            </div>
            <span className="font-display font-bold text-white text-[15px] tracking-tight">
              DocLink Technologies
            </span>
          </Link>
          <p className="text-[13.5px] leading-relaxed mb-6 max-w-[240px]">
            Business software that replaces the paper trail — built in Sri Lanka, deployed across the region.
          </p>
          <div className="flex gap-2.5">
            {[
              { label: '𝕏', href: '#' },
              { label: 'in', href: '#' },
              { label: 'fb', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1D4ED8] flex items-center justify-center text-[11px] font-bold text-slate-400 hover:text-white transition-all"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-5">Products</h5>
          <ul className="space-y-3">
            {[
              { label: 'ERP System', to: '/products#erp' },
              { label: 'POS System', to: '/products#pos' },
              { label: 'Doctor App', to: '/products#doctor' },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-[13.5px] hover:text-white transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-5">Services</h5>
          <ul className="space-y-3">
            {[
              { label: 'Software Development', to: '/services/software' },
              { label: 'Web Development', to: '/services/web' },
              { label: 'Mobile App Development', to: '/services/mobile' },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-[13.5px] hover:text-white transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Contact */}
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-5">Company</h5>
          <ul className="space-y-3 mb-7">
            <li><Link to="/case-studies" className="text-[13.5px] hover:text-white transition-colors">Case Studies</Link></li>
            <li><Link to="/about" className="text-[13.5px] hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-[13.5px] hover:text-white transition-colors">Contact</Link></li>
          </ul>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-4">Contact</h5>
          <ul className="space-y-2.5">
            <li>
              <a href="mailto:hello@doclink.lk" className="text-[13px] hover:text-white transition-colors flex items-center gap-2">
                <span className="text-slate-600">→</span> hello@doclink.lk
              </a>
            </li>
            <li>
              <a href="tel:+94112345678" className="text-[13px] hover:text-white transition-colors flex items-center gap-2">
                <span className="text-slate-600">→</span> +94 11 234 5678
              </a>
            </li>
            <li className="text-[13px] leading-relaxed flex items-start gap-2">
              <span className="text-slate-600 mt-0.5">→</span>
              <span>42 Bauddhaloka Mawatha,<br/>Colombo 07, Sri Lanka</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-slate-600">
          <span>© {new Date().getFullYear()} DocLink Technologies (Pvt) Ltd. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
