import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-background to-black/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Noko Supply
            </div>
            <p className="text-sm text-gray-500">
              Giải pháp POS hàng đầu cho cộng đồng người Việt tại California
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-white">Sản phẩm</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#features" className="hover:text-indigo-400 transition-colors">
                  Tính năng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Bảng giá
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Tích hợp
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-white">Công ty</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-indigo-400 transition-colors">
                  Khách hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4 text-white">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>Email: info@nokosupply.com</li>
              <li>Điện thoại: (714) 555-0123</li>
              <li>Địa chỉ: California, United States</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-600"
        >
          <p>&copy; 2026 Noko Supply. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}