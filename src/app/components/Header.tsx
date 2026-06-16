import { Link } from "react-router";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

const services = [
  {
    name: "Noko POS",
    desc: "Giải pháp vận hành chuỗi nhà hàng",
    href: "/pos",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Noko Academy",
    desc: "Đào tạo F&B chuyên nghiệp",
    href: "/academy",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Noko Supply",
    desc: "Nguyên liệu chuẩn từ vườn đến bàn",
    href: "/supply",
    color: "from-pink-500 to-rose-500",
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
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-50" />
            <Sparkles className="relative w-8 h-8 text-indigo-400" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Noko
          </span>
        </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Trang chủ", href: "/", isRoute: true },
            { label: "Về chúng tôi", href: "#about" },
            { label: "Blog", href: "/blog", isRoute: true },
            { label: "Liên hệ", href: "#contact" },
          ].map((item, index) => {
            const className =
              "text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group";
            const underline = (
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
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

            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={className}
              >
                {item.label}
                {underline}
              </motion.a>
            );
          })}

          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group"
            >
              Dịch vụ
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </motion.button>

            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
              >
                <div className="p-2">
                  {services.map((svc) => (
                    <Link
                      key={svc.name}
                      to={svc.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100`}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{svc.name}</div>
                        <div className="text-xs text-gray-500">{svc.desc}</div>
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-lg shadow-indigo-500/50 px-6"
              >
                Bắt đầu ngay
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
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
          className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
        >
          <nav className="container flex flex-col gap-4 py-6">
            {[
              { label: "Trang chủ", href: "/", isRoute: true },
              { label: "Về chúng tôi", href: "#about" },
              { label: "Blog", href: "/blog", isRoute: true },
              { label: "Liên hệ", href: "#contact" },
            ].map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Dịch vụ</p>
              {services.map((svc) => (
                <Link
                  key={svc.name}
                  to={svc.href}
                  className="flex items-center gap-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${svc.color} flex items-center justify-center`}>
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  {svc.name}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link to="/pos" onClick={() => setIsMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                >
                  Bắt đầu ngay
                </Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
