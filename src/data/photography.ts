import type { ChapterId } from "./content";

export type ChapterPhoto = {
  src: string;
  alt: { en: string; kn: string };
  caption: { en: string; kn: string };
  artist: string;
  license: string;
  licenseUrl: string;
  source: string;
  width: number;
  height: number;
  portrait?: boolean;
};

export const CHAPTER_PHOTOS: Partial<
  Record<Exclude<ChapterId, "arrival" | "explore">, ChapterPhoto | ChapterPhoto[]>
> = {
  discover: {
    src: "/photos/devimane-ghat.jpg",
    alt: {
      en: "Forested Western Ghats ridges viewed from the Devimane Ghat viewpoint.",
      kn: "ದೇವಿಮನೆ ಘಟ್ಟದ ವೀಕ್ಷಣಾ ಸ್ಥಳದಿಂದ ಕಾಣುವ ಕಾಡಿನ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಸಾಲುಗಳು.",
    },
    caption: {
      en: "A Western Ghats view from Devimane in Uttara Kannada, close to Sirsi.",
      kn: "ಶಿರಸಿಯ ಸಮೀಪದ ಉತ್ತರ ಕನ್ನಡದ ದೇವಿಮನೆಯಿಂದ ಕಾಣುವ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ನೋಟ.",
    },
    artist: "Dh4445666",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Devimane_Ghat_View_point.jpg",
    width: 1280,
    height: 960,
  },
  sacred: [
    {
      src: "/photos/marikamba-temple.jpg",
      alt: {
        en: "Red-and-white painted courtyard at Sirsi's Marikamba Temple beneath a turquoise shade cloth.",
        kn: "ಫಿರೋಜಿ ಬಣ್ಣದ ನೆರಳಿನ ಬಟ್ಟೆಯ ಕೆಳಗಿನ ಶಿರಸಿಯ ಮಾರಿಕಾಂಬಾ ದೇವಾಲಯದ ಕೆಂಪು-ಬಿಳಿ ಅಲಂಕೃತ ಪ್ರಾಂಗಣ.",
      },
      caption: {
        en: "A quiet view of the temple complex, photographed in 2012.",
        kn: "2012ರಲ್ಲಿ ಸೆರೆಹಿಡಿದ ದೇವಾಲಯ ಸಮುಚ್ಚಯದ ಶಾಂತ ನೋಟ.",
      },
      artist: "solarisgirl",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Marikamba_Temple,_Sirsi_(48029105021).jpg",
      width: 1280,
      height: 720,
    },
    {
      src: "/photos/sahasralinga-sirsi.jpg",
      alt: {
        en: "Shivalingas and Nandi carvings among rocks in the Shalmala River at Sahasralinga near Sirsi.",
        kn: "ಶಿರಸಿಯ ಬಳಿಯ ಸಹಸ್ರಲಿಂಗದಲ್ಲಿ ಶಾಲ್ಮಲಾ ನದಿಯ ಬಂಡೆಗಳ ಮೇಲಿರುವ ಶಿವಲಿಂಗ ಮತ್ತು ನಂದಿ ಕೆತ್ತನೆಗಳು.",
      },
      caption: {
        en: "Lingas and Nandis carved directly into the riverbed rocks.",
        kn: "ನದಿಪಾತ್ರದ ಬಂಡೆಗಳ ಮೇಲೆಯೇ ಕೆತ್ತಿರುವ ಲಿಂಗಗಳು ಮತ್ತು ನಂದಿಗಳು.",
      },
      artist: "Microrao",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Sahasralinga_Sirsi.jpg",
      width: 1280,
      height: 720,
    },
  ],
  wild: {
    src: "/photos/unchalli-falls.jpg",
    alt: {
      en: "Unchalli Falls dropping through the forested Western Ghats.",
      kn: "ಕಾಡಿನ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ನಡುವೆ ಧುಮುಕುವ ಉಂಚಳ್ಳಿ ಜಲಪಾತ.",
    },
    caption: {
      en: "Unchalli Falls, where the Aghanashini drops into a deep forested valley.",
      kn: "ಅಘನಾಶಿನಿ ಆಳವಾದ ಕಾಡಿನ ಕಣಿವೆಗೆ ಧುಮುಕುವ ಉಂಚಳ್ಳಿ ಜಲಪಾತ.",
    },
    artist: "Plhegde",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:LUSHINGTON_FALLS-UNCHALLI.JPG",
    width: 1280,
    height: 1707,
    portrait: true,
  },
  culture: [
    {
      src: "/photos/bedara-vesha.jpg",
      alt: {
        en: "A Bedara Vesha performer in ceremonial costume in Sirsi.",
        kn: "ಶಿರಸಿಯಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ವೇಷದಲ್ಲಿರುವ ಬೇಡರ ವೇಷ ಕಲಾವಿದ.",
      },
      caption: {
        en: "Bedara Vesha is Sirsi's own five-day Hunter Dance, held every other year around Holi.",
        kn: "ಹೋಳಿಯ ಸಮಯದಲ್ಲಿ ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ನಡೆಯುವ ಶಿರಸಿಯ ಐದು ದಿನಗಳ ಬೇಟೆಗಾರ ನೃತ್ಯವೇ ಬೇಡರ ವೇಷ.",
      },
      artist: "Atodead",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Bedara-Vesha-2-1.jpg",
      width: 1200,
      height: 675,
    },
    {
      src: "/photos/yakshagana-chowki.jpg",
      alt: {
        en: "Yakshagana performers applying face paint in a backstage makeup room.",
        kn: "ಹಿಂಬದಿಯ ಸಿದ್ಧತಾ ಕೋಣೆಯಲ್ಲಿ ಮುಖಕ್ಕೆ ಬಣ್ಣ ಹಚ್ಚಿಕೊಳ್ಳುತ್ತಿರುವ ಯಕ್ಷಗಾನ ಕಲಾವಿದರು.",
      },
      caption: {
        en: "The chowki is where performers prepare their makeup and costumes before a Yakshagana night.",
        kn: "ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನದ ಮೊದಲು ಕಲಾವಿದರು ಮೇಕಪ್ ಮತ್ತು ವೇಷಭೂಷಣ ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳುವ ಸ್ಥಳವೇ ಚೌಕಿ.",
      },
      artist: "Sathwik",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Yakshagana_makeup_room-_%22Chowki%22.jpg",
      width: 1280,
      height: 960,
    },
  ],
  taste: {
    src: "/photos/patrode-aati.jpg",
    alt: {
      en: "Patrode and other snacks prepared for the Aati season in coastal Karnataka.",
      kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಆಟಿ ಕಾಲಕ್ಕೆ ತಯಾರಿಸಿದ ಪತ್ರೊಡೆ ಮತ್ತು ತಿಂಡಿಗಳು.",
    },
    caption: {
      en: "This photograph is from an Aati table in Tulunadu, not a Havyaka-specific meal; recipes vary across Uttara Kannada.",
      kn: "ಈ ಚಿತ್ರ ತುಳುನಾಡಿನ ಆಟಿ ಊಟದದ್ದು; ಹವ್ಯಕಕ್ಕೆ ಮಾತ್ರ ಸೀಮಿತವಲ್ಲ. ಉತ್ತರ ಕನ್ನಡದಲ್ಲಿ ಮನೆಮನೆಗಳ ಪಾಕಗಳು ವಿಭಿನ್ನ.",
    },
    artist: "Vishwanatha Badikana",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Patrode_Aati_celebration_food_1.jpg",
    width: 1200,
    height: 1600,
    portrait: true,
  },
  people: {
    src: "/photos/areca-paddy-mist.jpg",
    alt: {
      en: "Areca palms and harvested paddy in morning mist in Kodagu.",
      kn: "ಕೊಡಗಿನ ಬೆಳಗಿನ ಮಂಜಿನಲ್ಲಿ ಅಡಿಕೆ ಮರಗಳು ಮತ್ತು ಕಟಾವಾದ ಭತ್ತದ ಗದ್ದೆ.",
    },
    caption: {
      en: "A Kodagu farm landscape; areca and paddy also shape everyday life around Sirsi.",
      kn: "ಕೊಡಗಿನ ಕೃಷಿ ನೋಟ; ಶಿರಸಿ ಸುತ್ತಲಿನ ದೈನಂದಿನ ಬದುಕಿನಲ್ಲೂ ಅಡಿಕೆ ಮತ್ತು ಭತ್ತದ ಪಾತ್ರವಿದೆ.",
    },
    artist: "Timothy A. Gonsalves",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Areca_Paddy_Mist_Balamuri_Coorg_Feb24_A7C_09428.jpg",
    width: 1200,
    height: 800,
  },
  beyond: {
    src: "/photos/yana-rocks.jpg",
    alt: {
      en: "Limestone rock outcrop at Yana in Uttara Kannada.",
      kn: "ಉತ್ತರ ಕನ್ನಡದ ಯಾಣದಲ್ಲಿನ ಸುಣ್ಣಕಲ್ಲಿನ ಬೃಹತ್ ಶಿಲಾರಚನೆ.",
    },
    caption: {
      en: "Yana's dark karst spires rise out of the forest near the coast road.",
      kn: "ಕರಾವಳಿ ರಸ್ತೆಯ ಬಳಿಯ ಕಾಡಿನಿಂದ ಯಾಣದ ಕಪ್ಪು ಕಾರ್ಸ್ಟ್ ಶಿಖರಗಳು ಎದ್ದು ಕಾಣುತ್ತವೆ.",
    },
    artist: "Kiwiki6",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:YANA.jpg",
    width: 1280,
    height: 960,
  },
  identity: {
    src: "/photos/madhukeshwara-temple.jpg",
    alt: {
      en: "Madhukeshwara Temple in Banavasi, a historic Kadamba capital near Sirsi.",
      kn: "ಶಿರಸಿಯ ಸಮೀಪದ ಕದಂಬರ ಐತಿಹಾಸಿಕ ರಾಜಧಾನಿ ಬನವಾಸಿಯ ಮಧುಕೇಶ್ವರ ದೇವಾಲಯ.",
    },
    caption: {
      en: "Banavasi: a Kannada literary and architectural legacy that still belongs to this region.",
      kn: "ಬನವಾಸಿ: ಇಂದಿಗೂ ಈ ಪ್ರದೇಶದ ಭಾಗವಾಗಿರುವ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪದ ಪರಂಪರೆ.",
    },
    artist: "Ajaya.n.g",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Madhukeshwara_temple_at_Banavasi_sirsi.JPG",
    width: 1280,
    height: 850,
  },
};
