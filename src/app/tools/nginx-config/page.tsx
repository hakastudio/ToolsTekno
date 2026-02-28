"use client";

import React, { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  Cog, 
  Copy, 
  Check, 
  Globe, 
  Folder, 
  Terminal, 
  ShieldCheck,
  RefreshCcw
} from "lucide-react";

export default function NginxConfigGenerator() {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    domain: "example.com",
    root: "/var/www/html",
    php: true,
    https: true,
    hsts: true,
    logs: true
  });

  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const code = `server {
    listen 80;
    listen [::]:80;
    server_name ${config.domain} www.${config.domain};
    ${config.https ? `return 301 https://$server_name$request_uri;` : `root ${config.root};
    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ =404;
    }`}
}

${config.https ? `server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${config.domain} www.${config.domain};

    root ${config.root};
    index index.html index.htm index.php;

    # SSL Configuration (assuming standard cert paths)
    ssl_certificate /etc/letsencrypt/live/${config.domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${config.domain}/privkey.pem;
    
    ${config.hsts ? `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;` : ""}

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    ${config.php ? `location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }` : ""}

    ${config.logs ? `access_log /var/log/nginx/${config.domain}.access.log;
    error_log /var/log/nginx/${config.domain}.error.log;` : ""}
}` : ""}`;
    setGeneratedCode(code.trim());
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Nginx Config Generator"
      description="Quickly generate optimized and secure Nginx server configurations for your web applications."
      icon={Cog}
      slug="nginx-config"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              General Settings
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Domain Name</label>
                <input
                  type="text"
                  value={config.domain}
                  onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                  placeholder="example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Web Root Path</label>
                <div className="relative">
                  <Folder className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={config.root}
                    onChange={(e) => setConfig({ ...config, root: e.target.value })}
                    placeholder="/var/www/html"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Features & Security
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "PHP-FPM Support", key: "php" },
                { label: "Force HTTPS (SSL)", key: "https" },
                { label: "Enable HSTS", key: "hsts" },
                { label: "Logging Config", key: "logs" }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setConfig({ ...config, [(item.key)]: !(config as any)[item.key] })}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    (config as any)[item.key] 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-card border-border text-muted-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="text-sm font-semibold">{item.label}</span>
                  {(config as any)[item.key] ? <Check className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4 opacity-50" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              Configuration Output
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Config"}
            </button>
          </div>
          <div className="relative group">
            <pre className="w-full p-6 rounded-2xl bg-slate-900 text-blue-300 font-mono text-xs leading-relaxed overflow-auto min-h-[400px] border border-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
              {generatedCode}
            </pre>
            <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              nginx.conf
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
