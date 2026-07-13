// ---------------------------------------------------------------------------
// Source of truth for all written content + numbers.
// Pulled directly from the research write-up. Do not invent values here.
// Plain, factual wording. No em dashes.
// ---------------------------------------------------------------------------

export const meta = {
  title:
    "Capturing an Anionic Reactive Textile Dye with Coconut-Shell Carbon and Alginate Beads",
  subtitle: "Effects of Carbon Loading and a Chitosan Coating",
  dye: "Procion MX Turquoise (C.I. Reactive Blue 140)",
  org: "UT High School Research Academy",
  program: "HSRA · Sustainable Fashion Materials",
  team: ["Karan Verma", "Shantanu Nikam", "Ritz Ding"],
  mentors: ["Dr. Jessica Ciarla", "Arpan Rijal", "Joanna Du"],
  headline:
    "Coconut-shell activated carbon sealed inside alginate beads achieved mean removal of up to 84% for a reactive textile dye in water.",
};

export const researchQuestion =
  "Can biodegradable calcium-alginate beads containing coconut-shell activated carbon provide an effective and recoverable method for removing reactive textile dyes from contaminated water, and how do carbon loading and a chitosan coating affect their performance?";

// --- The Problem -----------------------------------------------------------
export const problemStats = [
  {
    value: "Reactive Blue 140",
    label: "The target dye",
    note: "Procion MX Turquoise. It is made to stay stable and highly soluble in water, which is what makes it hard to remove.",
  },
  {
    value: "Anionic",
    label: "Negatively charged",
    note: "The dye carries a negative charge, so it resists capture by materials with a similar charge and passes through ordinary treatment.",
  },
  {
    value: "Recoverable",
    label: "The design goal",
    note: "Loose activated carbon works well but is hard and costly to recover from treated water, so we sealed it inside beads.",
  },
];

export const problemBody = [
  "Textile dyeing is a major source of industrial water pollution. It releases large volumes of colored wastewater that can harm aquatic ecosystems.",
  "Reactive dyes such as Procion MX Turquoise are hard to remove because they are made to stay stable and highly soluble in water. Activated carbon adsorbs dye well, but recovering the loose carbon powder after treatment is difficult and costly.",
  "Our approach was to trap the carbon inside a biodegradable bead. The carbon stays adsorbent, and the beads can be lifted out of the water for recovery and future reuse testing.",
];

// --- Materials / The approach ----------------------------------------------
export type Material = {
  name: string;
  role: string;
  body: string;
  photo: string;
  accent: "teal" | "clay";
};

export const materials: Material[] = [
  {
    name: "Coconut-shell activated carbon",
    role: "Adsorbent",
    body: "A high-surface-area carbon that binds dye molecules. It works well, but as a loose powder it is hard to recover from treated water.",
    photo: "img-9500.jpg",
    accent: "teal",
  },
  {
    name: "Sodium alginate",
    role: "Bead material",
    body: "A polymer from seaweed that gels on contact with calcium chloride. It traps the carbon inside a soft, biodegradable bead that is easy to lift out of water.",
    photo: "chitosan-coat-9497.jpg",
    accent: "teal",
  },
  {
    name: "Chitosan",
    role: "Coating (tested)",
    body: "A positively charged biopolymer. We coated half of the beads to test whether its charge would attract more of the negatively charged dye.",
    photo: "img-9611.jpg",
    accent: "clay",
  },
  {
    name: "Procion MX Turquoise",
    role: "Target dye",
    body: "C.I. Reactive Blue 140, the anionic reactive dye used in this study. It was dissolved in the water the beads had to treat.",
    photo: "img-9531.jpg",
    accent: "clay",
  },
];

// --- The Method (5 steps) --------------------------------------------------
export type Step = {
  n: number;
  title: string;
  body: string;
  photo: string;
  detail: string;
};

