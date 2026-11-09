// ---------------------------------------------------------------------------
// Source of truth for all written content + numbers.
// Aligned with the AIChE 2026 poster (v3). Do not invent values here.
// Means and SDs are computed from the 18 per-flask values (n = 3 per
// formulation). Plain, factual wording. No em dashes.
// ---------------------------------------------------------------------------

export const meta = {
  title:
    "The Effects of Carbon Loading and Chitosan Coating on Activated Carbon-Alginate Beads for Reactive Textile Dye Removal",
  subtitle: "How carbon loading and a post-gelation chitosan coating affect dye removal and bead hydration",
  dye: "Procion MX Turquoise (C.I. Reactive Blue 140)",
  org: "The University of Texas at Austin",
  program: "College of Natural Sciences",
  venue: "2026 AIChE Annual Student Conference",
  // Author order matches the poster.
  authors: ["Karan Verma", "Lezhi Ding", "Shantanu Nikam", "Arpan Rijal", "Joanna Du", "Jessica Ciarla"],
  team: ["Karan Verma", "Lezhi Ding", "Shantanu Nikam"],
  mentors: ["Dr. Jessica Ciarla", "Arpan Rijal", "Joanna Du"],
  headline:
    "At 20% carbon loading, uncoated activated carbon-alginate beads achieved 84.0% apparent dye removal of Reactive Blue 140, compared with 40.6% for chitosan-coated beads.",
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
  "Textile dyeing produces large volumes of colored wastewater that can contaminate waterways and harm aquatic ecosystems. Reactive dyes are particularly difficult to remove because they are highly soluble in water and resist biodegradation.",
  "Powdered activated carbon can adsorb these dyes, but recovering the fine particles after treatment is challenging. Immobilizing activated carbon in calcium alginate beads allows easier separation, although the surrounding hydrogel may restrict dye access to the carbon. Chitosan is often added to these composites because its amine groups become protonated under mildly acidic conditions, allowing them to attract negatively charged dye molecules.",
  "Our objective was to determine how activated carbon loading and a post-gelation chitosan coating affect reactive dye removal and bead hydration, individually and in combination.",
];

// --- Hypotheses -------------------------------------------------------------
export const hypotheses = [
  {
    code: "H1",
    statement: "Dye removal increases with activated carbon loading.",
    outcome: "Observed",
    detail: "Removal increased from 16.6% to 44.5% to 84.0% across the three carbon loadings in uncoated beads.",
    supported: true,
  },
  {
    code: "H2",
    statement: "Chitosan coating increases dye removal through electrostatic attraction to the anionic dye.",
    outcome: "Not supported",
    detail: "Coated beads exhibited lower dye removal at every carbon loading.",
    supported: false,
  },
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
    body: "A high-surface-area carbon that binds dye molecules. It works well, but as a loose powder it is hard to recover from treated water. Loaded at 0, 10, or 20 wt% relative to the alginate solids.",
    photo: "material-carbon.png",
    accent: "teal",
  },
  {
    name: "Sodium alginate",
    role: "Bead material",
    body: "A polymer from seaweed. A 2 wt% solution gels on contact with 2 wt% calcium chloride, trapping the carbon inside a soft, biodegradable bead that is easy to lift out of water.",
    photo: "material-alginate.png",
    accent: "teal",
  },
  {
    name: "Chitosan",
    role: "Coating (tested)",
    body: "A positively charged biopolymer dissolved in dilute acetic acid. We coated half of the beads to test whether its charge would attract more of the negatively charged dye.",
    photo: "material-chitosan.png",
    accent: "clay",
  },
  {
    name: "Procion MX Turquoise",
    role: "Target dye",
    body: "C.I. Reactive Blue 140, the anionic reactive dye used in this study. Each flask held 40.0 mL of dye solution at pH 4.",
    photo: "material-procion.jpg",
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
    body: "A 2 wt% sodium alginate solution was split into three batches containing 0, 10, or 20 wt% coconut-shell activated carbon relative to alginate solids, then stirred until uniform. The carbon-containing batches appeared black.",
    photo: "mix-carbon-9486.jpg",
    detail: "0, 10, or 20 wt% carbon",
  },
  {
    n: 2,
    title: "Form beads in calcium chloride",
    body: "Each solution was extruded dropwise into 2 wt% calcium chloride. Every drop set on contact into a firm crosslinked bead with the carbon sealed inside.",
    photo: "img-9499.jpg",
    detail: "Ionic crosslinking",
  },
  {
    n: 3,
    title: "Coat half of the beads in chitosan",
    body: "After gelation, half of each formulation was soaked in a chitosan coating bath prepared with dilute acetic acid so the coating deposited on the surface. The other half was left uncoated.",
    photo: "alginate-beakers-9375.jpg",
    detail: "Uncoated vs coated",
  },
  {
    n: 4,
    title: "Shake in dye for 24 hours",
    body: "Each of the six formulations was tested in three replicate flasks, 18 treatment flasks plus dye-only controls. Each flask held 4.00 g of blotted wet beads in 40.0 mL of Reactive Blue 140 solution at pH 4, shaken at 90 rpm for 24 hours.",
    photo: "img-9557.jpg",
    detail: "18 flasks, 40 mL each, pH 4",
  },
  {
    n: 5,
    title: "Image and weigh",
    body: "Flasks were photographed in a standardized lightbox under fixed lighting and locked camera settings. Mean red-channel intensity was measured in ImageJ and converted to image-derived absorbance, then compared with the dye-only control. Beads were blotted and weighed for wet-mass gain, and the solution volume was read for water uptake.",
    photo: "measure-9641.jpg",
    detail: "Red-channel absorbance",
  },
];

