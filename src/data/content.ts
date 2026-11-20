export type L = { en: string; kn: string };

export type Area = "town" | "taluk" | "region";
export type Category = "sacred" | "heritage" | "waterfall" | "nature" | "culture" | "village";

export type Place = {
  id: string;
  name: L;
  area: Area; // town = Sirsi town · taluk = Sirsi taluk · region = elsewhere in Uttara Kannada
  areaNote?: L;
  category: Category;
  /** Approximate road distance from Sirsi in km (min, max) — sources vary. */
  km?: [number, number];
  /** Only set when a source gives the coordinates. */
  coords?: [number, number];
  summary: L;
  facts: L[];
  season?: L;
  src: string[];
};

export const CHAPTERS = [
  { id: "arrival", no: "01", title: { en: "The Arrival", kn: "ಆಗಮನ" } },
  { id: "discover", no: "02", title: { en: "Discover Sirsi", kn: "ಶಿರಸಿಯನ್ನು ಅರಿಯಿರಿ" } },
  { id: "sacred", no: "03", title: { en: "Sacred Sirsi", kn: "ಪವಿತ್ರ ಶಿರಸಿ" } },
  { id: "wild", no: "04", title: { en: "Into the Wild", kn: "ಕಾಡಿನ ಒಡಲಿಗೆ" } },
  { id: "culture", no: "05", title: { en: "Culture Lives Here", kn: "ಇಲ್ಲಿ ಸಂಸ್ಕೃತಿ ಜೀವಂತ" } },
  { id: "taste", no: "06", title: { en: "Taste of Sirsi", kn: "ಶಿರಸಿಯ ರುಚಿ" } },
  { id: "people", no: "07", title: { en: "People & Their Stories", kn: "ಜನ ಮತ್ತು ಅವರ ಕಥೆಗಳು" } },
  { id: "beyond", no: "08", title: { en: "Beyond the Known", kn: "ತಿಳಿದದ್ದರ ಆಚೆಗೆ" } },
  { id: "explore", no: "09", title: { en: "Explore the Region", kn: "ಪ್ರದೇಶವನ್ನು ಅನ್ವೇಷಿಸಿ" } },
  { id: "identity", no: "10", title: { en: "Our Identity", kn: "ನಮ್ಮ ಗುರುತು" } },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

export const UI = {
  scroll: { en: "Scroll to begin the journey", kn: "ಪಯಣ ಆರಂಭಿಸಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ" },
  loading: { en: "Gathering the mist…", kn: "ಮಂಜನ್ನು ಸೇರಿಸುತ್ತಿದ್ದೇವೆ…" },
  lang: { en: "ಕನ್ನಡ", kn: "English" },
  menu: { en: "Chapters", kn: "ಅಧ್ಯಾಯಗಳು" },
  skip: { en: "Skip to content", kn: "ವಿಷಯಕ್ಕೆ ಹೋಗಿ" },
  motion: { en: "Reduce motion", kn: "ಚಲನೆ ಕಡಿಮೆ" },
  sources: { en: "Sources", kn: "ಆಧಾರಗಳು" },
  sourcesTitle: { en: "Where this comes from", kn: "ಈ ಮಾಹಿತಿ ಎಲ್ಲಿಂದ" },
  sourcesIntro: {
    en: "Every fact on this site is tied to a published source. Where sources disagree, we show the range instead of choosing one. Corrections are welcome.",
    kn: "ಈ ತಾಣದ ಪ್ರತಿ ಮಾಹಿತಿಯೂ ಪ್ರಕಟಿತ ಆಧಾರಕ್ಕೆ ಜೋಡಿಸಲ್ಪಟ್ಟಿದೆ. ಆಧಾರಗಳು ಭಿನ್ನವಾಗಿದ್ದರೆ ಒಂದನ್ನು ಆರಿಸದೆ ಶ್ರೇಣಿಯನ್ನು ತೋರಿಸುತ್ತೇವೆ. ತಿದ್ದುಪಡಿಗಳಿಗೆ ಸ್ವಾಗತ.",
  },
  approx: { en: "approx.", kn: "ಸುಮಾರು" },
  km: { en: "km from Sirsi", kn: "ಕಿ.ಮೀ ಶಿರಸಿಯಿಂದ" },
  search: { en: "Search places, rivers, festivals…", kn: "ಸ್ಥಳ, ನದಿ, ಹಬ್ಬ ಹುಡುಕಿ…" },
  all: { en: "All", kn: "ಎಲ್ಲಾ" },
  noResults: { en: "Nothing matches that. Try a broader word.", kn: "ಯಾವುದೂ ಹೊಂದುತ್ತಿಲ್ಲ. ವಿಶಾಲ ಪದ ಪ್ರಯತ್ನಿಸಿ." },
  inTown: { en: "In Sirsi town", kn: "ಶಿರಸಿ ಪಟ್ಟಣದಲ್ಲಿ" },
  inTaluk: { en: "In Sirsi taluk", kn: "ಶಿರಸಿ ತಾಲೂಕಿನಲ್ಲಿ" },
  inRegion: { en: "Elsewhere in Uttara Kannada", kn: "ಉತ್ತರ ಕನ್ನಡದ ಇತರೆಡೆ" },
  mapNote: {
    en: "Pins appear only where a published source gives the coordinates. Other places are listed with distances.",
    kn: "ಪ್ರಕಟಿತ ಆಧಾರದಲ್ಲಿ ನಿರ್ದೇಶಾಂಕ ಲಭ್ಯವಿರುವ ಸ್ಥಳಗಳಿಗೆ ಮಾತ್ರ ಪಿನ್ ಇದೆ. ಉಳಿದವು ದೂರದೊಂದಿಗೆ ಪಟ್ಟಿಯಲ್ಲಿವೆ.",
  },
  explore3d: { en: "Tap a glowing landmark", kn: "ಹೊಳೆಯುವ ಸ್ಥಳವನ್ನು ಒತ್ತಿ" },
  open: { en: "Open", kn: "ತೆರೆಯಿರಿ" },
  close: { en: "Close", kn: "ಮುಚ್ಚಿ" },
  best: { en: "Best time", kn: "ಉತ್ತಮ ಸಮಯ" },
  distance: { en: "Distance ladder", kn: "ದೂರದ ಏಣಿ" },
  itin: { en: "Itineraries", kn: "ಪ್ರವಾಸ ಯೋಜನೆಗಳು" },
  reach: { en: "Getting here", kn: "ತಲುಪುವುದು ಹೇಗೆ" },
  photoNote: {
    en: "Photography credits live in /public/photos/credits.json and appear beside each image.",
    kn: "ಛಾಯಾಚಿತ್ರ ಶ್ರೇಯಸ್ಸು /public/photos/credits.json ನಲ್ಲಿದ್ದು ಪ್ರತಿ ಚಿತ್ರದ ಬಳಿ ತೋರಿಸಲಾಗುತ್ತದೆ.",
  },
} satisfies Record<string, L>;

export type Stat = { value: string; label: L; src: string };

export type Chapter = {
  kicker: L;
  title: L;
  lede: L;
  body: L[];
  stats?: Stat[];
};

export const STORY: Record<Exclude<ChapterId, "explore">, Chapter> = {
  arrival: {
    kicker: { en: "Uttara Kannada · Karnataka · India", kn: "ಉತ್ತರ ಕನ್ನಡ · ಕರ್ನಾಟಕ · ಭಾರತ" },
    title: { en: "NAMMA SIRSI", kn: "ನಮ್ಮ ಶಿರಸಿ" },
    lede: {
      en: "A town on the shoulder of the Western Ghats, where areca palms stand in the mist and a goddess is honoured with a fair that fills the streets.",
      kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಹೆಗಲ ಮೇಲಿನ ಊರು. ಮಂಜಿನಲ್ಲಿ ಅಡಿಕೆ ಮರಗಳು ನಿಲ್ಲುವ, ಬೀದಿ ತುಂಬುವ ಜಾತ್ರೆಯಲ್ಲಿ ದೇವಿಯನ್ನು ಪೂಜಿಸುವ ನಾಡು.",
    },
    body: [],
  },
  discover: {
    kicker: { en: "Identity · Geography · History", kn: "ಗುರುತು · ಭೂಗೋಳ · ಇತಿಹಾಸ" },
    title: { en: "Discover Sirsi", kn: "ಶಿರಸಿಯನ್ನು ಅರಿಯಿರಿ" },
    lede: {
      en: "Sirsi sits at roughly 611 m on a plateau of forested hills and narrow valleys, the commercial heart of Uttara Kannada.",
      kn: "ಶಿರಸಿ ಸುಮಾರು 611 ಮೀ ಎತ್ತರದ, ಕಾಡುಗುಡ್ಡ ಮತ್ತು ಕಿರಿದಾದ ಕಣಿವೆಗಳ ಪ್ರಸ್ಥಭೂಮಿಯಲ್ಲಿದೆ; ಉತ್ತರ ಕನ್ನಡದ ವ್ಯಾಪಾರ ಹೃದಯ.",
    },
    body: [
      {
        en: "The name is traced to the siris tree (sirisa in Kannada), which gave the town its earlier forms Sirise and Sirasi. The oldest mention found so far is a hero-stone inscription dated 1150 CE at Tamadi Kallala in neighbouring Siddapura taluk. Under the Sonda rulers the town was known as Kalyana Pattana.",
        kn: "ಹೆಸರು ಸಿರಿಸ (ಸಿರಿಸಾ) ಮರದಿಂದ ಬಂದಿದೆ ಎನ್ನಲಾಗುತ್ತದೆ; ಹಿಂದಿನ ರೂಪಗಳು ಸಿರಿಸೆ, ಸಿರಸಿ. ಸಿದ್ದಾಪುರ ತಾಲೂಕಿನ ತಮಡಿ ಕಲ್ಲಳ್ಳದ ಕ್ರಿ.ಶ. 1150ರ ವೀರಗಲ್ಲು ಶಾಸನದಲ್ಲಿ ಇದುವರೆಗಿನ ಹಳೆಯ ಉಲ್ಲೇಖ ಸಿಕ್ಕಿದೆ. ಸೋದೆ ಅರಸರ ಕಾಲದಲ್ಲಿ ಊರು ಕಲ್ಯಾಣಪಟ್ಟಣ ಎಂದು ಕರೆಯಲ್ಪಟ್ಟಿತ್ತು.",
      },
      {
        en: "The Aghanashini river begins near Shankara Honda in Sirsi and runs about 128 km west to the Arabian Sea. Roughly 78% of Sirsi taluk is forest, and the town lies inside the Western Ghats biodiversity hotspot.",
        kn: "ಅಘನಾಶಿನಿ ನದಿ ಶಿರಸಿಯ ಶಂಕರ ಹೊಂಡದ ಬಳಿ ಹುಟ್ಟಿ ಸುಮಾರು 128 ಕಿ.ಮೀ ಪಶ್ಚಿಮಕ್ಕೆ ಹರಿದು ಅರಬ್ಬೀ ಸಮುದ್ರ ಸೇರುತ್ತದೆ. ಶಿರಸಿ ತಾಲೂಕಿನ ಸುಮಾರು ಶೇ. 78 ಭಾಗ ಅರಣ್ಯ; ಊರು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಜೀವವೈವಿಧ್ಯ ಹಾಟ್‌ಸ್ಪಾಟ್‌ನೊಳಗಿದೆ.",
      },
    ],
    stats: [
      { value: "611 m", label: { en: "approx. elevation", kn: "ಸುಮಾರು ಎತ್ತರ" }, src: "wiki-sirsi" },
      { value: "2,635 mm", label: { en: "annual rainfall", kn: "ವಾರ್ಷಿಕ ಮಳೆ" }, src: "wiki-sirsi" },
      { value: "78%", label: { en: "of the taluk is forest", kn: "ತಾಲೂಕು ಅರಣ್ಯ" }, src: "wiki-sirsi" },
      { value: "1866", label: { en: "City Municipal Council established", kn: "ನಗರಸಭೆ ಸ್ಥಾಪನೆ" }, src: "wiki-sirsi" },
    ],
  },
  sacred: {
    kicker: { en: "Temples · Heritage · Pilgrimage", kn: "ದೇವಾಲಯ · ಪರಂಪರೆ · ತೀರ್ಥಯಾತ್ರೆ" },
    title: { en: "Sacred Sirsi", kn: "ಪವಿತ್ರ ಶಿರಸಿ" },
    lede: {
      en: "From a goddess temple built in 1688 to a river carved with Shiva lingas and a Kadamba capital older than Kannada literature, faith here is layered like the hills.",
      kn: "1688ರಲ್ಲಿ ಕಟ್ಟಿದ ದೇವಿ ಮಂದಿರದಿಂದ ಶಿವಲಿಂಗ ಕೆತ್ತಿದ ನದಿಯವರೆಗೆ, ಕನ್ನಡ ಸಾಹಿತ್ಯಕ್ಕಿಂತ ಹಳೆಯ ಕದಂಬ ರಾಜಧಾನಿಯವರೆಗೆ ಇಲ್ಲಿ ಭಕ್ತಿ ಗುಡ್ಡಗಳಂತೆ ಪದರ ಪದರ.",
    },
    body: [
      {
        en: "The Marikamba temple in Sirsi town was built in 1688. Its sanctum holds a seven-foot image of a fierce eight-armed Durga on a tiger. The blue façade is a 19th-century addition, and the cloisters around the courtyard carry images of deities from the epics.",
        kn: "ಶಿರಸಿ ಪಟ್ಟಣದ ಮಾರಿಕಾಂಬಾ ದೇವಸ್ಥಾನವನ್ನು 1688ರಲ್ಲಿ ಕಟ್ಟಲಾಯಿತು. ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಹುಲಿಯ ಮೇಲೆ ಕುಳಿತ ಎಂಟು ಕೈಗಳ ಉಗ್ರ ದುರ್ಗೆಯ ಏಳು ಅಡಿ ಮೂರ್ತಿ ಇದೆ. ನೀಲಿ ಮುಖಮಂಟಪ 19ನೇ ಶತಮಾನದ ಸೇರ್ಪಡೆ; ಅಂಗಳದ ಸುತ್ತಲಿನ ಜಗುಲಿಗಳಲ್ಲಿ ಪುರಾಣ ದೇವತೆಗಳ ಚಿತ್ರಗಳಿವೆ.",
      },
      {
        en: "Twenty-four kilometres away, Banavasi on the Varada river was the capital of the Kadambas, the first dynasty to give Kannada a place in administration. The Madhukeshwara temple there is known for its honey-toned lingam and an eight-foot Nandi.",
        kn: "24 ಕಿ.ಮೀ ದೂರದ ವರದಾ ನದಿಯ ದಡದ ಬನವಾಸಿ, ಕನ್ನಡಕ್ಕೆ ಆಡಳಿತದಲ್ಲಿ ಸ್ಥಾನ ನೀಡಿದ ಮೊದಲ ಅರಸುಮನೆತನವಾದ ಕದಂಬರ ರಾಜಧಾನಿ. ಅಲ್ಲಿನ ಮಧುಕೇಶ್ವರ ದೇವಾಲಯ ಜೇನುಬಣ್ಣದ ಲಿಂಗ ಮತ್ತು ಎಂಟು ಅಡಿ ನಂದಿಗೆ ಹೆಸರುವಾಸಿ.",
      },
    ],
    stats: [
      { value: "1688", label: { en: "Marikamba temple built", kn: "ಮಾರಿಕಾಂಬಾ ದೇವಾಲಯ ನಿರ್ಮಾಣ" }, src: "wiki-marikamba" },
      { value: "7 ft", label: { en: "sanctum image of the goddess", kn: "ಗರ್ಭಗುಡಿಯ ದೇವಿ ಮೂರ್ತಿ" }, src: "wiki-marikamba" },
      { value: "1555–1763", label: { en: "Sonda Nayaka rule", kn: "ಸೋದೆ ನಾಯಕರ ಆಳ್ವಿಕೆ" }, src: "wiki-sonda" },
      { value: "24 km", label: { en: "Sirsi to Banavasi", kn: "ಶಿರಸಿಯಿಂದ ಬನವಾಸಿ" }, src: "wiki-banavasi" },
    ],
  },
  wild: {
    kicker: { en: "Forests · Waterfalls · Rivers", kn: "ಕಾಡು · ಜಲಪಾತ · ನದಿ" },
    title: { en: "Into the Wild", kn: "ಕಾಡಿನ ಒಡಲಿಗೆ" },
    lede: {
      en: "July alone drops about 971 mm of rain on Sirsi. The result is evergreen forest, swamp forest, and some of the best waterfalls in Karnataka within a day's drive.",
      kn: "ಜುಲೈ ತಿಂಗಳೊಂದರಲ್ಲೇ ಶಿರಸಿಗೆ ಸುಮಾರು 971 ಮಿ.ಮೀ ಮಳೆ. ಫಲ: ನಿತ್ಯಹರಿದ್ವರ್ಣ ಕಾಡು, ಜೌಗು ಕಾಡು ಮತ್ತು ಒಂದು ದಿನದ ಪ್ರಯಾಣದೊಳಗೆ ಕರ್ನಾಟಕದ ಶ್ರೇಷ್ಠ ಜಲಪಾತಗಳು.",
    },
    body: [
      {
        en: "Uttara Kannada holds a rare forest type, the Myristica swamp, concentrated around Kathalekan in Siddapur taluk. Studies there record at least 35 amphibian species, about three-quarters of them endemic to the Western Ghats. Closer to home, the threatened tree Hopea ponga grows in evergreen forests around Sirsi.",
        kn: "ಉತ್ತರ ಕನ್ನಡದಲ್ಲಿ ಅಪರೂಪದ ಮಿರಿಸ್ಟಿಕಾ ಜೌಗು ಕಾಡುಗಳಿವೆ; ಅವು ಸಿದ್ದಾಪುರ ತಾಲೂಕಿನ ಕಥಲೆಕಾನ್ ಸುತ್ತ ಕೇಂದ್ರೀಕೃತ. ಅಲ್ಲಿ ಕನಿಷ್ಠ 35 ಉಭಯವಾಸಿ ಪ್ರಭೇದಗಳು ದಾಖಲಾಗಿದ್ದು ಸುಮಾರು ಮೂರನೇ ಮೂರು ಭಾಗ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಿಗೇ ವಿಶಿಷ್ಟ. ಶಿರಸಿ ಸುತ್ತಲಿನ ನಿತ್ಯಹರಿದ್ವರ್ಣ ಕಾಡುಗಳಲ್ಲಿ ಅಪಾಯದಲ್ಲಿರುವ ಹೋಪಿಯಾ ಪೊಂಗಾ ಮರ ಬೆಳೆಯುತ್ತದೆ.",
      },
      {
        en: "Unchalli Falls drops the Aghanashini about 116 m. Waterfalls cluster here so densely that local writers call Sirsi a waterfall destination, with Benne Hole, Shivaganga, Muregar, Mattighatta and more within reach. The best time is just after the monsoon.",
        kn: "ಉಂಚಳ್ಳಿ ಜಲಪಾತದಲ್ಲಿ ಅಘನಾಶಿನಿ ಸುಮಾರು 116 ಮೀ ಧುಮುಕುತ್ತದೆ. ಇಲ್ಲಿ ಜಲಪಾತಗಳು ಎಷ್ಟು ದಟ್ಟವೆಂದರೆ ಬೆಣ್ಣೆಹೊಳೆ, ಶಿವಗಂಗಾ, ಮುರೇಗಾರ್, ಮತ್ತಿಘಟ್ಟ ಇನ್ನೂ ಹಲವು ಹತ್ತಿರದಲ್ಲಿವೆ. ಮಳೆಗಾಲದ ಬಳಿಕದ ಸಮಯ ಉತ್ತಮ.",
      },
    ],
    stats: [
      { value: "116 m", label: { en: "Unchalli Falls drop", kn: "ಉಂಚಳ್ಳಿ ಜಲಪಾತದ ಎತ್ತರ" }, src: "wiki-unchalli" },
      { value: "128 km", label: { en: "Aghanashini, source to sea", kn: "ಅಘನಾಶಿನಿ ಉಗಮದಿಂದ ಸಮುದ್ರ" }, src: "wiki-sirsi" },
      { value: "35+", label: { en: "amphibian species at Kathalekan", kn: "ಕಥಲೆಕಾನ್‌ನ ಉಭಯವಾಸಿಗಳು" }, src: "iisc-flora" },
      { value: "~200 m", label: { en: "Magod Falls, in two steps", kn: "ಮಾಗೋಡು ಜಲಪಾತ, ಎರಡು ಹಂತ" }, src: "wiki-magod" },
    ],
  },
  culture: {
    kicker: { en: "Yakshagana · Festivals · Folk", kn: "ಯಕ್ಷಗಾನ · ಹಬ್ಬ · ಜಾನಪದ" },
    title: { en: "Culture Lives Here", kn: "ಇಲ್ಲಿ ಸಂಸ್ಕೃತಿ ಜೀವಂತ" },
    lede: {
      en: "Performances here begin late at night and run until daylight. The whole town becomes a stage.",
      kn: "ಇಲ್ಲಿ ಪ್ರದರ್ಶನಗಳು ತಡರಾತ್ರಿ ಶುರುವಾಗಿ ಬೆಳಗಿನವರೆಗೆ ನಡೆಯುತ್ತವೆ. ಇಡೀ ಊರೇ ರಂಗಸ್ಥಳ.",
    },
    body: [
      {
        en: "Bedara Vesha, the Hunter Dance, is held in Sirsi every other year in the days before Holi. Close to fifty solo performers, each representing a part of town, rehearse for months, then dance through the streets with peacock feathers, shields and swords. The performance ends at the Marikamba temple, and the drum-driven Dollu Kunitha is performed alongside.",
        kn: "ಬೇಡರ ವೇಷ (ಬೇಟೆಗಾರ ನೃತ್ಯ) ಶಿರಸಿಯಲ್ಲಿ ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ಹೋಳಿ ಹಬ್ಬದ ಮುನ್ನ ನಡೆಯುತ್ತದೆ. ಊರಿನ ಒಂದೊಂದು ಭಾಗವನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಸುಮಾರು ಐವತ್ತು ಏಕವ್ಯಕ್ತಿ ಕಲಾವಿದರು ತಿಂಗಳುಗಟ್ಟಲೆ ಅಭ್ಯಾಸ ಮಾಡಿ ನವಿಲುಗರಿ, ಗುರಾಣಿ, ಖಡ್ಗ ಹಿಡಿದು ಬೀದಿ ಬೀದಿ ಕುಣಿಯುತ್ತಾರೆ. ಪ್ರದರ್ಶನ ಮಾರಿಕಾಂಬಾ ದೇವಸ್ಥಾನದಲ್ಲಿ ಪರಾಕಾಷ್ಠೆ ತಲುಪುತ್ತದೆ; ಡೊಳ್ಳು ಕುಣಿತವೂ ಜೊತೆಗೆ ನಡೆಯುತ್ತದೆ.",
      },
      {
        en: "The Marikamba fair is held every second year. The most recent edition listed ran from 24 February to 4 March 2026, with a wedding of the goddess on day one, the slaying of Mahishasura on day two, and a chariot procession. In December, Banavasi hosts Kadambotsava, where the Pampa Award honours a Kannada literary figure.",
        kn: "ಮಾರಿಕಾಂಬಾ ಜಾತ್ರೆ ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ನಡೆಯುತ್ತದೆ. ಇತ್ತೀಚಿನದು 2026ರ ಫೆಬ್ರವರಿ 24ರಿಂದ ಮಾರ್ಚ್ 4ರವರೆಗೆ ಪಟ್ಟಿಯಾಗಿದೆ: ಮೊದಲ ದಿನ ದೇವಿಯ ವಿವಾಹ, ಎರಡನೇ ದಿನ ಮಹಿಷಾಸುರ ಸಂಹಾರ, ರಥೋತ್ಸವ. ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ಬನವಾಸಿಯಲ್ಲಿ ಕದಂಬೋತ್ಸವ; ಅಲ್ಲಿ ಪಂಪ ಪ್ರಶಸ್ತಿ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸಾಧಕರಿಗೆ ಸಲ್ಲುತ್ತದೆ.",
      },
    ],
    stats: [
      { value: "2 yrs", label: { en: "between Bedara Vesha and between Marikamba fairs", kn: "ಬೇಡರ ವೇಷ ಮತ್ತು ಜಾತ್ರೆಯ ನಡುವೆ" }, src: "wiki-bedara" },
      { value: "~50", label: { en: "solo Bedara Vesha performers", kn: "ಬೇಡರ ವೇಷದ ಏಕವ್ಯಕ್ತಿ ಕಲಾವಿದರು" }, src: "wiki-bedara" },
      { value: "5 nights", label: { en: "of Bedara Vesha before Holi", kn: "ಹೋಳಿಗೆ ಮುನ್ನ ಬೇಡರ ವೇಷ" }, src: "wiki-sirsi" },
      { value: "Dec", label: { en: "Kadambotsava at Banavasi", kn: "ಬನವಾಸಿಯಲ್ಲಿ ಕದಂಬೋತ್ಸವ" }, src: "dh-banavasi" },
    ],
  },
  taste: {
    kicker: { en: "Havyaka kitchen · Ingredients", kn: "ಹವ್ಯಕ ಅಡುಗೆಮನೆ · ಪದಾರ್ಥಗಳು" },
    title: { en: "Taste of Sirsi", kn: "ಶಿರಸಿಯ ರುಚಿ" },
    lede: {
      en: "The Havyaka kitchen of this region is vegetarian, mild and built on coconut, curd, buttermilk and whatever the garden gives.",
      kn: "ಈ ಪ್ರದೇಶದ ಹವ್ಯಕ ಅಡುಗೆಮನೆ ಸಸ್ಯಾಹಾರಿ, ಮೃದು; ತೆಂಗು, ಮೊಸರು, ಮಜ್ಜಿಗೆ ಮತ್ತು ತೋಟ ಕೊಡುವುದೆಲ್ಲದರ ಮೇಲೆ ನಿಂತಿದೆ.",
    },
    body: [
      {
        en: "Rice, curd, buttermilk and vegetables are staples, with coconut in many dishes. Unripe jackfruit goes into curries, ripe jackfruit into dosas and halwa. Traditional dishes include thambuli (vegetables in curd or buttermilk with a fried spice tempering), sasime (a ground vegetable paste with curd), appe huli (a sour, watery soup of unripe mango and chilli), patrode (colocasia-leaf rolls) and melara (a mild coconut-yogurt curry).",
        kn: "ಅನ್ನ, ಮೊಸರು, ಮಜ್ಜಿಗೆ, ತರಕಾರಿ ಪ್ರಮುಖ ಆಹಾರ; ಹಲವು ಅಡುಗೆಗಳಲ್ಲಿ ತೆಂಗಿನಕಾಯಿ. ಹಸಿ ಹಲಸು ಪಲ್ಯ-ಸಾರಿಗೆ, ಹಣ್ಣಾದ ಹಲಸು ದೋಸೆ-ಹಲ್ವಕ್ಕೆ. ತಂಬುಳಿ (ಮೊಸರು/ಮಜ್ಜಿಗೆಯಲ್ಲಿ ತರಕಾರಿ, ಒಗ್ಗರಣೆ), ಸಾಸಿವೆ ಹಾಕಿದ ಸಾಸಿಮೆ (ರುಬ್ಬಿದ ತರಕಾರಿ ಮೊಸರಿನೊಂದಿಗೆ), ಅಪ್ಪೆಹುಳಿ (ಮಾವಿನಕಾಯಿ-ಮೆಣಸಿನ ಹುಳಿ ಸಾರು), ಪತ್ರೊಡೆ (ಕೆಸುವಿನ ಎಲೆ) ಮತ್ತು ಮೇಲಾರ (ತೆಂಗು-ಮೊಸರಿನ ಮೃದು ಸಾರು) ಸಾಂಪ್ರದಾಯಿಕ ಖಾದ್ಯಗಳು.",
      },
      {
        en: "A community cookbook site lists many more: holige, kesri, pancha kajjaya, halasina hannina kadubu and others, with different dishes for different festivals.",
        kn: "ಸಮುದಾಯದ ಅಡುಗೆ ತಾಣವು ಹೋಳಿಗೆ, ಕೇಸರಿ, ಪಂಚಕಜ್ಜಾಯ, ಹಲಸಿನ ಹಣ್ಣಿನ ಕಡುಬು ಮುಂತಾದ ಹಲವನ್ನು ಪಟ್ಟಿ ಮಾಡಿದೆ; ಹಬ್ಬಕ್ಕೆ ತಕ್ಕ ಬೇರೆ ಬೇರೆ ಅಡುಗೆಗಳಿವೆ.",
      },
    ],
  },
  people: {
    kicker: { en: "Communities · Livelihoods · Everyday life", kn: "ಸಮುದಾಯ · ಜೀವನೋಪಾಯ · ದೈನಂದಿನ ಬದುಕು" },
    title: { en: "The People & Their Stories", kn: "ಜನ ಮತ್ತು ಅವರ ಕಥೆಗಳು" },
    lede: {
      en: "Sirsi runs on areca. The nut carries a Geographical Indication tag and shapes the town's markets, gardens and calendar.",
      kn: "ಶಿರಸಿ ನಡೆಯುವುದು ಅಡಿಕೆಯ ಮೇಲೆ. ಅಡಿಕೆಗೆ ಭೌಗೋಳಿಕ ಸೂಚಕ (GI) ಮಾನ್ಯತೆ ಇದ್ದು ಊರಿನ ಮಾರುಕಟ್ಟೆ, ತೋಟ, ದಿನಚರಿಯನ್ನು ರೂಪಿಸುತ್ತದೆ.",
    },
    body: [
      {
        en: "Sirsi Supari, grown in Sirsi, Yellapur and Siddapura taluks, was the first areca nut to receive a GI tag. It is distinguished by a round, flattened coin shape and a particular texture. Cardamom, black pepper, betel leaf and vanilla grow alongside, and Sirsi is one of two Spices Board reference markets for black pepper prices in India, the other being Kochi.",
        kn: "ಶಿರಸಿ, ಯಲ್ಲಾಪುರ ಮತ್ತು ಸಿದ್ದಾಪುರ ತಾಲೂಕುಗಳಲ್ಲಿ ಬೆಳೆಯುವ ಶಿರಸಿ ಸುಪಾರಿಗೆ ಅಡಿಕೆಯಲ್ಲೇ ಮೊದಲ GI ಟ್ಯಾಗ್ ಸಿಕ್ಕಿತು. ದುಂಡಗಿನ, ನಾಣ್ಯದಂತೆ ಚಪ್ಪಟೆ ಆಕಾರ ಮತ್ತು ವಿಶಿಷ್ಟ ಸ್ಪರ್ಶ ಇದರ ಗುರುತು. ಏಲಕ್ಕಿ, ಕಾಳುಮೆಣಸು, ವೀಳ್ಯದೆಲೆ, ವೆನಿಲ್ಲಾ ಜೊತೆಜೊತೆಗೆ ಬೆಳೆಯುತ್ತವೆ; ಭಾರತದಲ್ಲಿ ಕಾಳುಮೆಣಸಿನ ಬೆಲೆಗೆ ಸಂಬಂಧಿಸಿದ ಸ್ಪೈಸಸ್ ಬೋರ್ಡ್‌ನ ಎರಡು ಉಲ್ಲೇಖ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಶಿರಸಿಯೂ ಒಂದು, ಇನ್ನೊಂದು ಕೊಚ್ಚಿ.",
      },
      {
        en: "Many of the region's Havyaka families speak Havigannada, a dialect different enough that other Kannada speakers often cannot follow it. Literacy in Sirsi's urban area is 92.82% (2011 census), and the Sirsi Educational District, created in 2009, covers seven taluks.",
        kn: "ಈ ಭಾಗದ ಅನೇಕ ಹವ್ಯಕ ಕುಟುಂಬಗಳು ಹವಿಗನ್ನಡ ಮಾತನಾಡುತ್ತವೆ; ಇದು ಇತರ ಕನ್ನಡಿಗರಿಗೆ ಅರ್ಥವಾಗದಷ್ಟು ಭಿನ್ನ ಉಪಭಾಷೆ. ಶಿರಸಿ ನಗರ ಸಾಕ್ಷರತೆ ಶೇ. 92.82 (2011 ಜನಗಣತಿ); 2009ರಲ್ಲಿ ರಚನೆಯಾದ ಶಿರಸಿ ಶೈಕ್ಷಣಿಕ ಜಿಲ್ಲೆ ಏಳು ತಾಲೂಕುಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
      },
    ],
    stats: [
      { value: "1st", label: { en: "areca nut to receive a GI tag", kn: "GI ಟ್ಯಾಗ್ ಪಡೆದ ಮೊದಲ ಅಡಿಕೆ" }, src: "tnm-gi" },
      { value: "92.82%", label: { en: "urban literacy, 2011", kn: "ನಗರ ಸಾಕ್ಷರತೆ, 2011" }, src: "wiki-sirsi" },
      { value: "186,908", label: { en: "taluk population, 2011", kn: "ತಾಲೂಕು ಜನಸಂಖ್ಯೆ, 2011" }, src: "wiki-sirsi" },
      { value: "7", label: { en: "taluks in Sirsi Educational District", kn: "ಶಿರಸಿ ಶೈಕ್ಷಣಿಕ ಜಿಲ್ಲೆಯ ತಾಲೂಕುಗಳು" }, src: "wiki-sirsi" },
    ],
  },
  beyond: {
    kicker: { en: "Hidden gems · Quiet places", kn: "ಗುಪ್ತ ರತ್ನಗಳು · ಶಾಂತ ತಾಣಗಳು" },
    title: { en: "Beyond the Known", kn: "ತಿಳಿದದ್ದರ ಆಚೆಗೆ" },
    lede: {
      en: "A Kadamba summer palace's tank still holds water for farmers. A swamp forest stores far more carbon than its neighbours. A research station sits in 4,300 mm of rain.",
      kn: "ಕದಂಬರ ಬೇಸಿಗೆ ಅರಮನೆಯ ಕೆರೆ ಇಂದಿಗೂ ರೈತರಿಗೆ ನೀರು ಕೊಡುತ್ತದೆ. ಜೌಗು ಕಾಡು ನೆರೆಹೊರೆಗಿಂತ ಹೆಚ್ಚು ಇಂಗಾಲ ಸಂಗ್ರಹಿಸುತ್ತದೆ. 4,300 ಮಿ.ಮೀ ಮಳೆಯಲ್ಲಿ ಸಂಶೋಧನಾ ಕೇಂದ್ರವೊಂದಿದೆ.",
    },
    body: [],
  },
  identity: {
    kicker: { en: "ನಮ್ಮ ಶಿರಸಿ · Our Sirsi", kn: "ನಮ್ಮ ಶಿರಸಿ · Our Sirsi" },
    title: { en: "Our Identity", kn: "ನಮ್ಮ ಗುರುತು" },
    lede: {
      en: "A first language given a throne at Banavasi. A goddess carried through the streets. A nut that earned its own name. Rain that never apologises.",
      kn: "ಬನವಾಸಿಯಲ್ಲಿ ಸಿಂಹಾಸನ ಪಡೆದ ಮೊದಲ ಭಾಷೆ. ಬೀದಿಯಲ್ಲಿ ಸಾಗುವ ದೇವಿ. ತನ್ನದೇ ಹೆಸರು ಗಳಿಸಿದ ಅಡಿಕೆ. ಕ್ಷಮೆ ಕೇಳದ ಮಳೆ.",
    },
    body: [
      {
        en: "Sirsi is not one thing. It is a market town and a forest, a Kadamba memory and a living festival, a dialect and a nut, a ghat road with twenty-one hairpins and a quiet matha beside a tank. If you are from here, you already knew. If you are not, come and see.",
        kn: "ಶಿರಸಿ ಒಂದೇ ಅಲ್ಲ. ಅದು ವ್ಯಾಪಾರದ ಊರು ಮತ್ತು ಕಾಡು, ಕದಂಬ ನೆನಪು ಮತ್ತು ಜೀವಂತ ಜಾತ್ರೆ, ಉಪಭಾಷೆ ಮತ್ತು ಅಡಿಕೆ, ಇಪ್ಪತ್ತೊಂದು ತಿರುವಿನ ಘಟ್ಟದ ರಸ್ತೆ ಮತ್ತು ಕೆರೆಯ ಪಕ್ಕದ ಶಾಂತ ಮಠ. ಇಲ್ಲಿಯವರಾದರೆ ನಿಮಗೆ ಗೊತ್ತೇ ಇತ್ತು. ಇಲ್ಲದಿದ್ದರೆ, ಬಂದು ನೋಡಿ.",
      },
    ],
  },
};

export const PLACES: Place[] = [
  {
    id: "marikamba",
    name: { en: "Sri Marikamba Temple", kn: "ಶ್ರೀ ಮಾರಿಕಾಂಬಾ ದೇವಸ್ಥಾನ" },
    area: "town",
    category: "sacred",
    km: [0, 3],
    coords: [14.61944, 74.8375],
    summary: {
      en: "Sirsi's goddess temple, built in 1688, centre of the biennial Marikamba fair.",
      kn: "1688ರಲ್ಲಿ ನಿರ್ಮಿತ ಶಿರಸಿಯ ದೇವಿ ಮಂದಿರ; ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ನಡೆಯುವ ಮಾರಿಕಾಂಬಾ ಜಾತ್ರೆಯ ಕೇಂದ್ರ.",
    },
    facts: [
      { en: "Sanctum image: about 7 ft, an eight-armed fierce form of Durga riding a tiger.", kn: "ಗರ್ಭಗುಡಿ ಮೂರ್ತಿ: ಸುಮಾರು 7 ಅಡಿ, ಹುಲಿಯ ಮೇಲೆ ಎಂಟು ಕೈಗಳ ಉಗ್ರ ದುರ್ಗೆ." },
      { en: "Blue façade is a 19th-century addition; red-dyed Kaavi mural technique is noted.", kn: "ನೀಲಿ ಮುಖಮಂಟಪ 19ನೇ ಶತಮಾನದ ಸೇರ್ಪಡೆ; ಕಾವಿ ಭಿತ್ತಿಚಿತ್ರ ಶೈಲಿ ಉಲ್ಲೇಖಿತ." },
      { en: "Pin marks Sirsi town centre; the temple is in town.", kn: "ಪಿನ್ ಶಿರಸಿ ಪಟ್ಟಣ ಕೇಂದ್ರವನ್ನು ಸೂಚಿಸುತ್ತದೆ; ದೇವಸ್ಥಾನ ಪಟ್ಟಣದೊಳಗಿದೆ." },
    ],
    season: { en: "Fair held every second year; latest listed edition 24 Feb – 4 Mar 2026.", kn: "ಜಾತ್ರೆ ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ; ಇತ್ತೀಚಿನದು 2026 ಫೆ. 24 – ಮಾ. 4." },
    src: ["wiki-marikamba", "wiki-sirsi"],
  },
  {
    id: "bedara-vesha",
    name: { en: "Bedara Vesha (Hunter Dance)", kn: "ಬೇಡರ ವೇಷ" },
    area: "town",
    category: "culture",
    summary: {
      en: "A five-night folk performance through Sirsi's streets, held every other year before Holi.",
      kn: "ಹೋಳಿಗೆ ಮುನ್ನ ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ಶಿರಸಿಯ ಬೀದಿಗಳಲ್ಲಿ ಐದು ರಾತ್ರಿ ನಡೆಯುವ ಜಾನಪದ ಪ್ರದರ್ಶನ.",
    },
    facts: [
      { en: "Nearly 50 solo performers, each representing an area of town.", kn: "ಸುಮಾರು 50 ಏಕವ್ಯಕ್ತಿ ಕಲಾವಿದರು, ಪ್ರತಿಯೊಬ್ಬರೂ ಊರಿನ ಒಂದು ಭಾಗದ ಪ್ರತಿನಿಧಿ." },
      { en: "Depicts the tale of Malleshi; ends at the Marikamba temple.", kn: "ಮಲ್ಲೇಶಿಯ ಕಥೆಯ ಚಿತ್ರಣ; ಮಾರಿಕಾಂಬಾ ದೇವಸ್ಥಾನದಲ್ಲಿ ಮುಕ್ತಾಯ." },
      { en: "Most recent edition listed: 2025; next: 2027.", kn: "ಇತ್ತೀಚಿನ ಪಟ್ಟಿ ಮಾಡಿದ ಆವೃತ್ತಿ: 2025; ಮುಂದಿನದು: 2027." },
    ],
    season: { en: "The days before Holi, every alternate year.", kn: "ಹೋಳಿಗೆ ಮುನ್ನದ ದಿನಗಳು, ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ." },
    src: ["wiki-bedara", "wiki-sirsi"],
  },
  {
    id: "sahasralinga",
    name: { en: "Sahasralinga", kn: "ಸಹಸ್ರಲಿಂಗ" },
    area: "taluk",
    category: "sacred",
    km: [10, 17],
    coords: [14.7198, 74.807],
    summary: {
      en: "Shiva lingas and Nandis carved on rocks in the Shalmala river.",
      kn: "ಶಾಲ್ಮಲಾ ನದಿಯ ಬಂಡೆಗಳ ಮೇಲೆ ಕೆತ್ತಿದ ಶಿವಲಿಂಗ ಮತ್ತು ನಂದಿಗಳು.",
    },
    facts: [
      { en: "Carvings are attributed to Sadashivarayavarma, king of the Sirsi kingdom (1678–1718).", kn: "ಕೆತ್ತನೆಗಳನ್ನು ಶಿರಸಿ ಅರಸ ಸದಾಶಿವರಾಯವರ್ಮ (1678–1718) ಕಾಲಕ್ಕೆ ಹೇಳಲಾಗುತ್ತದೆ." },
      { en: "A legend links the lingas to Bhima's journey in the Mahabharata.", kn: "ಒಂದು ಐತಿಹ್ಯ ಲಿಂಗಗಳನ್ನು ಮಹಾಭಾರತದ ಭೀಮನ ಪ್ರಯಾಣಕ್ಕೆ ಜೋಡಿಸುತ್ತದೆ." },
      { en: "Sources give 10–17 km from Sirsi, so the range is shown.", kn: "ಆಧಾರಗಳು ಶಿರಸಿಯಿಂದ 10–17 ಕಿ.ಮೀ ಎನ್ನುತ್ತವೆ; ಆದ್ದರಿಂದ ಶ್ರೇಣಿ ತೋರಿಸಲಾಗಿದೆ." },
    ],
    season: { en: "Lingas are best seen when the river runs low, in winter and summer; pilgrims gather on Mahashivaratri.", kn: "ನದಿ ಕಡಿಮೆಯಿರುವ ಚಳಿ-ಬೇಸಿಗೆಯಲ್ಲಿ ಲಿಂಗಗಳು ಚೆನ್ನಾಗಿ ಕಾಣುತ್ತವೆ; ಮಹಾಶಿವರಾತ್ರಿಗೆ ಯಾತ್ರಿಕರು ಸೇರುತ್ತಾರೆ." },
    src: ["wiki-sahasralinga", "tt-places", "tws-falls", "trawell-places"],
  },
  {
    id: "sonda",
    name: { en: "Sonda (Sodhe)", kn: "ಸೋದೆ (ಸೊಂದಾ)" },
    area: "taluk",
    category: "heritage",
    km: [15, 32],
    coords: [14.72639, 74.79917],
    summary: {
      en: "Seat of the Sonda Nayakas (1555–1763), now home to the Vadiraja Matha, Swarnavalli Matha and Jain temples.",
      kn: "ಸೋದೆ ನಾಯಕರ (1555–1763) ರಾಜಧಾನಿ; ಈಗ ವಾದಿರಾಜ ಮಠ, ಸ್ವರ್ಣವಲ್ಲಿ ಮಠ ಮತ್ತು ಜೈನ ಮಂದಿರಗಳ ತಾಣ.",
    },
    facts: [
      { en: "Founded 1555 by the Jain chieftain Arasappa Nayaka; destroyed by Hyder Ali in 1763.", kn: "1555ರಲ್ಲಿ ಜೈನ ಸರದಾರ ಅರಸಪ್ಪ ನಾಯಕನಿಂದ ಸ್ಥಾಪನೆ; 1763ರಲ್ಲಿ ಹೈದರ್ ಅಲಿಯಿಂದ ನಾಶ." },
      { en: "Sodhe Vadiraja Matha is one of the Ashta Mathas of Udupi.", kn: "ಸೋದೆ ವಾದಿರಾಜ ಮಠ ಉಡುಪಿಯ ಅಷ್ಟ ಮಠಗಳಲ್ಲಿ ಒಂದು." },
      { en: "Distance varies by source (15, 22 and 32 km are all quoted), so a range is shown.", kn: "ದೂರ ಆಧಾರದಿಂದ ಆಧಾರಕ್ಕೆ ಬೇರೆ (15, 22, 32 ಕಿ.ಮೀ ಎಲ್ಲವೂ ಉಲ್ಲೇಖಿತ); ಶ್ರೇಣಿ ತೋರಿಸಲಾಗಿದೆ." },
    ],
    src: ["wiki-sonda", "wiki-sirsi", "dh-sonda"],
  },
  {
    id: "banavasi",
    name: { en: "Banavasi & Madhukeshwara Temple", kn: "ಬನವಾಸಿ ಮತ್ತು ಮಧುಕೇಶ್ವರ ದೇವಾಲಯ" },
    area: "taluk",
    category: "heritage",
    km: [24, 30],
    coords: [14.5341, 75.0177],
    summary: {
      en: "The Kadamba capital on the Varada river, and one of Karnataka's oldest towns.",
      kn: "ವರದಾ ನದಿಯ ದಡದ ಕದಂಬ ರಾಜಧಾನಿ; ಕರ್ನಾಟಕದ ಅತಿ ಹಳೆಯ ಊರುಗಳಲ್ಲಿ ಒಂದು.",
    },
    facts: [
      { en: "Madhukeshwara temple: honey-toned lingam, an 8 ft Nandi; most of the present structure is dated to the 11th century (some sources say earlier).", kn: "ಮಧುಕೇಶ್ವರ ದೇವಾಲಯ: ಜೇನುಬಣ್ಣದ ಲಿಂಗ, 8 ಅಡಿ ನಂದಿ; ಈಗಿನ ರಚನೆಯ ಹೆಚ್ಚಿನ ಭಾಗ 11ನೇ ಶತಮಾನದ್ದು (ಕೆಲ ಆಧಾರಗಳು ಹಿಂದಿನದೆನ್ನುತ್ತವೆ)." },
      { en: "A red-sandalwood temple car was donated in 1608; the mantap in 1628.", kn: "1608ರಲ್ಲಿ ರಕ್ತಚಂದನದ ರಥ, 1628ರಲ್ಲಿ ಮಂಟಪ ದಾನ." },
      { en: "Banavasi was also a Buddhist and Jain centre.", kn: "ಬನವಾಸಿ ಬೌದ್ಧ ಮತ್ತು ಜೈನ ಕೇಂದ್ರವೂ ಆಗಿತ್ತು." },
    ],
    season: { en: "Kadambotsava, every December.", kn: "ಪ್ರತಿ ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ಕದಂಬೋತ್ಸವ." },
    src: ["wiki-banavasi", "dh-banavasi", "kiha"],
  },
  {
    id: "gudnapur",
    name: { en: "Gudnapur & Bangareshwar Tank", kn: "ಗುಡ್ನಾಪುರ ಮತ್ತು ಬಂಗಾರೇಶ್ವರ ಕೆರೆ" },
    area: "taluk",
    category: "heritage",
    km: [18, 18],
    summary: {
      en: "A Kadamba summer palace site with a pillar inscription and a tank built for farmers.",
      kn: "ಸ್ತಂಭ ಶಾಸನ ಮತ್ತು ರೈತರಿಗಾಗಿ ಕಟ್ಟಿದ ಕೆರೆಯಿರುವ ಕದಂಬರ ಬೇಸಿಗೆ ಅರಮನೆಯ ತಾಣ.",
    },
    facts: [
      { en: "The stamba shasana records the Kadamba genealogy in Sanskrit.", kn: "ಸ್ತಂಭ ಶಾಸನ ಕದಂಬರ ವಂಶಾವಳಿಯನ್ನು ಸಂಸ್ಕೃತದಲ್ಲಿ ದಾಖಲಿಸುತ್ತದೆ." },
      { en: "The Guddatataka tank, about 165 acres, is credited to King Ravivarma around 500 CE.", kn: "ಸುಮಾರು 165 ಎಕರೆಯ ಗುಡ್ಡತಟಾಕ ಕೆರೆ ಕ್ರಿ.ಶ. 500ರ ಸುಮಾರಿಗೆ ರವಿವರ್ಮನದು ಎನ್ನಲಾಗುತ್ತದೆ." },
      { en: "Bangareshwar temple stands in the middle of the tank.", kn: "ಕೆರೆಯ ಮಧ್ಯೆ ಬಂಗಾರೇಶ್ವರ ದೇವಾಲಯ." },
    ],
    src: ["dh-banavasi"],
  },
  {
    id: "manjuguni",
    name: { en: "Manjuguni Venkataramana Temple", kn: "ಮಂಜುಗುಣಿ ವೆಂಕಟರಮಣ ದೇವಸ್ಥಾನ" },
    area: "taluk",
    category: "sacred",
    km: [26, 26],
    summary: {
      en: "A hill-country temple of Lord Venkataramana and Goddess Padmavathi, with a Jain matha nearby.",
      kn: "ಬೆಟ್ಟದ ನಾಡಿನ ವೆಂಕಟರಮಣ-ಪದ್ಮಾವತಿ ದೇವಸ್ಥಾನ; ಸಮೀಪದಲ್ಲಿ ಜೈನ ಮಠ.",
    },
    facts: [{ en: "About 26 km from Sirsi.", kn: "ಶಿರಸಿಯಿಂದ ಸುಮಾರು 26 ಕಿ.ಮೀ." }],
    src: ["wiki-sirsi", "tt-places"],
  },
  {
    id: "kailasa-gudda",
    name: { en: "Kailasa Gudda", kn: "ಕೈಲಾಸ ಗುಡ್ಡ" },
    area: "taluk",
    category: "nature",
    km: [7, 7],
    summary: { en: "A hill picnic spot close to town.", kn: "ಪಟ್ಟಣದ ಹತ್ತಿರದ ಗುಡ್ಡದ ಪಿಕ್ನಿಕ್ ತಾಣ." },
    facts: [{ en: "About 7 km from Sirsi.", kn: "ಶಿರಸಿಯಿಂದ ಸುಮಾರು 7 ಕಿ.ಮೀ." }],
    src: ["tt-places"],
  },
  {
    id: "unchalli",
    name: { en: "Unchalli (Lushington) Falls", kn: "ಉಂಚಳ್ಳಿ ಜಲಪಾತ" },
    area: "region",
    areaNote: {
      en: "Sources differ on whether it falls in Sirsi or Siddapur taluk.",
      kn: "ಇದು ಶಿರಸಿಯೋ ಸಿದ್ದಾಪುರ ತಾಲೂಕೋ ಎಂಬುದರಲ್ಲಿ ಆಧಾರಗಳು ಭಿನ್ನ.",
    },
    category: "waterfall",
    km: [30, 36],
    coords: [14.40944, 74.7475],
    summary: {
      en: "The Aghanashini falls about 116 m; also known as Lushington Falls and Keppa Joga.",
      kn: "ಅಘನಾಶಿನಿ ಸುಮಾರು 116 ಮೀ ಧುಮುಕುತ್ತದೆ; ಲಶಿಂಗ್ಟನ್ ಜಲಪಾತ, ಕೆಪ್ಪ ಜೋಗ ಎಂದೂ ಹೆಸರು.",
    },
    facts: [
      { en: "Triangular, widening profile; viewpoints are the main way to enjoy it.", kn: "ತ್ರಿಕೋನ, ಅಗಲವಾಗುವ ರೂಪ; ನೋಟಬಿಂದುಗಳಿಂದ ನೋಡುವುದೇ ಮುಖ್ಯ." },
      { en: "Distance is quoted as 30–36 km depending on source.", kn: "ದೂರ ಆಧಾರದಂತೆ 30–36 ಕಿ.ಮೀ." },
    ],
    season: { en: "August–December, after the monsoon.", kn: "ಆಗಸ್ಟ್–ಡಿಸೆಂಬರ್, ಮಳೆಗಾಲದ ನಂತರ." },
    src: ["wiki-unchalli", "tt-places", "wiki-sirsi"],
  },
  {
    id: "benne-hole",
    name: { en: "Benne Hole Falls", kn: "ಬೆಣ್ಣೆ ಹೊಳೆ ಜಲಪಾತ" },
    area: "taluk",
    category: "waterfall",
    km: [26, 26],
    summary: { en: "A waterfall in Sirsi taluk, about 26 km out, on the way to Unchalli and Yana.", kn: "ಶಿರಸಿ ತಾಲೂಕಿನ ಸುಮಾರು 26 ಕಿ.ಮೀ ದೂರದ ಜಲಪಾತ; ಉಂಚಳ್ಳಿ, ಯಾಣ ದಾರಿಯಲ್ಲಿ." },
    facts: [{ en: "Listed by IISc ENVIS at 26+ km from Sirsi.", kn: "IISc ENVIS ಪ್ರಕಾರ ಶಿರಸಿಯಿಂದ 26+ ಕಿ.ಮೀ." }],
    src: ["iisc-places"],
  },
  {
    id: "shivaganga",
    name: { en: "Shivaganga Falls", kn: "ಶಿವಗಂಗಾ ಜಲಪಾತ" },
    area: "taluk",
    areaNote: { en: "Listed among Sirsi's nearby attractions; exact distance not given in our sources.", kn: "ಶಿರಸಿ ಸಮೀಪದ ತಾಣಗಳಲ್ಲಿ ಪಟ್ಟಿಯಾಗಿದೆ; ನಿಖರ ದೂರ ನಮ್ಮ ಆಧಾರಗಳಲ್ಲಿಲ್ಲ." },
    category: "waterfall",
    summary: { en: "Pristine and less travelled; swimming, trekking and camping are possible.", kn: "ಶುದ್ಧ ಮತ್ತು ಕಡಿಮೆ ಜನ ಹೋಗುವ ತಾಣ; ಈಜು, ಚಾರಣ, ಕ್ಯಾಂಪಿಂಗ್ ಸಾಧ್ಯ." },
    facts: [{ en: "Often overshadowed by Jog Falls.", kn: "ಜೋಗ್ ಫಾಲ್ಸ್‌ನ ನೆರಳಿನಲ್ಲಿ ಇರುವುದು ಹೆಚ್ಚು." }],
    src: ["tt-shivaganga", "tt-places"],
  },
  {
    id: "janmane",
    name: { en: "Janmane (NCBS field station)", kn: "ಜನ್ಮನೆ (NCBS ಕ್ಷೇತ್ರ ಕೇಂದ್ರ)" },
    area: "taluk",
    category: "nature",
    km: [14, 14],
    summary: {
      en: "A research station in about 4,300 mm of annual rain, on the Sirsi–Kumta road.",
      kn: "ಶಿರಸಿ–ಕುಮಟಾ ರಸ್ತೆಯಲ್ಲಿ ವಾರ್ಷಿಕ ಸುಮಾರು 4,300 ಮಿ.ಮೀ ಮಳೆಯಲ್ಲಿರುವ ಸಂಶೋಧನಾ ಕೇಂದ್ರ.",
    },
    facts: [{ en: "About 14 km south-west of Sirsi.", kn: "ಶಿರಸಿಯಿಂದ ಸುಮಾರು 14 ಕಿ.ಮೀ ನೈಋತ್ಯ." }],
    src: ["wiki-sirsi"],
  },
  {
    id: "yana",
    name: { en: "Yana Rocks", kn: "ಯಾಣ" },
    area: "region",
    category: "nature",
    km: [40, 40],
    summary: {
      en: "Two black karst-limestone spires, Bhairaveshwara and Mohini, in the Sahyadri forest.",
      kn: "ಸಹ್ಯಾದ್ರಿ ಕಾಡಿನ ಭೈರವೇಶ್ವರ ಮತ್ತು ಮೋಹಿನಿ ಎಂಬ ಕಪ್ಪು ಸುಣ್ಣಕಲ್ಲಿನ ಎರಡು ಶಿಖರಗಳು.",
    },
    facts: [
      { en: "Bhairaveshwara Shikhara is about 120 m (390 ft); Mohini Shikhara about 90 m (300 ft).", kn: "ಭೈರವೇಶ್ವರ ಶಿಖರ ಸುಮಾರು 120 ಮೀ (390 ಅಡಿ); ಮೋಹಿನಿ ಶಿಖರ ಸುಮಾರು 90 ಮೀ (300 ಅಡಿ)." },
      { en: "A cave temple holds a natural linga attributed to limestone formations.", kn: "ಗುಹಾ ದೇವಾಲಯದಲ್ಲಿ ಸುಣ್ಣಕಲ್ಲಿನ ರಚನೆಯಿಂದ ಉಂಟಾದ ನೈಸರ್ಗಿಕ ಲಿಂಗವಿದೆ." },
      { en: "About 40 km from Sirsi by road.", kn: "ರಸ್ತೆ ಮೂಲಕ ಶಿರಸಿಯಿಂದ ಸುಮಾರು 40 ಕಿ.ಮೀ." },
    ],
    season: { en: "Maha Shivaratri brings ten days of festivities and a car festival.", kn: "ಮಹಾಶಿವರಾತ್ರಿಯಲ್ಲಿ ಹತ್ತು ದಿನಗಳ ಉತ್ಸವ ಮತ್ತು ರಥೋತ್ಸವ." },
    src: ["wiki-yana", "dh-sirsi", "wiki-sirsi"],
  },
  {
    id: "vibhuti",
    name: { en: "Vibhuti Falls", kn: "ವಿಭೂತಿ ಜಲಪಾತ" },
    area: "region",
    category: "waterfall",
    km: [44, 50],
    summary: { en: "A forest-hidden fall about 8 km from Yana.", kn: "ಯಾಣದಿಂದ ಸುಮಾರು 8 ಕಿ.ಮೀ ದೂರದ ಕಾಡಿನಲ್ಲಿ ಅಡಗಿದ ಜಲಪಾತ." },
    facts: [{ en: "Route from Sirsi runs via Mattighatta, Devanahalli and Hegadekatta.", kn: "ಶಿರಸಿಯಿಂದ ಮತ್ತಿಘಟ್ಟ, ದೇವನಹಳ್ಳಿ, ಹೆಗಡೆಕಟ್ಟೆ ಮಾರ್ಗ." }],
    src: ["inditales-vibhuti", "iisc-places", "wiki-yana"],
  },
  {
    id: "magod",
    name: { en: "Magod Falls", kn: "ಮಾಗೋಡು ಜಲಪಾತ" },
    area: "region",
    category: "waterfall",
    km: [58, 58],
    summary: { en: "The Bedti river drops about 200 m in two steps, near Yellapur.", kn: "ಯಲ್ಲಾಪುರ ಬಳಿ ಬೇಡ್ತಿ ನದಿ ಎರಡು ಹಂತಗಳಲ್ಲಿ ಸುಮಾರು 200 ಮೀ ಧುಮುಕುತ್ತದೆ." },
    facts: [{ en: "About 16 km from Yellapur and 58 km from Sirsi.", kn: "ಯಲ್ಲಾಪುರದಿಂದ ಸುಮಾರು 16 ಕಿ.ಮೀ, ಶಿರಸಿಯಿಂದ 58 ಕಿ.ಮೀ." }],
    src: ["wiki-magod"],
  },
  {
    id: "sathodi",
    name: { en: "Sathodi Falls", kn: "ಸಾತೊಡ್ಡಿ ಜಲಪಾತ" },
    area: "region",
    category: "waterfall",
    km: [74, 74],
    summary: { en: "A roughly 15 m fall formed by several streams near Kallaramane Ghat.", kn: "ಕಲ್ಲರಮನೆ ಘಟ್ಟದ ಬಳಿ ಹಲವು ಹೊಳೆಗಳಿಂದ ರೂಪುಗೊಂಡ ಸುಮಾರು 15 ಮೀ ಜಲಪಾತ." },
    facts: [{ en: "32 km from Yellapur and 74 km from Sirsi.", kn: "ಯಲ್ಲಾಪುರದಿಂದ 32 ಕಿ.ಮೀ, ಶಿರಸಿಯಿಂದ 74 ಕಿ.ಮೀ." }],
    src: ["wiki-sathodi"],
  },
  {
    id: "burude",
    name: { en: "Burude Falls", kn: "ಬುರುಡೆ ಜಲಪಾತ" },
    area: "region",
    category: "waterfall",
    km: [64, 64],
    summary: { en: "A fall at Illimane village in Siddapur taluk.", kn: "ಸಿದ್ದಾಪುರ ತಾಲೂಕಿನ ಇಲ್ಲಿಮನೆ ಗ್ರಾಮದ ಜಲಪಾತ." },
    facts: [{ en: "Listed at about 64 km from Sirsi.", kn: "ಶಿರಸಿಯಿಂದ ಸುಮಾರು 64 ಕಿ.ಮೀ ಎಂದು ಪಟ್ಟಿಯಾಗಿದೆ." }],
    src: ["trawell-places"],
  },
  {
    id: "kathalekan",
    name: { en: "Kathalekan swamp forest", kn: "ಕಥಲೆಕಾನ್ ಜೌಗು ಕಾಡು" },
    area: "region",
    areaNote: { en: "Siddapur taluk.", kn: "ಸಿದ್ದಾಪುರ ತಾಲೂಕು." },
    category: "nature",
    summary: {
      en: "A Myristica swamp, among the district's rarest and most threatened forest types.",
      kn: "ಜಿಲ್ಲೆಯ ಅತಿ ಅಪರೂಪದ, ಅಪಾಯದಲ್ಲಿರುವ ಮಿರಿಸ್ಟಿಕಾ ಜೌಗು ಕಾಡು.",
    },
    facts: [
      { en: "Stores about 225.5 t of carbon per hectare, against about 5.1 t in a nearby savannah patch.", kn: "ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ ಸುಮಾರು 225.5 ಟನ್ ಇಂಗಾಲ; ಸಮೀಪದ ಸವನ್ನಾದಲ್ಲಿ ಸುಮಾರು 5.1 ಟನ್." },
      { en: "At least 35 amphibian species, about 74% endemic to the Western Ghats.", kn: "ಕನಿಷ್ಠ 35 ಉಭಯವಾಸಿ ಪ್ರಭೇದ; ಸುಮಾರು ಶೇ. 74 ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಿಗೇ ವಿಶಿಷ್ಟ." },
    ],
    src: ["iisc-flora"],
  },
  {
    id: "aghanashini-reserve",
    name: { en: "Aghanashini Conservation Reserve", kn: "ಅಘನಾಶಿನಿ ಸಂರಕ್ಷಿತ ಮೀಸಲು" },
    area: "region",
    category: "nature",
    summary: {
      en: "Protects the northernmost Western Ghats population of the lion-tailed macaque.",
      kn: "ಸಿಂಗಳೀಕದ (ಸಿಂಹಬಾಲದ ಕೋತಿ) ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಉತ್ತರದ ಅಂಚಿನ ಸಂತತಿಯನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.",
    },
    facts: [{ en: "The Aghanashini river itself rises near Shankara Honda in Sirsi.", kn: "ಅಘನಾಶಿನಿ ನದಿ ಶಿರಸಿಯ ಶಂಕರ ಹೊಂಡದ ಬಳಿ ಹುಟ್ಟುತ್ತದೆ." }],
    src: ["iisc-flora", "wiki-sirsi"],
  },
  {
    id: "siddapur",
    name: { en: "Siddapur town", kn: "ಸಿದ್ದಾಪುರ" },
    area: "region",
    category: "village",
    km: [39, 39],
    summary: { en: "Taluk headquarters in the Malenadu hills, 39 km from Sirsi via SH 93.", kn: "ಮಲೆನಾಡಿನ ತಾಲೂಕು ಕೇಂದ್ರ; SH 93 ಮೂಲಕ ಶಿರಸಿಯಿಂದ 39 ಕಿ.ಮೀ." },
    facts: [{ en: "Yakshagana in the Badagu Thittu style is practised across the taluk.", kn: "ತಾಲೂಕಿನಾದ್ಯಂತ ಬಡಗುತಿಟ್ಟಿನ ಯಕ್ಷಗಾನ ರೂಢಿಯಲ್ಲಿದೆ." }],
    src: ["wiki-sirsi"],
  },
];

export type Itinerary = {
  id: string;
  title: L;
  days: { label: L; stops: string[] }[];
  note: L;
};

export const ITINERARIES: Itinerary[] = [
  {
    id: "one-day",
    title: { en: "One day: sacred Sirsi", kn: "ಒಂದು ದಿನ: ಪವಿತ್ರ ಶಿರಸಿ" },
    days: [{ label: { en: "Day 1", kn: "ದಿನ 1" }, stops: ["marikamba", "sahasralinga", "sonda"] }],
    note: {
      en: "Start at the temple in town, then head north to the river lingas and the mathas of Sonda. Check sources before relying on drive times.",
      kn: "ಪಟ್ಟಣದ ದೇವಸ್ಥಾನದಿಂದ ಆರಂಭಿಸಿ, ಉತ್ತರಕ್ಕೆ ನದಿಯ ಲಿಂಗಗಳು ಮತ್ತು ಸೋದೆ ಮಠಗಳಿಗೆ ಹೋಗಿ. ಪ್ರಯಾಣ ಸಮಯಕ್ಕೆ ಮೊದಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    },
  },
  {
    id: "kadamba",
    title: { en: "Two days: Kadamba country & the rocks", kn: "ಎರಡು ದಿನ: ಕದಂಬ ನಾಡು ಮತ್ತು ಬಂಡೆಗಳು" },
    days: [
      { label: { en: "Day 1", kn: "ದಿನ 1" }, stops: ["gudnapur", "banavasi", "manjuguni"] },
      { label: { en: "Day 2", kn: "ದಿನ 2" }, stops: ["yana", "vibhuti"] },
    ],
    note: {
      en: "Yana and Vibhuti are about 8 km apart, so they pair well in a single outing.",
      kn: "ಯಾಣ ಮತ್ತು ವಿಭೂತಿ ಸುಮಾರು 8 ಕಿ.ಮೀ ಅಂತರದಲ್ಲಿರುವುದರಿಂದ ಒಂದೇ ಪ್ರವಾಸದಲ್ಲಿ ಹೊಂದುತ್ತವೆ.",
    },
  },
  {
    id: "falls",
    title: { en: "Post-monsoon waterfall circuit", kn: "ಮಳೆಗಾಲದ ನಂತರದ ಜಲಪಾತ ಯಾತ್ರೆ" },
    days: [
      { label: { en: "Day 1", kn: "ದಿನ 1" }, stops: ["benne-hole", "unchalli", "shivaganga"] },
      { label: { en: "Day 2", kn: "ದಿನ 2" }, stops: ["magod", "sathodi"] },
    ],
    note: {
      en: "Best between August and December when flow is full. Magod and Sathodi are on the Yellapur side, 58 and 74 km out.",
      kn: "ಹರಿವು ಪೂರ್ಣವಾಗಿರುವ ಆಗಸ್ಟ್–ಡಿಸೆಂಬರ್ ಉತ್ತಮ. ಮಾಗೋಡು ಮತ್ತು ಸಾತೊಡ್ಡಿ ಯಲ್ಲಾಪುರ ಬದಿಯಲ್ಲಿದ್ದು 58 ಮತ್ತು 74 ಕಿ.ಮೀ ದೂರ.",
    },
  },
];

export const REACH = {
  title: UI.reach,
  items: [
    { en: "Nearest airport: Hubballi, about 106 km. Nearest major railway station: Hubballi, about 102 km.", kn: "ಹತ್ತಿರದ ವಿಮಾನ ನಿಲ್ದಾಣ: ಹುಬ್ಬಳ್ಳಿ, ಸುಮಾರು 106 ಕಿ.ಮೀ. ಪ್ರಮುಖ ರೈಲು ನಿಲ್ದಾಣ: ಹುಬ್ಬಳ್ಳಿ, ಸುಮಾರು 102 ಕಿ.ಮೀ.", src: "trawell-reach" },
    { en: "Closer railheads: Talaguppa 54 km, Kumta 62 km, Haveri 76 km. Nearest international airport: Dabolim, Goa.", kn: "ಹತ್ತಿರದ ರೈಲು ನಿಲ್ದಾಣಗಳು: ತಾಳಗುಪ್ಪ 54, ಕುಮಟಾ 62, ಹಾವೇರಿ 76 ಕಿ.ಮೀ. ಹತ್ತಿರದ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ: ದಾಬೋಲಿಂ, ಗೋವಾ.", src: "wiki-sirsi" },
    { en: "By road: about 100 km from Hubballi and about 400 km from Bengaluru.", kn: "ರಸ್ತೆ: ಹುಬ್ಬಳ್ಳಿಯಿಂದ ಸುಮಾರು 100, ಬೆಂಗಳೂರಿನಿಂದ ಸುಮಾರು 400 ಕಿ.ಮೀ.", src: "trawell-reach" },
    { en: "Three ghat roads serve the town: Devimane (15 hairpins), Vaddi (21) and Doddamane (15). Monsoon conditions can make them hazardous.", kn: "ಪಟ್ಟಣಕ್ಕೆ ಮೂರು ಘಟ್ಟದ ರಸ್ತೆಗಳು: ದೇವಿಮನೆ (15 ತಿರುವು), ವಡ್ಡಿ (21), ದೊಡ್ಡಮನೆ (15). ಮಳೆಗಾಲದಲ್ಲಿ ಅಪಾಯಕಾರಿಯಾಗಬಹುದು.", src: "wiki-sirsi" },
  ],
};

export const T = (l: L, lang: "en" | "kn") => l[lang];
