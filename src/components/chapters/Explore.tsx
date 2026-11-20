"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { CHAPTERS, ITINERARIES, PLACES, REACH, UI, type Category, type Place } from "@/data/content";
import { TIMELINE } from "@/data/archive";
import { SOURCE_MAP } from "@/data/sources";
import { useUI } from "@/lib/store";
import { useT } from "@/lib/useT";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--mist-dim)" }}>…</div>,
});

const CATS: { id: Category | "all"; l: { en: string; kn: string } }[] = [
  { id: "all", l: UI.all },
  { id: "sacred", l: { en: "Sacred", kn: "ಪವಿತ್ರ" } },
  { id: "heritage", l: { en: "Heritage", kn: "ಪರಂಪರೆ" } },
  { id: "waterfall", l: { en: "Waterfalls", kn: "ಜಲಪಾತ" } },
  { id: "nature", l: { en: "Nature", kn: "ಪ್ರಕೃತಿ" } },
  { id: "culture", l: { en: "Culture", kn: "ಸಂಸ್ಕೃತಿ" } },
  { id: "village", l: { en: "Towns", kn: "ಊರುಗಳು" } },
];

const TABS = [
  { id: "map", l: { en: "Map", kn: "ನಕ್ಷೆ" } },
  { id: "directory", l: { en: "Directory", kn: "ಸ್ಥಳ ಪಟ್ಟಿ" } },
  { id: "plan", l: { en: "Plan a trip", kn: "ಪ್ರವಾಸ ಯೋಜನೆ" } },
  { id: "archive", l: { en: "Archive", kn: "ಸಂಗ್ರಹ" } },
] as const;
type Tab = (typeof TABS)[number]["id"];

const AREAS = [
  { id: "town", key: "inTown" },
  { id: "taluk", key: "inTaluk" },
  { id: "region", key: "inRegion" },
] as const;

function kmLabel(p: Place, kn: boolean) {
  if (!p.km) return "";
  const u = kn ? "ಕಿ.ಮೀ" : "km";
  return p.km[0] === p.km[1] ? `${p.km[0]} ${u}` : `${p.km[0]}–${p.km[1]} ${u}`;
}

function MapTab() {
  const { t } = useT();
  return (
    <div>
      <div className="mapbox" role="region" aria-label={t(TABS[0].l)}>
        <MapView />
      </div>
      <p className="note">{t(UI.mapNote)}</p>
    </div>
  );
}

