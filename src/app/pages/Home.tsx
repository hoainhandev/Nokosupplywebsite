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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B2B6B] via-[#E8C97A] to-[#F5F0E8] origin-left z-50"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1B2B6B] via-[#1B2B6B] to-[#0F1F52] overflow-x-hidden">
      <ScrollProgress />

      {/* Cursor glow */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245,240,232,0.12) 0%, transparent 70%)",
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
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#F5F0E8]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#E8C97A]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#F5F0E8]/10 to-[#E8C97A]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r bg-[#F5F0E8]/10 border border-[#F5F0E8]/20 mb-10"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
              <Star className="w-4 h-4 text-[#E8C97A]" />
            </motion.div>
            <span className="text-sm text-[#F5F0E8] font-medium">#1 F&B Ecosystem for Vietnamese in the US</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              Build & operate
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              your restaurant the right way
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#F5F0E8]/80 to-[#C4BAA8] bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
              — from day one
            </span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-[#C4BAA8] mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Noko provides the full infrastructure for Vietnamese F&B business owners in the US to run professionally and grow sustainably.
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
                  className="text-lg px-10 h-14 bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group"
                >
                  Explore the Ecosystem
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-14 border-[#F5F0E8]/20 hover:bg-[#F5F0E8]/10 hover:border-[#F5F0E8]/40"
                >
                  See the Noko Story
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
            className="w-6 h-10 border-2 border-[#F5F0E8]/20 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-[#E8C97A] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section id="about" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F52]/20 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">
                  Vietnamese opening restaurants in the US
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
                  are running into this...
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
                  title: "Operating on gut instinct",
                  desc: "No tracking system — every decision relies on guesswork and personal experience. Easy to get wrong, hard to fix.",
                  color: "from-[#E8C97A] to-[#C4BAA8]",
                  border: "border-orange-500/20",
                  iconColor: "text-orange-400",
                },
                {
                  icon: PackageSearch,
                  title: "Struggling to source ingredients",
                  desc: "Finding quality ingredients at fair prices in the US is a major challenge for most Vietnamese restaurant owners.",
                  color: "from-yellow-500/20 to-yellow-500/5",
                  border: "border-yellow-500/20",
                  iconColor: "text-yellow-400",
                },
                {
                  icon: BookOpen,
                  title: "Lacking business know-how",
                  desc: "The US market has different regulations, consumer culture, and operations — with no structured guidance to show the way.",
                  color: "from-[#E8C97A] to-[#C4BAA8]",
                  border: "border-[#E8C97A]/20",
                  iconColor: "text-[#E8C97A]",
                },
              ].map((pain) => (
                <motion.div key={pain.title} variants={item}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`bg-gradient-to-br ${pain.color} border ${pain.border} backdrop-blur-xl h-full relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F0E8]/10 rounded-full -translate-y-16 translate-x-16" />
                      <CardContent className="pt-8">
                        <div className={`w-12 h-12 rounded-xl bg-[#F5F0E8]/10 border ${pain.border} flex items-center justify-center mb-5`}>
                          <pain.icon className={`w-6 h-6 ${pain.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-[#F5F0E8] mb-3">{pain.title}</h3>
                        <p className="text-[#C4BAA8] text-sm leading-relaxed">{pain.desc}</p>
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C97A] to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#F5F0E8]/10 via-[#E8C97A]/10 to-[#F5F0E8]/10 rounded-full blur-3xl"
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
            <p className="text-[#E8C97A] font-medium text-sm uppercase tracking-widest mb-4">Ecosystem</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Three solutions.</span>
              <br />
              <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
                One ecosystem.
              </span>
            </h2>
            <p className="text-[#A89880] max-w-xl mx-auto text-lg">
              Each product solves a specific challenge — together they form a complete F&B platform.
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
                tagline: "Restaurant chain operations solution",
                desc: "A next-generation POS system built for Vietnamese restaurants in the US — order management, staff tracking, and real-time reporting.",
                href: "/pos",
                gradient: "from-[#F5F0E8] to-[#E8C97A]",
                glow: "shadow-[#F5F0E8]/20",
                border: "hover:border-[#E8C97A]/40",
                features: ["Order management", "Real-time reporting", "Multi-location"],
              },
              {
                icon: GraduationCap,
                name: "Noko Academy",
                tagline: "Professional F&B training",
                desc: "Hands-on training for restaurant owners and staff — from operations and marketing to financial management in the US market.",
                href: "/academy",
                gradient: "from-[#E8C97A] to-[#F5F0E8]",
                glow: "shadow-[#F5F0E8]/20",
                border: "hover:border-[#E8C97A]/40",
                features: ["Hands-on courses", "1-on-1 mentoring", "Support community"],
                featured: true,
              },
              {
                icon: ShoppingBasket,
                name: "Noko Supply",
                tagline: "Premium ingredients from farm to table",
                desc: "High-quality F&B ingredients at competitive prices, delivered across California — specially curated for Vietnamese restaurants.",
                href: "/supply",
                gradient: "from-[#F5F0E8] to-[#C4BAA8]",
                glow: "shadow-[#F5F0E8]/20",
                border: "hover:border-[#E8C97A]/40",
                features: ["Premium ingredients", "Doorstep delivery", "Wholesale pricing"],
              },
            ].map((svc) => (
              <motion.div key={svc.name} variants={item} className="relative">
                {svc.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#E8C97A] to-[#F5F0E8] text-[#F5F0E8] shadow-lg shadow-[#F5F0E8]/20">
                      Most popular
                    </span>
                  </div>
                )}
                <Link to={svc.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className={`bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 ${svc.border} transition-all duration-300 h-full relative overflow-hidden group cursor-pointer`}>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <CardContent className="pt-8 flex flex-col h-full">
                        <div className={`w-14 h-14 bg-gradient-to-br ${svc.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl ${svc.glow} relative`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/20 to-transparent rounded-2xl" />
                          <svc.icon className="w-7 h-7 text-[#F5F0E8] relative z-10" />
                        </div>

                        <div className="text-xs font-semibold text-[#A89880] uppercase tracking-widest mb-2">{svc.tagline}</div>
                        <h3 className="text-2xl font-bold text-[#F5F0E8] mb-4">{svc.name}</h3>
                        <p className="text-[#C4BAA8] text-sm leading-relaxed mb-6 flex-1">{svc.desc}</p>

                        <ul className="space-y-2 mb-8">
                          {svc.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-[#C4BAA8]">
                              <CheckCircle2 className="w-4 h-4 text-[#E8C97A] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant="outline"
                          className="w-full border-[#F5F0E8]/15 hover:border-[#F5F0E8]/30 hover:bg-[#F5F0E8]/10 group/btn"
                        >
                          Learn More
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8]/10 via-[#E8C97A]/10 to-[#F5F0E8]/10" />
            <motion.div
              animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/4 w-80 h-80 bg-[#F5F0E8]/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#E8C97A]/10 rounded-full blur-3xl"
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
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Trusted by</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
                  500+ Vietnamese restaurants in the US
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
                { value: "500+", label: "Restaurants using Noko", sub: "in California & 3 other states" },
                { value: "4", label: "States served", sub: "CA · TX · WA · GA" },
                { value: "98%", label: "Customer satisfaction", sub: "based on 2024 survey" },
              ].map((stat, i) => (
                <motion.div key={stat.label} variants={item} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[#F5F0E8] font-semibold text-lg mb-1">{stat.label}</div>
                  <div className="text-[#A89880] text-sm">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Marquee brand logos */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1B2B6B] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1B2B6B] to-transparent z-10" />
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-6 w-max"
              >
                {[
                  { name: "King Banh Mi", gradient: "from-yellow-500 to-[#C4BAA8]" },
                  { name: "Pizza Master", gradient: "from-red-500 to-red-700" },
                  { name: "Pho Viet", gradient: "from-green-500 to-teal-600" },
                  { name: "Cafe 24H", gradient: "from-[#E8C97A] to-[#C4BAA8]" },
                  { name: "Bun Bo Hue", gradient: "from-[#E8C97A] to-red-500" },
                  { name: "Saigon Kitchen", gradient: "from-teal-500 to-cyan-500" },
                  // Duplicate for seamless loop
                  { name: "King Banh Mi", gradient: "from-yellow-500 to-[#C4BAA8]" },
                  { name: "Pizza Master", gradient: "from-red-500 to-red-700" },
                  { name: "Pho Viet", gradient: "from-green-500 to-teal-600" },
                  { name: "Cafe 24H", gradient: "from-[#E8C97A] to-[#C4BAA8]" },
                  { name: "Bun Bo Hue", gradient: "from-[#E8C97A] to-red-500" },
                  { name: "Saigon Kitchen", gradient: "from-teal-500 to-cyan-500" },
                ].map((brand, i) => (
                  <div
                    key={`${brand.name}-${i}`}
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-br ${brand.gradient} text-[#F5F0E8] font-bold text-base shadow-xl`}
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F5F0E8]/10 via-[#E8C97A]/10 to-[#F5F0E8]/10 rounded-full blur-3xl"
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
            <p className="text-[#E8C97A] font-medium text-sm uppercase tracking-widest mb-6">Get started today</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">
                Ready to build
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
                your restaurant the right way?
              </span>
            </h2>
            <p className="text-[#A89880] text-lg mb-12 max-w-xl mx-auto">
              Noko's advisory team is ready to partner with you — from day one through stable operations.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link to="/pos#contact">
                <Button
                  size="lg"
                  className="text-lg px-14 h-16 bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group rounded-2xl"
                >
                  Get a free consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <p className="text-[#A89880] text-sm mt-6">No cost · Response within 24 hours · Vietnamese-language support</p>
          </motion.div>
        </div>
        </div>
      </section>
    </div>
  );
}
