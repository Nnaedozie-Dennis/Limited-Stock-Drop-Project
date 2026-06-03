interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-3xl border p-12 text-center">
      <h3 className="text-2xl font-semibold">{title}</h3>

      <p className="mt-3 text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
