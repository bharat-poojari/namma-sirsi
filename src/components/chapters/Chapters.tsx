"use client";

import { CHAPTERS, PLACES, STORY, UI, type ChapterId } from "@/data/content";
import { PRACTICES } from "@/data/archive";
import { SOURCE_MAP } from "@/data/sources";
import { CHAPTER_PHOTOS } from "@/data/photography";
import type { ChapterPhoto } from "@/data/photography";
import { useUI } from "@/lib/store";
import { scrollToId } from "@/lib/scroll";
import { useT } from "@/lib/useT";
import { ChapterMedia } from "./ChapterMedia";

function photosFor(id: Exclude<ChapterId, "arrival" | "explore">): ChapterPhoto[] {
  const photos = CHAPTER_PHOTOS[id];
  return photos ? (Array.isArray(photos) ? photos : [photos]) : [];
}

function SrcLink({ id }: { id: string }) {
  const s = SOURCE_MAP[id];
  if (!s) return null;
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" title={s.title}>
      {s.title.split(" — ")[0]}
    </a>
  );
}

export function Hero() {
  const { t } = useT();
  const c = STORY.arrival;
  const words = t(c.title).split(" ");
  return (
    <section id="arrival" data-chapter="arrival" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner" data-hero-inner>
        <div data-hero-sub>
          <div className="hero__kicker">{t(c.kicker)}</div>
        </div>
        <h1 id="hero-title" className="hero__title" data-hero-title>
          {words.map((w, i) => (
            <span className="word" key={i}>
              <span>{w}</span>
            </span>
          ))}
        </h1>
        <p className="hero__sub" data-hero-sub>
          {t(c.lede)}
        </p>
        <div className="hero__scroll" data-hero-scroll aria-hidden="true">
          {t(UI.scroll)}
          <i />
        </div>
      </div>
      {/* extra scroll distance for the opening camera move */}
      <div style={{ height: "60svh" }} />
    </section>
  );
}

