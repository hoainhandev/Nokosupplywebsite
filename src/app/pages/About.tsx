import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Sparkles, Target, Users, Leaf } from "lucide-react";

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
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

export function About() {
  const stats = [
    { value: "500+", label: "trusted restaurants" },
    { value: "4", label: "states" },
    { value: "$2M+", label: "revenue optimized" },
    { value: "98%", label: "satisfied students" },
  ];

  const founders = [
    {
      name: "Nguyễn Văn An",
      role: "Co-founder & CEO",
      bio: "10 years of F&B experience in the U.S., formerly operated a chain of 5 restaurants in California",
    },
    {
      name: "Trần Thị Mai",
      role: "Co-founder & COO",
      bio: "Operations expert who has trained 200+ Vietnamese restaurant owners in the U.S.",
    },
    {
      name: "Lê Minh Khoa",
      role: "CTO",
      bio: "8-year software engineer who built Noko POS from real restaurant needs",
    },
  ];

  const values = [
    { icon: Target, title: "Hands-on", desc: "No empty theory" },
    { icon: Users, title: "Community", desc: "Vietnamese helping Vietnamese" },
    { icon: Leaf, title: "Sustainability", desc: "Built to last" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1B2B6B] via-[#1B2B6B] to-[#0F1F52] overflow-x-hidden">
      <ScrollProgress />

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
        </div>

        <div className="container relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r bg-[#F5F0E8]/10 border border-[#F5F0E8]/20 mb-10">
            <Sparkles className="w-4 h-4 text-[#E8C97A]" />
            <span className="text-sm text-[#F5F0E8] font-medium">About Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              Built by Vietnamese,
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              for Vietnamese in America
            </span>
          </h1>
          <p className="text-xl text-[#C4BAA8] leading-relaxed max-w-3xl mx-auto">
            Noko was born from the very challenges we faced when opening a restaurant in America
            — no systems, no reliable supply chain, no structured know-how.
          </p>
        </div>
      </section>

      <ParallaxSection>
        <section className="py-32 relative">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">
                    The Noko Story
                  </span>
                </h2>
                <p className="text-[#C4BAA8] leading-relaxed whitespace-pre-line">
                  {"In 2019, the founders of Noko went through exactly what you're going through — running on instinct, not knowing food costs, and struggling to find reliable ingredient suppliers.\n\nAfter years of building and failing, we distilled an efficient operating system. And we want to share it with the community.\n\nNoko isn't just software or ingredients — Noko is your partner from day one."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <Card key={stat.label} className="bg-[#243580]/80 border-[#F5F0E8]/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-[#C4BAA8]">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={`main-${stat.label}`} className="bg-[#243580]/80 border-[#F5F0E8]/10 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-[#F5F0E8] mb-2">{stat.value}</div>
                  <p className="text-[#C4BAA8]">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Founding Team</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <Card key={founder.name} className="bg-[#243580]/80 border-[#F5F0E8]/10 overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5F0E8] to-[#F5F0E8] border border-[#F5F0E8]/10 mb-6" />
                  <h4 className="text-xl font-bold text-[#F5F0E8] mb-1">{founder.name}</h4>
                  <p className="text-[#F5F0E8] text-sm mb-4">{founder.role}</p>
                  <p className="text-[#C4BAA8] text-sm leading-relaxed">{founder.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#F5F0E8] to-[#C4BAA8] bg-clip-text text-transparent">Core Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="bg-[#243580]/80 border-[#F5F0E8]/10">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5F0E8]/10 to-[#E8C97A]/10 flex items-center justify-center mb-5">
                    <value.icon className="w-6 h-6 text-[#E8C97A]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#F5F0E8] mb-2">{value.title}</h4>
                  <p className="text-[#C4BAA8]">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F5F0E8]/10 via-[#E8C97A]/10 to-[#F5F0E8]/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl">
          <h3 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              Ready to get started with Noko?
            </span>
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-10 h-14 bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20 group">
              <Link to="/#ecosystem">
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 h-14 border-[#F5F0E8]/20 hover:bg-[#F5F0E8]/10 hover:border-[#F5F0E8]/40">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