function DirectoryTab() {
  const { t, lang } = useT();
  const select = useUI((s) => s.select);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PLACES.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!needle) return true;
      const hay = [p.name.en, p.name.kn, p.summary.en, p.summary.kn, ...p.facts.map((f) => f.en + " " + f.kn)]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [q, cat]);

  const ladder = useMemo(
    () => PLACES.filter((p) => p.km && p.km[1] > 0).sort((a, b) => a.km![1] - b.km![1]),
    [],
  );
  const maxKm = Math.max(...ladder.map((p) => p.km![1]));

  return (
    <div>
      <div className="search">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t(UI.search)}
          aria-label={t(UI.search)}
        />
      </div>
      <div className="tabs" role="group" aria-label="Filter">
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="tab"
            aria-selected={cat === c.id}
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {t(c.l)}
          </button>
        ))}
      </div>

      {results.length === 0 && <p className="body-text">{t(UI.noResults)}</p>}
      {AREAS.map((a) => {
        const list = results.filter((p) => p.area === a.id);
        if (!list.length) return null;
        return (
          <div key={a.id}>
            <div className="group-title">{t(UI[a.key])}</div>
            <ul className="index">
              {list.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => select(p.id)}>
                    <span className="t">{t(p.name)}</span>
                    <span className="m">{kmLabel(p, lang === "kn")}</span>
                    <span className="d">{t(p.summary)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <div className="group-title" style={{ marginTop: "2.6rem" }}>
        {t(UI.distance)}
      </div>
      <div className="ladder">
        {ladder.map((p) => {
          const lo = p.km![0],
            hi = p.km![1];
          return (
            <button key={p.id} type="button" onClick={() => select(p.id)}>
              <span className="nm">{t(p.name)}</span>
              <span className="bar" aria-hidden="true">
                <i style={{ left: `${(lo / maxKm) * 100}%`, width: `${Math.max(1.2, ((hi - lo) / maxKm) * 100)}%` }} />
              </span>
              <span className="km">{kmLabel(p, lang === "kn")}</span>
            </button>
          );
        })}
      </div>
      <p className="note">
        {lang === "kn"
          ? "ದೂರಗಳು ಆಧಾರಗಳಲ್ಲಿ ಭಿನ್ನವಾಗಿರುತ್ತವೆ; ಶ್ರೇಣಿಗಳು ಅದನ್ನು ತೋರಿಸುತ್ತವೆ. ರಸ್ತೆ ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಗಬಹುದು."
          : "Sources disagree on distances, so ranges are shown. Actual drive distance varies with route and weather."}
      </p>
    </div>
  );
}

function PlanTab() {
  const { t } = useT();
  const select = useUI((s) => s.select);
  return (
    <div className="two">
      <div>
        <div className="group-title" style={{ marginTop: 0 }}>
          {t(UI.itin)}
        </div>
        {ITINERARIES.map((it) => (
          <div className="itin" key={it.id}>
            <h4>{t(it.title)}</h4>
            {it.days.map((d) => (
              <div className="day" key={d.label.en}>
                <em>{t(d.label)}</em>
                {d.stops.map((id) => {
                  const p = PLACES.find((x) => x.id === id);
                  return p ? (
                    <button type="button" key={id} onClick={() => select(id)}>
                      {t(p.name)}
                    </button>
                  ) : null;
                })}
              </div>
            ))}
            <p className="body-text" style={{ fontSize: "0.92rem" }}>
              {t(it.note)}
            </p>
          </div>
        ))}
      </div>
      <div>
        <div className="group-title" style={{ marginTop: 0 }}>
          {t(UI.reach)}
        </div>
        <ul className="facts">
          {REACH.items.map((r, i) => (
            <li key={i}>
              {t(r)}{" "}
              <a
                href={SOURCE_MAP[r.src]?.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(233,240,234,.5)" }}
              >
                [{SOURCE_MAP[r.src]?.title.split(" — ")[0]}]
              </a>
            </li>
          ))}
        </ul>
        <div className="group-title">{t({ en: "Seasons", kn: "ಋತುಗಳು" })}</div>
        <ul className="facts">
          <li>
            {t({
              en: "Waterfalls run fullest after the monsoon, roughly August to December.",
              kn: "ಮಳೆಗಾಲದ ನಂತರ, ಸುಮಾರು ಆಗಸ್ಟ್‌ನಿಂದ ಡಿಸೆಂಬರ್ ಜಲಪಾತಗಳು ಭರ್ತಿ.",
            })}
          </li>
          <li>
            {t({
              en: "Sahasralinga's carvings are easiest to see when the river is low, in winter and summer.",
              kn: "ನದಿ ಕಡಿಮೆಯಿರುವ ಚಳಿ-ಬೇಸಿಗೆಯಲ್ಲಿ ಸಹಸ್ರಲಿಂಗ ಕೆತ್ತನೆ ಸುಲಭವಾಗಿ ಕಾಣುತ್ತದೆ.",
            })}
          </li>
          <li>
            {t({
              en: "Ghat roads can be hazardous during heavy rain.",
              kn: "ಭಾರಿ ಮಳೆಯಲ್ಲಿ ಘಟ್ಟದ ರಸ್ತೆಗಳು ಅಪಾಯಕಾರಿಯಾಗಬಹುದು.",
            })}
          </li>
        </ul>
      </div>
    </div>
  );
}

function ArchiveTab() {
  const { t } = useT();
  return (
    <div>
      <div className="group-title" style={{ marginTop: 0 }}>
        {t({ en: "A timeline of Sirsi and its neighbours", kn: "ಶಿರಸಿ ಮತ್ತು ನೆರೆಹೊರೆಯ ಕಾಲರೇಖೆ" })}
      </div>
      <ol className="timeline">
        {TIMELINE.map((e) => (
          <li key={e.when + e.text.en}>
            <b>{e.when}</b>
            <p className="body-text" style={{ margin: "0.2rem 0 0.2rem" }}>
              {t(e.text)}
            </p>
            <a
              href={SOURCE_MAP[e.src]?.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(233,240,234,.5)", textDecoration: "none" }}
            >
              {SOURCE_MAP[e.src]?.title.split(" — ")[0]}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Explore() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("map");
  const meta = CHAPTERS.find((c) => c.id === "explore")!;
  return (
    <section id="explore" data-chapter="explore" className="explore" aria-labelledby="explore-t">
      <div className="explore__wrap">
        <div className="explore__head" data-reveal style={{ pointerEvents: "auto" }}>
          <span className="chapter__no" aria-hidden="true">
            {meta.no}
          </span>
          <div className="chapter__kicker">{t({ en: "Map · Directory · Itineraries · Archive", kn: "ನಕ್ಷೆ · ಸ್ಥಳ ಪಟ್ಟಿ · ಪ್ರವಾಸ · ಸಂಗ್ರಹ" })}</div>
          <h2 id="explore-t" className="chapter__title">
            {t(meta.title)}
          </h2>
        </div>
        <div className="panel" data-reveal>
          <div className="tabs" role="tablist" aria-label={t(meta.title)}>
            {TABS.map((x) => (
              <button
                key={x.id}
                role="tab"
                id={`tab-${x.id}`}
                aria-controls={`panel-${x.id}`}
                aria-selected={tab === x.id}
                type="button"
                className="tab"
                onClick={() => setTab(x.id)}
              >
                {t(x.l)}
              </button>
            ))}
          </div>
          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === "map" && <MapTab />}
            {tab === "directory" && <DirectoryTab />}
            {tab === "plan" && <PlanTab />}
            {tab === "archive" && <ArchiveTab />}
          </div>
        </div>
      </div>
    </section>
  );
}
