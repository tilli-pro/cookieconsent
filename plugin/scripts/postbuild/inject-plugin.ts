import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/** polyfill for ES module support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "..", "..", "dist");
const destDir = path.resolve(__dirname, "..", "..", "..", "dist", "plugin");
const backupDestDir = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "dist",
  "plugin.old",
);

function injectPlugin(src: string, dest: string): void {
  try {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory ${dest}:`, err);
    throw err;
  }

  let entries;
  try {
    entries = fs.readdirSync(src, { withFileTypes: true });
  } catch (err) {
    console.error(`Failed to read directory ${src}:`, err);
    throw err;
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      try {
        injectPlugin(srcPath, destPath);
      } catch (err) {
        console.error(`Error processing directory ${srcPath}:`, err);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      /** only copy .js and .css files */
      if (ext === ".js" || ext === ".css") {
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (err) {
          console.error(
            `Failed to copy file from ${srcPath} to ${destPath}:`,
            err,
          );
        }
      }
    }
  }
}

function transformImportPaths(filePath: string): void {
  try {
    let code = fs.readFileSync(filePath, "utf8");
    code = code.replace(
      /(import\s+(?:.*?\s+from\s+)?["'])(\.{1,2}\/[^"']+)(["'])/g,
      (match, prefix, importPath, suffix) => {
        /** skip if import path already has a .js or .css extension */
        if (importPath.endsWith(".js") || importPath.endsWith(".css"))
          return match;

        const absolutePath = path.resolve(path.dirname(filePath), importPath);
        if (fs.existsSync(absolutePath + ".js"))
          return `${prefix}${importPath}.js${suffix}`;
        else if (fs.existsSync(path.join(absolutePath, "index.js")))
          return `${prefix}${importPath}/index.js${suffix}`;

        return match;
      },
    );
    fs.writeFileSync(filePath, code, "utf8");
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

function processDirectoryForTransform(dir: string): void {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Failed to read directory ${dir}:`, err);
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) processDirectoryForTransform(fullPath);
    else if (entry.isFile() && path.extname(entry.name) === ".js")
      transformImportPaths(fullPath);
  }
}

/** backup */
let backupExists = false;
if (fs.existsSync(destDir)) {
  try {
    if (fs.existsSync(backupDestDir))
      fs.rmSync(backupDestDir, { recursive: true, force: true });
    fs.renameSync(destDir, backupDestDir);
    backupExists = true;
    console.log(`Existing destination directory renamed to ${backupDestDir}`);
  } catch (err) {
    console.error("Failed to backup existing destination directory:", err);
    process.exit(1);
  }
}

try {
  injectPlugin(sourceDir, destDir);
  console.log(`Plugin files copied from ${sourceDir} to ${destDir}`);

  processDirectoryForTransform(destDir);
  console.log(
    "Import paths in JS files have been transformed to include explicit file extensions.",
  );

  if (backupExists) {
    fs.rmSync(backupDestDir, { recursive: true, force: true });
    console.log(`Backup directory ${backupDestDir} deleted successfully.`);
  }
} catch (err) {
  console.error("Error during plugin injection or transformation:", err);

  /** attempt to restore from backup */
  if (backupExists) {
    try {
      if (fs.existsSync(destDir))
        fs.rmSync(destDir, { recursive: true, force: true });

      fs.renameSync(backupDestDir, destDir);
      console.log(
        `Restored backup directory from ${backupDestDir} to ${destDir}.`,
      );
    } catch (restoreErr) {
      console.error("Failed to restore backup directory:", restoreErr);
    }
  }

  process.exit(1);
}
