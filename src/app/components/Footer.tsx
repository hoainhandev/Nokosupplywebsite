import { Link } from "react-router";
import { motion } from "motion/react";
import { Facebook, MessageCircle, Youtube } from "lucide-react";

const services = [
  { label: "Noko POS", href: "/pos" },
  { label: "Noko Academy", href: "/academy" },
  { label: "Noko Supply", href: "/supply" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: MessageCircle, label: "Zalo" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#F5F0E8]/8 bg-[#0F1F52]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://sdribtqccxzjpikspnnm.supabase.co/storage/v1/object/public/assets/logo-footer.png"
                alt="Noko"
                className="h-7 w-auto max-w-full object-contain"
              />
            </Link>
            <p className="text-sm text-[#A89880] mb-6 max-w-xs leading-relaxed">
              A complete F&B ecosystem — helping Vietnamese Americans run restaurants the right way, from day one.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-[#F5F0E8]/10 border border-[#F5F0E8]/10 flex items-center justify-center text-[#A89880] hover:text-[#E8C97A] hover:border-[#E8C97A]/40 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-[#F5F0E8] mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm text-[#A89880]">
              {services.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="hover:text-[#F5F0E8] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-[#F5F0E8] mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-[#A89880]">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link to={l.href} className="hover:text-[#F5F0E8] transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="hover:text-[#F5F0E8] transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-[#F5F0E8] mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-[#A89880]">
              <li>info@noko.com</li>
              <li>(714) 555-0123</li>
              <li>California, United States</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-[#F5F0E8]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#A89880]"
        >
          <p>&copy; 2026 Noko. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#C4BAA8] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#C4BAA8] transition-colors">
              Terms of Use
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
