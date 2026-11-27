import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../ui/MotionPresence';
import { ChevronRight, ExternalLink, LayoutDashboard, LogOut, LucideIcon, Menu, PanelLeftClose, PanelLeftOpen, Store, Users, X } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import AdminPanelCards from '../../Application/AdminPanel/AdminPanelCards';
import { endAdminSession, hasAdminSession } from '../../auth/adminSession';
import useVendors from '../../hooks/useVendors';
import { useAdminActivity } from '../../states/adminActivity';
import { Skeleton } from '../ui/Skeleton';
import NotificationsPanel from './NotificationsPanel';

const sectionIcons: Record<string, LucideIcon> = { Vendor: Store, Customer: Users };

/* The sidebar follows AdminPanelCards, so a section hidden there stays hidden here. */
const navItems = [
  { to: '/AdminPanel', label: 'Dashboard', icon: LayoutDashboard, end: true },
  ...AdminPanelCards.map((c) => ({
    to: `/AdminPanel/${c.title}Table`,
    label: `${c.title}s`,
    icon: sectionIcons[c.title] || LayoutDashboard,
    end: false,
  })),
];

const titles: Record<string, string> = {
  '/adminpanel': 'Dashboard',
  '/adminpanel/vendortable': 'Vendors',
  '/adminpanel/customertable': 'Customer refunds',
};

const focusOnDark = 'focus-visible:ring-brand-300 focus-visible:ring-offset-ink-950';

interface SidebarProps {
  collapsed?: boolean;
  onLogOut: () => void;
  onNavigate?: () => void;
}

const SidebarContent = ({ collapsed, onLogOut, onNavigate }: SidebarProps) => {
  const { pending, failed } = useVendors();
  const waiting = failed ? 0 : pending.length;
  const item = `group flex h-11 items-center gap-3 rounded-xl px-3.5 text-[15px] font-medium transition-colors duration-200 ${focusOnDark}`;
  const quiet = 'text-slate-300 hover:bg-white/[.06] hover:text-white';
  const label = collapsed ? 'sr-only' : 'truncate';
  return (
    <>
      <nav aria-label="Admin" className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-5">
        {navItems.map(({ to, label: text, icon: Icon, end }) => {
          const badge = to === '/AdminPanel/VendorTable' && waiting > 0;
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              title={collapsed ? text : undefined}
              className={({ isActive }) => `${item} relative ${isActive ? 'text-white' : quiet}`}
            >
              {({ isActive }) => (
                <>
                  {/* Not animated in the mobile menu: a moving highlight stopped the closing menu from being removed. */}
                  {isActive && onNavigate && <span className="admin-nav-active absolute inset-0 rounded-xl" />}
                  {isActive && !onNavigate && (
                    <motion.span layoutId="nav-desktop" className="admin-nav-active absolute inset-0 rounded-xl" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                  )}
                  <span className="relative shrink-0">
                    <Icon size={19} strokeWidth={isActive ? 2.25 : 1.9} className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#a9ebee]' : ''}`} />
                    {badge && collapsed && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#eb6834]" />}
                  </span>
                  <span className={`relative ${label}`}>{text}</span>
                  {badge && (
                    <span className={collapsed ? 'sr-only' : 'relative ml-auto rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-white'}>
                      {waiting}
                      <span className="sr-only"> pending</span>
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link to="/" title={collapsed ? 'View website' : undefined} className={`${item} ${quiet}`}>
          <ExternalLink size={19} strokeWidth={1.9} className="shrink-0" />
          <span className={label}>View website</span>
        </Link>
        <button type="button" onClick={onLogOut} title={collapsed ? 'Log out' : undefined} className={`${item} w-full text-slate-300 hover:bg-rose-500/15 hover:text-rose-200`}>
          <LogOut size={19} strokeWidth={1.9} className="shrink-0" />
          <span className={label}>Log Out</span>
        </button>
      </div>
    </>
  );
};

const AdminLayout = ({ onLogOut }: { onLogOut: () => void }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { clear } = useAdminActivity();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const title = titles[pathname.toLowerCase().replace(/\/$/, '')] || 'Admin panel';

  useEffect(() => {
    document.title = `${title} | Vipracube Admin`;
    setDrawer(false);
  }, [title]);

  /* While the mobile menu is open: Escape closes it, the page behind stays still, and it closes if the window grows. */
  useEffect(() => {
    if (!drawer) return;
    const menu = menuButton.current;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawer(false);
    };
    const onResize = () => {
      if (desktop.matches) setDrawer(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
      menu?.focus();
    };
  }, [drawer]);

  if (!hasAdminSession()) return <Navigate to="/LogIn" replace />;

  const logOut = () => {
    endAdminSession();
    clear();
    onLogOut();
    navigate('/LogIn');
  };

  return (
    <div className="admin-shell flex min-h-screen bg-ink-50">
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: 'spring', stiffness: 360, damping: 36 }}
        className="admin-sidebar sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden lg:flex"
      >
        <div className="flex h-[72px] shrink-0 items-center overflow-hidden border-b border-white/10 px-5">
          <span className={`block overflow-hidden transition-all ${collapsed ? 'w-8' : 'w-full'}`}>
            <BrandLogo light />
          </span>
        </div>
        <SidebarContent collapsed={collapsed} onLogOut={logOut} />
      </motion.aside>

      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
            <motion.div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside
              className="admin-sidebar absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col shadow-lift"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            >
              <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
                <BrandLogo light />
                <button ref={closeButton} type="button" aria-label="Close menu" onClick={() => setDrawer(false)} className={`-mr-2 grid h-11 w-11 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white ${focusOnDark}`}><X size={20} /></button>
              </div>
              <SidebarContent onLogOut={logOut} onNavigate={() => setDrawer(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-[72px] items-center gap-3 border-b border-ink-200/80 bg-white/85 px-4 backdrop-blur-xl sm:px-8">
          <button ref={menuButton} type="button" aria-label="Open menu" onClick={() => setDrawer(true)} className="-ml-2 grid h-11 w-11 place-items-center rounded-xl text-ink-700 transition hover:bg-ink-100 lg:hidden"><Menu size={22} /></button>
          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((v) => !v)}
            className="-ml-2 hidden h-10 w-10 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 lg:grid"
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
          <span className="hidden h-6 w-px bg-ink-200 lg:block" aria-hidden="true" />
          <p className="flex min-w-0 items-center gap-2 text-[15px]">
            <span className="hidden whitespace-nowrap text-ink-500 sm:inline">Admin panel</span>
            <ChevronRight size={15} className="hidden shrink-0 text-ink-400 sm:block" aria-hidden="true" />
            <span className="truncate font-semibold text-ink-900">{title}</span>
          </p>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <NotificationsPanel />
            <span className="hidden h-6 w-px bg-ink-200 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-3" role="img" aria-label="Signed in as admin">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2f6bea] to-[#7a1ff0] text-sm font-bold text-white">A</span>
              <span className="hidden text-sm leading-tight md:block">
                <span className="block font-semibold text-ink-900">Admin</span>
                <span className="block text-ink-500">Vipracube</span>
              </span>
            </div>
          </div>
        </header>
        <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-5 sm:px-8 sm:py-8">
          <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;