// --- Results: the core dataset --------------------------------------------
export const carbonLevels = [0, 10, 20] as const;

// Apparent dye removal (%): mean of n = 3 flasks, with SD across the flasks
export const dyeRemoval = {
  uncoated: [16.6, 44.5, 84.0],
  coated: [13.8, 19.5, 40.6],
};
export const dyeRemovalSd = {
  uncoated: [2.1, 2.5, 5.3],
  coated: [2.7, 5.0, 1.8],
};

// Wet-bead mass gain (%) relative to 4.00 g initial wet mass: mean of n = 3, with SD
export const massGain = {
  uncoated: [32.5, 37.0, 39.8],
  coated: [62.3, 66.5, 68.3],
};
export const massGainSd = {
  uncoated: [0.3, 0.7, 0.1],
  coated: [0.9, 0.5, 0.1],
};

// Solution volume drawn into the beads (mL of the 40.0 mL), coating-group mean, read to the nearest mL
export const waterAbsorbed = {
  uncoated: 2,
  coated: 7,
};

// Reduction in removal attributable to the coating (uncoated minus coated), percentage points,
// with Holm-adjusted p-values from the pooled ANOVA error (12 residual df)
export const coatingPenalty = [2.8, 25.0, 43.3];
export const coatingPenaltyP = ["p = 0.35", "p < 0.001", "p < 0.001"];
export const coatingPenaltySignificant = [false, true, true];
export const coatingPenaltyCi = 6.3; // half-width of the 95% CI, percentage points

// Tukey HSD groups across the six formulations (alpha = 0.05). Shared letters are not significantly different.
export const tukeyGroups = {
  uncoated: ["a", "b", "c"],
  coated: ["a", "a", "b"],
};

// Two-way ANOVA on the 18 flask values
export const anova = {
  flasks: 18,
  residualDf: 12,
  carbon: { df: "2,12", F: 276, p: "p < 0.001" },
  coating: { df: "1,12", F: 205, p: "p < 0.001" },
  interaction: { df: "2,12", F: 50.1, p: "p < 0.001" },
  r2: 0.99,
  tukey: [
    { pair: "20% coated vs 10% uncoated", p: "adjusted p = 0.76" },
    { pair: "10% coated vs 0% uncoated", p: "adjusted p = 0.91" },
  ],
  massGainInteraction: "p = 0.10",
  supplemental: {
    levene: "p = 0.94",
    shapiro: "p = 0.95",
    pooledSd: "3.5 percentage points",
  },
};

