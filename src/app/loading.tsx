export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-200 animate-pulse" />
            <div className="space-y-1.5">
              <div className="w-20 h-3 sm:w-24 sm:h-4 rounded bg-slate-200 animate-pulse" />
              <div className="w-28 h-2 sm:w-32 sm:h-2.5 rounded bg-slate-100 animate-pulse" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-16 h-3 rounded bg-slate-200 animate-pulse" />
            ))}
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-200 animate-pulse md:hidden" />
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="w-24 h-5 sm:w-28 sm:h-6 rounded-full bg-slate-700 animate-pulse mb-4" />
            <div className="w-64 h-7 sm:w-80 sm:h-9 md:w-96 md:h-11 rounded-lg bg-slate-700 animate-pulse mb-3" />
            <div className="w-full h-4 sm:h-5 rounded bg-slate-700 animate-pulse mb-2" />
            <div className="w-3/4 h-4 sm:h-5 rounded bg-slate-700 animate-pulse mb-6" />
            <div className="flex gap-3">
              <div className="w-32 h-11 sm:w-36 sm:h-12 rounded-full bg-orange-500/20 animate-pulse" />
              <div className="w-32 h-11 sm:w-36 sm:h-12 rounded-full bg-slate-700 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-40 h-6 sm:w-48 sm:h-7 rounded bg-slate-200 animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
                <div className="aspect-square bg-slate-200 animate-pulse" />
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div className="w-20 h-4 rounded bg-slate-200 animate-pulse" />
                  <div className="w-full h-5 rounded bg-slate-200 animate-pulse" />
                  <div className="w-3/4 h-3 rounded bg-slate-100 animate-pulse" />
                  <div className="w-1/2 h-3 rounded bg-slate-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-slate-900 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2.5">
                <div className="w-16 h-4 rounded bg-slate-800 animate-pulse" />
                <div className="w-24 h-3 rounded bg-slate-800 animate-pulse" />
                <div className="w-20 h-3 rounded bg-slate-800 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-6">
            <div className="w-48 h-3 rounded bg-slate-800 animate-pulse mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
