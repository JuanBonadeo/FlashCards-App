export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-300 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
