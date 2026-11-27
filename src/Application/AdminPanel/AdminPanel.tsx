import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../../components/ui/MotionPresence';
import { AlertTriangle, ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, Clock3, CloudOff, FileCheck2, History, LucideIcon, RefreshCw, RotateCcw, ShieldX, Store, Users } from 'lucide-react';
import AdminPanelCards from './AdminPanelCards';
import { MeterChart, SegmentedBar } from '../../components/admin/Charts';
import StatCard, { StatTone } from '../../components/admin/StatCard';
import Button from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import useVendors, { Vendor, vendorName } from '../../hooks/useVendors';
import { ActivityTone, useAdminActivity } from '../../states/adminActivity';

const tones: Record<ActivityTone, { icon: LucideIcon; cls: string }> = {
  sync: { icon: RotateCcw, cls: 'bg-brand-50 text-brand-700' },
  verified: { icon: BadgeCheck, cls: 'bg-emerald-50 text-emerald-700' },
  unverified: { icon: ShieldX, cls: 'bg-amber-50 text-amber-700' },
  error: { icon: AlertTriangle, cls: 'bg-rose-50 text-rose-700' },
};
const sectionIcons: Record<string, LucideIcon> = { Vendor: Store, Customer: Users };

const time = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const withCard = (list: Vendor[]) => list.filter((v) => v.aadharCardUrl).length;
const greeting = () => {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
};

const Panel = ({ title, hint, children, className = '' }: { title: string; hint?: string; children: React.ReactNode; className?: string }) => (
  <section className={`card min-w-0 p-4 ${className}`}>
    <h2 className="text-lg font-bold tracking-tight">{title}</h2>
    {hint && <p className="mt-1 text-sm text-ink-500">{hint}</p>}
    <div className="mt-6">{children}</div>
  </section>
);

const Blank = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <div className="flex flex-col items-center gap-3 rounded-xl bg-ink-50 px-6 py-9 text-center">
    <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink-500 shadow-soft"><Icon size={20} /></span>
    <p className="text-[15px] text-ink-600">{text}</p>
  </div>
);

