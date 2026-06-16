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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B2B6B] via-[#E8C97A] to-[#F5F0E8] origin-left z-50"
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
  const [activeTab, setActiveTab] = useState("All");
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

      toast.success("Quote request sent! We'll be in touch within 24 hours.");
      setRestaurantName("");
      setName("");
      setPhone("");
      setEmail("");
      setState("");
      setPosUser("supply-only");
      setNeeds([]);
    } catch {
      toast.error("Unable to submit request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const tabs = ["All", "Produce", "Meat & Seafood", "Sauces & Seasonings", "Dry Goods", "Packaging"];

  const products = [
    { name: "Fresh beef bones", unit: "kg", tab: "Meat & Seafood", badge: "Bestseller", badgeColor: "from-[#E8C97A] to-red-500", icon: "🥩" },
    { name: "Water spinach", unit: "kg", tab: "Produce", badge: "Bestseller", badgeColor: "from-green-500 to-emerald-500", icon: "🥬" },
    { name: "Phú Quốc fish sauce", unit: "case", tab: "Sauces & Seasonings", badge: "Bestseller", badgeColor: "from-[#E8C97A] to-red-500", icon: "🍶" },
    { name: "Frozen seafood mix", unit: "kg", tab: "Meat & Seafood", badge: "New", badgeColor: "from-[#F5F0E8] to-cyan-500", icon: "🦐" },
    { name: "Jasmine rice", unit: "case", tab: "Dry Goods", badge: "Bestseller", badgeColor: "from-[#E8C97A] to-red-500", icon: "🌾" },
    { name: "Kraft take-out containers", unit: "box", tab: "Packaging", badge: "New", badgeColor: "from-[#F5F0E8] to-cyan-500", icon: "📦" },
    { name: "Fresh bean sprouts", unit: "kg", tab: "Produce", badge: null, badgeColor: "", icon: "🌱" },
    { name: "Hoisin sauce", unit: "case", tab: "Sauces & Seasonings", badge: null, badgeColor: "", icon: "🫙" },
    { name: "Pork belly", unit: "kg", tab: "Meat & Seafood", badge: null, badgeColor: "", icon: "🥓" },
  ];

  const filtered = activeTab === "All" ? products : products.filter(p => p.tab === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1B2B6B] via-[#1B2B6B] to-[#0F1F52] overflow-x-hidden">
      <ScrollProgress />

      <motion.div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,240,232,0.09) 0%, transparent 70%)", left: mouse.x - 250, top: mouse.y - 250 }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#F5F0E8]/10 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#E8C97A]/10 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#F5F0E8]/10 to-[#E8C97A]/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r bg-[#F5F0E8]/10 border border-[#F5F0E8]/20 mb-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
              <ShoppingBasket className="w-4 h-4 text-[#E8C97A]" />
            </motion.div>
            <span className="text-sm text-[#F5F0E8] font-medium">Quality Ingredients — On-Time Delivery</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">Reliable supply</span>
            <br />
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] bg-clip-text text-transparent">for Vietnamese restaurants</span>
            <br />
            <span className="bg-gradient-to-r from-[#F5F0E8]/80 to-[#C4BAA8] bg-clip-text text-transparent text-4xl md:text-5xl">in the US</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-[#C4BAA8] mb-10 leading-relaxed max-w-2xl mx-auto">
            Noko Supply delivers premium F&B ingredients — easy ordering, fast delivery, and direct integration with Noko POS.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#products">
                <Button size="lg" className="text-lg px-10 h-14 bg-gradient-to-r bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group">
                  Browse Our Catalog <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#order">
                <Button size="lg" variant="outline" className="text-lg px-10 h-14 border-[#F5F0E8]/20 hover:bg-[#F5F0E8]/10 hover:border-[#F5F0E8]/40">
                  Contact Us to Order
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A89880]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-[#E8C97A]", "bg-[#E8C97A]", "bg-[#C4BAA8]"].map((c, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-background`} />
                ))}
              </div>
              <span>500+ restaurants trust us</span>
            </div>
            <div className="w-px h-4 bg-[#F5F0E8]/10" />
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#E8C97A]" />
              <span>Delivery in California & Texas</span>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#F5F0E8]/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-[#E8C97A] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F52]/20 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Restaurant owners are dealing with</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">any of these?</span>
                </h2>
              </motion.div>

              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { text: "Inconsistent ingredients — quality varies order to order", sub: "Hard to keep dishes consistent when every delivery is different" },
                  { text: "Fluctuating prices make food cost hard to calculate", sub: "Can't plan monthly costs with confidence" },
                  { text: "Ordering from multiple suppliers wastes time", sub: "3–5 calls every week just to place ingredient orders" },
                  { text: "Late deliveries disrupt your entire day", sub: "Run out mid-shift — 86 items or scramble to buy retail" },
                ].map((pain, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <motion.div whileHover={{ x: 4, scale: 1.01 }} transition={{ duration: 0.2 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-[#243580]/80 border border-[#F5F0E8]/8 hover:border-[#E8C97A]/40 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#E8C97A]/15 border border-[#E8C97A]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-[#E8C97A]" />
                      </div>
                      <div>
                        <p className="text-[#F5F0E8] font-medium leading-snug mb-1">{pain.text}</p>
                        <p className="text-sm text-[#A89880]">{pain.sub}</p>
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F52]/20 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                <p className="text-[#E8C97A] font-medium text-sm uppercase tracking-widest mb-5">About Noko Supply</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">We understand what restaurants</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#F5F0E8] to-[#E8C97A] bg-clip-text text-transparent">need — and when they need it.</span>
                </h2>
                <p className="text-[#C4BAA8] text-lg leading-relaxed mb-10">
                  Noko Supply was built by people in the F&B industry — we know what restaurants need, when they need it, and where they need it delivered.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Leaf, title: "Traceable Sourcing", desc: "Direct from farms & producers — no middlemen, full traceability from source to your kitchen.", color: "from-green-600 to-emerald-600" },
                    { icon: DollarSign, title: "Fixed Monthly Pricing", desc: "One quote, valid all month — calculate food cost accurately without worrying about price swings.", color: "from-[#F5F0E8] to-[#C4BAA8]" },
                    { icon: Package, title: "One Supplier — Everything You Need", desc: "Produce, meat & seafood, seasonings, dry goods, packaging — all from a single trusted partner.", color: "from-[#E8C97A] to-[#C4BAA8]" },
                  ].map((pt) => (
                    <motion.div key={pt.title} whileHover={{ x: 8 }} transition={{ duration: 0.2 }} className="flex items-start gap-4">
                      <div className={`w-11 h-11 bg-gradient-to-br ${pt.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <pt.icon className="w-5 h-5 text-[#F5F0E8]" />
                      </div>
                      <div>
                        <h4 className="text-[#F5F0E8] font-semibold mb-1">{pt.title}</h4>
                        <p className="text-[#A89880] text-sm leading-relaxed">{pt.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
                <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/10 to-[#E8C97A]/10 blur-3xl rounded-3xl" />
                <div className="relative bg-[#243580]/80 backdrop-blur-xl border border-[#F5F0E8]/10 rounded-3xl p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { value: "500+", label: "Restaurants", color: "from-[#F5F0E8] to-[#C4BAA8]" },
                      { value: "2×/week", label: "Delivery", color: "from-[#E8C97A] to-[#C4BAA8]" },
                      { value: "100%", label: "Traceable", color: "from-green-500 to-emerald-500" },
                      { value: "24h", label: "Support", color: "from-[#E8C97A] to-[#C4BAA8]" },
                    ].map((s, i) => (
                      <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
                        className="bg-[#1B2B6B]/60 rounded-2xl p-5 border border-[#F5F0E8]/8">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>{s.value}</div>
                        <div className="text-xs text-[#A89880]">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Orders delivered on time", pct: 98 },
                      { label: "Customers who reorder", pct: 94 },
                      { label: "Satisfied with quality", pct: 97 },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#C4BAA8]">{b.label}</span>
                          <span className="text-[#E8C97A] font-medium">{b.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-[#F5F0E8]/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] rounded-full" />
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F52]/30 via-[#0F1F52]/20 to-[#0F1F52]/10" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#F5F0E8]/10 via-[#E8C97A]/10 to-[#F5F0E8]/10 rounded-full blur-3xl"
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F5F0E8]/10 to-[#E8C97A]/10 border border-[#F5F0E8]/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8C97A] animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-[#F5F0E8] to-[#E8C97A] bg-clip-text text-transparent">
                  Exclusive Integration
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">
                  Using Noko POS?
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] bg-clip-text text-transparent">
                  Auto-ordering — no manual work required
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
                  "POS tracks inventory in real time",
                  "When stock hits threshold → auto-creates a Supply order",
                  "Restaurant owner just approves in the app",
                  "Supply prices sync into POS food cost reports",
                ].map((f) => (
                  <motion.div key={f} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E8C97A] flex-shrink-0 mt-0.5" />
                    <p className="text-[#C4BAA8] text-sm leading-relaxed">{f}</p>
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-sm text-[#A89880] mb-6 italic">
                Not using Noko POS yet? You can still order from Supply as usual.
              </p>

              <Link
                to="/pos"
                className="inline-flex items-center text-sm font-medium text-[#F5F0E8] hover:text-[#F5F0E8] transition-colors group"
              >
                Learn More About Noko POS
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
                className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/10 to-[#E8C97A]/10 blur-3xl rounded-3xl"
              />
              <div className="relative bg-[#243580]/80 backdrop-blur-xl border border-[#F5F0E8]/10 rounded-3xl p-7 space-y-4">
                {[
                  { label: "Noko POS", sub: "Beef pho broth: 2 kg left ↓", status: "Low", statusColor: "text-orange-400 bg-orange-400/10", iconBg: "from-[#F5F0E8] to-[#E8C97A]", icon: "💻", cardClass: "bg-[#F5F0E8]/10 border-[#F5F0E8]/20" },
                  { label: "Auto-generated order", sub: "Beef pho broth · 10 kg · Noko Supply", status: "Pending", statusColor: "text-[#F5F0E8] bg-[#E8C97A]/10", iconBg: "from-[#F5F0E8] to-[#C4BAA8]", icon: "📋", cardClass: "bg-[#F5F0E8]/10 border-[#F5F0E8]/20" },
                  { label: "Owner approves", sub: "One tap in the app — done", status: "✓ Approved", statusColor: "text-green-400 bg-green-500/10", iconBg: "from-[#E8C97A] to-[#C4BAA8]", icon: "✅", cardClass: "bg-[#E8C97A]/10 border-[#E8C97A]/20" },
                  { label: "Delivery & update", sub: "POS food cost updates automatically", status: "Done", statusColor: "text-green-400 bg-green-500/10", iconBg: "from-green-600 to-emerald-600", icon: "🚚", cardClass: "bg-green-600/10 border-green-500/20" },
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
                        <div className="text-sm font-semibold text-[#F5F0E8]">{step.label}</div>
                        <div className="text-xs text-[#A89880] truncate">{step.sub}</div>
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
                          <div className="w-px h-4 bg-gradient-to-b from-[#F5F0E8]/50 to-[#E8C97A]/50" />
                          <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[3px] border-l-transparent border-r-transparent border-t-[#E8C97A]/60" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F52]/20 to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <p className="text-[#E8C97A] font-medium text-sm uppercase tracking-widest mb-4">Catalog</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">What we</span>
              <br />
              <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] bg-clip-text text-transparent">supply</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tabs.map((tab) => (
              <motion.button key={tab} onClick={() => setActiveTab(tab)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab
                  ? "bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] text-[#F5F0E8] shadow-lg shadow-[#F5F0E8]/20"
                  : "bg-[#243580]/80 border border-[#F5F0E8]/10 text-[#C4BAA8] hover:text-[#F5F0E8] hover:border-[#F5F0E8]/20"}`}>
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
                  <Card className="bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 hover:border-[#F5F0E8]/20 transition-all duration-300 group overflow-hidden">
                    <CardContent className="pt-6">
                      {/* Placeholder image area */}
                      <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-[#F5F0E8]/10 to-[#F5F0E8]/10 border border-[#F5F0E8]/8 flex items-center justify-center mb-4 overflow-hidden">
                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="text-5xl">{p.icon}</motion.div>
                        {p.badge && (
                          <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${p.badgeColor} text-[#F5F0E8]`}>
                            {p.badge}
                          </div>
                        )}
                      </div>
                      <h3 className="text-[#F5F0E8] font-semibold mb-1 group-hover:text-[#F5F0E8] transition-colors">{p.name}</h3>
                      <p className="text-xs text-[#A89880] mb-4">Unit: {p.unit}</p>
                      <a href="#order">
                        <Button size="sm" variant="outline" className="w-full border-[#F5F0E8]/10 hover:border-[#E8C97A]/40 hover:bg-[#E8C97A]/5 text-sm group/btn">
                          Request a Quote
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F52]/20 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Why choose</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] bg-clip-text text-transparent">Noko Supply?</span>
              </h2>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Delivery Twice a Week", desc: "On time, to the right location — no chasing, no reminders needed.", color: "from-[#F5F0E8] to-[#C4BAA8]", glow: "shadow-[#F5F0E8]/20" },
                { icon: DollarSign, title: "Transparent Pricing", desc: "Fixed monthly quotes — calculate food cost accurately without price surprises.", color: "from-[#E8C97A] to-[#C4BAA8]", glow: "shadow-[#F5F0E8]/20" },
                { icon: RefreshCw, title: "Easy Returns", desc: "Product doesn't meet standards — replaced on your next delivery, hassle-free.", color: "from-[#E8C97A] to-[#C4BAA8]", glow: "shadow-[#F5F0E8]/20" },
                { icon: Headphones, title: "7-Day Support", desc: "Issues any day of the week — call and someone will answer.", color: "from-red-600 to-[#C4BAA8]", glow: "shadow-red-500/20" },
              ].map((f) => (
                <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.03 }} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl ${f.glow} relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/20 to-transparent rounded-2xl" />
                    <f.icon className="w-7 h-7 text-[#F5F0E8] relative z-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#F5F0E8] mb-2 group-hover:text-[#F5F0E8] transition-colors">{f.title}</h3>
                  <p className="text-sm text-[#A89880] leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] pointer-events-none" />
          <div className="container relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">What restaurants say about</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] bg-clip-text text-transparent">Noko Supply</span>
              </h2>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Thu Hương", restaurant: "Quán Bún Bò · Garden Grove, CA", avatar: "TH",
                  avatarColor: "from-[#F5F0E8] to-[#C4BAA8]", posUser: false,
                  quote: "Since switching to Noko Supply, my ingredient prices are fixed monthly — I calculated food cost accurately for the first time in 3 years of running my restaurant.",
                  result: "15% lower food cost", resultColor: "text-green-400",
                },
                {
                  name: "Quốc Bảo", restaurant: "Phở Saigon · Houston, TX", avatar: "QB",
                  avatarColor: "from-[#F5F0E8] to-[#E8C97A]", posUser: true,
                  quote: "Using both POS and Supply — I never run out mid-shift anymore. POS handles all the ordering; I just approve in the morning.",
                  result: "Never out of stock mid-shift", resultColor: "text-[#E8C97A]",
                },
                {
                  name: "Minh Khoa", restaurant: "Cơm Tấm Ba Miền · San Jose, CA", avatar: "MK",
                  avatarColor: "from-[#E8C97A] to-[#C4BAA8]", posUser: true,
                  quote: "I used to spend 2 hours a week just calling to place orders. Now the system handles it — I use that time for everything else.",
                  result: "Save 2 hrs/week", resultColor: "text-orange-400",
                },
              ].map((t, i) => (
                <motion.div key={t.name} variants={fadeUp}>
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 hover:border-[#F5F0E8]/20 transition-all duration-300 h-full">
                      <CardContent className="pt-7">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="relative">
                            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                              className={`absolute inset-0 bg-gradient-to-r ${t.avatarColor} blur-md opacity-40 rounded-full`} />
                            <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-[#F5F0E8] font-bold text-lg border-2 border-[#F5F0E8]/15`}>{t.avatar}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[#F5F0E8]">{t.name}</div>
                            <div className="text-sm text-[#A89880]">{t.restaurant}</div>
                            {t.posUser && <div className="text-xs text-[#E8C97A] mt-0.5">Supply + POS</div>}
                          </div>
                        </div>
                        <p className="text-[#C4BAA8] text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="text-center mb-12">
              <p className="text-[#E8C97A] font-medium text-sm uppercase tracking-widest mb-4">Get Started</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Ready to stabilize</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8] bg-clip-text text-transparent">your ingredient supply?</span>
              </h2>
              <p className="text-[#A89880] text-lg">Leave your details — we'll send pricing and a free consultation within 24 hours.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 shadow-2xl shadow-[#F5F0E8]/20">
                <CardContent className="pt-8 pb-8">
                  <form className="space-y-5" onSubmit={handleLeadSubmit}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-[#C4BAA8]">Restaurant Name *</label>
                        <Input
                          value={restaurantName}
                          onChange={(e) => setRestaurantName(e.target.value)}
                          placeholder="Phở Saigon"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-[#C4BAA8]">Full Name *</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Smith"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-[#C4BAA8]">Phone Number *</label>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(714) 000-0000"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2.5 text-[#C4BAA8]">Email *</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          required
                          disabled={isSubmitting}
                          className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2.5 text-[#C4BAA8]">State</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-md bg-input-background border border-[#F5F0E8]/10 text-foreground text-sm px-3 focus:outline-none focus:border-[#F5F0E8]/20 transition-colors"
                      >
                        <option value="">-- Select a state --</option>
                        <option value="CA — California">CA — California</option>
                        <option value="TX — Texas">TX — Texas</option>
                        <option value="WA — Washington">WA — Washington</option>
                        <option value="NY — New York">NY — New York</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-[#C4BAA8]">What are you using today?</label>
                      <div className="space-y-2.5">
                        {[
                          { value: "supply-only", label: "Supply only" },
                          { value: "pos-supply", label: "Using Noko POS + need Supply" },
                          { value: "both-new", label: "New to both — want to learn about everything" },
                        ].map((opt) => (
                          <label key={opt.value} className={`flex items-center gap-3 group ${isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${posUser === opt.value ? "border-[#F5F0E8]/20 bg-[#E8C97A]" : "border-[#F5F0E8]/20 group-hover:border-[#F5F0E8]/40"}`}
                              onClick={() => !isSubmitting && setPosUser(opt.value)}>
                              {posUser === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-[#F5F0E8]" />}
                            </div>
                            <span className={`text-sm transition-colors ${posUser === opt.value ? "text-[#F5F0E8]" : "text-[#C4BAA8] group-hover:text-[#C4BAA8]"}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-[#C4BAA8]">Primary needs (select multiple)</label>
                      <div className="flex flex-wrap gap-2">
                        {["Produce", "Meat & Seafood", "Seasonings", "Dry Goods", "All"].map((n) => (
                          <button key={n} type="button" disabled={isSubmitting} onClick={() => toggleNeed(n)}
                            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 disabled:opacity-60 ${needs.includes(n)
                              ? "bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] text-[#F5F0E8] shadow-md shadow-[#F5F0E8]/20"
                              : "bg-[#243580]/80 border border-[#F5F0E8]/10 text-[#C4BAA8] hover:border-[#F5F0E8]/20 hover:text-[#C4BAA8]"}`}>
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
                        className="w-full h-14 text-lg bg-gradient-to-r bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : "Get a Quote Now"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-center text-sm text-[#A89880]">Response within 24 hours — no spam — consultation available in Vietnamese</p>
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
