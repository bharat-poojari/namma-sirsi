"use client";

import { UI } from "@/data/content";
import { SOURCES } from "@/data/sources";
import { useT } from "@/lib/useT";

export function Sources() {
  const { t } = useT();
  return (
    <section id="sources" className="sources" aria-labelledby="sources-t">
      <div className="sources__wrap">
        <div className="chapter__kicker">{t(UI.sources)}</div>
        <h2 id="sources-t">{t(UI.sourcesTitle)}</h2>
        <p className="body-text" style={{ maxWidth: "44rem" }}>
          {t(UI.sourcesIntro)}
        </p>
        <ol>
          {SOURCES.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title}
              </a>
              {s.note && <small>{s.note}</small>}
            </li>
          ))}
        </ol>
        <div className="footer">
          <span>NAMMA SIRSI · ನಮ್ಮ ಶಿರಸಿ</span>
          <span>{t({ en: "Made with love for Sirsi.", kn: "ಶಿರಸಿಯ ಮೇಲಿನ ಪ್ರೀತಿಯಿಂದ." })}</span>
        </div>
      </div>
    </section>
  );
}
