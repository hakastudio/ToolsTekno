"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { HelpCircle, Plus, Trash2, Copy, Check, Code2, Sparkles } from "lucide-react";

export default function FAQSchemaGenerator() {
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [copied, setCopied] = useState(false);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    if (faqs.length === 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.filter(f => f.question && f.answer).map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };
    return JSON.stringify(schema, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSchema());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="FAQ Schema Generator"
      description="Create JSON-LD FAQ schema to help your questions and answers stand out in Google's search results."
      icon={HelpCircle}
      slug="faq-schema"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Question & Answer Pairs
            </h3>
            <button 
              onClick={addFaq}
              className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-all flex items-center gap-2 text-xs"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-4 relative group animate-in fade-in slide-in-from-left-4 duration-300">
                <button 
                  onClick={() => removeFaq(index)}
                  className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question #{index + 1}</label>
                  <input 
                    type="text" 
                    value={faq.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                    placeholder="e.g. What is your return policy?"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Answer</label>
                  <textarea 
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    placeholder="e.g. You can return any item within 30 days..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 text-sm h-24 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              JSON-LD Output
            </h3>
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 text-xs shadow-xl shadow-slate-900/20"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 dark:bg-black border border-slate-800 shadow-2xl overflow-hidden relative group">
             <div className="absolute top-4 right-4 text-[10px] font-black text-slate-600 uppercase tracking-widest select-none">Schema.org Compliance</div>
             <pre className="text-xs text-blue-400 font-mono overflow-x-auto leading-relaxed custom-scrollbar">
               {generateSchema()}
             </pre>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-3">
             <div className="font-bold text-sm flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
                SEO Tip
             </div>
             <p className="text-xs text-muted-foreground leading-relaxed">
               Adding FAQ schema can help you occupy more space on the Search Engine Results Page (SERP) and increase your click-through rate (CTR). Ensure your answers are concise and provide immediate value to the user.
             </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
