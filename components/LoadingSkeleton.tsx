export const LoadingBox = () => {
  return (
    <li className="border border-gray-800 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col justify-center items-center">
        <div className="rounded-lg bg-gray-700 h-64 w-full"></div>
        <div className="mt-6 flex-1 space-y-6 py-1 w-full">
          <div className="h-2 bg-gray-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-700 rounded col-span-2"></div>
              <div className="h-2 bg-gray-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const LoadingBoxArray = () => {
  return (
    <>
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
    </>
  );
};
export const LoadingSkeleton = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <LoadingBoxArray />
    </ul>
  );
};

export const LoadingSkeletonRight = () => {
  return (
    <div className="animate-pulse flex flex-col justify-start items-start">
      <div className="mt-6 flex-1 space-y-6 py-2 w-1/2">
        <div className="h-6 bg-gradient-to-r from-gray-700 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-6 bg-gradient-to-r from-gray-700 rounded col-span-2"></div>
            <div className="h-6 bg-gray-700bg-gray-700 rounded col-span-1"></div>
          </div>
          <div className="h-6 bg-gray-700bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const LoadingSkeletonBottom = () => {
  return (
    <div className="animate-pulse flex flex-col justify-start items-start">
      <div className="mt-6 flex-1 space-y-3 w-full">
        <div className="h-2 bg-gradient-to from-gray-700 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-gray-700 rounded col-span-2"></div>
            <div className="h-2 bg-gray-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
