// Central metadata for all 35 tools
// Used by ToolPageLayout for title, meta description, JSON-LD schema, How-to-Use, and FAQ sections

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolHowToStep {
  title: string;
  desc: string;
}

export interface ToolMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  howToUse: ToolHowToStep[];
  faqs: ToolFAQ[];
  articleTitle?: string;
  articleContent?: string;
}

export const TOOLS_META: Record<string, ToolMeta> = {
  "base64": {
    slug: "base64",
    shortTitle: "Base64 Encoder/Decoder",
    title: "Base64 Encoder & Decoder - Free Online Tool",
    description: "Encode or decode Base64 strings instantly in your browser. Supports text and binary data. 100% client-side, no data sent to any server.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Paste Your Text or Base64", desc: "Enter the text you want to encode, or paste a Base64 string you want to decode into the input area." },
      { title: "Select Mode", desc: "Choose between Encode (plain text → Base64) or Decode (Base64 → plain text) mode." },
      { title: "Copy the Result", desc: "Click the Copy button to copy the output directly to your clipboard." },
    ],
    faqs: [
      { q: "Is Base64 encoding the same as encryption?", a: "No. Base64 is an encoding scheme, not encryption. It is easily reversible and should never be used to secure sensitive data." },
      { q: "What is Base64 used for?", a: "Base64 is commonly used to encode binary data (like images or files) for transmission over text-based protocols such as email (MIME) or embedding images in CSS/HTML." },
      { q: "Is my data safe?", a: "Yes. All encoding and decoding happens entirely in your browser. No data is transmitted to any server." },
    ],
    articleTitle: "Understanding Base64 Encoding and Decoding",
    articleContent: "Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. The name Base64 comes from a specific MIME content transfer encoding.\n\nThis tool allows you to convert any text into its Base64 equivalent or decode existing Base64 strings back into readable text. Since the process is performed entirely on your device using client-side JavaScript, it is a secure way to handle non-sensitive data segments without risking server-side interceptions.\n\nCommon use cases for Base64 include embedding small images directly into CSS or HTML files (data URIs), passing data through URLs where certain characters might otherwise be lost, and transmitting binary data in email formats."
  },
  "json-formatter": {
    slug: "json-formatter",
    shortTitle: "JSON Formatter",
    title: "JSON Formatter & Validator - Free Online Tool",
    description: "Format, validate, and beautify JSON data instantly. Detect syntax errors and view structured JSON in a clean, readable format.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Paste Your JSON", desc: "Paste raw or minified JSON into the input editor." },
      { title: "Click Format", desc: "The tool will validate and pretty-print your JSON with proper indentation." },
      { title: "Copy or Download", desc: "Copy the formatted output or download it as a .json file." },
    ],
    faqs: [
      { q: "Can this tool validate JSON?", a: "Yes. The formatter will highlight syntax errors and tell you exactly where the issue is in your JSON." },
      { q: "What is the difference between JSON and JSONC?", a: "JSONC is JSON with comments (used in tsconfig.json, for example). Standard JSON does not support comments." },
      { q: "Is there a file size limit?", a: "The tool runs in your browser, so it depends on your device's memory. Files up to several MB work fine for most users." },
    ],
    articleTitle: "Why Use a JSON Formatter and Validator?",
    articleContent: "JSON (JavaScript Object Notation) is the most popular data interchange format on the web today. However, minified JSON or deeply nested structures can be nearly impossible for humans to read and audit manually.\n\nA JSON Formatter takes raw data and applies standard indentation and spacing to make it human-readable. Beyond aesthetics, validation is a critical feature. Our tool checks for common syntax errors like missing commas, unbalanced brackets, or unquoted strings, helping developers debug API responses and configuration files instantly.\n\nWhether you are a backend engineer inspecting logs or a frontend developer testing API integrations, a reliable formatter is an essential part of your workflow. Like all tools on TOOLS TEKNO, our JSON utility works 100% locally to ensure your data stays private."
  },
  "jwt-decoder": {
    slug: "jwt-decoder",
    shortTitle: "JWT Decoder",
    title: "JWT Decoder - Inspect JSON Web Tokens Online",
    description: "Decode and inspect JWT (JSON Web Tokens) instantly. View header, payload, and signature details without sending data to any server.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Paste Your JWT", desc: "Copy a JWT from your application (e.g., from a browser's developer tools or Postman) and paste it." },
      { title: "View Decoded Sections", desc: "The tool instantly decodes and displays the Header, Payload, and Signature sections." },
      { title: "Inspect Claims", desc: "Review all claims including exp (expiration), iat (issued at), sub (subject), and more." },
    ],
    faqs: [
      { q: "Is it safe to paste my JWT here?", a: "This tool runs 100% in your browser — your token is never sent to any server. However, avoid using production access tokens with full privileges in any web tool as a general security practice." },
      { q: "Can this tool verify a JWT signature?", a: "Signature verification requires the secret key. This tool only decodes the token without validating the signature." },
      { q: "What is the exp claim?", a: "The 'exp' (expiration time) claim indicates the time after which the token is no longer valid, expressed as a Unix timestamp." },
    ]
  },
  "compressor": {
    slug: "compressor",
    shortTitle: "Image Compressor",
    title: "Image Compressor - Compress PNG, JPG, WebP Online Free",
    description: "Compress images by up to 90% without losing quality. Supports PNG, JPG, and WebP. All processing is done locally in your browser — no uploads required.",
    category: "Image & Metadata",
    howToUse: [
      { title: "Upload Your Image", desc: "Drag and drop an image or click the upload area. Supports PNG, JPG, and WebP up to 20MB." },
      { title: "Adjust Quality & Format", desc: "Use the Quality slider to control compression aggressiveness (10-100%). Select your desired output format: WebP, JPG, or PNG." },
      { title: "Compress & Download", desc: "Click 'Compress Image' and wait for processing. Then click the green 'Download' button to save your compressed file." },
    ],
    faqs: [
      { q: "Does the image ever leave my device?", a: "No. Compression is performed using the HTML5 Canvas API directly in your browser. Your image never leaves your device." },
      { q: "Which format gives the best compression?", a: "WebP generally achieves the best file size reduction while maintaining quality, often 25-35% smaller than equivalent JPG files." },
      { q: "Why does PNG not have a quality slider?", a: "PNG is a lossless format — it cannot be 'lossy-compressed' like JPG or WebP. Converting a PNG to WebP or JPG will reduce file size significantly." },
    ]
  },
  "hash-generator": {
    slug: "hash-generator",
    shortTitle: "Hash Generator",
    title: "Multi Hash Generator - SHA-1, SHA-256, SHA-512 Online",
    description: "Generate cryptographic hashes (SHA-1, SHA-256, SHA-512) from any text instantly. All hashing is done client-side using the Web Crypto API.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Enter Your Input", desc: "Type or paste any text into the input field." },
      { title: "View All Hashes", desc: "SHA-1, SHA-256, and SHA-512 hashes are generated simultaneously as you type." },
      { title: "Copy Any Hash", desc: "Click the Copy button next to any hash to copy it to your clipboard." },
    ],
    faqs: [
      { q: "What is the difference between SHA-1, SHA-256, and SHA-512?", a: "They differ in output length and security: SHA-1 produces 160-bit hashes (deprecated for security use), SHA-256 produces 256-bit hashes (widely used), and SHA-512 produces 512-bit hashes (strongest of the three)." },
      { q: "Can I reverse a hash to get the original text?", a: "No. Hashing is a one-way function. SHA hashes are cryptographically irreversible by design." },
      { q: "Is MD5 available?", a: "MD5 is not supported because it is considered cryptographically broken. We recommend SHA-256 or SHA-512 for any security-sensitive use case." },
    ]
  },
  "regex-tester": {
    slug: "regex-tester",
    shortTitle: "Regex Tester",
    title: "Regex Tester - Test Regular Expressions Online",
    description: "Test and debug regular expressions in real-time. Supports flags (g, i, m), highlights matches, and shows detailed match information.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Enter Your Pattern", desc: "Type your regular expression in the pattern field (without the surrounding slashes)." },
      { title: "Select Flags", desc: "Choose flags: g (global), i (case-insensitive), m (multiline)." },
      { title: "Type Test String", desc: "Enter text in the test string area. Matches will be highlighted in real-time." },
    ],
    faqs: [
      { q: "What regex flavor is used?", a: "This tool uses JavaScript's built-in RegExp engine, which follows the ECMAScript standard." },
      { q: "Why is my regex not matching?", a: "Common issues include: forgetting to escape special characters, incorrect flags, or anchors (^ and $) that don't match as expected with multiline text." },
      { q: "How do I match a literal dot?", a: "Use \\. to match a literal dot. Without the backslash, a dot matches any character." },
    ]
  },
  "unminify": {
    slug: "unminify",
    shortTitle: "Code Unminify",
    title: "Code Unminify & Beautifier - JavaScript, CSS, HTML",
    description: "Unminify and beautify JavaScript, CSS, and HTML code instantly. Restore readable formatting from minified source code.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Paste Minified Code", desc: "Paste your minified JavaScript, CSS, or HTML into the input area." },
      { title: "Select Language", desc: "Choose the correct language (JS, CSS, or HTML) for the best formatting results." },
      { title: "Beautify & Copy", desc: "The output is formatted automatically. Click Copy to copy the beautified code." },
    ],
    faqs: [
      { q: "Can this restore original variable names?", a: "No. If code has been obfuscated (variable names shortened), the original names cannot be recovered. It can only restore readable formatting, not the original source." },
      { q: "What is the difference between unminify and deobfuscate?", a: "Unminify restores whitespace and formatting. Deobfuscation attempts to reverse intentionally confusing variable names and logic — a much harder problem." },
    ]
  },
  "uuid-generator": {
    slug: "uuid-generator",
    shortTitle: "UUID Generator",
    title: "UUID Generator - Generate UUIDs v4 Online Free",
    description: "Generate RFC 4122 compliant UUID v4 identifiers instantly. Generate one or bulk UUIDs for your database, API, or application.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Choose Quantity", desc: "Select how many UUIDs you need — from 1 to 100 at once." },
      { title: "Generate", desc: "Click Generate to create unique UUIDs instantly." },
      { title: "Copy All", desc: "Copy individual UUIDs or all of them at once to your clipboard." },
    ],
    faqs: [
      { q: "Are these UUIDs truly unique?", a: "UUID v4 uses random numbers. With 2^122 possible values, the probability of a collision is astronomically small — effectively unique for all practical purposes." },
      { q: "What is the difference between UUID v1 and v4?", a: "UUID v1 is based on timestamps and MAC addresses. UUID v4 is purely random, which is preferred for privacy and uniqueness." },
    ]
  },
  "cron-generator": {
    slug: "cron-generator",
    shortTitle: "Cron Job Generator",
    title: "Cron Job Generator - Visual Crontab Expression Builder",
    description: "Create cron job expressions visually. Set schedule for minutes, hours, days, months, and weekdays with real-time preview of next execution times.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Select Your Schedule", desc: "Use the visual controls to set when your cron job should run: minute, hour, day, month, and weekday." },
      { title: "Preview Expression", desc: "See the generated cron expression in real-time along with a human-readable schedule description." },
      { title: "Copy & Deploy", desc: "Copy the cron expression and paste it into your crontab, CI/CD pipeline, or server configuration." },
    ],
    faqs: [
      { q: "What does '* * * * *' mean?", a: "Five asterisks means 'every minute, every hour, every day, every month, every weekday' — in other words, run every minute." },
      { q: "How do I run a job every 15 minutes?", a: "Use the expression: */15 * * * * — the */15 in the minutes field means 'every 15 minutes'." },
    ]
  },
  "faq-schema": {
    slug: "faq-schema",
    shortTitle: "FAQ Schema Generator",
    title: "FAQ Schema Generator - JSON-LD for Google Rich Results",
    description: "Generate FAQ Page structured data (JSON-LD) for Google rich results. Add FAQ rich snippets to your pages to improve click-through rates.",
    category: "Schema & Social Media",
    howToUse: [
      { title: "Add Questions & Answers", desc: "Enter your FAQ questions and their answers. Add as many pairs as needed." },
      { title: "Generate Schema", desc: "Click Generate to create the JSON-LD FAQ structured data markup." },
      { title: "Add to Your Page", desc: "Copy the JSON-LD script block and paste it into your HTML page's <head> section." },
    ],
    faqs: [
      { q: "Will FAQ schema guarantee Google shows rich results?", a: "No. Google may show FAQ rich results if your page follows the guidelines, but it is not guaranteed. Google decides when to show enhanced results." },
      { q: "How many FAQs should I add?", a: "Google recommends including only FAQs that are genuinely useful. 3-10 is a common range. Avoid padding with low-quality questions." },
    ]
  },
  "og-generator": {
    slug: "og-generator",
    shortTitle: "Open Graph Generator",
    title: "Open Graph Meta Tag Generator - Social Media Preview Tool",
    description: "Generate Open Graph and Twitter Card meta tags instantly. Preview how your content will appear when shared on Facebook, LinkedIn, and Twitter.",
    category: "Schema & Social Media",
    howToUse: [
      { title: "Enter Your Content Details", desc: "Fill in the title, description, image URL, and page URL for your Open Graph tags." },
      { title: "Preview the Card", desc: "See how your link will appear when shared on social media platforms." },
      { title: "Copy the Meta Tags", desc: "Copy the generated meta tags and paste them into your HTML <head> section." },
    ],
    faqs: [
      { q: "What image size should I use for Open Graph?", a: "The recommended size is 1200x630 pixels with a 1.91:1 aspect ratio. This ensures your image displays correctly on Facebook, LinkedIn, and other platforms." },
      { q: "Do I need both OG tags and Twitter Card tags?", a: "Yes. Twitter uses its own twitter:card tags, while Facebook and most other platforms use og: tags. Including both ensures optimal display everywhere." },
    ]
  },
  "og-checker": {
    slug: "og-checker",
    shortTitle: "Open Graph Checker",
    title: "Open Graph Checker - Preview Social Media Share",
    description: "Preview how any URL looks when shared on Facebook, Twitter, and LinkedIn. Check Open Graph tags and identify missing or incorrect metadata.",
    category: "Schema & Social Media",
    howToUse: [
      { title: "Enter a URL", desc: "Type or paste the URL of any webpage you want to preview." },
      { title: "Click Preview", desc: "The tool fetches the page's Open Graph metadata and renders a social card preview." },
      { title: "Review & Fix", desc: "Check for missing og:title, og:description, and og:image tags and fix them accordingly." },
    ],
    faqs: [
      { q: "Why is my OG image not showing?", a: "Possible reasons: the og:image URL is incorrect, the image is blocked by CORS headers, the image is too small, or the og:image tag is missing entirely." },
      { q: "How long does Facebook cache OG data?", a: "Facebook caches OG data for about 24 hours. Use the Facebook Sharing Debugger to force a cache refresh after making changes." },
    ]
  },
  "meta-tag-generator": {
    slug: "meta-tag-generator",
    shortTitle: "Meta Tag Generator",
    title: "Meta Tag Generator - SEO & Social Media Tags",
    description: "Generate complete SEO meta tags including title, description, Open Graph, and Twitter Card tags for any webpage instantly.",
    category: "Schema & Social Media",
    howToUse: [
      { title: "Fill in Your Page Details", desc: "Enter your page title, description, URL, and optionally an image URL." },
      { title: "Customize Options", desc: "Choose robots directives (index/noindex) and other settings." },
      { title: "Copy the HTML", desc: "Copy the complete meta tag HTML block and insert it into your page's <head> section." },
    ],
    faqs: [
      { q: "What is the ideal meta description length?", a: "Google typically displays up to 155-160 characters. Write a description that summarizes the page value and naturally includes your target keyword." },
      { q: "Does the meta keywords tag still matter?", a: "No. Google has officially stated it ignores the meta keywords tag for ranking purposes. Focus on title and description tags instead." },
    ]
  },
  "meta-analyzer": {
    slug: "meta-analyzer",
    shortTitle: "Meta Analyzer",
    title: "Meta Tag Analyzer - Check SEO Tags of Any URL",
    description: "Analyze and audit all meta tags of any URL. Check title, description, Open Graph, canonical, robots, and other critical SEO metadata.",
    category: "Keyword & Content",
    howToUse: [
      { title: "Enter the URL", desc: "Paste the URL of any webpage you want to analyze." },
      { title: "Run Analysis", desc: "Click Analyze and the tool will fetch all meta tags from that page." },
      { title: "Review & Optimize", desc: "Review recommendations for missing or suboptimal tags and implement fixes." },
    ],
    faqs: [
      { q: "Why is the tool not fetching my page?", a: "Some servers block automated requests. The tool cannot fetch pages protected by authentication or behind anti-bot measures." },
    ]
  },
  "photo-location": {
    slug: "photo-location",
    shortTitle: "Photo Location Tracker",
    title: "Photo Location Tracker - Extract GPS EXIF Data from Images",
    description: "Extract GPS coordinates and metadata from photo EXIF data. View photo location on a map. Works entirely offline in your browser.",
    category: "Image & Metadata",
    howToUse: [
      { title: "Upload a Photo", desc: "Upload a JPG photo taken with a camera or smartphone that has GPS enabled." },
      { title: "View Location Data", desc: "The tool extracts GPS coordinates, altitude, camera model, and timestamp from the EXIF data." },
      { title: "Open in Maps", desc: "Click the map link to view the photo's exact location on Google Maps." },
    ],
    faqs: [
      { q: "Why does my photo not show location data?", a: "GPS data is stripped when photos are uploaded to social media (Facebook, Instagram, etc.) or shared via messaging apps for privacy reasons." },
      { q: "Is my photo uploaded to a server?", a: "No. EXIF data is read directly in your browser using the JavaScript FileReader API. Your photo never leaves your device." },
    ]
  },
  "keyword-density": {
    slug: "keyword-density",
    shortTitle: "Keyword Density Checker",
    title: "Keyword Density Checker - Analyze SEO Content",
    description: "Analyze the keyword density of any text. Find over-optimized or under-utilized keywords. Ideal for SEO content writers and editors.",
    category: "Keyword & Content",
    howToUse: [
      { title: "Paste Your Content", desc: "Copy and paste your article, blog post, or webpage text into the input area." },
      { title: "Analyze", desc: "Click Analyze to calculate word frequency and keyword density percentages." },
      { title: "Optimize Your Content", desc: "Use the results to adjust keyword usage — aim for 1-3% density for primary keywords." },
    ],
    faqs: [
      { q: "What is the ideal keyword density?", a: "There is no universal ideal, but 1-3% is commonly cited as a natural range. Over-optimization (keyword stuffing) can negatively affect rankings." },
      { q: "Does Google penalize for high keyword density?", a: "Google's algorithms detect unnatural keyword stuffing. Write for readers first — natural language tends to produce good keyword density automatically." },
    ]
  },
  "vhost-generator": {
    slug: "vhost-generator",
    shortTitle: "Apache2 VHost Generator",
    title: "Apache2 VirtualHost Generator - Free Config Tool",
    description: "Generate Apache2 VirtualHost configurations instantly. Supports HTTP/HTTPS, SSL/TLS (Let's Encrypt), and custom directory rules.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Enter Domain Details", desc: "Input your domain name, admin email, and document root path." },
      { title: "Configure Options", desc: "Toggle AllowOverride and SSL support as needed." },
      { title: "Deploy the Config", desc: "Copy the VHost config, save it to /etc/apache2/sites-available/yourdomain.conf, and enable with a2ensite." },
    ],
    faqs: [
      { q: "How do I enable the VirtualHost on Ubuntu?", a: "Run: sudo a2ensite yourdomain.conf && sudo systemctl reload apache2" },
      { q: "Does this work with Let's Encrypt SSL?", a: "Yes. Enable the SSL option to generate a VirtualHost block with the standard Let's Encrypt certificate paths." },
    ]
  },
  "git-helper": {
    slug: "git-helper",
    shortTitle: "Git Command Helper",
    title: "Git Command Helper - Visual Git Reference Guide",
    description: "A visual reference for the most important Git commands. Browse by category: basic, branching, remote, stash, undo, and more.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Search or Browse Commands", desc: "Use the search box to find a specific command, or browse by category." },
      { title: "Copy the Command", desc: "Click the Copy button next to any command to copy it to your clipboard." },
      { title: "Use in Your Terminal", desc: "Paste the copied command directly into your terminal." },
    ],
    faqs: [
      { q: "What is git rebase vs git merge?", a: "Both integrate changes from one branch into another. Merge creates a merge commit preserving history. Rebase rewrites history for a linear commit graph." },
      { q: "How do I undo the last commit without losing changes?", a: "Use: git reset --soft HEAD~1 — this undoes the commit but keeps your changes staged." },
    ]
  },
  "plagiarism-checker": {
    slug: "plagiarism-checker",
    shortTitle: "Plagiarism Checker",
    title: "Plagiarism Checker - Check Content Originality Online",
    description: "Check your content for potential plagiarism and duplicate content. Get an originality score and identify similar sources.",
    category: "Keyword & Content",
    howToUse: [
      { title: "Paste Your Text", desc: "Copy and paste the content you want to check for plagiarism." },
      { title: "Run Check", desc: "Click Check to scan your content for potential duplication." },
      { title: "Review Results", desc: "View the originality score and any flagged sections that may need to be rewritten." },
    ],
    faqs: [
      { q: "How accurate is this plagiarism checker?", a: "This tool provides an estimate for demonstration purposes. For high-stakes content (academic, legal), use a professional plagiarism detection service." },
    ]
  },
  "sql-formatter": {
    slug: "sql-formatter",
    shortTitle: "SQL Formatter",
    title: "SQL Formatter & Beautifier - Format SQL Queries Online",
    description: "Format and beautify SQL queries instantly. Supports MySQL, PostgreSQL, and standard SQL syntax. Makes complex queries readable.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Paste Your SQL", desc: "Copy and paste your raw or minified SQL query into the input area." },
      { title: "Format", desc: "Click Format to apply proper indentation and keyword capitalization." },
      { title: "Copy Result", desc: "Copy the formatted SQL to use in your database client or codebase." },
    ],
    faqs: [
      { q: "Does this modify my query logic?", a: "No. The formatter only changes whitespace and keyword casing — it never modifies your query's logic or structure." },
      { q: "Does this support all SQL dialects?", a: "It handles standard SQL with general support for MySQL, PostgreSQL, and SQLite. Dialect-specific functions may not be formatted perfectly." },
    ]
  },
  "dns-propagation": {
    slug: "dns-propagation",
    shortTitle: "DNS Propagation Checker",
    title: "DNS Propagation Checker - Check DNS Records Globally",
    description: "Check DNS propagation status for any domain. Verify A, CNAME, MX, TXT, and NS records from multiple global locations instantly.",
    category: "Technical SEO & Google",
    howToUse: [
      { title: "Enter Domain", desc: "Type your domain name (e.g., example.com) in the input field." },
      { title: "Select Record Type", desc: "Choose the DNS record type you want to check: A, CNAME, MX, TXT, or NS." },
      { title: "Check Results", desc: "View DNS query results showing the current record values." },
    ],
    faqs: [
      { q: "How long does DNS propagation take?", a: "DNS changes typically propagate worldwide within 24-48 hours, though it often completes in under an hour depending on the record's TTL value." },
      { q: "Why do I see different DNS values from different locations?", a: "DNS propagation is not instantaneous. Different servers update at different times based on their cached TTL expiry." },
    ]
  },
  "http-status": {
    slug: "http-status",
    shortTitle: "HTTP Status Checker",
    title: "HTTP Status Checker - Check URL Response Codes Online",
    description: "Check HTTP response codes for any URL. Verify 200 OK, 301 redirects, 404 errors, and other HTTP status codes instantly.",
    category: "Technical SEO & Google",
    howToUse: [
      { title: "Enter the URL", desc: "Type or paste the URL you want to check." },
      { title: "Check Status", desc: "Click Check to send an HTTP request and retrieve the response code." },
      { title: "Interpret Results", desc: "200 = OK, 301/302 = Redirect, 404 = Not Found, 500 = Server Error." },
    ],
    faqs: [
      { q: "What does a 301 redirect mean for SEO?", a: "A 301 (Permanent Redirect) tells search engines that a page has permanently moved. Google transfers most of the original page's ranking signals to the new URL." },
      { q: "What causes a 500 error?", a: "HTTP 500 is an Internal Server Error, meaning something went wrong on the server. Check your server logs to diagnose the cause." },
    ]
  },
  "robots-generator": {
    slug: "robots-generator",
    shortTitle: "Robots.txt Generator",
    title: "Robots.txt Generator - Create SEO Robots File Free",
    description: "Generate a properly formatted robots.txt file for your website. Control which pages search engine crawlers can and cannot access.",
    category: "Technical SEO & Google",
    howToUse: [
      { title: "Configure Rules", desc: "Select which bots to configure and specify which directories to allow or disallow." },
      { title: "Add Sitemap URL", desc: "Include your sitemap URL in the robots.txt for better crawl discovery." },
      { title: "Download & Deploy", desc: "Copy or download the file and upload it to your website's root directory." },
    ],
    faqs: [
      { q: "Does robots.txt prevent pages from appearing in search results?", a: "Disallowing a page prevents crawling but does not guarantee removal from search results. URLs can appear if other sites link to them. Use meta noindex for full removal." },
      { q: "Where should robots.txt be placed?", a: "The file must be at the root of your domain: https://yourdomain.com/robots.txt" },
    ]
  },
  "docker-generator": {
    slug: "docker-generator",
    shortTitle: "Dockerfile Generator",
    title: "Dockerfile Generator - Create Docker Configurations Online",
    description: "Generate optimized Dockerfile configurations for Node.js, Python, PHP, and other runtimes. Supports multi-stage builds.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Select Runtime", desc: "Choose your application's runtime (Node.js, Python, PHP, etc.) and version." },
      { title: "Configure Options", desc: "Set expose ports, working directory, and build stages." },
      { title: "Copy & Deploy", desc: "Copy the generated Dockerfile to your project root and build with: docker build -t myapp ." },
    ],
    faqs: [
      { q: "What is a multi-stage Docker build?", a: "Multi-stage builds use multiple FROM instructions to create separate build and production stages. This significantly reduces the final image size by excluding build tools from the production image." },
      { q: "What is the difference between CMD and ENTRYPOINT?", a: "ENTRYPOINT defines the main command that always runs. CMD provides default arguments to ENTRYPOINT or a default command that can be overridden." },
    ]
  },
  "nginx-config": {
    slug: "nginx-config",
    shortTitle: "Nginx Config Generator",
    title: "Nginx Config Generator - Server Block Configuration Tool",
    description: "Generate Nginx server block configurations for static sites, Node.js, PHP, and reverse proxies. Includes SSL/TLS settings.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Enter Server Details", desc: "Input your domain, document root, and server type (static, PHP, Node.js proxy)." },
      { title: "Enable SSL", desc: "Toggle SSL to generate HTTPS configuration with Let's Encrypt certificate paths." },
      { title: "Deploy Config", desc: "Copy the config to /etc/nginx/sites-available/yourdomain and run: sudo nginx -t && sudo systemctl reload nginx" },
    ],
    faqs: [
      { q: "What is a reverse proxy in Nginx?", a: "A reverse proxy in Nginx forwards client requests to a backend server (e.g., a Node.js app on port 3000) and returns the response to the client, often adding SSL and caching." },
    ]
  },
  "htaccess": {
    slug: "htaccess",
    shortTitle: "htaccess Generator",
    title: "htaccess Generator - Apache .htaccess File Creator",
    description: "Generate Apache .htaccess configurations for redirects, HTTPS enforcement, password protection, and security headers.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Choose Rules", desc: "Select which .htaccess rules to include: HTTPS redirect, www redirect, directory protection, etc." },
      { title: "Configure Details", desc: "Fill in specific values like redirect targets or protected paths." },
      { title: "Copy & Upload", desc: "Copy the generated .htaccess content and upload it to your website's root directory." },
    ],
    faqs: [
      { q: "Is .htaccess the same as the Apache main config?", a: "No. .htaccess is a directory-level override file, while httpd.conf is the main server configuration. .htaccess is commonly used on shared hosting where you don't have root access." },
    ]
  },
  "bg-removal": {
    slug: "bg-removal",
    shortTitle: "Background Remover",
    title: "Background Remover - Remove Image Background Online Free",
    description: "Remove solid backgrounds from images instantly using the Color-Range algorithm. Best for icons, logos, and product photos. 100% client-side processing.",
    category: "Image & Metadata",
    howToUse: [
      { title: "Upload Your Image", desc: "Drag and drop or click to upload a JPG or PNG image with a clear, solid background." },
      { title: "Adjust Tolerance", desc: "Use the tolerance slider to control how aggressively the background color is removed. Lower values remove only exact matches; higher values remove similar shades." },
      { title: "Process & Download", desc: "Click Process and download the result as a transparent PNG file." },
    ],
    faqs: [
      { q: "Does this work with complex backgrounds?", a: "This tool works best with solid or near-solid color backgrounds (white, green screen, etc.). Complex backgrounds with gradients or multiple colors may not be fully removed." },
      { q: "Is my image uploaded to a server?", a: "No. All processing happens in your browser using the HTML5 Canvas API. Your image never leaves your device." },
      { q: "What output format is used?", a: "The result is always a PNG file with transparency, which preserves the removed background as transparent pixels." },
    ]
  },
  "google-cache": {
    slug: "google-cache",
    shortTitle: "Google Cache Checker",
    title: "Google Cache Checker - View Cached Version of Any Page",
    description: "View the cached version of any webpage to see exactly what Google's bot saw during its last crawl. Useful for SEO auditing and troubleshooting indexing issues.",
    category: "Technical SEO & Google",
    howToUse: [
      { title: "Enter URL", desc: "Type or paste the full URL of the webpage you want to check." },
      { title: "Check Cache", desc: "Click Check to attempt to retrieve Google's cached version of the page." },
      { title: "Review Results", desc: "View the cached snapshot to compare with the current live version and identify discrepancies." },
    ],
    faqs: [
      { q: "Why there is no cached version of my page?", a: "Google may not have cached the page if it was recently published, blocked by robots.txt or meta noindex, or if the page failed to render during crawling." },
      { q: "How often does Google update its cache?", a: "Cache frequency varies. High-authority pages may be cached multiple times per day, while smaller pages might be cached every few weeks." },
    ]
  },
  "google-index": {
    slug: "google-index",
    shortTitle: "Google Index Checker",
    title: "Google Index Checker - Check If Your Page Is Indexed",
    description: "Quickly check if a website or specific page is indexed by Google using search operators. Essential for SEO auditing and monitoring.",
    category: "Technical SEO & Google",
    howToUse: [
      { title: "Enter URL", desc: "Type the URL of the page or domain you want to check." },
      { title: "Run Check", desc: "The tool uses the site: search operator to verify whether Google has indexed the page." },
      { title: "Interpret Results", desc: "If indexed, Google returns results. If not, the page may need to be submitted via Google Search Console." },
    ],
    faqs: [
      { q: "What does 'not indexed' mean?", a: "It means Google hasn't added the page to its search index. Possible causes include noindex tags, robots.txt blocks, canonical issues, or the page being too new." },
      { q: "How long does it take for Google to index a new page?", a: "It can take anywhere from a few hours to several weeks. Submitting the URL through Google Search Console can speed up the process." },
    ]
  },
  "http-headers": {
    slug: "http-headers",
    shortTitle: "HTTP Headers Checker",
    title: "HTTP Headers Checker - Inspect Server Response Headers",
    description: "Inspect the security and server response headers for any URL to identify optimization opportunities. Check for caching, CORS, HSTS, and more.",
    category: "Technical SEO & Google",
    howToUse: [
      { title: "Enter URL", desc: "Type or paste the URL whose HTTP headers you want to inspect." },
      { title: "Send Request", desc: "Click Check to send an HTTP request and retrieve the full response headers." },
      { title: "Analyze Headers", desc: "Review security headers (HSTS, CSP, X-Frame-Options), caching headers (Cache-Control, ETag), and server information." },
    ],
    faqs: [
      { q: "What are the most important security headers?", a: "Key security headers include Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Content-Type-Options, X-Frame-Options, and Referrer-Policy." },
      { q: "Why should I check HTTP headers?", a: "Headers reveal how your server handles caching, security, CORS, and compression. Misconfigured headers can hurt SEO, performance, and security." },
    ]
  },
  "image-repair": {
    slug: "image-repair",
    shortTitle: "Image Repair Tool",
    title: "Repair Corrupted Image - Fix Damaged Image Files Online",
    description: "Attempt to fix damaged or corrupted image files by restoring missing headers and standard file signatures. Supports JPG, PNG, and WebP formats.",
    category: "Image & Metadata",
    howToUse: [
      { title: "Upload Corrupted Image", desc: "Select or drag-and-drop the corrupted image file you want to repair." },
      { title: "Auto-Repair", desc: "The tool analyzes the file structure and attempts to restore missing or broken file headers." },
      { title: "Download Repaired File", desc: "If repair is successful, download the fixed image file." },
    ],
    faqs: [
      { q: "Can this repair any corrupted image?", a: "This tool can fix images with corrupted or missing file headers. Severely corrupted files where actual pixel data is lost may not be fully recoverable." },
      { q: "What types of corruption can be repaired?", a: "Common fixable issues include missing magic bytes (file signatures), truncated headers, and minor structural errors in the file container format." },
    ]
  },
  "url-encoder": {
    slug: "url-encoder",
    shortTitle: "URL Encoder/Decoder",
    title: "URL Encoder & Decoder - Percent-encoding Online Tool",
    description: "Encode or decode URLs instantly. Safely handle special characters for use in query strings, file paths, and URI components. 100% client-side.",
    category: "Developer & Data Suite",
    howToUse: [
      { title: "Paste Your URL or Text", desc: "Enter the text or URL you want to encode, or paste an encoded URL you want to decode." },
      { title: "Encode or Decode", desc: "Click 'Encode' to turn special characters into percent-encoded format, or 'Decode' to revert them to plain text." },
      { title: "Copy Result", desc: "Click the Copy button to quickly use the output in your project." },
    ],
    faqs: [
      { q: "What is URL encoding?", a: "URL encoding (percent-encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). Characters not allowed in a URI are replaced with a '%' followed by two hexadecimal digits." },
      { q: "Which characters are encoded?", a: "Reserved characters like '?', '&', '=', '/', and space are encoded to ensure they don't break the structure of a URL." },
      { q: "Is this secure?", a: "Yes. All processing happens in your browser. No data is sent to our servers." },
    ]
  },
};

// Helper to get tool metadata by slug
export function getToolMeta(slug: string): ToolMeta | null {
  return TOOLS_META[slug] ?? null;
}

// All tool slugs for sitemap generation
export const ALL_TOOL_SLUGS = [
  "base64", "bg-removal", "compressor", "cron-generator", "dns-propagation",
  "docker-generator", "faq-schema", "git-helper", "google-cache", "google-index",
  "hash-generator", "htaccess", "http-headers", "http-status", "image-repair",
  "json-formatter", "jwt-decoder", "keyword-density",
  "meta-analyzer", "meta-tag-generator", "nginx-config", "og-checker", "og-generator",
  "photo-location", "regex-tester", "robots-generator",
  "sql-formatter", "unminify", "uuid-generator",
  "vhost-generator", "url-encoder",
];
