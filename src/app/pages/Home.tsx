import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Star,
  AlertTriangle,
  PackageSearch,
  BookOpen,
  MonitorSmartphone,
  GraduationCap,
  ShoppingBasket,
  CheckCircle2,
} from "lucide-react";

// ── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ── Parallax wrapper ─────────────────────────────────────────────────────────
function ParallaxSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Stagger helpers ──────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ── Main Component ───────────────────────────────────────────────────────────
export function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-black overflow-x-hidden">
      <ScrollProgress />

      {/* Cursor glow */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          left: mouse.x - 250,
          top: mouse.y - 250,
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated bg blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-indigo-600/8 to-purple-600/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 mb-10"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
              <Star className="w-4 h-4 text-indigo-400" />
            </motion.div>
            <span className="text-sm text-indigo-300 font-medium">Hệ sinh thái F&B #1 cho người Việt tại Mỹ</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
              Xây dựng & vận hành
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              nhà hàng đúng cách
            </span>
            <br />
            <span className="bg-gradient-to-r from-white/80 to-gray-400 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
              — từ ngày đầu tiên
            </span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Noko cung cấp toàn bộ hạ tầng để người Việt kinh doanh F&B tại Mỹ vận hành chuyên nghiệp, tăng trưởng bền vững.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#ecosystem">
                <Button
                  size="lg"
                  className="text-lg px-10 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-2xl shadow-indigo-500/40 group"
                >
                  Khám phá hệ sinh thái
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-14 border-white/20 hover:bg-white/5 hover:border-white/40"
                >
                  Xem câu chuyện Noko
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
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
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section id="about" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Người Việt mở quán tại Mỹ
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  đang gặp phải điều này...
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: AlertTriangle,
                  title: "Vận hành bằng cảm tính",
                  desc: "Không có hệ thống theo dõi, mọi quyết định đều dựa vào ước tính và kinh nghiệm cá nhân — dễ sai, khó sửa.",
                  color: "from-orange-500/20 to-orange-500/5",
                  border: "border-orange-500/20",
                  iconColor: "text-orange-400",
                },
                {
                  icon: PackageSearch,
                  title: "Không biết lấy nguyên liệu",
                  desc: "Tìm nguồn hàng chuẩn chất lượng, đúng giá tại Mỹ là bài toán nan giải với hầu hết chủ nhà hàng người Việt.",
                  color: "from-yellow-500/20 to-yellow-500/5",
                  border: "border-yellow-500/20",
                  iconColor: "text-yellow-400",
                },
                {
                  icon: BookOpen,
                  title: "Thiếu kiến thức kinh doanh",
                  desc: "Thị trường Mỹ có luật lệ, văn hóa tiêu dùng và cách vận hành rất khác — không có ai chỉ dẫn bài bản.",
                  color: "from-rose-500/20 to-rose-500/5",
                  border: "border-rose-500/20",
                  iconColor: "text-rose-400",
                },
              ].map((pain) => (
                <motion.div key={pain.title} variants={item}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`bg-gradient-to-br ${pain.color} border ${pain.border} backdrop-blur-xl h-full relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/3 rounded-full -translate-y-16 translate-x-16" />
                      <CardContent className="pt-8">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 border ${pain.border} flex items-center justify-center mb-5`}>
                          <pain.icon className={`w-6 h-6 ${pain.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-3">{pain.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{pain.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── HỆ SINH THÁI ─────────────────────────────────────────────────────── */}
      <section id="ecosystem" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/8 via-purple-600/8 to-pink-600/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-indigo-400 font-medium text-sm uppercase tracking-widest mb-4">Hệ sinh thái</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ba giải pháp.</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Một hệ sinh thái.
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Mỗi sản phẩm giải quyết một bài toán cụ thể — cùng nhau tạo nên nền tảng F&B hoàn chỉnh.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: MonitorSmartphone,
                name: "Noko POS",
                tagline: "Giải pháp vận hành chuỗi nhà hàng",
                desc: "Hệ thống POS thế hệ mới được thiết kế riêng cho nhà hàng người Việt tại Mỹ — quản lý đơn hàng, nhân viên, báo cáo thời gian thực.",
                href: "/pos",
                gradient: "from-indigo-600 to-blue-600",
                glow: "shadow-indigo-500/30",
                border: "hover:border-indigo-500/50",
                features: ["Quản lý đơn hàng", "Báo cáo real-time", "Đa chi nhánh"],
              },
              {
                icon: GraduationCap,
                name: "Noko Academy",
                tagline: "Đào tạo F&B chuyên nghiệp",
                desc: "Chương trình đào tạo thực chiến cho chủ nhà hàng và nhân viên — từ vận hành, marketing đến quản lý tài chính tại thị trường Mỹ.",
                href: "/academy",
                gradient: "from-purple-600 to-indigo-600",
                glow: "shadow-purple-500/30",
                border: "hover:border-purple-500/50",
                features: ["Khóa học thực chiến", "Mentor 1-1", "Cộng đồng hỗ trợ"],
                featured: true,
              },
              {
                icon: ShoppingBasket,
                name: "Noko Supply",
                tagline: "Nguyên liệu chuẩn từ vườn đến bàn",
                desc: "Cung cấp nguyên liệu F&B chất lượng cao, giá cạnh tranh, giao tận nơi tại California — đặc biệt phù hợp với nhà hàng Việt.",
                href: "/supply",
                gradient: "from-pink-600 to-purple-600",
                glow: "shadow-pink-500/30",
                border: "hover:border-pink-500/50",
                features: ["Nguyên liệu chuẩn", "Giao tận nơi", "Giá wholesale"],
              },
            ].map((svc) => (
              <motion.div key={svc.name} variants={item} className="relative">
                {svc.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                <Link to={svc.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className={`bg-card/60 backdrop-blur-xl border-white/10 ${svc.border} transition-all duration-300 h-full relative overflow-hidden group cursor-pointer`}>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <CardContent className="pt-8 flex flex-col h-full">
                        <div className={`w-14 h-14 bg-gradient-to-br ${svc.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl ${svc.glow} relative`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                          <svc.icon className="w-7 h-7 text-white relative z-10" />
                        </div>

                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{svc.tagline}</div>
                        <h3 className="text-2xl font-bold text-white mb-4">{svc.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{svc.desc}</p>

                        <ul className="space-y-2 mb-8">
                          {svc.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant="outline"
                          className="w-full border-white/15 hover:border-white/30 hover:bg-white/5 group/btn"
                        >
                          Tìm hiểu thêm
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/8 via-purple-600/8 to-pink-600/8" />
            <motion.div
              animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"
            />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Được tin dùng bởi</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  500+ nhà hàng người Việt tại Mỹ
                </span>
              </h2>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-20"
            >
              {[
                { value: "500+", label: "Nhà hàng đang dùng", sub: "tại California & 3 tiểu bang khác" },
                { value: "4", label: "Tiểu bang phủ sóng", sub: "CA · TX · WA · GA" },
                { value: "98%", label: "Khách hàng hài lòng", sub: "dựa trên khảo sát 2024" },
              ].map((stat, i) => (
                <motion.div key={stat.label} variants={item} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white font-semibold text-lg mb-1">{stat.label}</div>
                  <div className="text-gray-500 text-sm">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Marquee brand logos */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-6 w-max"
              >
                {[
                  { name: "King Bánh Mì", gradient: "from-yellow-500 to-orange-500" },
                  { name: "Pizza Master", gradient: "from-red-500 to-red-700" },
                  { name: "Phở Việt", gradient: "from-green-500 to-teal-600" },
                  { name: "Café 24h", gradient: "from-purple-500 to-pink-600" },
                  { name: "Bún Bò Huế", gradient: "from-orange-500 to-red-500" },
                  { name: "Sài Gòn Kitchen", gradient: "from-teal-500 to-cyan-500" },
                  // Duplicate for seamless loop
                  { name: "King Bánh Mì", gradient: "from-yellow-500 to-orange-500" },
                  { name: "Pizza Master", gradient: "from-red-500 to-red-700" },
                  { name: "Phở Việt", gradient: "from-green-500 to-teal-600" },
                  { name: "Café 24h", gradient: "from-purple-500 to-pink-600" },
                  { name: "Bún Bò Huế", gradient: "from-orange-500 to-red-500" },
                  { name: "Sài Gòn Kitchen", gradient: "from-teal-500 to-cyan-500" },
                ].map((brand, i) => (
                  <div
                    key={`${brand.name}-${i}`}
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-br ${brand.gradient} text-white font-bold text-base shadow-xl`}
                  >
                    {brand.name}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── CTA FOOTER ───────────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/15 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-indigo-400 font-medium text-sm uppercase tracking-widest mb-6">Bắt đầu ngay hôm nay</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Sẵn sàng xây dựng
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                nhà hàng đúng cách?
              </span>
            </h2>
            <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
              Đội ngũ tư vấn của Noko sẵn sàng đồng hành cùng bạn — từ ngày đầu tiên đến khi vận hành ổn định.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link to="/pos#contact">
                <Button
                  size="lg"
                  className="text-lg px-14 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-2xl shadow-indigo-500/40 group rounded-2xl"
                >
                  Liên hệ tư vấn miễn phí
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <p className="text-gray-600 text-sm mt-6">Không mất phí · Phản hồi trong 24h · Tư vấn bằng tiếng Việt</p>
          </motion.div>
        </div>
        </div>
      </section>
    </div>
  );
}
