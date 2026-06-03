import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-black">404</h1>

      <h2 className="mt-6 text-3xl font-bold">Page Not Found</h2>

      <p className="mt-4 text-gray-500">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="mt-8 rounded-full bg-black px-8 py-4 text-white">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
