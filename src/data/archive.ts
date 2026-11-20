import type { L } from "./content";

export type TimelineEntry = { when: string; text: L; src: string };

export const TIMELINE: TimelineEntry[] = [
  { when: "4th c. CE", text: { en: "Banavasi becomes the capital of the Kadambas, the first dynasty to bring Kannada into administration.", kn: "ಕನ್ನಡವನ್ನು ಆಡಳಿತಕ್ಕೆ ತಂದ ಮೊದಲ ಮನೆತನವಾದ ಕದಂಬರ ರಾಜಧಾನಿಯಾಗಿ ಬನವಾಸಿ ರೂಪುಗೊಳ್ಳುತ್ತದೆ." }, src: "dh-banavasi" },
  { when: "c. 500 CE", text: { en: "The Guddatataka tank at Gudnapur, about 165 acres, is credited to the Kadamba king Ravivarma.", kn: "ಸುಮಾರು 165 ಎಕರೆಯ ಗುಡ್ನಾಪುರದ ಗುಡ್ಡತಟಾಕ ಕೆರೆ ಕದಂಬ ರಾಜ ರವಿವರ್ಮನದು ಎನ್ನಲಾಗಿದೆ." }, src: "dh-banavasi" },
  { when: "1150 CE", text: { en: "Earliest known mention of the name Sirsi, on a hero-stone inscription at Tamadi Kallala in Siddapura taluk.", kn: "ಸಿದ್ದಾಪುರ ತಾಲೂಕಿನ ತಮಡಿ ಕಲ್ಲಳ್ಳದ ವೀರಗಲ್ಲು ಶಾಸನದಲ್ಲಿ ಶಿರಸಿ ಹೆಸರಿನ ಇದುವರೆಗಿನ ಹಳೆಯ ಉಲ್ಲೇಖ." }, src: "wiki-sirsi" },
  { when: "1555", text: { en: "Arasappa Nayaka founds the Sonda kingdom; the Sonda Nayakas rule until 1763.", kn: "ಅರಸಪ್ಪ ನಾಯಕ ಸೋದೆ ರಾಜ್ಯ ಸ್ಥಾಪಿಸುತ್ತಾನೆ; ಸೋದೆ ನಾಯಕರ ಆಳ್ವಿಕೆ 1763ರವರೆಗೆ." }, src: "wiki-sonda" },
  { when: "1608 · 1628", text: { en: "A red-sandalwood temple car (1608) and the mantap (1628) are donated at Banavasi's Madhukeshwara temple.", kn: "ಬನವಾಸಿ ಮಧುಕೇಶ್ವರ ದೇವಾಲಯಕ್ಕೆ ರಕ್ತಚಂದನದ ರಥ (1608) ಮತ್ತು ಮಂಟಪ (1628) ದಾನ." }, src: "dh-banavasi" },
  { when: "1678–1718", text: { en: "Reign of Sadashivarayavarma, to whom the Sahasralinga carvings are attributed.", kn: "ಸದಾಶಿವರಾಯವರ್ಮನ ಆಳ್ವಿಕೆ; ಸಹಸ್ರಲಿಂಗ ಕೆತ್ತನೆಗಳು ಇವನಿಗೆ ಸಲ್ಲುತ್ತವೆ." }, src: "wiki-sahasralinga" },
  { when: "1688", text: { en: "The Marikamba temple in Sirsi is built.", kn: "ಶಿರಸಿಯ ಮಾರಿಕಾಂಬಾ ದೇವಸ್ಥಾನ ನಿರ್ಮಾಣ." }, src: "wiki-marikamba" },
  { when: "1763", text: { en: "Hyder Ali attacks and destroys Sonda.", kn: "ಹೈದರ್ ಅಲಿ ಸೋದೆಯ ಮೇಲೆ ದಾಳಿ ಮಾಡಿ ನಾಶಮಾಡುತ್ತಾನೆ." }, src: "wiki-sonda" },
  { when: "1866", text: { en: "Sirsi City Municipal Council is established.", kn: "ಶಿರಸಿ ನಗರಸಭೆ ಸ್ಥಾಪನೆ." }, src: "wiki-sirsi" },
  { when: "2009", text: { en: "Sirsi Educational District is created, the 34th in Karnataka.", kn: "ಕರ್ನಾಟಕದ 34ನೇ ಶೈಕ್ಷಣಿಕ ಜಿಲ್ಲೆಯಾಗಿ ಶಿರಸಿ ಶೈಕ್ಷಣಿಕ ಜಿಲ್ಲೆ ರಚನೆ." }, src: "wiki-sirsi" },
];

export type PracticeEntry = { name: L; text: L; src: string };

