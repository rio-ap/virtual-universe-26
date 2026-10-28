// Print the keynote highlight titles from notes/keynote-highlights.json,
// grouped by topic. Run with `npm run list` from universe-notes/.
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const notesFile = join(dirname(fileURLToPath(import.meta.url)), "..", "notes", "keynote-highlights.json");

export function formatHighlights(highlights) {
    const groups = new Map();
    for (const highlight of highlights) {
        if (!groups.has(highlight.topic)) groups.set(highlight.topic, []);
        groups.get(highlight.topic).push(highlight.title);
    }
    return [...groups]
        .map(([topic, titles]) => `${topic}\n${titles.map((title) => `- ${title}`).join("\n")}`)
        .join("\n\n");
}

export async function listHighlights(file = notesFile) {
    const contents = await readFile(file, { encoding: "utf8" });
    return formatHighlights(JSON.parse(contents).highlights);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    process.stdout.write(`${await listHighlights()}\n`);
}