// Mean red-channel intensity (0 to 255) per formulation, from the ImageJ assay; control I = 176.99
export const imageJTable = [
  { code: "0-U", coating: "Uncoated", carbon: 0, intensity: 188.1, removed: 16.6, sd: 2.1, group: "a" },
  { code: "10-U", coating: "Uncoated", carbon: 10, intensity: 208.2, removed: 44.5, sd: 2.5, group: "b" },
  { code: "20-U", coating: "Uncoated", carbon: 20, intensity: 240.5, removed: 84.0, sd: 5.3, group: "c" },
  { code: "0-C", coating: "Chitosan-coated", carbon: 0, intensity: 186.2, removed: 13.8, sd: 2.7, group: "a" },
  { code: "10-C", coating: "Chitosan-coated", carbon: 10, intensity: 190.1, removed: 19.5, sd: 5.0, group: "a" },
  { code: "20-C", coating: "Chitosan-coated", carbon: 20, intensity: 205.3, removed: 40.6, sd: 1.8, group: "b" },
];
export const controlIntensity = 176.99;

// Convenience: chart-ready rows
export const removalRows = carbonLevels.map((c, i) => ({
  carbon: c,
  carbonLabel: `${c}%`,
  Uncoated: dyeRemoval.uncoated[i],
  Coated: dyeRemoval.coated[i],
}));

export const massGainRows = carbonLevels.map((c, i) => ({
  carbon: c,
  carbonLabel: `${c}%`,
  Uncoated: massGain.uncoated[i],
  Coated: massGain.coated[i],
}));

export const keyNumbers = [
  { value: 84, suffix: "%", label: "apparent dye removal", sub: "Uncoated bead at 20% carbon, mean of n = 3 and the highest result." },
  { value: 43.3, suffix: " pts", label: "lost to the coating at 20% carbon", sub: "Uncoated minus coated, Holm-adjusted p < 0.001.", decimals: 1 },
  { value: 18, suffix: "", label: "treatment flasks", sub: "6 formulations, 3 replicates each, plus dye-only controls." },
  { value: 1.8, suffix: "x", label: "wet-mass gain for coated beads", sub: "Coated beads gained about 1.8 times as much wet mass as uncoated beads.", decimals: 1 },
];

// --- The key finding -------------------------------------------------------
export const findingPoints = [
  {
    title: "Carbon loading drove dye removal, and the coating changed how much",
    body: "Both main effects and their interaction were significant. Increasing carbon loading improved removal in both formulations, with a far greater improvement in uncoated beads: 67.4 percentage points from 0% to 20% carbon, compared with 26.8 points in coated beads.",
  },
  {
    title: "The coating penalty grew with carbon",
    body: "The reduction in removal associated with the coating rose from 2.8 percentage points at 0% carbon, which was not statistically significant, to 25.0 and 43.3 points at 10% and 20% carbon. The 20% coated and 10% uncoated formulations were not statistically distinguishable.",
  },
  {
    title: "Coated beads gained more mass at every loading",
    body: "Wet-mass gain was 62 to 68% for coated beads and 33 to 40% for uncoated beads, a nearly constant difference of about 29 percentage points. Coated flasks lost about 7.0 mL of the 40.0 mL solution to the beads compared with 2.0 mL for uncoated flasks.",
  },
  {
    title: "Hydration alone does not explain the loss",
    body: "The coating's effect on dye removal depended strongly on carbon loading, while its effect on wet-mass gain stayed roughly the same. A hydrated layer that dilutes dye near the carbon and lengthens the diffusion path is a proposed mechanism, not a measured one.",
  },
];

// --- Discussion -------------------------------------------------------------
export const discussion = [
  "Increasing carbon loading from 0% to 20% improved dye removal by 67.4 percentage points in uncoated beads, compared with only 26.8 points in coated beads. This suggests that chitosan coating limits the effectiveness of additional activated carbon, potentially because increased water absorption and swelling create a hydrated barrier that restricts dye diffusion to adsorption sites.",
  "The greater wet-mass gain of coated beads is consistent with this proposed mechanism. Although protonated chitosan can attract anionic dyes at pH 4, this electrostatic advantage may be outweighed by reduced access to the embedded carbon. Pore accessibility, local dye concentration, and dry-solids content were not measured, so these explanations remain hypotheses rather than established mechanisms.",
];

