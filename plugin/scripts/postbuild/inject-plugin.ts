import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/** polyfill for ES module support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "..", "..", "dist");
const destDir = path.resolve(__dirname, "..", "..", "..", "dist", "plugin"); // new plugin folder

function injectPlugin(src: string, dest: string): void {
  /** ensure exists */
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) injectPlugin(srcPath, destPath);
    else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      /** only copy .js and .css files */
      if (ext === ".js" || ext === ".css") fs.copyFileSync(srcPath, destPath);
    }
  }
}

injectPlugin(sourceDir, destDir);

console.log(`Plugin files copied from ${sourceDir} to ${destDir}`);
