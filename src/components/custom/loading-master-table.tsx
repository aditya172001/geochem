export function LoadingMasterTable() {
  return (
    <div className="w-full h-full grid">
      <div className="flex items-center justify-between mx-8 my-4">
        <div className="w-96 rounded-md h-9 bg-gray-100 animate-pulse" />
        <div className="w-28 rounded-md h-9 bg-emerald-400 animate-pulse" />
      </div>
      <div className="bg-gray-100 max-w-full mx-8 my-2 h-9 rounded-md animate-pulse" />
      <div className="bg-gray-100 max-w-full mx-8 my-2 h-9 rounded-md animate-pulse" />
      <div className="bg-gray-100 max-w-full mx-8 my-2 h-9 rounded-md animate-pulse" />
      <div className="bg-gray-100 max-w-full mx-8 my-2 h-9 rounded-md animate-pulse" />
      <div className="flex items-center justify-end mx-8 my-4 space-x-2">
        <div className="w-20 rounded-md h-8 bg-gray-100 animate-pulse" />
        <div className="w-20 rounded-md h-8 bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}