const AdminPanel = () => {
  const navigate = useNavigate();
  const { verified, pending, loading, failed, lastSync, refresh } = useVendors();
  const { activities } = useAdminActivity();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const total = verified.length + pending.length;
  const docs = withCard(verified) + withCard(pending);
  const ready = !loading && !failed;
  const firstLoad = loading && total === 0;
  const percent = (n: number) => (total ? Math.round((n / total) * 100) : 0);
  const noData = <Blank icon={CloudOff} text="No data to show." />;

  const stats: { label: string; value: number; icon: LucideIcon; note: string; tone: StatTone; share: number }[] = [
    { label: 'Total vendors', value: total, icon: Store, note: 'Verified and pending', tone: 'total', share: total ? 100 : 0 },
    { label: 'Verified', value: verified.length, icon: BadgeCheck, note: total ? `${percent(verified.length)}% of all vendors` : 'No vendors yet', tone: 'verified', share: percent(verified.length) },
    { label: 'Pending', value: pending.length, icon: Clock3, note: 'Waiting for a decision', tone: 'pending', share: percent(pending.length) },
    { label: 'Aadhaar on file', value: docs, icon: FileCheck2, note: total ? `${total - docs} missing` : 'No vendors yet', tone: 'document', share: percent(docs) },
  ];

  let summary = 'There are no vendors to show yet.';
  if (failed) summary = 'Vendor data is not available right now.';
  else if (firstLoad) summary = 'Loading the latest vendor data.';
  else if (pending.length > 0) summary = `${pending.length} ${pending.length === 1 ? 'vendor is' : 'vendors are'} waiting for verification.`;
  else if (total > 0) summary = 'Every vendor has been reviewed.';

  let syncNote = 'Vendor verification at a glance';
  if (failed) syncNote = lastSync ? `Last updated at ${time(lastSync)}` : 'Not updated yet';
  else if (lastSync) syncNote = `Vendor data updated at ${time(lastSync)}`;

  return (
    <div className="mx-auto max-w-[1280px] space-y-5 sm:space-y-6">
      <section className="admin-hero relative isolate overflow-hidden rounded-3xl p-4 sm:p-5">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm text-slate-300">
              <CalendarDays size={16} className="shrink-0" aria-hidden="true" />
              {new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-4xl">{greeting()}, Admin</h1>
            <p className="mt-2.5 text-base text-slate-200 sm:text-lg">{summary}</p>
            <p className="mt-4 flex items-center gap-2.5 text-sm text-slate-300">
              <span className={`h-2 w-2 shrink-0 rounded-full ${failed ? 'bg-rose-400' : loading ? 'bg-amber-300' : 'bg-emerald-400'}`} aria-hidden="true" />
              {syncNote}
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <Button variant="outlineLight" onClick={() => refresh()} disabled={loading} className="flex-1 whitespace-nowrap focus-visible:ring-offset-ink-950 sm:flex-none">
              <RefreshCw size={17} className={loading ? 'animate-spin' : ''} /> Refresh
            </Button>
            <Button variant="light" to="/AdminPanel/VendorTable" className="flex-1 whitespace-nowrap focus-visible:ring-offset-ink-950 sm:flex-none">
              Review vendors <ArrowRight size={17} className="hidden shrink-0 transition-transform min-[420px]:block group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </section>

      {failed && (
        <div role="alert" className="flex flex-wrap items-center gap-4 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900">
          <AlertTriangle size={20} className="shrink-0" />
          <p className="min-w-0 flex-1 font-medium">Vendor data could not be loaded. The API did not respond.</p>
          <Button variant="secondary" size="sm" onClick={() => refresh()}>Try again</Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} loading={firstLoad} failed={failed} ready={ready} />
        ))}
      </div>

      <div className="grid gap-5 sm:gap-6 xl:grid-cols-2">
        <Panel title="Verification status" hint="Select a group to open its list">
          {firstLoad ? <Skeleton className="h-36" /> : failed ? noData : (
            <SegmentedBar
              parts={[
                { key: 'verified', label: 'Verified', value: verified.length },
                { key: 'pending', label: 'Pending', value: pending.length },
              ]}
              onSelect={(key) => navigate(`/AdminPanel/VendorTable?list=${key}`)}
            />
          )}
        </Panel>
        <Panel title="Aadhaar card on file" hint="Share of each group with a document uploaded">
          {firstLoad ? <Skeleton className="h-36" /> : failed ? noData : (
            <MeterChart
              unit="on file"
              rows={[
                { key: 'verified', label: 'Verified', value: withCard(verified), total: verified.length },
                { key: 'pending', label: 'Pending', value: withCard(pending), total: pending.length },
              ]}
            />
          )}
        </Panel>
      </div>

      <div className="grid gap-5 sm:gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="card min-w-0 overflow-hidden">
          <div className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
              <h2 className="text-lg font-bold tracking-tight">Waiting for verification</h2>
              {ready && pending.length > 0 && <p className="mt-1 text-sm text-ink-500">Showing {Math.min(5, pending.length)} of {pending.length}</p>}
            </div>
            <Link to="/AdminPanel/VendorTable" className="group inline-flex shrink-0 items-center gap-1 rounded text-sm font-semibold leading-7 text-brand-700 transition hover:text-brand-900">
              View all <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          {firstLoad ? (
            <div className="space-y-3 px-5 pb-6 sm:px-6">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-14" />)}</div>
          ) : pending.length === 0 || failed ? (
            <div className="px-5 pb-6 sm:px-6">{failed ? noData : <Blank icon={CheckCircle2} text="Every vendor has been reviewed." />}</div>
          ) : (
            <ul className="divide-y divide-ink-200/70 border-t border-ink-200/70">
              {pending.slice(0, 5).map((v) => (
                <li key={v.vendorId} className="flex items-center gap-3 px-5 py-4 transition-colors sm:gap-4 duration-200 hover:bg-ink-50 sm:px-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-50 to-brand-200 text-sm font-bold text-brand-800">{vendorName(v).charAt(0).toUpperCase()}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink-900">{vendorName(v)}</p>
                    <p className="text-sm tabular-nums text-ink-500">ID {v.vendorId}</p>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${v.aadharCardUrl ? 'bg-emerald-50 text-emerald-800 ring-emerald-600/20' : 'bg-amber-50 text-amber-800 ring-amber-600/25'}`}>
                    {v.aadharCardUrl ? <FileCheck2 size={13} className="hidden sm:block" aria-hidden="true" /> : <AlertTriangle size={13} className="hidden sm:block" aria-hidden="true" />}
                    {v.aadharCardUrl ? 'Ready to review' : 'No Aadhaar'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
          <Panel title="Recent activity" hint="This session" className="flex-1">
            {activities.length === 0 ? (
              <Blank icon={History} text="Actions you take will appear here." />
            ) : (
              <ul>
                <AnimatePresence initial={false}>
                  {activities.slice(0, 6).map((a, i, list) => {
                    const { icon: Icon, cls } = tones[a.tone];
                    return (
                      <motion.li key={a.id} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="relative flex gap-4 pb-5 last:pb-0">
                        {i < list.length - 1 && <span className="absolute bottom-0 left-[18px] top-9 w-px bg-ink-200" aria-hidden="true" />}
                        <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full ${cls}`}><Icon size={17} /></span>
                        <div className="min-w-0">
                          <p className="text-[15px] font-medium leading-snug text-ink-900">{a.text}</p>
                          <p className="mt-0.5 text-sm tabular-nums text-ink-500">{time(a.at)}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </Panel>

          {AdminPanelCards.map((c) => {
            const Icon = sectionIcons[c.title] || Store;
            return (
              <Link key={c.title} to={`/AdminPanel/${c.title}Table`} className="card card-hover group flex items-start gap-4 bg-gradient-to-br from-brand-50 via-white to-white p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#635ff2] to-[#4036c9] text-white shadow-soft"><Icon size={20} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold tracking-tight">{c.title}</h2>
                    <ArrowRight size={19} className="shrink-0 text-ink-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                  </div>
                  <p className="mt-1.5 text-[15px] text-ink-600">{c.content}</p>
                  <p className="mt-1.5 text-sm text-ink-500">{c.subContent}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
