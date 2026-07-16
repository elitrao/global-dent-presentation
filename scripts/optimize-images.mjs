import sharp from "sharp";

const jobs = [
  {
    input: "artwork/source/hero-infrastructure.png",
    output: "public/assets/hero-infrastructure-768.webp",
    width: 768,
    quality: 76,
  },
  {
    input: "artwork/source/hero-infrastructure.png",
    output: "public/assets/hero-infrastructure-1200.webp",
    width: 1200,
    quality: 78,
  },
  {
    input: "artwork/source/inventory-forecast.png",
    output: "public/assets/inventory-forecast.webp",
    width: 1200,
    quality: 78,
  },
  {
    input: "artwork/source/candidate-profile.png",
    output: "public/assets/candidate-profile.webp",
    width: 1200,
    quality: 78,
  },
];

await Promise.all(
  jobs.map(({ input, output, width, quality }) =>
    sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(output),
  ),
);
