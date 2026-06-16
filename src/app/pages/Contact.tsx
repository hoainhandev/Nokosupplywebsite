import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, Youtube, Send } from "lucide-react";

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

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        phone: phone || null,
        interest: interest || null,
        message,
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Sent! We'll respond within 24 hours ✓");
      setName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setMessage("");
    } catch {
      toast.error("Unable to send your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1B2B6B] via-[#1B2B6B] to-[#0F1F52] overflow-x-hidden">
      <ScrollProgress />

      <section className="relative pt-32 pb-16 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r bg-[#F5F0E8]/10 border border-[#F5F0E8]/20 mb-8">
            <Mail className="w-4 h-4 text-[#E8C97A]" />
            <span className="text-sm text-[#F5F0E8] font-medium">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              We're always ready
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#F5F0E8] via-[#E8C97A] to-[#F5F0E8] bg-clip-text text-transparent">
              to listen
            </span>
          </h1>
          <p className="text-xl text-[#C4BAA8] leading-relaxed max-w-2xl mx-auto">
            Whether you have questions about our services, need advice, or want to partner with us — get in touch.
          </p>
        </div>
      </section>

      <ParallaxSection>
        <section className="py-16 pb-32">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-[#243580]/80 border-[#F5F0E8]/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#F5F0E8] mb-8">Contact Information</h2>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 text-[#C4BAA8]"><Phone className="w-5 h-5 text-[#E8C97A]" /> (714) 555-0123</div>
                    <div className="flex items-center gap-4 text-[#C4BAA8]"><Mail className="w-5 h-5 text-[#E8C97A]" /> info@noko.com</div>
                    <div className="flex items-center gap-4 text-[#C4BAA8]"><MapPin className="w-5 h-5 text-[#E8C97A]" /> California, United States</div>
                    <div className="flex items-center gap-4 text-[#C4BAA8]"><Clock className="w-5 h-5 text-[#E8C97A]" /> Mon - Fri: 9am - 6pm PST</div>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center mt-8">
                    <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-[#F5F0E8]/10 border border-[#F5F0E8]/10 flex items-center justify-center text-[#A89880] hover:text-[#F5F0E8] hover:border-[#E8C97A]/40 transition-colors"><Facebook className="w-4 h-4" /></a>
                    <a href="#" aria-label="Zalo" className="w-10 h-10 rounded-lg bg-[#F5F0E8]/10 border border-[#F5F0E8]/10 flex items-center justify-center text-[#A89880] hover:text-[#F5F0E8] hover:border-[#E8C97A]/40 transition-colors"><MessageCircle className="w-4 h-4" /></a>
                    <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-lg bg-[#F5F0E8]/10 border border-[#F5F0E8]/10 flex items-center justify-center text-[#A89880] hover:text-[#F5F0E8] hover:border-[#E8C97A]/40 transition-colors"><Youtube className="w-4 h-4" /></a>
                  </div>
                  <p className="text-sm text-[#A89880] text-center mt-6">Response within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="bg-[#243580]/80 border-[#F5F0E8]/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#F5F0E8] mb-8">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-[#C4BAA8]">Full Name</Label>
                      <Input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50 border-[#F5F0E8]/10 focus:border-[#E8C97A]/50 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-[#C4BAA8]">Email</Label>
                      <Input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary/50 border-[#F5F0E8]/10 focus:border-[#E8C97A]/50 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-[#C4BAA8]">Phone Number</Label>
                      <Input id="contact-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-secondary/50 border-[#F5F0E8]/10 focus:border-[#E8C97A]/50 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#C4BAA8]">I'm interested in</Label>
                      <Select value={interest} onValueChange={setInterest}>
                        <SelectTrigger className="bg-secondary/50 border-[#F5F0E8]/10 focus:border-[#E8C97A]/50 h-12 rounded-xl">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Noko POS">Noko POS</SelectItem>
                          <SelectItem value="Noko Academy">Noko Academy</SelectItem>
                          <SelectItem value="Noko Supply">Noko Supply</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-[#C4BAA8]">Message</Label>
                      <Textarea id="contact-message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-secondary/50 border-[#F5F0E8]/10 focus:border-[#E8C97A]/50 rounded-xl" />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full h-12 text-base bg-[#F5F0E8] text-[#1B2B6B] hover:bg-[#E8C97A] hover:text-[#1B2B6B] border-0 shadow-2xl shadow-[#F5F0E8]/20">
                      <Send className="w-4 h-4" />
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}
