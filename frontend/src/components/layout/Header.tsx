import { Moon, Sun, ShoppingBag, Menu, X} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {useAuth} from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";




const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    navigate("/");
  };

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} />
            <NavLink to="/">
              <span className="text-xl font-bold tracking-tight">Aether</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" className="font-medium hover:opacity-70">
              Home
            </NavLink>

            <NavLink to="/shop" className="font-medium hover:opacity-70">
              Shop
            </NavLink>

            <NavLink to="/about" className="font-medium hover:opacity-70">
              About
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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex h-10 w-10 items-center justify-center rounded-full font-bold bg-black text-white dark:bg-white dark:text-black"
                >
                  {/* <User size={18} /> */}
                  {/* {user.user_metadata?.fullname?.charAt(0)?.toUpperCase() ||
                    "U"} */}
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold">
                      {user?.user_metadata?.full_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl border bg-white p-2 shadow-lg dark:bg-slate-900">
                    <div className="border-b p-3">
                      <p className="font-medium">
                        {user.user_metadata?.fullname || "User"}
                      </p>

                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <NavLink
                      to="/dashboard/profile"
                      className="block rounded-xl px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      My Profile
                    </NavLink>

                    <NavLink
                      to="/dashboard/reservations"
                      className="block rounded-xl px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      My Reservations
                    </NavLink>

                    <NavLink
                      to="/dashboard/orders"
                      className="block rounded-xl px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      My Orders
                    </NavLink>

                    <NavLink
                      to="/dashboard"
                      className="block rounded-xl px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      Dashboard
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full rounded-xl px-4 py-3 text-left text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden cursor-pointer"
          >
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
              <NavLink to="/">
                <h2 className="text-xl font-bold">Aether</h2>
              </NavLink>

              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
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

            {/* User Profile and actions */}

            {/* Mobile Actions */}
            <div className="mt-5 flex flex-col gap-3">
              {user ? (
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex h-10 w-10 items-center justify-center rounded-full font-bold bg-black text-white dark:bg-white dark:text-black cursor-pointer"
                    >
                      {/* <User size={18} /> */}
                      {/* {user.user_metadata?.fullname?.charAt(0)?.toUpperCase() ||
                        "U"} */}
                      {/* {user.user_metadata?.full_name?.charAt(0).toUpperCase()} */}
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="avatar"
                          className="h-10 w-10 rounded-full object-cover "
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold">
                          {user?.user_metadata?.full_name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </button>
                    <p className="font-medium">User Profile </p>
                  </div>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl border bg-white p-2 shadow-lg dark:bg-slate-900 cursor-pointer">
                      <div className="border-b p-3">
                        <p className="font-medium">
                          {user.user_metadata?.fullname || "User"}
                        </p>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <NavLink
                        to="/dashboard/profile"
                        className="block rounded-xl px-4 py-1 pt-2 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        My Profile
                      </NavLink>

                      <NavLink
                        to="/dashboard/reservations"
                        className="block rounded-xl px-4 py-1 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        My Reservations
                      </NavLink>

                      <NavLink
                        to="/dashboard/orders"
                        className="block rounded-xl px-4 py-1 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        My Orders
                      </NavLink>

                      <NavLink
                        to="/dashboard"
                        className="block rounded-xl px-4 py-1 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        Dashboard
                      </NavLink>

                      <button
                        onClick={handleLogout}
                        className=" w-full rounded-xl px-4 py-1 text-left text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                </>
              )}

              <button
                onClick={toggleTheme}
                className="rounded-full border px-5 py-3"
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;