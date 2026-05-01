// Next.js Suspense loading UI — shown instantly during route transitions
// This replaces the blank white flash between page navigations
export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-white/[0.04]" />
        <div className="h-7 w-48 rounded-lg bg-white/[0.05]" />
        <div className="h-3 w-64 rounded bg-white/[0.03]" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.05]" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-white/[0.04]" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 rounded-xl bg-white/[0.03] border border-white/[0.05]" />
          ))}
        </div>
      </div>
    </div>
  )
}
