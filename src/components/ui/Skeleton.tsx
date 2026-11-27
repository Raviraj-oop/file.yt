import React from 'react';

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-lg bg-ink-100 ${className}`} aria-hidden="true">
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
  </div>
);

/** Shown while a page's code is loading. */
export const PageSkeleton = () => (
  <div className="page min-h-[80vh] py-20" role="status" aria-label="Loading page">
    <Skeleton className="h-12 w-3/4 max-w-xl" />
    <Skeleton className="mt-6 h-5 w-full max-w-lg" />
    <Skeleton className="mt-3 h-5 w-2/3 max-w-md" />
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-56 rounded-2xl" />
      ))}
    </div>
  </div>
);
