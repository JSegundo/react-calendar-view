const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex space-x-2 items-center mb-2 animate-pulse">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-full">
          <p className="h-4 w-full bg-gray-200 rounded"></p>
        </div>
      </div>

      <div className="flex space-x-2 items-center mb-2 animate-pulse">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-full">
          <p className="h-4 w-full bg-gray-200 rounded"></p>
        </div>
      </div>

      <div className="flex space-x-2 items-center mb-2 animate-pulse">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-full">
          <p className="h-4 w-full bg-gray-200 rounded"></p>
        </div>
      </div>

      <div className="flex space-x-2 items-center mb-2 animate-pulse">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-full">
          <p className="h-4 w-full bg-gray-200 rounded"></p>
        </div>
      </div>
    </>
  )
}

export default LoadingSkeleton
