import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-20 items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-50"></div>
            <Sparkles className="relative w-8 h-8 text-indigo-400" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Noko Supply
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Tính năng", "Khách hàng", "Lợi ích", "Liên hệ"].map((item, index) => {
            const href = `#${
              item === "Tính năng"
                ? "features"
                : item === "Khách hàng"
                ? "clients"
                : item === "Lợi ích"
                ? "benefits"
                : "contact"
            }`;
            return (
              <motion.a
                key={item}
                href={href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            Đăng nhập
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-lg shadow-indigo-500/50"
            >
              Dùng thử miễn phí
            </Button>
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
            {["Tính năng", "Khách hàng", "Lợi ích", "Liên hệ"].map((item) => {
              const href = `#${
                item === "Tính năng"
                  ? "features"
                  : item === "Khách hàng"
                  ? "clients"
                  : item === "Lợi ích"
                  ? "benefits"
                  : "contact"
              }`;
              return (
                <a
                  key={item}
                  href={href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              );
            })}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Button variant="ghost" size="sm" className="text-gray-400">
                Đăng nhập
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              >
                Dùng thử miễn phí
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
