const ProductSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="h-72 animate-pulse bg-gray-200 dark:bg-slate-700" />

      <div className="p-6">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

        <div className="mt-6 flex items-center justify-between">
          <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

          <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;