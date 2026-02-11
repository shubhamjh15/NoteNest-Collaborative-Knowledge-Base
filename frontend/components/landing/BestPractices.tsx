"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Type, 
  List, 
  Code, 
  AlignLeft, 
  ArrowRight 
} from "lucide-react";

// Principles Data
const principles = [
  {
    title: "Clear Purpose",
    description: "Start every note with a 'Why'. Define the context immediately.",
    icon: Type
  },
  {
    title: "Structured Content",
    description: "Use H1, H2, and H3s to create a scannable hierarchy.",
    icon: AlignLeft
  },
  {
    title: "Actionable Info",
    description: "Include code snippets, commands, and direct links.",
    icon: Code
  },
  {
    title: "Consistent Formatting",
    description: "Stick to standard Markdown conventions for readability.",
    icon: List
  }
];

const BadNote = () => (
  <div className="h-full bg-red-50/50 p-8 rounded-3xl border border-red-100 relative overflow-hidden">
    <div className="absolute top-4 right-4 text-red-400">
      <XCircle className="w-8 h-8" />
    </div>
    <div className="space-y-6 opacity-70 font-mono text-sm sm:text-base text-[#1A1A1A]">
      <p>Setup stuff</p>
      <p>Just install things and run the command.</p>
      <div className="bg-black/5 p-4 rounded-lg">
        npm install<br/>
        start
      </div>
      <p>its easy.</p>
    </div>
    
    {/* Messy overlay feel */}
    <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
  </div>
);

const GoodNote = () => (
  <div className="h-full bg-white p-8 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden">
    <div className="absolute top-4 right-4 text-green-500">
      <CheckCircle2 className="w-8 h-8" />
    </div>
    <div className="space-y-4 text-[#1A1A1A]">
      <h3 className="text-xl font-bold font-serif border-b border-black/5 pb-2">Local Development Setup</h3>
      
      <div className="space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]/60">Prerequisites</h4>
        <ul className="list-disc list-inside text-sm pl-2 space-y-1">
          <li>Node.js {'>'} 18</li>
          <li>NPM {'>'} 9</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]/60">Steps</h4>
        <div className="bg-[#1A1A1A] text-white p-4 rounded-xl font-mono text-xs shadow-inner">
          <p className="text-green-400"># 1. Install dependencies</p>
          <p>npm install</p>
          <br/>
          <p className="text-green-400"># 2. Start dev server</p>
          <p>npm run dev</p>
        </div>
      </div>
    </div>
  </div>
);

const BestPractices = () => {
  const [activeView, setActiveView] = useState<'bad' | 'good'>('good');

  return (
    <section className="py-24 bg-[#F3F0E6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content & Principles */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-sm font-bold uppercase tracking-wider"
            >
              NoteNest Methodology
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-black text-[#1A1A1A] leading-tight"
            >
              Write notes that <br/>
              <span className="text-[#FF6B6B]">actually get read.</span>
            </motion.h2>

            <div className="grid gap-6">
              {principles.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1A1A1A] mb-1">{p.title}</h4>
                    <p className="text-[#1A1A1A]/70 text-sm font-medium">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Comparison */}
          <div className="relative">
            {/* Toggle Switch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex bg-[#1A1A1A] rounded-full p-1 shadow-xl">
              <button 
                onClick={() => setActiveView('bad')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeView === 'bad' ? 'bg-white text-[#1A1A1A]' : 'text-white/60 hover:text-white'}`}
              >
                Weak
              </button>
              <button 
                onClick={() => setActiveView('good')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeView === 'good' ? 'bg-white text-[#1A1A1A]' : 'text-white/60 hover:text-white'}`}
              >
                Strong
              </button>
            </div>

            <div className="relative h-[600px] w-full max-w-[500px] mx-auto perspective-1000 group">
               {/* Background Decorative Element */}
               <div className="absolute inset-0 bg-[#1A1A1A] rounded-[3rem] rotate-3 opacity-10 scale-95 group-hover:rotate-6 transition-transform duration-500 will-change-transform" />
               
               <div className="relative h-full bg-white rounded-[2.5rem] shadow-2xl p-2 border-4 border-white overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeView}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      {activeView === 'bad' ? <BadNote /> : <GoodNote />}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>
            
            {/* Floating 'Try it' text or comparison hint if needed */}
            <div className="text-center mt-8 text-sm font-bold text-[#1A1A1A]/40 uppercase tracking-widest animate-pulse">
              Toggle to compare
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BestPractices;
