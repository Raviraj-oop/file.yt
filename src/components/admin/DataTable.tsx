import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, Inbox, RefreshCw, Search, WifiOff } from 'lucide-react';
import Button from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  /** Makes the column sortable. */
  sortValue?: (row: T) => string | number;
  align?: 'left' | 'right';
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  searchText: (row: T) => string;
  searchLabel: string;
  status: string | null;
  onRefresh: () => void;
  emptyText: string;
  /** Changes when a different list is shown, so search and page reset. */
  listKey: string;
}

const PAGE_SIZE = 10;

function DataTable<T>({ columns, rows, rowKey, searchText, searchLabel, status, onRefresh, emptyText, listKey }: Props<T>) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);

  useEffect(() => {
    setQuery('');
    setPage(0);
    setSort(null);
  }, [listKey]);
  useEffect(() => setPage(0), [query]);

  const loading = status === 'loading';
  const failed = (status || '').toLowerCase() === 'error';

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? rows.filter((r) => searchText(r).toLowerCase().includes(q)) : [...rows];
    const col = sort && columns.find((c) => c.key === sort.key);
    if (sort && col && col.sortValue) {
      const value = col.sortValue;
      list.sort((a, b) => {
        const x = value(a);
        const y = value(b);
        return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))) * sort.dir;
      });
    }
    return list;
  }, [rows, query, sort, columns, searchText]);

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const start = current * PAGE_SIZE;
  const shown = visible.slice(start, start + PAGE_SIZE);

  const toggleSort = (key: string) =>
    setSort((s) => (!s || s.key !== key ? { key, dir: 1 } : s.dir === 1 ? { key, dir: -1 } : null));

  const header = (c: Column<T>) => {
    if (!c.sortValue) return c.header;
    const dir = sort && sort.key === c.key ? sort.dir : 0;
    const Icon = dir === 1 ? ArrowUp : dir === -1 ? ArrowDown : ChevronsUpDown;
    return (
      <button type="button" onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1.5 rounded font-semibold transition hover:text-ink-900">
        {c.header} <Icon size={14} className={dir ? 'text-brand-600' : 'text-ink-400'} />
      </button>
    );
  };

  const message = (icon: React.ReactNode, text: string, action?: React.ReactNode) => (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-ink-50">{icon}</span>
      <p className="font-medium text-ink-700">{text}</p>
      {action}
    </div>
  );

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-ink-200 p-4">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label={searchLabel} placeholder={searchLabel} className="field !py-2.5 pl-10" />
        </div>
        <button type="button" onClick={onRefresh} disabled={loading} aria-label="Refresh" className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-300 text-ink-600 transition hover:bg-ink-50 hover:text-ink-900 disabled:opacity-50">
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && (
        <div className="space-y-2 p-4" role="status" aria-label="Loading">
          {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-12" />)}
        </div>
      )}
      {failed &&
        message(
          <WifiOff size={28} className="text-rose-600" />,
          'This list could not be loaded. The API did not respond.',
          <Button variant="secondary" size="sm" onClick={onRefresh}>Try again</Button>
        )}
      {!loading && !failed && shown.length === 0 && message(<Inbox size={28} className="text-ink-400" />, query ? `Nothing matches "${query}".` : emptyText)}

      {!loading && !failed && shown.length > 0 && (
        <>
          <div className="hidden overflow-x-auto md:block" role="region" aria-label="Table results" tabIndex={0}>
            <table className="w-full text-left text-[15px]">
              <thead className="border-b border-ink-200 text-sm text-ink-600">
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={sort && sort.key === c.key ? (sort.dir === 1 ? 'ascending' : 'descending') : undefined}
                      className={`whitespace-nowrap px-3 py-2 font-semibold ${c.align === 'right' ? 'text-right' : ''}`}
                    >
                      {header(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200/70">
                {shown.map((r, i) => (
                  <tr key={rowKey(r)} className="transition-colors duration-200 hover:bg-brand-50/40">
                    {columns.map((c) => (
                      <td key={c.key} className={`px-3 py-2.5 ${c.align === 'right' ? 'text-right tabular-nums' : ''}`}>{c.render(r, start + i)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="divide-y divide-ink-200/70 md:hidden">
            {shown.map((r, i) => (
              <li key={rowKey(r)} className="space-y-2 p-4">
                {columns.map((c) => (
                  <div key={c.key} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-3 text-[15px]">
                    <span className="shrink-0 text-sm text-ink-500">{c.header}</span>
                    <span className="min-w-0 break-words text-right">{c.render(r, start + i)}</span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-3 border-t border-ink-200 px-3 py-2 text-sm text-ink-500">
            <p className="tabular-nums">{start + 1}–{start + shown.length} of {visible.length}</p>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)} className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-700 transition hover:border-ink-300 hover:bg-ink-50 disabled:opacity-35"><ChevronLeft size={18} /></button>
              <button type="button" aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)} className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 bg-white text-ink-700 transition hover:border-ink-300 hover:bg-ink-50 disabled:opacity-35"><ChevronRight size={18} /></button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DataTable;
