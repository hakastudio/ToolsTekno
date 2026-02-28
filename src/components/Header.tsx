"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Laptop, 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Sparkles,
  Command
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Laptop className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            TOOLS<span className="text-primary">TEKNO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">Tools</Link>
            <Link href="/guide" className="text-sm font-medium hover:text-primary transition-colors">Guide</Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            <Link href="/privacy" className="text-sm font-medium hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm font-medium hover:text-primary transition-colors">Terms</Link>
          </nav>

          <div className="flex items-center gap-3 pl-6 border-l">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link 
              href="/tools"
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <Link href="/" className="block text-lg font-medium hover:text-primary">Home</Link>
              <Link href="/tools" className="block text-lg font-medium hover:text-primary">Tools Library</Link>
              <Link href="/guide" className="block text-lg font-medium hover:text-primary">Guide</Link>
              <Link href="/blog" className="block text-lg font-medium hover:text-primary">Blog</Link>
              <Link href="/about" className="block text-lg font-medium hover:text-primary">About</Link>
              <Link href="/contact" className="block text-lg font-medium hover:text-primary">Contact</Link>
              <Link href="/privacy" className="block text-lg font-medium hover:text-primary">Privacy</Link>
              <Link href="/terms" className="block text-lg font-medium hover:text-primary">Terms</Link>
              <hr />
              <button className="w-full py-3 bg-primary text-white font-bold rounded-lg px-4">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
