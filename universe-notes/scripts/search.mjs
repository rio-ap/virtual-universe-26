// Print the keynote highlights whose title or summary contains a word.
// Run with `npm run search -- <word>` from universe-notes/.
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const notesFile = join(dirname(fileURLToPath(import.meta.url)), "..", "notes", "keynote-highlights.json");

export function searchHighlights(highlights, word) {
    const needle = String(word ?? "").trim().toLowerCase();
    if (!needle) return [];
    return highlights.filter((highlight) =>
        String(highlight.title).toLowerCase().includes(needle) ||
        String(highlight.summary).toLowerCase().includes(needle));
}

export function formatResults(results) {
    if (!results.length) return "No matching highlights.";
    return results
        .map((highlight) => `- ${highlight.topic}: ${highlight.title} — ${highlight.summary}`)
        .join("\n");
}

export async function searchNotes(word, file = notesFile) {
    const contents = await readFile(file, { encoding: "utf8" });
    return searchHighlights(JSON.parse(contents).highlights, word);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const word = process.argv.slice(2).join(" ").trim();
    if (!word) {
        console.error("Usage: npm run search -- <word>");
        process.exitCode = 2;
    } else {
        process.stdout.write(`${formatResults(await searchNotes(word))}\n`);
    }
}
