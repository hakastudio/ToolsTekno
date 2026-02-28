"use client";

import React, { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  Calendar, 
  Clock, 
  Terminal, 
  Copy, 
  Check, 
  Info,
  Zap,
  RefreshCcw
} from "lucide-react";

export default function CronGenerator() {
  const [copied, setCopied] = useState(false);
  const [cron, setCron] = useState({
    minute: "*",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*"
  });

  const [command, setCommand] = useState("/usr/bin/php /var/www/html/artisan schedule:run");
  const [humanText, setHumanText] = useState("");

  useEffect(() => {
    // Basic human-readable conversion (simplified)
    let desc = "Runs ";
    if (cron.minute === "*" && cron.hour === "*") desc += "every minute ";
    else if (cron.minute !== "*" && cron.hour === "*") desc += `every hour at minute ${cron.minute} `;
    else if (cron.minute !== "*" && cron.hour !== "*") desc += `at ${cron.hour}:${cron.minute.padStart(2, '0')} `;
    
    if (cron.dayOfWeek !== "*") desc += `on week days ${cron.dayOfWeek}`;
    else desc += "every day";

    setHumanText(desc);
  }, [cron]);

  const cronString = `${cron.minute} ${cron.hour} ${cron.dayOfMonth} ${cron.month} ${cron.dayOfWeek}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${cronString} ${command}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Cron Job Generator"
      description="Design scheduled tasks with ease. Visual crontab editor with real-time syntax validation."
      icon={Calendar}
      slug="cron-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Minute</label>
              <input
                type="text"
                value={cron.minute}
                onChange={(e) => setCron({ ...cron, minute: e.target.value })}
                placeholder="*"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-mono font-bold text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hour</label>
              <input
                type="text"
                value={cron.hour}
                onChange={(e) => setCron({ ...cron, hour: e.target.value })}
                placeholder="*"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-mono font-bold text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Day (Month)</label>
              <input
                type="text"
                value={cron.dayOfMonth}
                onChange={(e) => setCron({ ...cron, dayOfMonth: e.target.value })}
                placeholder="*"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-mono font-bold text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekday</label>
              <input
                type="text"
                value={cron.dayOfWeek}
                onChange={(e) => setCron({ ...cron, dayOfWeek: e.target.value })}
                placeholder="*"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-mono font-bold text-center"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Command to Execute</label>
            <div className="relative">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm font-medium"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-wider">Execution Summary</h4>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic">
              "{humanText}"
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Crontab Expression
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Full Line"}
            </button>
          </div>
          
          <div className="p-8 rounded-[2.5rem] bg-slate-900 text-blue-300 font-mono text-xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-full flex justify-between px-4 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
              <span>Min</span>
              <span>Hr</span>
              <span>Dom</span>
              <span>Mon</span>
              <span>Dow</span>
            </div>
            <div className="flex gap-4 sm:gap-8 flex-wrap justify-center">
              {[cron.minute, cron.hour, cron.dayOfMonth, cron.month, cron.dayOfWeek].map((val, i) => (
                <div key={i} className="flex flex-col items-center">
                   <span className="text-3xl font-black text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card/50">
             <div className="flex items-start gap-4">
               <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
               <div className="space-y-1">
                 <h4 className="text-xs font-bold">Quick Tips</h4>
                 <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-1">
                   <li>Use <code>*/5</code> for "every 5 units"</li>
                   <li>Use <code>1,5,10</code> for specific units</li>
                   <li>Use <code>1-5</code> for a range</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
