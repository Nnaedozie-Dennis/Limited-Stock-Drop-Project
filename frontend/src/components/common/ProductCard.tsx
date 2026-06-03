import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const ProductCard = ({ id, name, price, stock, image }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${id}`}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{name}</h3>

        <p className="mt-2 text-gray-500">Only {stock} pairs left</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold">${price}</span>

          <span className="rounded-full bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">
            View
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
