import sharp from "sharp";
import { join } from "path";

const publicDir = join(process.cwd(), "public");
const inputPath = join(publicDir, "img.png");
const tempPath = join(publicDir, "img-temp.png");

const img = sharp(inputPath);
const { width, height } = await img.metadata();

// Обрезаем нижние ~25% — тёмная полоса/артефакт у ног
const cropHeight = Math.floor((height || 0) * 0.75);

await img
  .extract({ left: 0, top: 0, width: width || 0, height: cropHeight })
  .resize(600, null, { withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(tempPath);

await import("fs").then(({ renameSync }) => renameSync(tempPath, inputPath));

console.log("Image cropped and optimized.");
