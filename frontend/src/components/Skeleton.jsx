export function Skeleton({ className = '' }) {
  return <span className={`skeleton ${className}`.trim()} aria-hidden="true" />
}

export function SkeletonText({ className = '' }) {
  return <Skeleton className={`skeleton-text ${className}`.trim()} />
}

export function SkeletonRegion({ label = 'Memuat konten', children, className = '' }) {
  return <section className={`skeleton-region ${className}`.trim()} aria-busy="true" aria-label={label}>{children}</section>
}

export function StatsSkeleton({ count = 4 }) {
  return <SkeletonRegion className="stats-grid" label="Memuat ringkasan statistik">
    {Array.from({ length: count }, (_, index) => <div className="stat-card card skeleton-card" key={index}><Skeleton className="skeleton-icon" /><SkeletonText className="skeleton-short" /><Skeleton className="skeleton-value" /><SkeletonText className="skeleton-medium" /></div>)}
  </SkeletonRegion>
}

export function ListSkeleton({ count = 4, className = '' }) {
  return <SkeletonRegion className={`skeleton-list ${className}`.trim()} label="Memuat daftar">
    {Array.from({ length: count }, (_, index) => <div className="skeleton-row" key={index}><Skeleton className="skeleton-avatar" /><div className="skeleton-row-copy"><SkeletonText /><SkeletonText className="skeleton-medium" /></div><Skeleton className="skeleton-chip" /></div>)}
  </SkeletonRegion>
}

export function TableSkeleton({ count = 5 }) {
  return <SkeletonRegion className="skeleton-table" label="Memuat tabel">
    {Array.from({ length: count }, (_, index) => <div className="skeleton-table-row" key={index}><div className="skeleton-row-copy"><SkeletonText /><SkeletonText className="skeleton-short" /></div><SkeletonText className="skeleton-medium" /><SkeletonText className="skeleton-medium" /><Skeleton className="skeleton-chip" /></div>)}
  </SkeletonRegion>
}

export function PetPageSkeleton() {
  return <SkeletonRegion className="pet-progress-layout skeleton-pet-layout" label="Memuat data companion">
    <div className="pet-profile-column"><div className="card pet-profile-card skeleton-card"><Skeleton className="skeleton-pet-art" /></div><div className="pet-profile-caption"><SkeletonText className="skeleton-heading" /><SkeletonText className="skeleton-medium" /></div></div>
    <div className="card skeleton-card skeleton-pet-stats"><SkeletonText className="skeleton-heading" /><SkeletonText /><Skeleton className="skeleton-progress" /><SkeletonText className="skeleton-medium" /><div className="skeleton-stat-pair"><Skeleton className="skeleton-icon" /><div><SkeletonText /><SkeletonText className="skeleton-medium" /></div></div></div>
  </SkeletonRegion>
}
