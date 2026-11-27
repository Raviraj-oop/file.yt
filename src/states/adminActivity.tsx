import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ActivityTone = 'sync' | 'verified' | 'unverified' | 'error';
export interface Activity {
  id: number;
  tone: ActivityTone;
  text: string;
  at: Date;
}

interface AdminActivityValue {
  activities: Activity[];
  log: (tone: ActivityTone, text: string) => void;
  readIds: string[];
  markRead: (ids: string[]) => void;
  clear: () => void;
}

const AdminActivityContext = createContext<AdminActivityValue>({
  activities: [],
  log: () => undefined,
  readIds: [],
  markRead: () => undefined,
  clear: () => undefined,
});

export const useAdminActivity = () => useContext(AdminActivityContext);

let nextId = 1;

/** Keeps what happened in this admin session, in memory only. Cleared on logout and page refresh. */
export const AdminActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  const log = useCallback((tone: ActivityTone, text: string) => {
    setActivities((list) => {
      // Repeated refreshes with the same result update the time instead of adding a row.
      const rest = list[0] && list[0].text === text ? list.slice(1) : list;
      return [{ id: nextId++, tone, text, at: new Date() }, ...rest].slice(0, 30);
    });
  }, []);
  const markRead = useCallback((ids: string[]) => setReadIds((prev) => Array.from(new Set([...prev, ...ids]))), []);
  const clear = useCallback(() => {
    setActivities([]);
    setReadIds([]);
  }, []);

  const value = useMemo(() => ({ activities, log, readIds, markRead, clear }), [activities, log, readIds, markRead, clear]);
  return <AdminActivityContext.Provider value={value}>{children}</AdminActivityContext.Provider>;
};
