import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  ShoppingCart,
  BarChart3,
  Users,
  Smartphone,
  Cloud,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ParallaxSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B2B6B] via-[#E8C97A] to-[#F5F0E8] transform origin-left z-50"
      style={{ scaleX }}
    />
  );
}

function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function NokoPOS() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1B2B6B] via-[#1B2B6B] to-[#0F1F52] overflow-x-hidden">
      <ScrollProgress />

      {/* Cursor Glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245,240,232,0.15) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#F5F0E8]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#E8C97A]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#F5F0E8] to-[#F5F0E8] rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r bg-[#F5F0E8]/10 border border-[#F5F0E8]/20 mb-8"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <Star className="w-4 h-4 text-[#E8C97A]" />
                </motion.div>
                <span className="text-sm text-[#F5F0E8]">Trusted by 500+ restaurants</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent"
                >
                  POS Solution
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent"
                >
                  Next Generation
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-[#C4BAA8] mb-10 leading-relaxed"
              >
                Elevate guest experiences and streamline restaurant operations with cutting-edge AI and cloud technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-lg px-10 h-14 bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="text-lg px-10 h-14 border-[#F5F0E8]/20 hover:bg-[#F5F0E8]/10 hover:border-[#F5F0E8]/40">
                    View Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <FloatingElement delay={0.5}>
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] to-[#E8C97A] blur-3xl opacity-30 rounded-3xl"
                />
                <motion.div whileHover={{ scale: 1.02, rotateY: 5 }} transition={{ duration: 0.3 }} className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1742238621804-62e3b4947d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwUE9TJTIwc3lzdGVtfGVufDF8fHx8MTc3MjUzMDc1OHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Modern POS System"
                    className="rounded-3xl shadow-2xl w-full max-w-full border border-[#F5F0E8]/10"
                  />
                </motion.div>
              </motion.div>
            </FloatingElement>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#F5F0E8]/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-[#E8C97A] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Clients */}
      <ParallaxSection>
        <section id="clients" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C97A] to-transparent" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Trusted By</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#F5F0E8] bg-clip-text text-transparent">Leading Brands</span>
              </h2>
              <p className="text-xl text-[#A89880] max-w-2xl mx-auto">Over 500 restaurants trust and grow with Noko POS</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            >
              {[
                { name: "King Bánh Mì", gradient: "from-yellow-400 to-[#C4BAA8]" },
                { name: "Pizza Master", gradient: "from-red-500 to-red-700" },
                { name: "Phở Việt", gradient: "from-green-500 to-teal-600" },
                { name: "Café 24h", gradient: "from-[#E8C97A] to-[#C4BAA8]" },
              ].map((brand, index) => (
                <motion.div key={brand.name} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="relative group">
                  <motion.div
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} blur-xl rounded-2xl`}
                  />
                  <div className={`relative bg-gradient-to-br ${brand.gradient} text-[#F5F0E8] font-bold text-xl md:text-2xl px-8 py-8 rounded-2xl shadow-2xl flex items-center justify-center text-center`}>
                    {brand.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "King Bánh Mì", branches: "15 locations",
                  quote: "Noko POS helps us manage 15 locations more efficiently. Revenue increased 40% in just 6 months.",
                  img: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FzaGllciUyMHN5c3RlbXxlbnwxfHx8fDE3NzI1MzA3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  name: "Pizza Master", branches: "8 locations",
                  quote: "The system is simple and easy to use. New staff can be trained in 30 minutes and use it confidently.",
                  img: "https://images.unsplash.com/photo-1763867641258-c8ea40860f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwc3RhZmYlMjB0YWJsZXQlMjBvcmRlcnxlbnwxfHx8fDE3NzI1MzA3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
                },
                {
                  name: "Phở Việt", branches: "20 locations",
                  quote: "Detailed reports help us make accurate business decisions and optimize operating costs.",
                  img: "https://images.unsplash.com/photo-1771853327796-976c8862362f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNTMwNzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
                },
              ].map((client, index) => (
                <motion.div key={client.name} variants={itemVariants}>
                  <motion.div whileHover={{ y: -10, rotateX: 5 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 hover:border-[#E8C97A]/40 transition-all duration-300 h-full">
                      <CardContent className="pt-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] to-[#E8C97A] blur-md opacity-50 rounded-full"
                            />
                            <ImageWithFallback src={client.img} alt={client.name} className="relative w-16 h-16 max-w-full rounded-full object-cover border-2 border-[#F5F0E8]/20" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#F5F0E8] text-lg">{client.name}</div>
                            <div className="text-sm text-[#A89880]">{client.branches}</div>
                          </div>
                        </div>
                        <p className="text-[#C4BAA8] leading-relaxed">&ldquo;{client.quote}&rdquo;</p>
                        <div className="flex gap-1 mt-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
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

      {/* Features */}
      <ParallaxSection>
        <section id="features" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C97A] to-transparent" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Powerful</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#F5F0E8] bg-clip-text text-transparent">Features</span>
              </h2>
              <p className="text-xl text-[#A89880] max-w-2xl mx-auto">Everything you need to run your restaurant efficiently</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { icon: ShoppingCart, title: "Order Management", desc: "Process orders quickly, split and merge tables with ease, and support multiple payment methods.", color: "from-[#F5F0E8] to-cyan-500" },
                { icon: BarChart3, title: "Detailed Reporting", desc: "Track revenue, costs, and top-selling dishes with clear, visual reports.", color: "from-green-500 to-emerald-500" },
                { icon: Users, title: "Staff Management", desc: "Granular permissions, shift tracking, and automated payroll for your team.", color: "from-[#E8C97A] to-[#F5F0E8]" },
                { icon: Smartphone, title: "Multi-Platform", desc: "Works on desktop, tablet, and phone. Real-time data sync across all devices.", color: "from-[#E8C97A] to-red-500" },
                { icon: Cloud, title: "Cloud", desc: "Data stored securely in the cloud. Access anywhere, anytime with an internet connection.", color: "from-teal-500 to-cyan-500" },
                { icon: Zap, title: "Delivery Integration", desc: "Connect easily with delivery platforms like Grab, Shopee Food, and GoFood.", color: "from-yellow-500 to-[#C4BAA8]" },
              ].map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 hover:border-[#E8C97A]/40 transition-all duration-300 group h-full relative overflow-hidden">
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] to-[#F5F0E8]" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                      <CardContent className="pt-8 relative">
                        <motion.div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative`} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/20 to-transparent rounded-2xl" />
                          <feature.icon className="w-7 h-7 text-[#F5F0E8] relative z-10" />
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-3 text-[#F5F0E8] group-hover:text-[#F5F0E8] transition-colors">{feature.title}</h3>
                        <p className="text-[#A89880] leading-relaxed">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── KẾT NỐI NOKO SUPPLY ──────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#E8C97A]" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#E8C97A] rounded-full blur-3xl"
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
                <span className="text-sm font-medium bg-gradient-to-r from-[#F5F0E8] to-[#F5F0E8] bg-clip-text text-transparent">
                  Exclusive Integration
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">
                  Connect with Noko Supply
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
                  Auto Ordering — No Manual Work
                </span>
              </h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="space-y-4 mb-8"
              >
                {[
                  "POS tracks inventory in real time",
                  "When stock hits threshold → auto-create Supply order",
                  "Restaurant Owner approves with one tap in the app",
                  "Supply prices sync into POS food cost reports",
                ].map((f) => (
                  <motion.div key={f} variants={itemVariants} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E8C97A] flex-shrink-0 mt-0.5" />
                    <p className="text-[#C4BAA8] text-sm leading-relaxed">{f}</p>
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-sm text-[#A89880] mb-6 italic">
                Don't need Supply yet? POS works fully on its own.
              </p>

              <Link
                to="/supply"
                className="inline-flex items-center text-sm font-medium text-[#F5F0E8] hover:text-[#E8C97A] transition-colors group"
              >
                View Noko Supply
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
                className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] to-[#F5F0E8] blur-3xl rounded-3xl"
              />
              <div className="relative bg-[#243580]/80 backdrop-blur-xl border border-[#F5F0E8]/10 rounded-3xl p-7 space-y-4">
                {[
                  { label: "Noko POS", sub: "Beef Pho: 2 kg left ↓", status: "Low", statusColor: "text-orange-400 bg-orange-400/10", iconBg: "from-[#F5F0E8] to-[#E8C97A]", icon: "💻", cardClass: "bg-[#F5F0E8]/10 border-[#F5F0E8]/20" },
                  { label: "Auto Order Created", sub: "Beef Pho · 10 kg · Noko Supply", status: "Pending Approval", statusColor: "text-[#F5F0E8] bg-[#E8C97A]/10", iconBg: "from-[#E8C97A] to-[#C4BAA8]", icon: "📋", cardClass: "bg-[#E8C97A]/10 border-[#F5F0E8]/20" },
                  { label: "Restaurant Owner Approves", sub: "One tap in the app — done", status: "✓ Approved", statusColor: "text-green-400 bg-green-500/10", iconBg: "from-[#F5F0E8] to-[#E8C97A]", icon: "✅", cardClass: "bg-[#F5F0E8]/10 border-[#F5F0E8]/20" },
                  { label: "Delivery & Update", sub: "POS food cost updates automatically", status: "Done", statusColor: "text-green-400 bg-green-500/10", iconBg: "from-green-600 to-emerald-600", icon: "🚚", cardClass: "bg-green-600/10 border-green-500/20" },
                ].map((step, i) => (
                  <div key={step.label}>
                    <motion.div
                      variants={itemVariants}
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
                          <div className="w-px h-4 bg-gradient-to-b from-[#F5F0E8] to-[#F5F0E8]" />
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

      {/* Benefits */}
      <ParallaxSection>
        <section id="benefits" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C97A] to-transparent" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Why Choose</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#F5F0E8] bg-clip-text text-transparent">Noko POS?</span>
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { icon: TrendingUp, title: "Increase Revenue", desc: "Average 35% revenue increase after 6 months of use", colorClass: "text-blue-400", bgClass: "bg-blue-600/20", borderClass: "border-blue-500/30" },
                { icon: Clock, title: "Save Time", desc: "Reduce order processing and management time by 60%", colorClass: "text-green-400", bgClass: "bg-green-600/20", borderClass: "border-green-500/30" },
                { icon: Shield, title: "Maximum Security", desc: "Data encrypted and automatically backed up daily", colorClass: "text-[#E8C97A]", bgClass: "bg-[#E8C97A]/10", borderClass: "border-[#F5F0E8]/20" },
                { icon: Star, title: "24/7 Support", desc: "Technical support team always ready to help", colorClass: "text-orange-400", bgClass: "bg-orange-600/20", borderClass: "border-orange-500/30" },
              ].map((benefit, index) => (
                <motion.div key={benefit.title} variants={itemVariants} whileHover={{ y: -10, scale: 1.05 }} className="text-center group">
                  <FloatingElement delay={index * 0.2}>
                    <div className={`w-20 h-20 ${benefit.bgClass} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border ${benefit.borderClass}`}>
                      <benefit.icon className={`w-10 h-10 ${benefit.colorClass}`} />
                    </div>
                  </FloatingElement>
                  <h3 className="text-xl font-semibold mb-3 text-[#F5F0E8]">{benefit.title}</h3>
                  <p className="text-[#A89880] leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Stats */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#C4BAA8]" />
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-1/4 w-96 h-96 bg-[#F5F0E8]/10 rounded-full blur-3xl" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E8C97A]/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          >
            {[
              { value: "500+", label: "Restaurants Trust Us" },
              { value: "1M+", label: "Orders Per Month" },
              { value: "99.9%", label: "System Uptime" },
              { value: "4.9/5", label: "Customer Rating" },
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent mb-3"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[#A89880] text-lg">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <ParallaxSection>
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Get Started</span>
                <br />
                <span className="bg-gradient-to-r from-[#F5F0E8] to-[#F5F0E8] bg-clip-text text-transparent">Today</span>
              </h2>
              <p className="text-xl text-[#A89880]">Fill in the form below and we'll reach out within 24 hours</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Why choose us?</h3>
                  <div className="space-y-6">
                    {[
                      { icon: Zap, title: "Fast Implementation", desc: "In just 48 hours, your system is ready to go", grad: "from-[#F5F0E8] to-[#E8C97A]" },
                      { icon: Users, title: "Free Training", desc: "Train your entire team with dedicated support", grad: "from-green-600 to-emerald-600" },
                      { icon: Shield, title: "Lifetime Warranty", desc: "Lifetime software warranty and 24/7 technical support", grad: "from-[#E8C97A] to-red-600" },
                    ].map((item) => (
                      <motion.div key={item.title} whileHover={{ x: 10, scale: 1.02 }} className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.grad} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-[#F5F0E8]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-[#F5F0E8] mb-2">{item.title}</h4>
                          <p className="text-[#A89880]">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#F5F0E8]/10">
                  <h4 className="text-lg font-semibold text-[#F5F0E8] mb-4">Contact Us Directly</h4>
                  <div className="space-y-3 text-[#C4BAA8]">
                    <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F5F0E8]/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#E8C97A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <span>info@nokopos.com</span>
                    </motion.div>
                    <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <span>(714) 555-0123</span>
                    </motion.div>
                    <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E8C97A]/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#E8C97A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <span>California, United States</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-[#243580]/80 backdrop-blur-xl border-[#F5F0E8]/10 shadow-2xl">
                  <CardContent className="pt-10">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-3 text-[#C4BAA8]">Full Name *</label>
                          <Input id="name" placeholder="John Smith" required className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-3 text-[#C4BAA8]">Phone Number *</label>
                          <Input id="phone" placeholder="(714) 555-0123" required className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-3 text-[#C4BAA8]">Email *</label>
                        <Input id="email" type="email" placeholder="email@example.com" required className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12" />
                      </div>
                      <div>
                        <label htmlFor="restaurant" className="block text-sm font-medium mb-3 text-[#C4BAA8]">Restaurant Name</label>
                        <Input id="restaurant" placeholder="Your restaurant name" className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12" />
                      </div>
                      <div>
                        <label htmlFor="branches" className="block text-sm font-medium mb-3 text-[#C4BAA8]">Number of Locations</label>
                        <Input id="branches" type="number" placeholder="1" className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20 h-12" />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-3 text-[#C4BAA8]">Notes</label>
                        <Textarea id="message" placeholder="Tell us more about your needs..." rows={4} className="bg-input-background border-[#F5F0E8]/10 focus:border-[#F5F0E8]/20" />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" size="lg" className="w-full h-14 text-lg bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group">
                          Book a Consultation
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}
