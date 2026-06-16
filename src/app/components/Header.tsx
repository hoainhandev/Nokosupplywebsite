import { Link } from "react-router";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

const services = [
  {
    name: "Noko POS",
    desc: "Restaurant chain operations solution",
    href: "/pos",
    color: "from-[#F5F0E8] to-[#E8C97A]",
  },
  {
    name: "Noko Academy",
    desc: "Professional F&B training",
    href: "/academy",
    color: "from-[#E8C97A] to-[#F5F0E8]",
  },
  {
    name: "Noko Supply",
    desc: "Farm-to-table quality ingredients",
    href: "/supply",
    color: "from-[#F5F0E8] to-[#C4BAA8]",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-[#F5F0E8]/10 bg-[#1B2B6B]/80 backdrop-blur-xl"
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center cursor-pointer"
        >
          <img
            src="https://sdribtqccxzjpikspnnm.supabase.co/storage/v1/object/public/assets/logo-white.png"
            alt="Noko"
            className="h-10 w-auto max-w-full object-contain"
          />
        </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", href: "/", isRoute: true },
            { label: "About Us", href: "/about", isRoute: true },
            { label: "Blog", href: "/blog", isRoute: true },
            { label: "Contact", href: "/contact", isRoute: true },
          ].map((item, index) => {
            const className =
              "text-sm font-medium text-[#C4BAA8] hover:text-[#F5F0E8] transition-all duration-300 relative group";
            const underline = (
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F5F0E8] to-[#E8C97A] group-hover:w-full transition-all duration-300" />
            );

            if (item.isRoute) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={item.href} className={className}>
                    {item.label}
                    {underline}
                  </Link>
                </motion.div>
              );
            }

            return null;
          })}

          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1 text-sm font-medium text-[#C4BAA8] hover:text-[#F5F0E8] transition-all duration-300 relative group"
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F5F0E8] to-[#E8C97A] group-hover:w-full transition-all duration-300" />
            </motion.button>

            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#243580]/95 backdrop-blur-xl border border-[#F5F0E8]/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
              >
                <div className="p-2">
                  {services.map((svc) => (
                    <Link
                      key={svc.name}
                      to={svc.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F5F0E8]/10 transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100`}>
                        <Sparkles className="w-4 h-4 text-[#F5F0E8]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#F5F0E8]">{svc.name}</div>
                        <div className="text-xs text-[#A89880]">{svc.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/pos">
              <Button
                size="sm"
                className="bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-lg shadow-[#F5F0E8]/20 px-6"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#C4BAA8] hover:text-[#F5F0E8]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-[#F5F0E8]/10 bg-[#1B2B6B]/95 backdrop-blur-xl"
        >
          <nav className="container flex flex-col gap-4 py-6">
            {[
              { label: "Home", href: "/", isRoute: true },
              { label: "About Us", href: "/about", isRoute: true },
              { label: "Blog", href: "/blog", isRoute: true },
              { label: "Contact", href: "/contact", isRoute: true },
            ].map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-medium text-[#C4BAA8] hover:text-[#F5F0E8] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : null
            )}
            <div className="border-t border-[#F5F0E8]/10 pt-4">
              <p className="text-xs text-[#A89880] mb-3 uppercase tracking-wider">Services</p>
              {services.map((svc) => (
                <Link
                  key={svc.name}
                  to={svc.href}
                  className="flex items-center gap-3 py-2 text-sm text-[#C4BAA8] hover:text-[#F5F0E8] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${svc.color} flex items-center justify-center`}>
                    <Sparkles className="w-3 h-3 text-[#F5F0E8]" />
                  </div>
                  {svc.name}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link to="/pos" onClick={() => setIsMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B]"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
