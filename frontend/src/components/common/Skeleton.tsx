// const Skeleton = () => {
//   return (
//     <div className="animate-pulse rounded-3xl bg-gray-200 dark:bg-slate-700" />
//   );
// };

// export default Skeleton;

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-3xl bg-gray-200 dark:bg-slate-700 ${className}`}
    />
  );
};

export default Skeleton;