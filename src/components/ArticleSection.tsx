import React from "react";

interface ArticleSectionProps {
  title: string;
  content: string;
}

export default function ArticleSection({ title, content }: ArticleSectionProps) {
  return (
    <section className="mt-12 pt-12 border-t border-border space-y-4">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
        {content.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4">{para}</p>
        ))}
      </div>
    </section>
  );
}
