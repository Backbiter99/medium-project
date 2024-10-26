export const BlogSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <div role="status" className="max-w-2xl animate-pulse mx-auto">
        <div className="h-4 bg-gray-200 rounded-full w-64 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[720px] mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[660px] mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[600px] mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[720px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