function Stats({ id }: { id: Exclude<ChapterId, "explore"> }) {
  const { t } = useT();
  const stats = STORY[id].stats;
  if (!stats) return null;
  return (
    <div className="panel" data-reveal>
      <ul className="stats">
        {stats.map((s) => (
          <li key={s.label.en}>
            <b>{s.value}</b>
            <span>{t(s.label)}</span>
            <a href={SOURCE_MAP[s.src]?.url} target="_blank" rel="noopener noreferrer">
              {t(UI.sources)}: {SOURCE_MAP[s.src]?.title.split(" — ")[0]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Head({ id, ghost }: { id: Exclude<ChapterId, "explore">; ghost?: string }) {
  const { t } = useT();
  const c = STORY[id];
  const meta = CHAPTERS.find((x) => x.id === id)!;
  return (
    <>
      {ghost && (
        <div className="chapter__ghost" data-ghost aria-hidden="true">
          {ghost}
        </div>
      )}
      <div className="chapter__head" data-reveal>
        <span className="chapter__no" aria-hidden="true">
          {meta.no}
        </span>
        <div className="chapter__kicker">{t(c.kicker)}</div>
        <h2 id={`${id}-t`} className="chapter__title">{t(c.title)}</h2>
      </div>
    </>
  );
}

function Prose({ id }: { id: Exclude<ChapterId, "arrival" | "explore" | "identity"> }) {
  const { t } = useT();
  const c = STORY[id];
  const photos = photosFor(id);
  return (
    <div className="panel" data-reveal>
      <p className="lede">{t(c.lede)}</p>
      {photos.length > 0 && <ChapterMedia photos={photos} />}
      {c.body.map((b, i) => (
        <p key={i} className="body-text">
          {t(b)}
        </p>
      ))}
    </div>
  );
}

function PlaceIndex({ ids, max }: { ids: string[]; max?: number }) {
  const { t } = useT();
  const select = useUI((s) => s.select);
  const list = ids.map((i) => PLACES.find((p) => p.id === i)).filter(Boolean).slice(0, max);
  return (
    <div className="panel" data-reveal>
      <ul className="index">
        {list.map((p) => (
          <li key={p!.id}>
            <button type="button" onClick={() => select(p!.id)}>
              <span className="t">{t(p!.name)}</span>
              <span className="m">{t(UI[p!.area === "town" ? "inTown" : p!.area === "taluk" ? "inTaluk" : "inRegion"])}</span>
              <span className="d">{t(p!.summary)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shell({
  id,
  side,
  ghost,
  children,
}: {
  id: Exclude<ChapterId, "explore">;
  side: "left" | "right";
  ghost?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-chapter={id} data-side={side} className="chapter" aria-labelledby={`${id}-t`}>
      <div className="chapter__grid">
        <Head id={id} ghost={ghost} />
        <div className="chapter__body">{children}</div>
      </div>
    </section>
  );
}

export function Discover() {
  return (
    <Shell id="discover" side="left" ghost="ಶಿರಸಿ">
      <Prose id="discover" />
      <Stats id="discover" />
    </Shell>
  );
}

export function Sacred() {
  return (
    <Shell id="sacred" side="right" ghost="ದೇವಿ">
      <Prose id="sacred" />
      <Stats id="sacred" />
      <PlaceIndex ids={["marikamba", "sahasralinga", "sonda", "banavasi", "manjuguni"]} />
    </Shell>
  );
}

export function Wild() {
  return (
    <Shell id="wild" side="left" ghost="ಕಾಡು">
      <Prose id="wild" />
      <Stats id="wild" />
      <PlaceIndex ids={["unchalli", "benne-hole", "shivaganga", "magod", "sathodi", "burude"]} />
    </Shell>
  );
}

export function Culture() {
  const { t } = useT();
  const items = PRACTICES.filter((p) =>
    ["Bedara Vesha", "Dollu Kunitha", "Yakshagana", "Marikamba Jatre", "Kadambotsava", "Maha Shivaratri at Yana"].includes(p.name.en),
  );
  return (
    <Shell id="culture" side="right" ghost="ಕಲೆ">
      <Prose id="culture" />
      <Stats id="culture" />
      <div className="panel" data-reveal>
        <ul className="index">
          {items.map((p) => (
            <li key={p.name.en}>
              <div className="row">
                <span className="t">{t(p.name)}</span>
                <span className="m" />
                <span className="d">{t(p.text)}</span>
                <span className="src">
                  <SrcLink id={p.src} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

const DISHES: { en: string; kn: string; d: { en: string; kn: string } }[] = [
  { en: "Thambuli", kn: "ತಂಬುಳಿ", d: { en: "Vegetables, leaves or herbs in curd or buttermilk with a fried spice tempering.", kn: "ಮೊಸರು ಅಥವಾ ಮಜ್ಜಿಗೆಯಲ್ಲಿ ತರಕಾರಿ, ಸೊಪ್ಪು, ಒಗ್ಗರಣೆ." } },
  { en: "Sasime", kn: "ಸಾಸಿಮೆ", d: { en: "A ground vegetable paste mixed with curd.", kn: "ರುಬ್ಬಿದ ತರಕಾರಿ ಮೊಸರಿನೊಂದಿಗೆ." } },
  { en: "Appe Huli", kn: "ಅಪ್ಪೆಹುಳಿ", d: { en: "A sour, watery soup of unripe mango and chilli.", kn: "ಮಾವಿನಕಾಯಿ-ಮೆಣಸಿನ ಹುಳಿ ಸಾರು." } },
  { en: "Patrode", kn: "ಪತ್ರೊಡೆ", d: { en: "Rolled colocasia leaves.", kn: "ಕೆಸುವಿನ ಎಲೆಯ ರೋಲ್." } },
  { en: "Melara", kn: "ಮೇಲಾರ", d: { en: "A mild coconut-yogurt curry.", kn: "ತೆಂಗು-ಮೊಸರಿನ ಮೃದು ಸಾರು." } },
];

export function Taste() {
  const { t } = useT();
  return (
    <Shell id="taste" side="left" ghost="ರುಚಿ">
      <Prose id="taste" />
      <div className="panel" data-reveal>
        <ul className="index">
          {DISHES.map((d) => (
            <li key={d.en}>
              <div className="row">
                <span className="dish">
                  <span lang="kn">{d.kn}</span>
                  <small>{d.en}</small>
                </span>
                <span className="m" />
                <span className="d">{t(d.d)}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="srcs" style={{ marginTop: "1rem" }}>
          {t(UI.sources)}: <SrcLink id="wiki-havyak" /> <SrcLink id="havyaka-food" />
        </p>
      </div>
    </Shell>
  );
}

export function People() {
  const { t } = useT();
  const items = PRACTICES.filter((p) => ["Sirsi Supari", "Havigannada"].includes(p.name.en));
  return (
    <Shell id="people" side="right" ghost="ಜನ">
      <Prose id="people" />
      <Stats id="people" />
      <div className="panel" data-reveal>
        <ul className="index">
          {items.map((p) => (
            <li key={p.name.en}>
              <div className="row">
                <span className="t">{t(p.name)}</span>
                <span className="m" />
                <span className="d">{t(p.text)}</span>
                <span className="src">
                  <SrcLink id={p.src} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

export function Beyond() {
  return (
    <Shell id="beyond" side="left" ghost="ಗುಪ್ತ">
      <Prose id="beyond" />
      <PlaceIndex ids={["gudnapur", "kathalekan", "janmane", "yana", "vibhuti", "aghanashini-reserve", "shivaganga", "kailasa-gudda"]} />
    </Shell>
  );
}

export function Identity() {
  const { t } = useT();
  const c = STORY.identity;
  return (
    <section id="identity" data-chapter="identity" className="identity" aria-labelledby="identity-title">
      <div className="identity__inner" data-identity-inner>
        <div className="chapter__kicker">{t(c.kicker)}</div>
        <h2 id="identity-title" className="identity__title" data-identity-title>
          {t(c.title)}
        </h2>
        <p className="lede">{t(c.lede)}</p>
        <div className="panel" data-reveal>
          <ChapterMedia photos={photosFor("identity")} />
          {c.body.map((b, i) => (
            <p key={i} className="body-text">
              {t(b)}
            </p>
          ))}
          <p>
            <button
              type="button"
              className="btn"
              onClick={() => scrollToId("arrival")}
              style={{ marginTop: "0.6rem" }}
            >
              {t({ en: "Begin again", kn: "ಮತ್ತೆ ಆರಂಭಿಸಿ" })}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