export const methodSteps: Step[] = [
  {
    n: 1,
    title: "Mix alginate and carbon",
    body: "A 2% sodium alginate gel was split into three batches and mixed with 0%, 10%, or 20% coconut-shell activated carbon by mass, then stirred until uniform. The carbon-containing batches appeared black.",
    photo: "mix-carbon-9486.jpg",
    detail: "0%, 10%, or 20% carbon",
  },
  {
    n: 2,
    title: "Form beads in calcium chloride",
    body: "Each gel was drawn into a syringe and dripped into a calcium chloride bath. Every drop set on contact into a firm bead with the carbon sealed inside.",
    photo: "img-9499.jpg",
    detail: "Ionic crosslinking",
  },
  {
    n: 3,
    title: "Coat half of the beads in chitosan",
    body: "Half of each batch was soaked in a mildly acidic chitosan solution so the coating deposited on the surface. The other half was left uncoated.",
    photo: "alginate-beakers-9375.jpg",
    detail: "Uncoated vs coated",
  },
  {
    n: 4,
    title: "Shake in dye for 24 hours",
    body: "Six formulations with three replicates each, 18 vials of 40 mL dye solution, were each dosed with 4 g of beads and shaken on an orbital shaker for 24 hours.",
    photo: "img-9557.jpg",
    detail: "18 vials, 40 mL each",
  },
  {
    n: 5,
    title: "Measure with ImageJ",
    body: "Each vial was photographed in a lightbox and analyzed in ImageJ. Red-channel brightness was converted to absorbance and compared with a dye-only control.",
    photo: "measure-9641.jpg",
    detail: "Red-channel absorbance",
  },
];

// --- Results: the core dataset --------------------------------------------
export const carbonLevels = [0, 10, 20] as const;

// Dye removal (%) mean of n = 3
export const dyeRemoval = {
  uncoated: [16.6, 44.5, 84.0],
  coated: [13.9, 19.5, 40.7],
};

// Bead swelling (% mass gain) mean of n = 3
export const swelling = {
  uncoated: [32.5, 37.0, 39.8],
  coated: [62.3, 66.5, 68.3],
};

// Approximate water absorbed from the 40 mL solution, reported as a coating-group mean
export const waterAbsorbed = {
  uncoated: 2,
  coated: 7,
};

// Mean selectivity index = mean dye removal % / mean swelling % for n = 3
export const selectivity = {
  uncoated: [0.51, 1.2, 2.11],
  coated: [0.22, 0.29, 0.6],
};

// Convenience: chart-ready rows
export const removalRows = carbonLevels.map((c, i) => ({
  carbon: c,
  carbonLabel: `${c}%`,
  Uncoated: dyeRemoval.uncoated[i],
  Coated: dyeRemoval.coated[i],
}));

export const swellingRows = carbonLevels.map((c, i) => ({
  carbon: c,
  carbonLabel: `${c}%`,
  Uncoated: swelling.uncoated[i],
  Coated: swelling.coated[i],
}));

export const selectivityRows = carbonLevels.map((c, i) => ({
  carbon: c,
  carbonLabel: `${c}%`,
  Uncoated: selectivity.uncoated[i],
  Coated: selectivity.coated[i],
}));

// Tradeoff scatter: swelling (x) vs dye removal (y)
export const tradeoffPoints = [
  ...carbonLevels.map((c, i) => ({
    coating: "Uncoated" as const,
    carbon: c,
    swelling: swelling.uncoated[i],
    removal: dyeRemoval.uncoated[i],
  })),
  ...carbonLevels.map((c, i) => ({
    coating: "Coated" as const,
    carbon: c,
    swelling: swelling.coated[i],
    removal: dyeRemoval.coated[i],
  })),
];

// ImageJ-derived table (from the poster)
export const imageJTable = [
  { code: "0-U", coating: "Uncoated", carbon: 0, brightness: 188.068, treated: 0.1322, control: 0.1586, removed: 16.6 },
  { code: "10-U", coating: "Uncoated", carbon: 10, brightness: 208.227, treated: 0.088, control: 0.1586, removed: 44.5 },
  { code: "20-U", coating: "Uncoated", carbon: 20, brightness: 240.545, treated: 0.0253, control: 0.1586, removed: 84.0 },
  { code: "0-C", coating: "Coated", carbon: 0, brightness: 186.177, treated: 0.1366, control: 0.1586, removed: 13.9 },
  { code: "10-C", coating: "Coated", carbon: 10, brightness: 190.05, treated: 0.1277, control: 0.1586, removed: 19.5 },
  { code: "20-C", coating: "Coated", carbon: 20, brightness: 205.316, treated: 0.0941, control: 0.1586, removed: 40.7 },
];

