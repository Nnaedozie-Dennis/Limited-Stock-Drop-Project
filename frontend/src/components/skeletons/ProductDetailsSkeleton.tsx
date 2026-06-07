const ProductDetailsSkeleton = () => {
  return (
    <div className="grid gap-10 lg:grid-cols-2 animate-pulse max-w-7xl mx-auto px-6 py-24">
      {/* Image */}
      <div className="h-125 rounded-3xl bg-gray-200 dark:bg-slate-700" />

      {/* Content */}
      <div>
        <div className="h-12 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />

        <div className="mt-6 h-8 w-40 rounded bg-gray-200 dark:bg-slate-700" />

        <div className="mt-8 space-y-3">
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-slate-700" />
        </div>

        <div className="mt-10 h-14 w-48 rounded-full bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;