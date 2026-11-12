export type Hobby = {
  id: string;
  name: string;
  /** Short line shown under the open print. */
  caption: string;
  /** Shown in the hobby selector when this hobby is selected. */
  blurb: string;
  image: { src: string; alt: string };
};

const photo = (file: string) => `${import.meta.env.BASE_URL}about/${file}`;

/**
 * "Away from the keyboard" hobbies. Order = selector order = print order in the folder.
 * TODO: Paul, read through the blurbs and captions and adjust them to sound like you.
 */
export const hobbies: Hobby[] = [
  {
    id: "cooking",
    name: "Cooking",
    caption: "Sear hot, rest it, then slice",
    blurb:
      "A good steak is mostly patience: high heat, then leave it alone, then let it rest before you cut. I treat a release the same way. Ship it, let it settle, then look at what actually happened.",
    image: { src: photo("cooking.webp"), alt: "Sliced medium-rare steak with rosemary on a white plate" },
  },
  {
    id: "guitar",
    name: "Guitar",
    caption: "Same shape, four different voices",
    blurb:
      "Four guitars, same body shape, and none of them sound alike. Small setup choices change everything, which is how I think about config and defaults.",
    image: {
      src: photo("guitars.webp"),
      alt: "Four electric guitars in black, red, sunburst and seafoam green laid out on a stage",
    },
  },
  {
    id: "outdoors",
    name: "Outdoors",
    caption: "Where stuck bugs come unstuck",
    blurb:
      "When a bug won't budge, I step outside. Cornfields, a mountain and no screen. The fix usually shows up on the walk back.",
    image: { src: photo("outdoors.webp"), alt: "A green mountain under a blue sky with clouds, behind a cornfield" },
  },
];
