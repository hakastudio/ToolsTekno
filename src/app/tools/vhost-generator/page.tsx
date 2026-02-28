"use client";

import React, { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Server, Copy, Check, Info, Settings, Globe, Folder } from "lucide-react";

export default function VHostGenerator() {
  const [config, setConfig] = useState({
    domain: "example.com",
    email: "admin@example.com",
    documentRoot: "/var/www/example.com/public_html",
    allowOverride: true,
    enableSSL: false,
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const vhost = `<VirtualHost *:80>
    ServerAdmin ${config.email}
    ServerName ${config.domain}
    ServerAlias www.${config.domain}
    DocumentRoot ${config.documentRoot}

    <Directory ${config.documentRoot}>
        Options Indexes FollowSymLinks
        AllowOverride ${config.allowOverride ? "All" : "None"}
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>`;

    const sslVhost = config.enableSSL ? `

<VirtualHost *:443>
    ServerAdmin ${config.email}
    ServerName ${config.domain}
    ServerAlias www.${config.domain}
    DocumentRoot ${config.documentRoot}

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/${config.domain}/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/${config.domain}/privkey.pem

    <Directory ${config.documentRoot}>
        Options Indexes FollowSymLinks
        AllowOverride ${config.allowOverride ? "All" : "None"}
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>` : "";

    setOutput(vhost + sslVhost);
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Apache2 VHost Gen"
      description="Design professional VirtualHost configurations for Apache2 servers with one click. Supports SSL and custom directory rules."
      icon={Server}
      slug="vhost-generator"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Configuration Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-3 h-3 text-primary" />
                  Domain Name
                </label>
                <input
                  type="text"
                  value={config.domain}
                  onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Admin Email</label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Folder className="w-3 h-3 text-primary" />
                  Document Root
                </label>
                <input
                  type="text"
                  value={config.documentRoot}
                  onChange={(e) => setConfig({ ...config, documentRoot: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono"
                />
              </div>

              <div className="pt-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={config.allowOverride}
                      onChange={() => setConfig({ ...config, allowOverride: !config.allowOverride })}
                    />
                    <div className="w-10 h-5 bg-muted rounded-full peer-checked:bg-primary transition-all"></div>
                    <div className="absolute left-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-transform shadow-sm"></div>
                  </div>
                  <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Allow Override (All)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={config.enableSSL}
                      onChange={() => setConfig({ ...config, enableSSL: !config.enableSSL })}
                    />
                    <div className="w-10 h-5 bg-muted rounded-full peer-checked:bg-primary transition-all"></div>
                    <div className="absolute left-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-transform shadow-sm"></div>
                  </div>
                  <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Generate SSL Block</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Generated Configuration</h3>
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy VHost"}
              </button>
            </div>
            
            <div className="w-full h-[500px] p-8 rounded-2xl bg-slate-900 border border-slate-800 overflow-auto">
              <pre className="text-blue-300 font-mono text-xs leading-relaxed">
                {output}
              </pre>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
          <Info className="w-6 h-6 text-primary shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">How to use</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Create a new file in <code>/etc/apache2/sites-available/{config.domain}.conf</code>, paste this configuration, and run <code>sudo a2ensite {config.domain}.conf</code> followed by <code>sudo systemctl reload apache2</code>.
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
