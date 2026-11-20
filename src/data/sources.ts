export type Source = { id: string; title: string; url: string; note?: string };

/** Every factual claim in content.ts carries one or more of these ids. */
export const SOURCES: Source[] = [
  { id: "wiki-sirsi", title: "Sirsi, Karnataka — Wikipedia", url: "https://en.wikipedia.org/wiki/Sirsi,_Karnataka", note: "Geography, climate, census 2011, economy, distances, ghat roads" },
  { id: "wiki-marikamba", title: "Sirsi Marikamba Temple — Wikipedia", url: "https://en.wikipedia.org/wiki/Sirsi_Marikamba_Temple", note: "Built 1688, sanctum image, jatre schedule" },
  { id: "wiki-bedara", title: "Bedara Vesha — Wikipedia", url: "https://en.wikipedia.org/wiki/Bedara_Vesha", note: "Hunter Dance of Sirsi, biennial" },
  { id: "wiki-havyak", title: "Havyaka — Wikipedia", url: "https://en.wikipedia.org/wiki/Havyak", note: "Community, Havigannada dialect, cuisine" },
  { id: "wiki-sahasralinga", title: "Sahasralinga — Wikipedia", url: "https://en.wikipedia.org/wiki/Sahasralinga", note: "Shalmala river lingas, legend and patronage" },
  { id: "wiki-sonda", title: "Sonda, Karnataka — Wikipedia", url: "https://en.wikipedia.org/wiki/Sonda,_Karnataka", note: "Sonda Nayakas 1555–1763, mathas" },
  { id: "wiki-banavasi", title: "Banavasi — Wikipedia", url: "https://en.wikipedia.org/wiki/Banavasi", note: "Coordinates, Kadamba capital, 24 km from Sirsi" },
  { id: "dh-banavasi", title: "Glorious Banavasi — Deccan Herald", url: "https://www.deccanherald.com/lifestyle/travel/glorious-banavasi-767865.html", note: "Madhukeshwara temple, Gudnapur, Kadambotsava" },
  { id: "dh-sirsi", title: "Many wonders of Sirsi — Deccan Herald", url: "https://www.deccanherald.com/content/467417/many-wonders-sirsi.html", note: "Yana rock heights" },
  { id: "dh-sonda", title: "Sonda's many attractions — Deccan Herald", url: "https://www.deccanherald.com/content/217827/sondas-many-attractions.html", note: "Sonda mathas, buses" },
  { id: "wiki-yana", title: "Yana, Uttara Kannada — Wikipedia", url: "https://en.wikipedia.org/wiki/Yana,_Uttara_Kannada", note: "Karst limestone, Shivaratri festival" },
  { id: "wiki-magod", title: "Magod Falls — Wikipedia", url: "https://en.wikipedia.org/wiki/Magod_Falls", note: "Bedti river, ~200 m in two steps, 58 km from Sirsi" },
  { id: "wiki-sathodi", title: "Sathodi Falls — Wikipedia", url: "https://en.wikipedia.org/wiki/Sathodi_Falls", note: "About 15 m, 74 km from Sirsi" },
  { id: "wiki-unchalli", title: "Unchalli Falls — Wikipedia", url: "https://en.wikipedia.org/wiki/Unchalli_Falls", note: "Coordinates and 116 m drop on the Aghanashini" },
  { id: "inditales-vibhuti", title: "Vibhuti Falls, Yana Rocks & Mirjan Fort — Inditales", url: "https://inditales.com/vibhuti-falls-yana-rocks-mirjan-fort/", note: "Vibhuti ~44 km from Sirsi, route via Mattighatta" },
  { id: "iisc-places", title: "Places in the Western Ghats — IISc ENVIS", url: "https://wgbis.ces.iisc.ac.in/biodiversity/sahyadri/wgbis_info/places.htm", note: "Benne Hole, Vibhooti distances" },
  { id: "iisc-flora", title: "Floristic diversity in Uttara Kannada — IISc", url: "https://wgbis.ces.iisc.ac.in/energy/water/paper/Floristic_diversity/Significant.html", note: "Forest types, Myristica swamps, endemism" },
  { id: "tnm-gi", title: "'Sirsi Supari' gets GI tag — The News Minute", url: "https://www.thenewsminute.com/karnataka/sirsi-supari-areca-nut-uttara-kannada-district-gets-gi-tag-98270", note: "GI tag for Sirsi, Yellapur and Siddapura taluks" },
  { id: "havyaka-food", title: "Havyaka food — havyaka.in", url: "https://mail.havyaka.in/food", note: "List of traditional dishes" },
  { id: "trawell-reach", title: "How to reach Sirsi — Trawell", url: "https://www.trawell.in/karnataka/sirsi/how-to-reach", note: "Hubballi airport/rail, road distances" },
  { id: "tt-places", title: "Places to visit in Sirsi — TravelTriangle", url: "https://traveltriangle.com/blog/places-to-visit-in-sirsi/", note: "Kailasa Gudda, Shivaganga, Sahasralinga distance, best months" },
  { id: "tt-shivaganga", title: "Shivaganga Falls — TravelTriangle", url: "https://traveltriangle.com/blog/shivaganga-falls/", note: "Shivaganga is less travelled; swimming, trekking, camping" },
  { id: "tws-falls", title: "Sirsi, the waterfalls destination — TravelTwosome", url: "https://traveltwosome.com/sirsi-waterfalls-destination", note: "Post-monsoon timing; Sahasralinga best seen at low water" },
  { id: "kamat", title: "The Town of Sirsi — Kamat's Potpourri", url: "https://kamat.com/indica/hometown/sirsi.htm", note: "Areca trade, Marikamba fair, Mahaganapati and Gopalakrishna temples" },
  { id: "kiha", title: "Sources of Sirsi Taluk's History — Karnataka Itihasa Academy", url: "https://karnatakaitihasaacademy.org/?p=2182", note: "Epigraphic sources; Banavasi rich in monuments" },
  { id: "trawell-places", title: "Places to visit in Sirsi — Trawell", url: "https://trawell.in/karnataka/sirsi/places-to-visit-things-to-do", note: "Sahasralinga near Hulgol" },
];

export const SOURCE_MAP: Record<string, Source> = Object.fromEntries(SOURCES.map((s) => [s.id, s]));
