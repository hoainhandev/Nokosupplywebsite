import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { supabase } from "../../lib/supabase";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Star,
  X,
  CheckCircle2,
  GraduationCap,
  Users,
  Zap,
  TrendingUp,
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

// ── Main Page ────────────────────────────────────────────────────────────────
export function NokoAcademy() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  async function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("academy_registrations").insert({
        name,
        phone,
        email,
        course: selectedCourse || null,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Registration successful! We'll be in touch within 24 hours.");
      setName("");
      setPhone("");
      setEmail("");
      setSelectedCourse("");
    } catch {
      toast.error("Unable to submit registration. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-black overflow-x-hidden">
      <ScrollProgress />

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
            <span className="text-sm text-purple-300 font-medium">Professional F&B Training</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
              Learn Right — Do Right
            </span>
            <br />
            <span className="bg-gradient-to-r from-white/80 to-gray-400 bg-clip-text text-transparent text-4xl md:text-5xl">
              from your very first restaurant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Noko Academy trains Vietnamese restaurant owners in the US to run operations systematically, control costs, and expand at the right time.
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
                  View Courses
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="#register">
                <Button size="lg" variant="outline" className="text-lg px-10 h-14 border-white/20 hover:bg-white/5 hover:border-white/40">
                  Free Consultation
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
              <span>500+ restaurant owners trained</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4 states</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>100% Hands-On</span>
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
        <section className="py-28 relative overflow-hidden">
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
                  Are you dealing with
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  any of these?
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {[
                { text: "Opened your restaurant only to realize what you were missing", sub: "No clear roadmap to prepare ahead of time" },
                { text: "Costs exceed budget — and you can't pinpoint where you're losing money", sub: "Missing knowledge on food cost & overhead control" },
                { text: "Unstable staff and chaotic day-to-day operations", sub: "No standardized training system or SOPs" },
                { text: "Want to open more locations but afraid to take the leap", sub: "Worried about losing control when scaling up" },
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
                If any of the above applies — <span className="text-purple-400 font-medium">Noko Academy was built for you.</span>
              </p>
            </motion.div>
          </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── GIỚI THIỆU ───────────────────────────────────────────────────────── */}
      <ParallaxSection>
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-5">About Noko Academy</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Not theory.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Real hands-on experience.
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Noko Academy was built by people who have actually opened restaurants in the US — not textbook theory, but real-world experience systematized into a structured training program.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      icon: Zap,
                      title: "100% Hands-On",
                      desc: "Every lesson includes real case studies from Vietnamese restaurants in the US — from failures to success stories.",
                      color: "from-purple-600 to-indigo-600",
                    },
                    {
                      icon: Users,
                      title: "Community of 500+ Restaurant Owners",
                      desc: "Connect, share, and support each other in a community of Vietnamese restaurant owners across the US.",
                      color: "from-pink-600 to-rose-600",
                    },
                    {
                      icon: Award,
                      title: "Post-Course Support",
                      desc: "We don't leave you after graduation — mentors follow up and support you for 3 months after you complete the course.",
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { value: "500+", label: "Students", color: "from-purple-500 to-indigo-500" },
                      { value: "4", label: "States", color: "from-pink-500 to-rose-500" },
                      { value: "98%", label: "Satisfaction", color: "from-indigo-500 to-purple-500" },
                      { value: "3 months", label: "Post-course support", color: "from-rose-500 to-pink-500" },
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
                      { label: "Students who successfully opened a restaurant", pct: 87 },
                      { label: "Break even within 6 months", pct: 72 },
                      { label: "Opened another location within 1 year", pct: 54 },
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-600/6 via-pink-600/6 to-indigo-600/6 rounded-full blur-3xl"
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
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-4">Training Programs</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">4 courses.</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                For every stage.
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              From first-time owners to multi-location operators — there's always a course that fits where you are.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {[
              {
                badge: "Getting Started",
                badgeColor: "from-green-500 to-emerald-500",
                icon: BookOpen,
                iconGrad: "from-green-600 to-emerald-600",
                name: "Course 1 — Open a Restaurant A–Z",
                target: "No restaurant yet, have capital, want to start the right way",
                bullets: [
                  "Develop concept & menu for the US market",
                  "Find a location in the US: criteria & negotiation",
                  "Licenses & legal: permits you'll need",
                  "Day-one operations setup for opening day",
                ],
                border: "hover:border-green-500/40",
                glow: "shadow-green-500/20",
              },
              {
                badge: "Currently Operating",
                badgeColor: "from-blue-500 to-indigo-500",
                icon: TrendingUp,
                iconGrad: "from-blue-600 to-indigo-600",
                name: "Course 2 — Operations & Optimization",
                target: "Active restaurant owners who want to move beyond gut-feel operations",
                bullets: [
                  "Control food cost & reduce waste",
                  "Manage shifts, schedules, and overtime",
                  "Optimize your menu: keep profitable items, cut underperformers",
                  "Read monthly P&L financial reports",
                ],
                border: "hover:border-blue-500/40",
                glow: "shadow-blue-500/20",
              },
              {
                badge: "1–2 Locations",
                badgeColor: "from-purple-500 to-pink-500",
                icon: Building2,
                iconGrad: "from-purple-600 to-pink-600",
                name: "Course 3 — Scale Your Chain",
                target: "Ready to replicate your model without losing control",
                bullets: [
                  "Standardize operations across your entire chain",
                  "Hire & train mid-level managers",
                  "Franchise model: how to do it right in the US",
                  "Quality control across multiple locations",
                ],
                border: "hover:border-purple-500/40",
                glow: "shadow-purple-500/20",
              },
              {
                badge: "Enterprise Package",
                badgeColor: "from-orange-500 to-rose-500",
                icon: Briefcase,
                iconGrad: "from-orange-600 to-rose-600",
                name: "Course 4 — Staff Training",
                target: "F&B businesses looking to upskill their entire team",
                bullets: [
                  "Custom training programs by role",
                  "On-site training at your restaurant",
                  "Build internal documentation & SOPs",
                  "Regular assessments and continuous improvement",
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
                        <span className="text-gray-600">For: </span>{course.target}
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
                          Enroll in This Course
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
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">What students say about</span>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "Lan Anh",
                  restaurant: "Bếp Việt · San Jose, CA",
                  avatar: "LA",
                  avatarColor: "from-purple-500 to-pink-500",
                  quote: "Before Noko Academy, I didn't know what food cost was. After Course 2, I cut ingredient costs by 18% in just 2 months.",
                  result: "18% lower food cost",
                  resultColor: "text-green-400",
                  course: "Operations & Optimization",
                },
                {
                  name: "Minh Tuấn",
                  restaurant: "Phở 888 · Houston, TX",
                  avatar: "MT",
                  avatarColor: "from-indigo-500 to-purple-500",
                  quote: "The Open a Restaurant A–Z course helped me avoid at least 3 serious mistakes that many other restaurant owners make on their first launch.",
                  result: "Break even in 5 months",
                  resultColor: "text-purple-400",
                  course: "Open a Restaurant A–Z",
                },
                {
                  name: "Hương Giang",
                  restaurant: "Chuỗi Bún Bò · Atlanta, GA",
                  avatar: "HG",
                  avatarColor: "from-pink-500 to-rose-500",
                  quote: "Thanks to Course 3, I learned how to standardize operations and opened a 3rd location without needing to be there every day.",
                  result: "3 locations opened",
                  resultColor: "text-pink-400",
                  course: "Scale Your Chain",
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            <p className="text-purple-400 font-medium text-sm uppercase tracking-widest mb-4">Get Started Today</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Start your journey</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                to build your business the right way
              </span>
            </h2>
            <p className="text-gray-500 text-lg">Fill in your details — we'll reach out for a consultation within 24 hours.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl shadow-purple-900/20">
              <CardContent className="pt-8 pb-8">
                <form className="space-y-5" onSubmit={handleRegisterSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2.5 text-gray-400">Full Name *</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        required
                        disabled={isSubmitting}
                        className="bg-input-background border-white/10 focus:border-purple-500 h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2.5 text-gray-400">Phone Number *</label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(714) 000-0000"
                        required
                        disabled={isSubmitting}
                        className="bg-input-background border-white/10 focus:border-purple-500 h-12"
                      />
                    </div>
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
                      className="bg-input-background border-white/10 focus:border-purple-500 h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2.5 text-gray-400">Course You're Interested In</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-md bg-input-background border border-white/10 text-foreground text-sm px-3 focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="">-- Select a course --</option>
                      <option value="Course 1 — Open a Restaurant A–Z">Course 1 — Open a Restaurant A–Z</option>
                      <option value="Course 2 — Operations & Optimization">Course 2 — Operations &amp; Optimization</option>
                      <option value="Course 3 — Scale Your Chain">Course 3 — Scale Your Chain</option>
                      <option value="Course 4 — Staff Training">Course 4 — Staff Training</option>
                    </select>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-2xl shadow-purple-500/40 group disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Book a Free Consultation"}
                      {!isSubmitting && (
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-gray-600">
                    We'll be in touch within 24 hours · No spam · Consultation available in Vietnamese
                  </p>
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
