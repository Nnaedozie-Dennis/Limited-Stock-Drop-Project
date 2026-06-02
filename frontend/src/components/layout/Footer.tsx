// import { Instagram, Twitter, Facebook } from "lucide-react";
// import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-16 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Aether</h2>

            <p className="text-sm text-gray-500">
              Reserve limited edition sneakers before they disappear.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Shop</h3>

            <ul className="space-y-3 text-sm">
              <li>New Arrivals</li>
              <li>Trending</li>
              <li>Limited Drops</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>

            <ul className="space-y-3 text-sm">
              <li>About</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>

            {/* <div className="flex gap-4">
              <Instagram />
              <Twitter />
              <Facebook />
            </div> */}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-slate-700">
          © {new Date().getFullYear()} Aether. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
