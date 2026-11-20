"use client";

import { useEffect } from "react";
import { CHAPTERS, PLACES, UI } from "@/data/content";
import { SOURCE_MAP } from "@/data/sources";
import { useUI } from "@/lib/store";
import { scrollToId } from "@/lib/scroll";
import { useT } from "@/lib/useT";

export function Loader() {
  const ready = useUI((s) => s.sceneReady);
  const { t } = useT();
  return (
    <div className="loader" data-done={ready ? "1" : "0"} role="status" aria-live="polite">
      <div className="loader__inner">
        <div className="loader__kn" lang="kn">
          ನಮ್ಮ ಶಿರಸಿ
        </div>
        <div className="loader__en">Namma Sirsi</div>
        <div className="loader__bar" />
        <p style={{ marginTop: "1.4rem", fontSize: "0.85rem", color: "var(--mist-dim)" }}>{t(UI.loading)}</p>
      </div>
    </div>
  );
}

export function Nav() {
  const { t, lang } = useT();
  const setLang = useUI((s) => s.setLang);
  const reduced = useUI((s) => s.reducedMotion);
  const setReduced = useUI((s) => s.setReducedMotion);
  const menuOpen = useUI((s) => s.menuOpen);
  const setMenuOpen = useUI((s) => s.setMenuOpen);
  const active = useUI((s) => s.activeChapter);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // let the overlay start closing before the scroll begins
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); scrollToId("discover"); }}>
        {t(UI.skip)}
      </a>
      <header className="nav">
        <a
          className="nav__brand"
          href="#arrival"
          onClick={(e) => {
            e.preventDefault();
            go("arrival");
          }}
          aria-label="Namma Sirsi, home"
        >
          <b>{lang === "kn" ? "ನಮ್ಮ ಶಿರಸಿ" : "NAMMA SIRSI"}</b>
          <small>{lang === "kn" ? "NAMMA SIRSI" : "ನಮ್ಮ ಶಿರಸಿ"}</small>
        </a>
        <div className="nav__actions">
          <button
            type="button"
            className="btn"
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            aria-label={lang === "en" ? "Switch to Kannada" : "Switch to English"}
            lang={lang === "en" ? "kn" : "en"}
          >
            {t(UI.lang)}
          </button>
          <button
            type="button"
            className="btn"
            aria-pressed={reduced}
            onClick={() => setReduced(!reduced)}
            title={t(UI.motion)}
          >
            {t(UI.motion)}
          </button>
          <button
            type="button"
            className="btn"
            aria-expanded={menuOpen}
            aria-controls="chapter-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? t(UI.close) : t(UI.menu)}
          </button>
        </div>
      </header>

      <nav id="chapter-menu" className="menu" data-open={menuOpen ? "1" : "0"} aria-label={t(UI.menu)} aria-hidden={!menuOpen}>
        <ol>
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={active === i ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(c.id);
                }}
              >
                <span>{c.no}</span>
                {t(c.title)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <nav className="rail" aria-label={t(UI.menu)}>
        {CHAPTERS.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={`${c.no} ${c.title.en}`}
            aria-current={active === i ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(c.id);
            }}
          >
            <span>{t(c.title)}</span>
          </a>
        ))}
      </nav>
    </>
  );
}

const AREA_KEY = { town: "inTown", taluk: "inTaluk", region: "inRegion" } as const;

export function Sheet() {
  const { t, lang } = useT();
  const selected = useUI((s) => s.selected);
  const select = useUI((s) => s.select);
  const place = PLACES.find((p) => p.id === selected);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && select(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, select]);

  return (
    <aside className="sheet" data-open={place ? "1" : "0"} aria-live="polite" aria-hidden={!place} role="dialog" aria-label={place ? t(place.name) : undefined}>
      {place && (
        <>
          <button type="button" className="btn sheet__close" onClick={() => select(null)}>
            {t(UI.close)}
          </button>
          <div>
            <span className="badge">{t(UI[AREA_KEY[place.area]])}</span>
            {place.km && (
              <span className="badge">
                {place.km[0] === place.km[1]
                  ? `${t(UI.approx)} ${place.km[0]} ${lang === "kn" ? "ಕಿ.ಮೀ" : "km"}`
                  : `${place.km[0]}–${place.km[1]} ${lang === "kn" ? "ಕಿ.ಮೀ" : "km"}`}
              </span>
            )}
          </div>
          <h3>{t(place.name)}</h3>
          <p className="body-text" style={{ margin: 0 }}>
            {t(place.summary)}
          </p>
          <ul className="facts">
            {place.facts.map((f, i) => (
              <li key={i}>{t(f)}</li>
            ))}
          </ul>
          {place.season && (
            <p className="note">
              <b>{t(UI.best)}:</b> {t(place.season)}
            </p>
          )}
          {place.areaNote && <p className="note">{t(place.areaNote)}</p>}
          <div className="srcs">
            {t(UI.sources)}:{" "}
            {place.src.map((id) => {
              const s = SOURCE_MAP[id];
              return s ? (
                <a key={id} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title.split(" — ")[0]}
                </a>
              ) : null;
            })}
          </div>
        </>
      )}
    </aside>
  );
}
