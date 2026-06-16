import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Star,
  X,
  CheckCircle2,
  GraduationCap,
  Users,
  Zap,
  TrendingUp,
  Menu,
  ChevronDown,
  Sparkles,
  BookOpen,
  Award,
  Building2,
  Briefcase,
} from "lucide-react";

// ── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ── Parallax wrapper ─────────────────────────────────────────────────────────
function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

// ── Stagger helpers ──────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ── Navbar (Academy-aware) ───────────────────────────────────────────────────
const services = [
  { name: "Noko POS", desc: "Giải pháp vận hành chuỗi nhà hàng", href: "/pos", color: "from-indigo-500 to-purple-500" },
  { name: "Noko Academy", desc: "Đào tạo F&B chuyên nghiệp", href: "/academy", color: "from-purple-500 to-pink-500" },
  { name: "Noko Supply", desc: "Nguyên liệu chuẩn từ vườn đến bàn", href: "/supply", color: "from-pink-500 to-rose-500" },
];

function Navbar() {
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
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-50" />
              <Sparkles className="relative w-8 h-8 text-indigo-400" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Noko
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Trang chủ", href: "/" },
            { label: "Về chúng tôi", href: "/#about" },
            { label: "Blog", href: "#" },
            { label: "Liên hệ", href: "#register" },
          ].map((navItem, index) => (
            <motion.a
              key={navItem.label}
              href={navItem.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group"
            >
              {navItem.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}

          <div ref={dropdownRef} className="relative">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1 text-sm font-medium text-purple-400 transition-all duration-300 relative"
            >
              Dịch vụ
              <span className="text-gray-400">·</span>
              <span className="text-white font-semibold">Academy</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${svc.href === "/academy" ? "bg-white/5" : "hover:bg-white/5"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0`}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${svc.href === "/academy" ? "text-purple-300" : "text-white"}`}>{svc.name}</div>
                        <div className="text-xs text-gray-500">{svc.desc}</div>
                      </div>
                      {svc.href === "/academy" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#register">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-lg shadow-purple-500/50 px-6">
                Đăng ký ngay
              </Button>
            </a>
          </motion.div>
        </div>

        <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
        >
          <nav className="container flex flex-col gap-4 py-6">
            {[
              { label: "Về chúng tôi", href: "/#about" },
              { label: "Blog", href: "#" },
              { label: "Liên hệ", href: "#register" },
            ].map((navItem) => (
              <a key={navItem.label} href={navItem.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                {navItem.label}
              </a>
            ))}
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Dịch vụ</p>
              {services.map((svc) => (
                <Link key={svc.name} to={svc.href} className="flex items-center gap-3 py-2 text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${svc.color} flex items-center justify-center`}>
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className={svc.href === "/academy" ? "text-purple-300 font-medium" : ""}>{svc.name}</span>
                </Link>
              ))}
            </div>
            <a href="#register" onClick={() => setIsMenuOpen(false)}>
              <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                Đăng ký ngay
              </Button>
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export function NokoAcademy() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-black overflow-hidden">
      <ScrollProgress />
      <Navbar />

      {/* Cursor glow */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
          left: mouse.x - 250,
          top: mouse.y - 250,
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-purple-600/8 to-pink-600/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 mb-10"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
              <GraduationCap className="w-4 h-4 text-purple-400" />
            </motion.div>
            <span className="text-sm text-purple-300 font-medium">Đào tạo F&B chuyên nghiệp</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
              Học đúng — Làm đúng
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Lãi đúng
            </span>
            <br />
            <span className="bg-gradient-to-r from-white/80 to-gray-400 bg-clip-text text-transparent text-4xl md:text-5xl">
              ngay từ quán đầu tiên
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Noko Academy đào tạo chủ quán người Việt tại Mỹ vận hành bài bản, kiểm soát chi phí và mở rộng đúng thời điểm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#courses">
                <Button size="lg" className="text-lg px-10 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-2xl shadow-purple-500/40 group">
                  Xem các khóa học
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#register">
                <Button size="lg" variant="outline" className="text-lg px-10 h-14 border-white/20 hover:bg-white/5 hover:border-white/40">
                  Tư vấn miễn phí
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-purple-500", "bg-pink-500", "bg-indigo-500"].map((c, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-background`} />
                ))}
              </div>
              <span>500+ chủ quán đã học</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4 tiểu bang</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Thực chiến 100%</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />
          <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Bạn đang gặp phải
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  điều này không?
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-2 gap-5"
            >
              {[
                { text: "Mở quán xong mới biết mình thiếu gì", sub: "Không có lộ trình chuẩn bị từ trước" },
                { text: "Chi phí vượt budget, không biết lỗ ở đâu", sub: "Thiếu kiến thức kiểm soát food cost & overhead" },
                { text: "Nhân viên không ổn định, vận hành rối", sub: "Không có hệ thống đào tạo và quy trình chuẩn" },
                { text: "Muốn mở thêm quán nhưng không dám", sub: "Lo ngại mất kiểm soát khi scale up" },
              ].map((pain, i) => (
                <motion.div key={i} variants={item}>
                  <motion.div
                    whileHover={{ x: 4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-card/40 border border-white/8 hover:border-rose-500/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium leading-snug mb-1">{pain.text}</p>
                      <p className="text-sm text-gray-500">{pain.sub}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center mt-10"
            >
              <p className="text-gray-500 text-lg">
                Nếu có ít nhất 1 điều trên — <span className="text-purple-400 font-medium">Noko Academy được xây dựng cho bạn.</span>
              </p>
            </motion.div>
          </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── GIỚI THIỆU ───────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-5">Về Noko Academy</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Không phải lý thuyết.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Là kinh nghiệm thực chiến.
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Noko Academy được xây dựng bởi những người đã thực sự mở quán tại Mỹ — không phải lý thuyết, mà là kinh nghiệm thực chiến được hệ thống hóa thành chương trình đào tạo bài bản.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      icon: Zap,
                      title: "Thực chiến 100%",
                      desc: "Mỗi bài học đều có case study thật từ nhà hàng người Việt tại Mỹ — từ thất bại đến thành công.",
                      color: "from-purple-600 to-indigo-600",
                    },
                    {
                      icon: Users,
                      title: "Cộng đồng 500+ chủ quán",
                      desc: "Kết nối, chia sẻ và hỗ trợ nhau trong cộng đồng chủ quán người Việt tại Mỹ.",
                      color: "from-pink-600 to-rose-600",
                    },
                    {
                      icon: Award,
                      title: "Hỗ trợ sau khóa học",
                      desc: "Không bỏ rơi sau khi học xong — mentor theo dõi và hỗ trợ 3 tháng sau tốt nghiệp.",
                      color: "from-indigo-600 to-purple-600",
                    },
                  ].map((point) => (
                    <motion.div
                      key={point.title}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <div className={`w-11 h-11 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <point.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{point.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/25 to-pink-600/25 blur-3xl rounded-3xl"
                />
                <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  {/* Simulated stat cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { value: "500+", label: "Học viên", color: "from-purple-500 to-indigo-500" },
                      { value: "4", label: "Tiểu bang", color: "from-pink-500 to-rose-500" },
                      { value: "98%", label: "Hài lòng", color: "from-indigo-500 to-purple-500" },
                      { value: "3 tháng", label: "Hỗ trợ sau", color: "from-rose-500 to-pink-500" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        className="bg-background/60 rounded-2xl p-5 border border-white/8"
                      >
                        <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Progress bars */}
                  <div className="space-y-4">
                    {[
                      { label: "Học viên mở quán thành công", pct: 87 },
                      { label: "Hoàn vốn trong 6 tháng", pct: 72 },
                      { label: "Mở thêm quán sau 1 năm", pct: 54 },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400">{bar.label}</span>
                          <span className="text-purple-400 font-medium">{bar.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── KHÓA HỌC ─────────────────────────────────────────────────────────── */}
      <section id="courses" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-600/6 via-pink-600/6 to-indigo-600/6 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-4">Chương trình đào tạo</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">4 khóa học.</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Cho mọi giai đoạn.
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Từ người chưa có quán đến chủ chuỗi — luôn có khóa học phù hợp với bạn.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-7"
          >
            {[
              {
                badge: "Người mới bắt đầu",
                badgeColor: "from-green-500 to-emerald-500",
                icon: BookOpen,
                iconGrad: "from-green-600 to-emerald-600",
                name: "Khóa 1 — Mở quán từ A–Z",
                target: "Chưa có quán, đang có vốn, muốn bắt đầu đúng cách",
                bullets: [
                  "Lên concept & menu phù hợp thị trường Mỹ",
                  "Tìm mặt bằng tại Mỹ: tiêu chí & đàm phán",
                  "License & legal: các giấy phép cần thiết",
                  "Setup vận hành ngày đầu khai trương",
                ],
                border: "hover:border-green-500/40",
                glow: "shadow-green-500/20",
              },
              {
                badge: "Đang có quán",
                badgeColor: "from-blue-500 to-indigo-500",
                icon: TrendingUp,
                iconGrad: "from-blue-600 to-indigo-600",
                name: "Khóa 2 — Vận hành & Tối ưu",
                target: "Chủ quán đang hoạt động, muốn thoát vận hành cảm tính",
                bullets: [
                  "Kiểm soát food cost & giảm lãng phí",
                  "Quản lý ca làm, lịch shift và overtime",
                  "Tối ưu menu: chọn món sinh lời, xoá món kém",
                  "Đọc báo cáo tài chính P&L hàng tháng",
                ],
                border: "hover:border-blue-500/40",
                glow: "shadow-blue-500/20",
              },
              {
                badge: "Có 1–2 quán",
                badgeColor: "from-purple-500 to-pink-500",
                icon: Building2,
                iconGrad: "from-purple-600 to-pink-600",
                name: "Khóa 3 — Mở rộng chuỗi",
                target: "Muốn nhân rộng mô hình mà không mất kiểm soát",
                bullets: [
                  "Chuẩn hóa quy trình vận hành toàn chuỗi",
                  "Tuyển & đào tạo quản lý cấp trung",
                  "Mô hình franchise: cách làm đúng tại Mỹ",
                  "Kiểm soát chất lượng đa chi nhánh",
                ],
                border: "hover:border-purple-500/40",
                glow: "shadow-purple-500/20",
              },
              {
                badge: "Gói doanh nghiệp",
                badgeColor: "from-orange-500 to-rose-500",
                icon: Briefcase,
                iconGrad: "from-orange-600 to-rose-600",
                name: "Khóa 4 — Đào tạo nhân viên",
                target: "Doanh nghiệp F&B muốn nâng cấp toàn bộ đội ngũ",
                bullets: [
                  "Chương trình đào tạo custom theo từng vị trí",
                  "Training on-site tại nhà hàng của bạn",
                  "Xây dựng tài liệu nội bộ & SOP",
                  "Đánh giá định kỳ và cải tiến liên tục",
                ],
                border: "hover:border-orange-500/40",
                glow: "shadow-orange-500/20",
              },
            ].map((course) => (
              <motion.div key={course.name} variants={item}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`bg-card/60 backdrop-blur-xl border-white/10 ${course.border} transition-all duration-300 relative overflow-hidden group h-full`}>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <CardContent className="pt-7 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${course.iconGrad} rounded-xl flex items-center justify-center shadow-lg ${course.glow} relative`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                          <course.icon className="w-6 h-6 text-white relative z-10" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${course.badgeColor} text-white shadow-md`}>
                          {course.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                        <span className="text-gray-600">Dành cho: </span>{course.target}
                      </p>

                      <ul className="space-y-2.5 mb-7 flex-1">
                        {course.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <a href="#register" onClick={() => setSelectedCourse(course.name)}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-lg shadow-purple-500/20 group/btn">
                          Đăng ký khóa này
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CASE STUDY / TESTIMONIALS ─────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/6 via-pink-600/6 to-indigo-600/6 pointer-events-none" />
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/12 rounded-full blur-3xl pointer-events-none"
          />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Học viên nói gì về</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Noko Academy
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-3 gap-7"
            >
              {[
                {
                  name: "Chị Lan Anh",
                  restaurant: "Bếp Việt · San Jose, CA",
                  avatar: "LA",
                  avatarColor: "from-purple-500 to-pink-500",
                  quote: "Trước khi học Noko Academy tôi không biết food cost là gì. Sau Khóa 2, tôi cắt được 18% chi phí nguyên liệu chỉ trong 2 tháng.",
                  result: "Giảm 18% food cost",
                  resultColor: "text-green-400",
                  course: "Vận hành & Tối ưu",
                },
                {
                  name: "Anh Minh Tuấn",
                  restaurant: "Phở 888 · Houston, TX",
                  avatar: "MT",
                  avatarColor: "from-indigo-500 to-purple-500",
                  quote: "Khóa Mở quán A–Z giúp tôi tránh được ít nhất 3 sai lầm nghiêm trọng mà nhiều chủ quán khác mắc phải khi lần đầu ra mắt.",
                  result: "Hoàn vốn sau 5 tháng",
                  resultColor: "text-purple-400",
                  course: "Mở quán từ A–Z",
                },
                {
                  name: "Chị Hương Giang",
                  restaurant: "Chuỗi Bún Bò · Atlanta, GA",
                  avatar: "HG",
                  avatarColor: "from-pink-500 to-rose-500",
                  quote: "Nhờ Khóa 3, tôi biết cách chuẩn hóa quy trình và mở được quán thứ 3 mà không cần phải có mặt ở đó mỗi ngày.",
                  result: "Mở 3 chi nhánh",
                  resultColor: "text-pink-400",
                  course: "Mở rộng chuỗi",
                },
              ].map((t, index) => (
                <motion.div key={t.name} variants={item}>
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-card/50 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full">
                      <CardContent className="pt-7">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="relative">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                              className={`absolute inset-0 bg-gradient-to-r ${t.avatarColor} blur-md opacity-40 rounded-full`}
                            />
                            <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-lg border-2 border-white/15`}>
                              {t.avatar}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-white">{t.name}</div>
                            <div className="text-sm text-gray-500">{t.restaurant}</div>
                            <div className="text-xs text-purple-400 mt-0.5">{t.course}</div>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>

                        <div className="flex items-center justify-between">
                          <div className={`text-sm font-semibold ${t.resultColor}`}>
                            ✓ {t.result}
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── FORM ĐĂNG KÝ ─────────────────────────────────────────────────────── */}
      <section id="register" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/12 via-pink-600/12 to-indigo-600/12 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-4">Bắt đầu ngay hôm nay</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bắt đầu hành trình</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                kinh doanh đúng cách
              </span>
            </h2>
            <p className="text-gray-500 text-lg">Điền thông tin — chúng tôi sẽ liên hệ tư vấn trong 24h.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl shadow-purple-900/20">
              <CardContent className="pt-8 pb-8">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2.5 text-gray-400">Họ và tên *</label>
                      <Input placeholder="Nguyễn Văn A" required className="bg-input-background border-white/10 focus:border-purple-500 h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2.5 text-gray-400">Số điện thoại *</label>
                      <Input placeholder="(714) 000-0000" required className="bg-input-background border-white/10 focus:border-purple-500 h-12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2.5 text-gray-400">Email *</label>
                    <Input type="email" placeholder="email@example.com" required className="bg-input-background border-white/10 focus:border-purple-500 h-12" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2.5 text-gray-400">Chọn khóa học quan tâm</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full h-12 rounded-md bg-input-background border border-white/10 text-foreground text-sm px-3 focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="">-- Chọn khóa học --</option>
                      <option value="Khóa 1 — Mở quán từ A–Z">Khóa 1 — Mở quán từ A–Z</option>
                      <option value="Khóa 2 — Vận hành & Tối ưu">Khóa 2 — Vận hành &amp; Tối ưu</option>
                      <option value="Khóa 3 — Mở rộng chuỗi">Khóa 3 — Mở rộng chuỗi</option>
                      <option value="Khóa 4 — Đào tạo nhân viên">Khóa 4 — Đào tạo nhân viên</option>
                    </select>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-2xl shadow-purple-500/40 group"
                    >
                      Đăng ký tư vấn miễn phí
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-gray-600">
                    Chúng tôi sẽ liên hệ trong 24h · Không spam · Tư vấn bằng tiếng Việt
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 bg-gradient-to-b from-background to-black/60">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Noko
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
                Hệ sinh thái F&B toàn diện — giúp người Việt kinh doanh nhà hàng tại Mỹ đúng cách, từ ngày đầu tiên.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Dịch vụ</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                {[{ label: "Noko POS", href: "/pos" }, { label: "Noko Academy", href: "/academy" }, { label: "Noko Supply", href: "/supply" }].map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className={`hover:text-indigo-400 transition-colors ${l.href === "/academy" ? "text-purple-400" : ""}`}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Công ty</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/#about" className="hover:text-indigo-400 transition-colors">Về chúng tôi</Link></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#register" className="hover:text-indigo-400 transition-colors">Liên hệ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Liên hệ</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>academy@noko.com</li>
                <li>(714) 555-0123</li>
                <li>California, United States</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>&copy; 2026 Noko Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-400 transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