export const keyNumbers = [
  { value: 84, suffix: "%", label: "mean dye removed", sub: "Uncoated bead at 20% carbon, mean of n = 3 and the highest result." },
  { value: 2.11, suffix: "", label: "mean selectivity index", sub: "Uncoated bead at 20% carbon, mean of n = 3.", decimals: 2 },
  { value: 18, suffix: "", label: "vials tested", sub: "6 formulations, 3 replicates each." },
  { value: 71, suffix: "%", label: "less water absorbed", sub: "Approximate coating-group means were 2 mL for uncoated beads and 7 mL for coated beads." },
];

// --- The key finding -------------------------------------------------------
export const findingPoints = [
  {
    title: "Carbon loading drives dye removal",
    body: "For both bead conditions, mean dye removal rose from 0% to 10% to 20% carbon. This pattern supports carbon loading as the primary driver of the measured dye removal.",
  },
  {
    title: "The coating reduced performance",
    body: "We expected the positive charge of chitosan to attract more dye. Instead, uncoated beads had higher mean dye removal at every carbon loading.",
  },
  {
    title: "Coated beads absorbed more water",
    body: "Chitosan-coated beads had greater mean mass gain at every carbon loading and an approximate coating-group water uptake of 7 mL versus 2 mL for uncoated beads. The greater swelling may have limited dye access to the carbon.",
  },
  {
    title: "Selectivity shows the tradeoff",
    body: "Mean selectivity, calculated as dye removal divided by swelling, was higher for uncoated beads at every carbon loading. At 20% carbon, it reached 2.11 for uncoated beads and 0.60 for coated beads.",
  },
];

// --- Conclusion + Future ---------------------------------------------------
export const conclusion = [
  "Coconut-shell activated carbon held inside alginate beads achieved a mean dye removal of 84.0% at 20% carbon loading in the uncoated condition. The bead form also allowed the carbon to be removed from the treated water, although carbon leakage was not measured quantitatively.",
  "At every matched carbon loading, chitosan-coated beads had lower mean dye removal and greater mean swelling than uncoated beads. Of the tested formulations, the uncoated 20% carbon beads had the highest mean dye removal and selectivity.",
  "The matched comparisons support a tradeoff associated with the coating: coated beads swelled more and removed less dye than uncoated beads at the same carbon loading. Greater swelling may have limited dye access to the carbon.",
];

export const futureWork = [
  "Test thinner chitosan coatings instead of removing the coating entirely.",
  "Test higher carbon loadings above 20%.",
  "Measure how well beads perform when reused across multiple cycles.",
  "Study how salinity and pH affect adsorption.",
  "Explore ways to destroy or regenerate the captured dye, such as photocatalytic breakdown with titanium dioxide.",
];

export const references = [
  {
    text: "Asadi, S., Eris, S., & Azizian, S. (2018). Alginate-based hydrogel beads as a biocompatible and efficient adsorbent for dye removal from aqueous solutions. ACS Omega, 3(11), 15140-15148.",
    href: "https://doi.org/10.1021/acsomega.8b02498",
  },
  {
    text: "Dutta, S., Adhikary, S., Bhattacharya, S., et al. (2024). Contamination of textile dyes in aquatic environments: Adverse impacts on aquatic ecosystems and human health, and management using bioremediation. Journal of Environmental Management, 353, 120103.",
    href: "https://doi.org/10.1016/j.jenvman.2024.120103",
  },
  {
    text: "United Nations Environment Programme. (2018). Putting the Brakes on Fast Fashion.",
    href: "https://www.unep.org/news-and-stories/story/putting-brakes-fast-fashion",
  },
];

export const acknowledgments =
  "We thank our instructor, Jessica Ciarla, and our mentors, Arpan Rijal and Joanna Du, for their guidance and support throughout this project. Their feedback helped us develop our experimental design, improve our methodology, work through problems, and complete our research.";
