'use client'

import React from 'react'
import { Github, MessageSquareCode } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">CodeQuestic</h3>
            <p className="text-gray-400">Empowering the Open Source Community</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/CodeQuestic" className="hover:text-[#ff6138] transition duration-300">
              <Github size={24} />
            </a>
            <a href="https://discord.gg/33VBS64Ju5" className="hover:text-[#ff6138] transition duration-300">
              <MessageSquareCode size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CodeQuestic. All rights reserved.
        </div>
      </div>
    </footer>
  )
}