// --- Conclusion + Future ---------------------------------------------------
export const conclusion = [
  "Increasing activated carbon loading substantially improved dye removal. In uncoated beads, removal rose from 16.6% at 0% carbon to 84.0% at 20% carbon (p < 0.001).",
  "Chitosan coating reduced dye removal, particularly at higher carbon loadings. At 20% carbon, removal decreased from 84.0% to 40.6%, with a significant carbon loading x coating interaction (p < 0.001).",
  "Chitosan coating increased wet-mass gain without improving removal. Coated beads gained approximately 1.8 times as much wet mass and showed greater solution-volume decreases, consistent with altered bead-water interactions.",
  "Under the tested conditions, uncoated beads containing 20% activated carbon achieved the highest dye removal. The findings highlight the importance of considering dye transport and adsorbent accessibility, rather than electrostatic attraction alone, when designing coated adsorbents.",
];

export const limitations = [
  "One type of reactive dye at pH 4 over 24 hours, with three replicates per formulation.",
  "The optical assay was referenced to a dye-only control and not calibrated to concentration, so results are apparent decolorization and no mg/g capacity is reported.",
  "Beads were dosed by wet mass, so dry adsorbent content may have differed between coated and uncoated formulations.",
  "Beads were recovered intact after 24 hours, but reuse across repeated cycles was not tested.",
  "Coating thickness, dye transport, and activated-carbon retention were not directly measured.",
];

export const futureWork = [
  "Optimize chitosan coating thickness and vary coating time to separate thickness from charge.",
  "Test carbon loadings above 20%.",
  "Calibrate the colorimetric assay against weighed dye standards to report mg dye per g carbon, and dose beads by dry solids.",
  "Evaluate bead reuse over multiple adsorption cycles.",
  "Study how salinity and pH affect adsorption.",
  "Explore ways to destroy or regenerate the captured dye, such as photocatalytic breakdown with titanium dioxide.",
];

export const references = [
  {
    text: "Annadurai, G., Juang, R.-S., & Lee, D.-J. (2002). Factorial design analysis for adsorption of dye on activated carbon beads incorporated with calcium alginate. Advances in Environmental Research, 6(2), 191-198.",
    href: "https://doi.org/10.1016/S1093-0191(01)00050-8",
  },
  {
    text: "Asadi, S., Eris, S., & Azizian, S. (2018). Alginate-based hydrogel beads as a biocompatible and efficient adsorbent for dye removal from aqueous solutions. ACS Omega, 3(11), 15140-15148.",
    href: "https://doi.org/10.1021/acsomega.8b02498",
  },
  {
    text: "Dutta, S., Adhikary, S., Bhattacharya, S., et al. (2024). Contamination of textile dyes in aquatic environments: Adverse impacts on the ecosystem, human health, and remediation. Journal of Environmental Management, 353, 120103.",
    href: "https://doi.org/10.1016/j.jenvman.2024.120103",
  },
  {
    text: "Hermanto, D., et al. (2024). Facile synthesis of activated carbon/alginate/chitosan composite beads as Remazol Brilliant Blue R adsorbent. Indonesian Physical Review, 7(3).",
    href: "https://doi.org/10.29303/ipr.v7i3.343",
  },
  {
    text: "Saleem, J., Moghal, Z. K. B., Pradhan, S., & McKay, G. (2024). High-performance activated carbon from coconut shells for dye removal: study of isotherm and thermodynamics. RSC Advances, 14(46), 33797-33808.",
    href: "https://doi.org/10.1039/d4ra06287f",
  },
  {
    text: "United Nations Environment Programme. (2018). Putting the Brakes on Fast Fashion.",
    href: "https://www.unep.org/news-and-stories/story/putting-brakes-fast-fashion",
  },
];

export const acknowledgments =
  "We thank Dr. Jessica Ciarla, Arpan Rijal, and Joanna Du for their guidance throughout this project.";
