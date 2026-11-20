/** Static asset paths — filenames reflect product / editorial context. */
export const SRP_ASSETS = {
  activeDrain: "/assets/active-drain.JPG",
  backgroundCream: "/assets/background-images.png",
  backgroundGel: "/assets/background-images-2.png",
  cremeNight: "/assets/creme-night.png",
  dayCollagen: "/assets/day-collagen.png",
  fillerPatch: "/assets/filler-image.png",
  nightCollagen: "/assets/night-collagen.png",
  preparationMentale: "/assets/preparation-mentale-emotionale.JPG",
  productDrainBooster: "/assets/product-image-1.png",
  productKit: "/assets/product-image-2.png",
  productDayGel: "/assets/product-image-3.png",
  quoteRecovery: "/assets/quote-image.png",
} as const;

/** METCARE® Pro Ambassador landing — lifestyle and product photography. */
export const AMBASSADOR_ASSETS = {
  patchBoxCloseup: "/assets/ambassador/patch-box-closeup.jpg",
  patchArmBox: "/assets/ambassador/patch-arm-box.jpg",
  maderoFlatlay: "/assets/ambassador/madero-flatlay.jpg",
  ambassadorPatchBox: "/assets/ambassador/ambassador-patch-box.jpg",
  maderoDuo: "/assets/ambassador/madero-duo.jpg",
  ambassadorMadero: "/assets/ambassador/ambassador-madero.jpg",
  patchApplicationWaist: "/assets/ambassador/patch-application-waist.jpg",
  patchWristActives: "/assets/ambassador/patch-wrist-actives.jpg",
  storyCellulite: "/assets/ambassador/story-cellulite.jpg",
} as const;

export const SRP_BACKGROUNDS = {
  cream: SRP_ASSETS.backgroundCream,
  gel: SRP_ASSETS.backgroundGel,
  quote: SRP_ASSETS.quoteRecovery,
} as const;

export type SrpAssetKey = keyof typeof SRP_ASSETS;

/** Product catalog thumbnails keyed by protocole product index (0-based). */
export const PROTOCOL_PRODUCT_IMAGES: Partial<Record<number, string>> = {
  0: SRP_ASSETS.productDrainBooster,
  1: SRP_ASSETS.activeDrain,
  2: SRP_ASSETS.dayCollagen,
  3: SRP_ASSETS.nightCollagen,
  4: SRP_ASSETS.productDayGel,
  5: SRP_ASSETS.cremeNight,
  6: SRP_ASSETS.fillerPatch,
  7: SRP_ASSETS.productKit,
  8: SRP_ASSETS.cremeNight,
  9: SRP_ASSETS.preparationMentale,
};

/** Large editorial visuals — one primary asset per section (hero keeps its own pair). */
export const SECTION_FEATURED_IMAGES = {
  hero: {
    primary: AMBASSADOR_ASSETS.patchBoxCloseup,
    secondary: AMBASSADOR_ASSETS.patchArmBox,
  },
  notAlone: AMBASSADOR_ASSETS.maderoFlatlay,
  philosophy: AMBASSADOR_ASSETS.ambassadorPatchBox,
  phases: AMBASSADOR_ASSETS.maderoDuo,
  actives: AMBASSADOR_ASSETS.ambassadorMadero,
  dayNight: {
    day: AMBASSADOR_ASSETS.patchApplicationWaist,
    night: AMBASSADOR_ASSETS.patchWristActives,
  },
  sensory: AMBASSADOR_ASSETS.storyCellulite,
  individual: {
    primary: SRP_ASSETS.activeDrain,
    day: SRP_ASSETS.productDayGel,
    night: SRP_ASSETS.cremeNight,
  },
} as const;
