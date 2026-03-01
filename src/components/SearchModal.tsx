"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Command, Wrench, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SEARCH_INDEX, type SearchResult } from "@/lib/search-data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // This should be handled by the parent, but we can emit an event or handled via state if managed globally
        }
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.trim().length > 1) {
      const filtered = SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(val.toLowerCase()) ||
          item.description.toLowerCase().includes(val.toLowerCase()) ||
          item.category.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-2xl px-4 z-[101]"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative p-4 border-b">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search tools, guides, and articles..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-transparent outline-none text-lg font-medium placeholder:text-muted-foreground/50"
                />
                <div className="absolute right-7 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded bg-muted text-[10px] font-bold text-muted-foreground uppercase border">
                  esc
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {query.length > 0 ? (
                  results.length > 0 ? (
                    <div className="space-y-1">
                      {results.map((result, i) => (
                        <Link
                          key={i}
                          href={result.slug}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                        >
                          <div className={`p-2 rounded-lg ${result.type === "tool" ? "bg-primary/10 text-primary" : "bg-violet-500/10 text-violet-500"}`}>
                            {result.type === "tool" ? <Wrench className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm truncate">{result.title}</h3>
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-black uppercase tracking-tighter">
                                {result.type}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-muted-foreground text-sm">No results found for "{query}"</p>
                    </div>
                  )
                ) : (
                  <div className="py-8 px-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Quick Shortcuts</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                      <Link href="/tools" onClick={onClose} className="p-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">Browse All Tools</Link>
                      <Link href="/blog" onClick={onClose} className="p-3 rounded-xl bg-muted/50 hover:bg-violet-500/10 hover:text-violet-500 transition-all">Read Latest Guides</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
