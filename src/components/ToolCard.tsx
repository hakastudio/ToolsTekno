"use client";

import React from "react";
import { LucideIcon, ArrowUpRight, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isPro?: boolean;
}

export default function ToolCard({ title, description, icon: Icon, href, isPro }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="minimal-card h-full p-6 space-y-4 group">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          {isPro && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
              Pro
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Open Tool</span>
          <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