export const PRACTICES: PracticeEntry[] = [
  { name: { en: "Bedara Vesha", kn: "ಬೇಡರ ವೇಷ" }, text: { en: "The Hunter Dance of Sirsi: five nights before Holi, every other year, ending at the Marikamba temple.", kn: "ಶಿರಸಿಯ ಬೇಟೆಗಾರ ನೃತ್ಯ: ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ಹೋಳಿಗೆ ಮುನ್ನ ಐದು ರಾತ್ರಿ, ಮಾರಿಕಾಂಬಾ ದೇವಸ್ಥಾನದಲ್ಲಿ ಮುಕ್ತಾಯ." }, src: "wiki-bedara" },
  { name: { en: "Dollu Kunitha", kn: "ಡೊಳ್ಳು ಕುಣಿತ" }, text: { en: "Drum dance performed during Bedara Vesha and the Marikamba fair.", kn: "ಬೇಡರ ವೇಷ ಮತ್ತು ಮಾರಿಕಾಂಬಾ ಜಾತ್ರೆಯಲ್ಲಿ ನಡೆಯುವ ಡೊಳ್ಳಿನ ಕುಣಿತ." }, src: "wiki-sirsi" },
  { name: { en: "Yakshagana", kn: "ಯಕ್ಷಗಾನ" }, text: { en: "Classical dance-drama with music, song, dialogue and costume, traditionally starting late at night and running until dawn. Regularly performed in and around Sirsi.", kn: "ಸಂಗೀತ, ಹಾಡು, ಸಂಭಾಷಣೆ, ವೇಷಭೂಷಣಗಳ ಶಾಸ್ತ್ರೀಯ ನೃತ್ಯ-ನಾಟಕ; ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ತಡರಾತ್ರಿ ಶುರುವಾಗಿ ಬೆಳಗಿನವರೆಗೆ. ಶಿರಸಿ ಸುತ್ತ ನಿಯಮಿತವಾಗಿ ನಡೆಯುತ್ತದೆ." }, src: "wiki-sirsi" },
  { name: { en: "Marikamba Jatre", kn: "ಮಾರಿಕಾಂಬಾ ಜಾತ್ರೆ" }, text: { en: "Held every second year: a wedding of the goddess, the slaying of Mahishasura, and a chariot procession.", kn: "ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ: ದೇವಿಯ ವಿವಾಹ, ಮಹಿಷಾಸುರ ಸಂಹಾರ ಮತ್ತು ರಥೋತ್ಸವ." }, src: "wiki-marikamba" },
  { name: { en: "Kadambotsava", kn: "ಕದಂಬೋತ್ಸವ" }, text: { en: "December festival at Banavasi celebrating the Kadambas; the Pampa Award honours a Kannada literary figure.", kn: "ಕದಂಬರನ್ನು ಸ್ಮರಿಸುವ ಬನವಾಸಿಯ ಡಿಸೆಂಬರ್ ಉತ್ಸವ; ಪಂಪ ಪ್ರಶಸ್ತಿ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸಾಧಕರಿಗೆ." }, src: "dh-banavasi" },
  { name: { en: "Maha Shivaratri at Yana", kn: "ಯಾಣದಲ್ಲಿ ಮಹಾಶಿವರಾತ್ರಿ" }, text: { en: "Ten days of festivities including a car festival.", kn: "ರಥೋತ್ಸವ ಸೇರಿದಂತೆ ಹತ್ತು ದಿನಗಳ ಉತ್ಸವ." }, src: "wiki-yana" },
  { name: { en: "Havigannada", kn: "ಹವಿಗನ್ನಡ" }, text: { en: "The Havyaka dialect of Kannada, distinct enough that other Kannada speakers often cannot follow it.", kn: "ಹವ್ಯಕರ ಕನ್ನಡ ಉಪಭಾಷೆ; ಇತರ ಕನ್ನಡಿಗರಿಗೆ ಅರ್ಥವಾಗದಷ್ಟು ಭಿನ್ನ." }, src: "wiki-havyak" },
  { name: { en: "Havyaka kitchen", kn: "ಹವ್ಯಕ ಅಡುಗೆ" }, text: { en: "Vegetarian, mild, coconut-and-curd based: thambuli, sasime, appe huli, patrode, melara.", kn: "ಸಸ್ಯಾಹಾರಿ, ಮೃದು, ತೆಂಗು-ಮೊಸರು ಆಧಾರಿತ: ತಂಬುಳಿ, ಸಾಸಿಮೆ, ಅಪ್ಪೆಹುಳಿ, ಪತ್ರೊಡೆ, ಮೇಲಾರ." }, src: "wiki-havyak" },
  { name: { en: "Sirsi Supari", kn: "ಶಿರಸಿ ಸುಪಾರಿ" }, text: { en: "The areca nut of Sirsi, Yellapur and Siddapura taluks; first areca nut with a GI tag.", kn: "ಶಿರಸಿ, ಯಲ್ಲಾಪುರ, ಸಿದ್ದಾಪುರ ತಾಲೂಕುಗಳ ಅಡಿಕೆ; GI ಟ್ಯಾಗ್ ಪಡೆದ ಮೊದಲ ಅಡಿಕೆ." }, src: "tnm-gi" },
];
