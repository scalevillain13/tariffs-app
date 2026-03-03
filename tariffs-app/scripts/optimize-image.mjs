import sharp from "sharp";
import { join } from "path";

const publicDir = join(process.cwd(), "public");
const inputPath = join(publicDir, "img.png");
const tempPath = join(publicDir, "img-temp.png");

await sharp(inputPath)
  .resize(600, null, { withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(tempPath);

await import("fs").then(({ renameSync }) => renameSync(tempPath, inputPath));

console.log("Image optimized.");
