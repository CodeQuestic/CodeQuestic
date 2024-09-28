'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Code, MessageSquareCode } from 'lucide-react'

export default function Header() {
  return (
    <header
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(135deg, #ff6138 0%, #ff9d7e 100%)',
      }}
    >
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6138" />
              <stop offset="100%" stopColor="#ff9d7e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-8"
          >
            <Code size={64} color="white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-white">CodeQuestic</h1>
          <p className="text-xl md:text-2xl text-center mb-8 text-white">Empowering the Open Source Community</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-2xl font-semibold mb-8 text-white"
          >
            Innovate | Iterate | Inspire
          </motion.div>
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/CodeQuestic"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#ff6138] px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300 flex items-center"
            >
              <Github size={24} className="mr-2" />
              Join Us
            </motion.a>
            <motion.a
              href="https://discord.gg/33VBS64Ju5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#7289da] px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300 flex items-center"
            >
              <MessageSquareCode size={24} className="mr-2" />
              Join Discord
            </motion.a>
          </div>
        </motion.div>
      </div>
    </header>
  )
}