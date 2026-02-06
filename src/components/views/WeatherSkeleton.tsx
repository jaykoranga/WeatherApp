const WeatherSkeleton = () => {
  return (
    <div className="rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/50 animate-pulse">
      
      {/* Title */}
      <div className="h-6 w-40 mx-auto mb-4 rounded bg-gray-300 dark:bg-gray-600"></div>

      {/* Main card */}
      <div className="flex justify-around items-center mb-4">
        <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex flex-col gap-2">
          <div className="h-8 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-lg bg-gray-300 dark:bg-gray-600"
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherSkeleton
