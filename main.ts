// The Best Meal You Ever Had — deterministic one-sentence entry writer.
// No randomness, no clock, no network, no input: the sentence below is a
// fixed constant, so every run produces byte-identical output. A guard
// enforces the gate before writing: 1–200 characters, one clean sentence.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "The best meal I ever had was my grandmother's rendang in Padang, beef so soft it fell apart on warm rice while coconut steam fogged my glasses and she ladled on more sauce, smiling.";

if (SENTENCE.length < 1 || SENTENCE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${SENTENCE.length}`);
}
if (SENTENCE.trim() !== SENTENCE || (SENTENCE.match(/\./g) ?? []).length !== 1) {
  throw new Error("entry must be a single clean sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE, "utf8");
