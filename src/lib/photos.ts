// Manifest of the lab photos used across the site. `cat` powers the gallery
// filter, and `alt` provides a concise description of each photograph.

export type PhotoCat = "Beads" | "Dye & Water" | "The Run" | "Analysis" | "Team";

export type Photo = {
  file: string; // under /public/photos
  alt: string;
  cat: PhotoCat;
  orientation: "landscape" | "portrait";
};

export const GALLERY: Photo[] = [
  // --- Beads -------------------------------------------------------------
  { file: "img-9500.jpg", alt: "Coconut-shell carbon alginate beads resting in water, glossy and black", cat: "Beads", orientation: "portrait" },
  { file: "img-9499.jpg", alt: "Freshly formed activated-carbon beads pooled in a steel bowl of water", cat: "Beads", orientation: "portrait" },
  { file: "img-9527.jpg", alt: "Beakers of alginate beads forming in solution during bead preparation", cat: "Beads", orientation: "landscape" },
  { file: "img-9610.jpg", alt: "Uncoated bead formulations labeled 0%, 10% and 20% carbon on a paper towel", cat: "Beads", orientation: "portrait" },
  { file: "img-9611.jpg", alt: "Chitosan-coated bead formulations laid out and labeled by carbon loading", cat: "Beads", orientation: "portrait" },
  { file: "img-9600.jpg", alt: "Top-down view of flasks ringing a towel of black carbon and clear alginate beads", cat: "Beads", orientation: "portrait" },
  { file: "img-9599.jpg", alt: "Overhead arrangement of the six bead formulations surrounded by flasks", cat: "Beads", orientation: "portrait" },
  { file: "img-9565.jpg", alt: "Bead formulations and vials arranged for comparison from above", cat: "Beads", orientation: "portrait" },
  { file: "img-9643.jpg", alt: "Carbon and alginate bead samples beside their treated vials", cat: "Beads", orientation: "landscape" },
  { file: "img-9644.jpg", alt: "Labeled bead formulations laid alongside the corresponding dye vials", cat: "Beads", orientation: "landscape" },
  { file: "img-5706.jpg", alt: "Loose activated-carbon beads spread on a cloth beside the formulation grid", cat: "Beads", orientation: "landscape" },
  { file: "img-5708.jpg", alt: "Bead formulations and vials photographed together on the bench", cat: "Beads", orientation: "landscape" },
  { file: "img-5709.jpg", alt: "The full set of bead formulations laid out with their vials", cat: "Beads", orientation: "landscape" },
  { file: "img-9256.jpg", alt: "Vials and bead samples arranged on the lab bench", cat: "Beads", orientation: "landscape" },

  // --- Dye & Water -------------------------------------------------------
  { file: "img-9218.jpg", alt: "Turquoise reactive dye swirling through water in a steel bowl", cat: "Dye & Water", orientation: "portrait" },
  { file: "img-9533.jpg", alt: "Turquoise dye solution glowing in a glass vessel", cat: "Dye & Water", orientation: "portrait" },
  { file: "img-9235.jpg", alt: "Dye and water swirling together in a beaker", cat: "Dye & Water", orientation: "portrait" },
  { file: "img-9531.jpg", alt: "A 250 mL beaker of vivid blue dye stock solution", cat: "Dye & Water", orientation: "portrait" },
  { file: "shot-81070487.jpg", alt: "Treated formulations and a dye-only control showing visible reactive-dye removal after 24 hours", cat: "Dye & Water", orientation: "landscape" },

  // --- The Run -----------------------------------------------------------
  { file: "img-9557.jpg", alt: "The array of dye vials loaded with beads before shaking", cat: "The Run", orientation: "landscape" },
  { file: "img-9558.jpg", alt: "Eighteen vials of dye solution staged for the 24-hour run", cat: "The Run", orientation: "landscape" },
  { file: "img-9537.jpg", alt: "Flasks of dye solution staged near the orbital shaker", cat: "The Run", orientation: "portrait" },
  { file: "img-9572.jpg", alt: "Overhead view of treated flasks beside the bead formulations", cat: "The Run", orientation: "landscape" },
  { file: "img-9601.jpg", alt: "Erlenmeyer flasks of dye solution with bead samples during the run", cat: "The Run", orientation: "landscape" },
  { file: "img-9604.jpg", alt: "Flasks of pale treated dye solution with carbon beads on the bench", cat: "The Run", orientation: "portrait" },
  { file: "img-9605.jpg", alt: "Treated flasks and bead samples mid-experiment", cat: "The Run", orientation: "portrait" },
  { file: "img-9608.jpg", alt: "Row of Erlenmeyer flasks holding treated dye solution", cat: "The Run", orientation: "landscape" },
  { file: "img-9609.jpg", alt: "Flasks of treated solution lined up on the lab bench", cat: "The Run", orientation: "landscape" },
  { file: "img-5705.jpg", alt: "Early flasks of dye solution on a white background", cat: "The Run", orientation: "landscape" },

  // --- Analysis ----------------------------------------------------------
  { file: "img-9625.jpg", alt: "A smartphone photographing a dye vial inside a cardboard lightbox", cat: "Analysis", orientation: "portrait" },
  { file: "img-9641.jpg", alt: "ImageJ open on a monitor measuring red-channel intensity of the vials", cat: "Analysis", orientation: "portrait" },
  { file: "img-9515.jpg", alt: "Gloved hand holding pH indicator papers to check the coating bath", cat: "Analysis", orientation: "portrait" },
  { file: "img-9583.jpg", alt: "Petri dishes arranged for measurement and sampling", cat: "Analysis", orientation: "portrait" },
  { file: "img-9229.jpg", alt: "Flasks staged on the orbital shaker platform", cat: "Analysis", orientation: "portrait" },
  { file: "img-9230.jpg", alt: "The orbital shaker controls during the 24-hour run", cat: "Analysis", orientation: "portrait" },

  // --- Team --------------------------------------------------------------
  { file: "img-9602.jpg", alt: "A researcher in a lab coat working with the treated flasks", cat: "Team", orientation: "landscape" },
];

export const GALLERY_CATS: PhotoCat[] = ["Beads", "Dye & Water", "The Run", "Analysis", "Team"];

export const photoSrc = (file: string) => `/photos/${file}`;
