"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function landingPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background animation removed */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold leading-tight z-10"
        >
          Connect. Chat. Collaborate.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg md:text-xl text-gray-400 z-10 max-w-xl"
        >
          Your secure, real-time messaging platform for personal and team communication.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 flex gap-4 z-10"
        >
          <Button variant="default" size="lg">
            Open App <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>
      </section>

      {/* Why ChatVerse Section */}
      <section className="py-24 px-6 md:px-12 text-center bg-black border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold"
        >
          Why Choose ChatVerse?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-400 max-w-2xl mx-auto"
        >
          We built ChatVerse with simplicity, speed, and security in mind. Perfect for anyone looking to elevate their digital communication.
        </motion.p>

        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          {[
            {
              title: "Real-time Messaging",
              desc: "Experience blazing fast message delivery with low latency.",
            },
            {
              title: "Secure & Private",
              desc: "All messages are encrypted, ensuring your chats stay confidential.",
            },
            {
              title: "Cross-device Sync",
              desc: "Access your chats from any device, anytime.",
            },
            {
              title: "Easy to Use",
              desc: "Intuitive interface that anyone can pick up instantly.",
            },
            {
              title: "Custom Themes",
              desc: "Personalize your chat experience with theme options.",
            },
            {
              title: "AI-Powered Suggestions",
              desc: "Get smart replies and chat assistance with integrated AI.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 md:px-12 text-center bg-[#0f0f0f] border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold"
        >
          Ready to start chatting?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-400 max-w-xl mx-auto"
        >
          Create your free account and experience the future of messaging today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Button variant="default" size="lg">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/10 text-gray-500 text-sm">
        © ChatVerse 2025 — Crafted with ❤️ by your dev team.
      </footer>
    </main>

  )
}