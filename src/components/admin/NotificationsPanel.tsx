import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../ui/MotionPresence';
import { Bell, BellOff, Clock3, FileWarning, WifiOff } from 'lucide-react';
import useVendors from '../../hooks/useVendors';
import { useAdminActivity } from '../../states/adminActivity';

/** Alerts worked out from the vendor data already loaded. */
const NotificationsPanel = () => {
  const { pending, failed, loading } = useVendors();
  const { readIds, markRead } = useAdminActivity();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const missing = pending.filter((v) => !v.aadharCardUrl).length;
  const items = [
    failed && { id: 'api-error', icon: WifiOff, title: 'Vendor data is unavailable', text: 'The API did not respond. Try refreshing the list.' },
    !loading && pending.length > 0 && {
      id: `pending-${pending.length}`,
      icon: Clock3,
      title: `${pending.length} ${pending.length === 1 ? 'vendor is' : 'vendors are'} waiting for verification`,
      text: 'Review their Aadhaar card and approve them.',
    },
    !loading && missing > 0 && {
      id: `missing-${missing}`,
      icon: FileWarning,
      title: `${missing} pending ${missing === 1 ? 'vendor has' : 'vendors have'} no Aadhaar card`,
      text: 'They cannot be checked until the document is uploaded.',
    },
  ].filter(Boolean) as { id: string; icon: typeof Bell; title: string; text: string }[];
  const unread = items.filter((i) => !readIds.includes(i.id));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="sm:relative">
      <button
        type="button"
        aria-label={`Notifications, ${unread.length} unread`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid h-10 w-10 place-items-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900"
      >
        <Bell size={20} />
        {unread.length > 0 && (
          <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">{unread.length}</span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute inset-x-4 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-lift sm:inset-x-auto sm:right-0 sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
              <p className="font-semibold text-ink-900">Notifications</p>
              {unread.length > 0 && (
                <button type="button" onClick={() => markRead(items.map((i) => i.id))} className="text-sm font-semibold text-brand-700 hover:text-brand-900">Mark all as read</button>
              )}
            </div>
            {items.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-8 text-center">
                <BellOff size={26} className="text-ink-400" />
                <p className="mt-3 font-semibold text-ink-900">{loading ? 'Checking for updates' : 'Nothing needs your attention'}</p>
              </div>
            ) : (
              <ul className="max-h-96 divide-y divide-ink-200 overflow-y-auto">
                {items.map(({ id, icon: Icon, title, text }) => {
                  const isUnread = !readIds.includes(id);
                  return (
                    <li key={id}>
                      <Link
                        to="/AdminPanel/VendorTable"
                        onClick={() => {
                          markRead([id]);
                          setOpen(false);
                        }}
                        className={`flex gap-4 px-5 py-4 transition hover:bg-ink-50 ${isUnread ? 'bg-brand-50/50' : ''}`}
                      >
                        <Icon size={20} className="mt-0.5 shrink-0 text-brand-600" />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink-900">{title}</span>
                          <span className="mt-0.5 block text-sm text-ink-500">{text}</span>
                        </span>
                        {isUnread && <span className="ml-auto mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600" aria-label="Unread" role="img" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPanel;
