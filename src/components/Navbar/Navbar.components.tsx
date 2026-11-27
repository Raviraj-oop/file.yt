import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../ui/MotionPresence';
import { Menu, X } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import Button from '../ui/Button';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/Services', label: 'Services' },
  { to: '/Products', label: 'Product' },
  { to: '/Gallery', label: 'Gallery' },
  { to: '/AboutUs', label: 'About Us' },
];

/* Pages that open with a dark hero. The header blends into it until the page scrolls. */
const darkHeroPages = ['/', '/clients', '/aboutus', '/contactus', '/gallery', '/privacypolicy', '/termsconditions'];

const linkClass = (dark: boolean) => ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition duration-200 ${
    dark
      ? isActive ? 'bg-white/[.12] text-white ring-1 ring-inset ring-white/15' : 'text-slate-300 hover:bg-white/10 hover:text-white'
      : isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
  }`;

const Navbar = () => {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMobileOpen(false), [pathname, hash]);
  const isHome = pathname === '/';
  const overDark = darkHeroPages.includes(pathname.toLowerCase().replace(/(.)\/$/, '$1'));
  const dark = overDark && !scrolled && !mobileOpen;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${overDark && !isHome ? '-mb-14' : ''} ${
        dark
          ? `border-white/10 ${isHome ? 'bg-[#0b1024]' : 'bg-transparent'}`
          : scrolled || mobileOpen
            ? 'border-ink-200/80 bg-white/85 shadow-[0_8px_30px_-12px_rgba(14,19,41,.18)] backdrop-blur-xl'
            : 'border-ink-200/70 bg-white'
      }`}
    >
      <nav className="page flex h-14 items-center justify-between gap-6" aria-label="Main">
        <Link to="/" aria-label="VIPRACUBE TECH home" className="shrink-0">
          <BrandLogo light={dark} compact />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {menuItems.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to !== '/Services'} className={linkClass(dark)}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:block">
          <Button to="/ContactUs" variant={dark ? 'light' : 'primary'}>Contact us</Button>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className={`-mr-1 grid h-11 w-11 place-items-center rounded-full transition lg:hidden ${dark ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-ink-100'}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <motion.div className="scroll-progress absolute inset-x-0 bottom-[-1px] h-0.5" style={{ scaleX: progress }} aria-hidden="true" />
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="page mobile-navigation overflow-y-auto overscroll-contain pb-6 pt-2">
              <div className="mb-5">
                {menuItems.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to !== '/Services'}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-3 text-lg font-semibold transition-colors duration-200 ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-900 hover:bg-ink-50'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
              <Button to="/ContactUs" size="lg" className="w-full">
                Contact us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
