import { Moon, Sun, ShoppingBag } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <ShoppingBag size={24} />
          <span className="text-xl font-bold tracking-tight">Aether</span>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#" className="font-medium hover:opacity-70">
            Home
          </a>

          <a href="#" className="font-medium hover:opacity-70">
            Drops
          </a>

          <a href="#" className="font-medium hover:opacity-70">
            Collections
          </a>

          <a href="#" className="font-medium hover:opacity-70">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full border p-2 transition"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button className="rounded-full bg-black px-5 py-2 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
            Reserve Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
