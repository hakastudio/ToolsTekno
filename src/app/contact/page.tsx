"use client";

import React from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Mail, MessageSquare, Send, ShieldCheck } from "lucide-react";

export default function ContactUs() {
  return (
    <ToolPageLayout
      title="Contact Us"
      description="We'd love to hear from you. Send us a message, feedback, or inquiry."
      icon={Mail}
    >
      <div className="max-w-2xl mx-auto space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-primary" />
            Get in Touch
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a question about our tools? Found a bug? Or just want to say hi? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for your message! This is a demo form.");
          }}
          className="space-y-6 p-8 rounded-3xl border border-border bg-card/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">Name</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-foreground">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
          >
            Send Message
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <p className="text-muted-foreground">Your email is safe with us. We never share your data with third parties.</p>
          </div>
        </section>
      </div>
    </ToolPageLayout>
  );
}
