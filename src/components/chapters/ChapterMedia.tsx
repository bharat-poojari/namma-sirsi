"use client";

import Image from "next/image";
import type { ChapterPhoto } from "@/data/photography";
import { useT } from "@/lib/useT";

export function ChapterMedia({ photos }: { photos: ChapterPhoto[] }) {
  const { t } = useT();
  return (
    <div className={`chapter-media${photos.length > 1 ? " chapter-media--pair" : ""}`} data-reveal>
      {photos.map((photo) => (
        <figure
          className={`chapter-media__item${photo.portrait ? " chapter-media__item--portrait" : ""}`}
          key={photo.src}
        >
          <div className="chapter-media__image">
            <Image
              src={photo.src}
              alt={t(photo.alt)}
              width={photo.width}
              height={photo.height}
              sizes={photos.length > 1 ? "(max-width: 600px) 100vw, 320px" : "(max-width: 900px) 100vw, 48vw"}
              loading="lazy"
            />
          </div>
          <figcaption className="chapter-media__caption">
            <span>{t(photo.caption)}</span>
            <small>
              <a href={photo.source} target="_blank" rel="noopener noreferrer">
                {photo.artist}
              </a>
              {" · "}
              <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">
                {photo.license}
              </a>
            </small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
