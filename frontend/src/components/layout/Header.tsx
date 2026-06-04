import { Moon, Sun, ShoppingBag, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} />
            <span className="text-xl font-bold tracking-tight">Aether</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" className="font-medium hover:opacity-70">
              Home
            </NavLink>

            <NavLink to="/shop" className="font-medium hover:opacity-70">
              Shop Drop
            </NavLink>

            <NavLink to="/about" className="font-medium hover:opacity-70">
              About Collections
            </NavLink>

            <NavLink to="/contact" className="font-medium hover:opacity-70">
              Contact
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={toggleTheme}
              className="rounded-full border p-2 transition"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <NavLink
              to="/login"
              className="rounded-full border px-5 py-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="rounded-full bg-black px-5 py-2 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(true)} className="lg:hidden">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Drawer */}
          <div className="fixed right-0 top-0 z-50 h-screen w-70 bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Aether</h2>

              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="mt-10 flex flex-col gap-6">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="font-medium"
              >
                Home
              </NavLink>

              <NavLink
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="font-medium"
              >
                Shop
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="font-medium"
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="font-medium"
              >
                Contact
              </NavLink>
            </div>

            {/* Mobile Actions */}
            <div className="mt-10 flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className="rounded-full border px-5 py-3"
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>

              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-full border px-5 py-3 text-center"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-black px-5 py-3 text-center text-white dark:bg-white dark:text-black"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;