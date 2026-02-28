"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  GitBranch, 
  Terminal, 
  Copy, 
  Check, 
  Search,
  ExternalLink,
  Info,
  GitCommit,
  GitMerge,
  GitPullRequest
} from "lucide-react";

interface GitCommand {
  id: string;
  title: string;
  desc: string;
  commands: string[];
  category: "basic" | "branching" | "remote" | "repair";
}

const COMMANDS: GitCommand[] = [
  {
    id: "init",
    title: "Initialize & First Commit",
    desc: "Start a new repository and push to a remote origin.",
    category: "basic",
    commands: [
      "git init",
      "git add .",
      "git commit -m \"initial commit\"",
      "git branch -M main",
      "git remote add origin <url>",
      "git push -u origin main"
    ]
  },
  {
    id: "rebase",
    title: "Interactive Rebase (Cleanup)",
    desc: "Squash or edit the last N commits before pushing.",
    category: "branching",
    commands: [
      "git rebase -i HEAD~N",
      "# Replace 'pick' with 'squash' in the editor",
      "git push --force-with-lease"
    ]
  },
  {
    id: "undo-commit",
    title: "Undo Last Commit (Keep Files)",
    desc: "Oops! I committed to the wrong branch or need to edit files.",
    category: "repair",
    commands: [
      "git reset --soft HEAD~1"
    ]
  },
  {
    id: "discard-changes",
    title: "Discard All Local Changes",
    desc: "Reset the working directory to the last commit strictly.",
    category: "repair",
    commands: [
      "git reset --hard HEAD",
      "git clean -fd"
    ]
  },
  {
    id: "sync-fork",
    title: "Sync Fork with Upstream",
    desc: "Update your fork with the latest changes from the original repo.",
    category: "remote",
    commands: [
      "git remote add upstream <original-url>",
      "git fetch upstream",
      "git checkout main",
      "git merge upstream/main"
    ]
  }
];

export default function GitHelper() {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = COMMANDS.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase()) || 
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: string, cmds: string[]) => {
    navigator.clipboard.writeText(cmds.join("\n"));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Git Command Helper"
      description="Visual guide for modern Git workflows. Copy-paste sequences for branching, syncing, and repairing."
      icon={GitBranch}
      slug="git-helper"
    >
      <div className="space-y-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows (e.g. rebase, undo, sync)..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((cmd) => (
            <div key={cmd.id} className="minimal-card p-6 flex flex-col gap-4 border border-border bg-card/30 hover:shadow-xl transition-all group">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{cmd.title}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase font-black tracking-widest">
                      {cmd.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{cmd.desc}</p>
                </div>
                <button
                  onClick={() => handleCopy(cmd.id, cmd.commands)}
                  className="p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                >
                  {copiedId === cmd.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-2">
                {cmd.commands.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-slate-900 text-blue-300 font-mono text-[10px] relative group/line">
                    <span className="text-slate-600 select-none">$</span>
                    <span className="flex-1 break-all">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4 mt-8">
          <Info className="w-6 h-6 text-amber-500 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">Handle with Care</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Commands involving <code>--force</code> or <code>reset --hard</code> will permanently overwrite data. Always ensure your workspace is backed up or changes are stashed before executing destructive operations.
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
