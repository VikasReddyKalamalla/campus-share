export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative" style={{ backgroundColor: 'var(--theme-bg)' }}>
      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-blue-600/10 blur-[120px] -translate-y-1/4" />
      </div>
      {/* Width is controlled per-page via a wrapper div */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  )
}
