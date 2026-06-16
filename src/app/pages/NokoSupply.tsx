import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { supabase } from "../../lib/supabase";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import {
  ArrowRight, Star, X, CheckCircle2, ShoppingBasket,
  Truck, DollarSign, RefreshCw, Headphones,
  Leaf, Package,
} from "lucide-react";

// ── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return <motion.div ref={ref} style={{ y, opacity }}>{children}</motion.div>;
}

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// ── Main Page ────────────────────────────────────────────────────────────────
export function NokoSupply() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [posUser, setPosUser] = useState("supply-only");
  const [needs, setNeeds] = useState<string[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const toggleNeed = (n: string) => setNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("supply_leads").insert({
        restaurant_name: restaurantName,
        name,
        phone,
        email,
        state: state || null,
        pos_status: posUser,
        needs,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Đã gửi yêu cầu báo giá! Chúng tôi sẽ liên hệ trong 24h.");
      setRestaurantName("");
      setName("");
      setPhone("");
      setEmail("");
      setState("");
      setPosUser("supply-only");
      setNeeds([]);
    } catch {
      toast.error("Không thể gửi yêu cầu. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const tabs = ["Tất cả", "Rau củ", "Thịt & Hải sản", "Gia vị & Sốt", "Đồ khô", "Bao bì"];

  const products = [
    { name: "Xương bò tươi", unit: "kg", tab: "Thịt & Hải sản", badge: "Bestseller", badgeColor: "from-orange-500 to-red-500", icon: "🥩" },
    { name: "Rau muống", unit: "kg", tab: "Rau củ", badge: "Bestseller", badgeColor: "from-green-500 to-emerald-500", icon: "🥬" },
    { name: "Nước mắm Phú Quốc", unit: "thùng", tab: "Gia vị & Sốt", badge: "Bestseller", badgeColor: "from-orange-500 to-red-500", icon: "🍶" },
    { name: "Hải sản mix đông lạnh", unit: "kg", tab: "Thịt & Hải sản", badge: "Mới", badgeColor: "from-blue-500 to-cyan-500", icon: "🦐" },
    { name: "Gạo jasmine", unit: "thùng", tab: "Đồ khô", badge: "Bestseller", badgeColor: "from-orange-500 to-red-500", icon: "🌾" },
    { name: "Hộp take-away kraft", unit: "hộp", tab: "Bao bì", badge: "Mới", badgeColor: "from-blue-500 to-cyan-500", icon: "📦" },
    { name: "Giá đỗ tươi", unit: "kg", tab: "Rau củ", badge: null, badgeColor: "", icon: "🌱" },
    { name: "Sốt tương đen", unit: "thùng", tab: "Gia vị & Sốt", badge: null, badgeColor: "", icon: "🫙" },
    { name: "Thịt heo ba chỉ", unit: "kg", tab: "Thịt & Hải sản", badge: null, badgeColor: "", icon: "🥓" },
  ];

  const filtered = activeTab === "Tất cả" ? products : products.filter(p => p.tab === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-black overflow-x-hidden">
      <ScrollProgress />

      <motion.div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)", left: mouse.x - 250, top: mouse.y - 250 }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-pink-600/7 to-rose-600/7 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-600/20 to-rose-600/20 border border-pink-500/30 mb-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
              <ShoppingBasket className="w-4 h-4 text-pink-400" />
            </motion.div>
            <span className="text-sm text-pink-300 font-medium">Nguyên liệu chuẩn — Giao đúng hẹn</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent">Nguồn hàng ổn định</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">cho nhà hàng người Việt</span>
            <br />
            <span className="bg-gradient-to-r from-white/80 to-gray-400 bg-clip-text text-transparent text-4xl md:text-5xl">tại Mỹ</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Noko Supply cung cấp nguyên liệu F&B chất lượng cao — đặt hàng dễ, giao nhanh, tích hợp trực tiếp với Noko POS.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#products">
                <Button size="lg" className="text-lg px-10 h-14 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 border-0 shadow-2xl shadow-pink-500/40 group">
                  Xem danh mục hàng <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#order">
                <Button size="lg" variant="outline" className="text-lg px-10 h-14 border-white/20 hover:bg-white/5 hover:border-white/40">
                  Liên hệ đặt hàng
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-pink-500", "bg-rose-500", "bg-orange-500"].map((c, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-background`} />
                ))}
              </div>
              <span>500+ nhà hàng tin dùng</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-pink-400" />
              <span>Giao hàng California & Texas</span>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Chủ quán đang gặp phải</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">điều này?</span>
                </h2>
              </motion.div>

              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { text: "Nguyên liệu không ổn định, chất lượng lúc tốt lúc không", sub: "Khó giữ chuẩn món khi hàng về mỗi lúc mỗi khác" },
                  { text: "Giá nhập hay thay đổi, khó tính food cost", sub: "Không thể lập kế hoạch chi phí chính xác theo tháng" },
                  { text: "Phải đặt từ nhiều nhà cung cấp, mất thời gian", sub: "3-5 cuộc gọi mỗi tuần chỉ để đặt hàng nguyên liệu" },
                  { text: "Giao hàng trễ, ảnh hưởng vận hành cả ngày", sub: "Thiếu nguyên liệu giữa ca — phải 86 món hoặc chạy đi mua lẻ" },
                ].map((pain, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <motion.div whileHover={{ x: 4, scale: 1.01 }} transition={{ duration: 0.2 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-card/40 border border-white/8 hover:border-rose-500/20 transition-colors">
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
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── GIỚI THIỆU ───────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/10 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <p className="text-pink-400 font-medium text-sm uppercase tracking-widest mb-5">Về Noko Supply</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Hiểu nhà hàng</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">cần gì, cần khi nào.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Noko Supply được xây dựng bởi chính những người trong ngành F&B — hiểu rõ nhà hàng cần gì, cần khi nào và cần ở đâu.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Leaf, title: "Nguồn gốc rõ ràng", desc: "Trực tiếp từ farm & nhà sản xuất — không qua trung gian, truy xuất nguồn gốc đầy đủ.", color: "from-green-600 to-emerald-600" },
                    { icon: DollarSign, title: "Giá cố định theo tháng", desc: "Báo giá một lần, dùng cả tháng — tính food cost chính xác, không lo biến động.", color: "from-pink-600 to-rose-600" },
                    { icon: Package, title: "Một đầu mối — đủ loại", desc: "Rau củ, thịt cá, gia vị, đồ khô, bao bì — tất cả từ một nhà cung cấp duy nhất.", color: "from-orange-600 to-rose-600" },
                  ].map((pt) => (
                    <motion.div key={pt.title} whileHover={{ x: 8 }} transition={{ duration: 0.2 }} className="flex items-start gap-4">
                      <div className={`w-11 h-11 bg-gradient-to-br ${pt.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <pt.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{pt.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{pt.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
                <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-pink-600/25 to-rose-600/25 blur-3xl rounded-3xl" />
                <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { value: "500+", label: "Nhà hàng", color: "from-pink-500 to-rose-500" },
                      { value: "2×/tuần", label: "Giao hàng", color: "from-orange-500 to-rose-500" },
                      { value: "100%", label: "Nguồn gốc rõ", color: "from-green-500 to-emerald-500" },
                      { value: "24h", label: "Hỗ trợ", color: "from-rose-500 to-pink-500" },
                    ].map((s, i) => (
                      <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
                        className="bg-background/60 rounded-2xl p-5 border border-white/8">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>{s.value}</div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Đơn hàng giao đúng hẹn", pct: 98 },
                      { label: "Khách hàng tái đặt hàng", pct: 94 },
                      { label: "Hài lòng về chất lượng", pct: 97 },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400">{b.label}</span>
                          <span className="text-pink-400 font-medium">{b.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
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

      {/* ── TÍCH HỢP VỚI NOKO POS ─────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-950/15 via-rose-950/15 to-pink-950/10" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-600/12 via-rose-600/12 to-pink-500/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Features — trái */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Tích hợp độc quyền
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Dùng Noko POS?
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                  Đặt hàng tự động — không cần làm thủ công
                </span>
              </h2>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="space-y-4 mb-8"
              >
                {[
                  "POS theo dõi tồn kho realtime",
                  "Khi xuống ngưỡng → tự tạo đơn Supply",
                  "Chủ quán chỉ approve trên app",
                  "Giá Supply sync vào food cost báo cáo POS",
                ].map((f) => (
                  <motion.div key={f} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm leading-relaxed">{f}</p>
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-sm text-gray-600 mb-6 italic">
                Chưa dùng Noko POS? Vẫn đặt hàng Supply bình thường được.
              </p>

              <Link
                to="/pos"
                className="inline-flex items-center text-sm font-medium text-pink-300 hover:text-pink-200 transition-colors group"
              >
                Tìm hiểu Noko POS
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Visual — phải */}
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
                className="absolute inset-0 bg-gradient-to-br from-pink-600/25 to-rose-600/25 blur-3xl rounded-3xl"
              />
              <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-7 space-y-4">
                {[
                  { label: "Noko POS", sub: "Phở Bò: còn 2 kg ↓", status: "Thấp", statusColor: "text-orange-400 bg-orange-400/10", iconBg: "from-indigo-600 to-purple-600", icon: "💻", cardClass: "bg-indigo-600/10 border-indigo-500/20" },
                  { label: "Đơn tự động tạo", sub: "Phở Bò · 10 kg · Noko Supply", status: "Chờ duyệt", statusColor: "text-pink-300 bg-pink-500/10", iconBg: "from-pink-600 to-rose-600", icon: "📋", cardClass: "bg-pink-600/10 border-pink-500/20" },
                  { label: "Chủ quán approve", sub: "1 chạm trên app — xong", status: "✓ Approved", statusColor: "text-green-400 bg-green-500/10", iconBg: "from-rose-600 to-orange-600", icon: "✅", cardClass: "bg-rose-600/10 border-rose-500/20" },
                  { label: "Giao hàng & cập nhật", sub: "Food cost POS cập nhật tự động", status: "Done", statusColor: "text-green-400 bg-green-500/10", iconBg: "from-green-600 to-emerald-600", icon: "🚚", cardClass: "bg-green-600/10 border-green-500/20" },
                ].map((step, i) => (
                  <div key={step.label}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border ${step.cardClass}`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center flex-shrink-0 text-lg`}>
                        {step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">{step.label}</div>
                        <div className="text-xs text-gray-500 truncate">{step.sub}</div>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-lg flex-shrink-0 ${step.statusColor}`}>
                        {step.status}
                      </div>
                    </motion.div>
                    {i < 3 && (
                      <div className="flex justify-center my-1">
                        <motion.div
                          animate={{ y: [0, 3, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          className="flex flex-col items-center gap-0.5"
                        >
                          <div className="w-px h-4 bg-gradient-to-b from-pink-500/50 to-rose-500/50" />
                          <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[3px] border-l-transparent border-r-transparent border-t-rose-500/60" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DANH MỤC SẢN PHẨM ───────────────────────────────────────────────── */}
      <section id="products" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <p className="text-pink-400 font-medium text-sm uppercase tracking-widest mb-4">Danh mục</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Chúng tôi</span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">cung cấp</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tabs.map((tab) => (
              <motion.button key={tab} onClick={() => setActiveTab(tab)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/25"
                  : "bg-card/50 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}>
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div variants={stagger} initial="hidden" animate="visible" key={activeTab}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <motion.div key={p.name} variants={fadeUp}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25 }}>
                  <Card className="bg-card/60 backdrop-blur-xl border-white/10 hover:border-pink-500/30 transition-all duration-300 group overflow-hidden">
                    <CardContent className="pt-6">
                      {/* Placeholder image area */}
                      <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/8 flex items-center justify-center mb-4 overflow-hidden">
                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="text-5xl">{p.icon}</motion.div>
                        {p.badge && (
                          <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${p.badgeColor} text-white`}>
                            {p.badge}
                          </div>
                        )}
                      </div>
                      <h3 className="text-white font-semibold mb-1 group-hover:text-pink-200 transition-colors">{p.name}</h3>
                      <p className="text-xs text-gray-500 mb-4">Đơn vị: {p.unit}</p>
                      <a href="#order">
                        <Button size="sm" variant="outline" className="w-full border-white/10 hover:border-pink-500/40 hover:bg-pink-500/5 text-sm group/btn">
                          Liên hệ báo giá
                          <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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

      {/* ── VÌ SAO CHỌN ──────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/10 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Vì sao chọn</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">Noko Supply?</span>
              </h2>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Giao hàng 2 lần/tuần", desc: "Đúng giờ, đúng địa điểm — không cần theo dõi, không cần nhắc.", color: "from-pink-600 to-rose-600", glow: "shadow-pink-500/20" },
                { icon: DollarSign, title: "Giá minh bạch", desc: "Báo giá cố định theo tháng — tính food cost chính xác, không lo biến động.", color: "from-orange-600 to-rose-600", glow: "shadow-orange-500/20" },
                { icon: RefreshCw, title: "Đổi trả dễ dàng", desc: "Hàng không đạt chuẩn — đổi ngay trong lần giao tiếp theo, không rắc rối.", color: "from-rose-600 to-pink-600", glow: "shadow-rose-500/20" },
                { icon: Headphones, title: "Hỗ trợ 7 ngày", desc: "Có vấn đề bất kỳ ngày nào trong tuần — gọi là có người nghe máy.", color: "from-red-600 to-orange-600", glow: "shadow-red-500/20" },
              ].map((f) => (
                <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.03 }} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl ${f.glow} relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                    <f.icon className="w-7 h-7 text-white relative z-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 via-rose-600/5 to-orange-600/5 pointer-events-none" />
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Nhà hàng nói gì về</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">Noko Supply</span>
              </h2>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Chị Thu Hương", restaurant: "Quán Bún Bò · Garden Grove, CA", avatar: "TH",
                  avatarColor: "from-pink-500 to-rose-500", posUser: false,
                  quote: "Từ khi dùng Noko Supply, giá nguyên liệu cố định theo tháng — tôi tính được food cost chính xác lần đầu tiên sau 3 năm mở quán.",
                  result: "Giảm 15% food cost", resultColor: "text-green-400",
                },
                {
                  name: "Anh Quốc Bảo", restaurant: "Phở Saigon · Houston, TX", avatar: "QB",
                  avatarColor: "from-indigo-500 to-purple-500", posUser: true,
                  quote: "Dùng cả POS lẫn Supply — giờ không bao giờ hết hàng giữa ca nữa. POS tự đặt hết rồi, tôi chỉ cần approve buổi sáng.",
                  result: "Không bao giờ hết hàng giữa ca", resultColor: "text-purple-400",
                },
                {
                  name: "Anh Minh Khoa", restaurant: "Cơm Tấm Ba Miền · San Jose, CA", avatar: "MK",
                  avatarColor: "from-orange-500 to-rose-500", posUser: true,
                  quote: "Trước mất 2 tiếng mỗi tuần chỉ để gọi điện đặt hàng. Giờ hệ thống tự lo, tôi không cần làm gì — dành thời gian đó lo việc khác.",
                  result: "Tiết kiệm 2h/tuần", resultColor: "text-orange-400",
                },
              ].map((t, i) => (
                <motion.div key={t.name} variants={fadeUp}>
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-card/50 backdrop-blur-xl border-white/10 hover:border-pink-500/30 transition-all duration-300 h-full">
                      <CardContent className="pt-7">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="relative">
                            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                              className={`absolute inset-0 bg-gradient-to-r ${t.avatarColor} blur-md opacity-40 rounded-full`} />
                            <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-lg border-2 border-white/15`}>{t.avatar}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-white">{t.name}</div>
                            <div className="text-sm text-gray-500">{t.restaurant}</div>
                            {t.posUser && <div className="text-xs text-indigo-400 mt-0.5">Supply + POS</div>}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                        <div className="flex items-center justify-between">
                          <div className={`text-sm font-semibold ${t.resultColor}`}>✓ {t.result}</div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, si) => (
                              <motion.div key={si} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: si * 0.08 }} viewport={{ once: true }}>
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

      {/* ── FORM ĐẶT HÀNG ────────────────────────────────────────────────────── */}
      <section id="order" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 60, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-600/10 via-rose-600/10 to-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="text-center mb-12">
              <p className="text-pink-400 font-medium text-sm uppercase tracking-widest mb-4">Bắt đầu ngay</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Sẵn sàng ổn định</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">nguồn nguyên liệu?</span>
              </h2>
              <p className="text-gray-500 text-lg">Để lại thông tin — chúng tôi gửi bảng giá và tư vấn miễn phí trong 24h.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl shadow-pink-900/20">
                <CardContent className="pt-8 pb-8">
                  <form className="space-y-5" onSubmit={handleLeadSubmit}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-gray-400">Tên nhà hàng *</label>
                        <Input
                          value={restaurantName}
                          onChange={(e) => setRestaurantName(e.target.value)}
                          placeholder="Phở Saigon"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-white/10 focus:border-pink-500 h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-gray-400">Họ và tên *</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-white/10 focus:border-pink-500 h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-gray-400">Số điện thoại *</label>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(714) 000-0000"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-white/10 focus:border-pink-500 h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-gray-400">Email *</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-white/10 focus:border-pink-500 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2.5 text-gray-400">Tiểu bang</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-md bg-input-background border border-white/10 text-foreground text-sm px-3 focus:outline-none focus:border-pink-500 transition-colors"
                      >
                        <option value="">-- Chọn tiểu bang --</option>
                        <option value="CA — California">CA — California</option>
                        <option value="TX — Texas">TX — Texas</option>
                        <option value="WA — Washington">WA — Washington</option>
                        <option value="NY — New York">NY — New York</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-400">Bạn đang dùng gì?</label>
                      <div className="space-y-2.5">
                        {[
                          { value: "supply-only", label: "Chỉ cần Supply" },
                          { value: "pos-supply", label: "Đang dùng Noko POS + cần Supply" },
                          { value: "both-new", label: "Chưa dùng gì, muốn tìm hiểu cả 2" },
                        ].map((opt) => (
                          <label key={opt.value} className={`flex items-center gap-3 group ${isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${posUser === opt.value ? "border-pink-500 bg-pink-500" : "border-white/20 group-hover:border-white/40"}`}
                              onClick={() => !isSubmitting && setPosUser(opt.value)}>
                              {posUser === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className={`text-sm transition-colors ${posUser === opt.value ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-400">Nhu cầu chính (chọn nhiều)</label>
                      <div className="flex flex-wrap gap-2">
                        {["Rau củ", "Thịt & Hải sản", "Gia vị", "Đồ khô", "Tất cả"].map((n) => (
                          <button key={n} type="button" disabled={isSubmitting} onClick={() => toggleNeed(n)}
                            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 disabled:opacity-60 ${needs.includes(n)
                              ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/20"
                              : "bg-card/50 border border-white/10 text-gray-400 hover:border-white/25 hover:text-gray-300"}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 border-0 shadow-2xl shadow-pink-500/40 group disabled:opacity-60"
                      >
                        {isSubmitting ? "Đang gửi..." : "Nhận báo giá ngay"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-center text-sm text-gray-600">Phản hồi trong 24h — không spam — tư vấn bằng tiếng Việt</p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
