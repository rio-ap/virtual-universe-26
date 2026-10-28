import assert from "node:assert/strict";
import test from "node:test";
import { formatResults, searchHighlights, searchNotes } from "../scripts/search.mjs";

const sample = [
    { topic: "A", title: "Stacked pull requests", summary: "Split a change into small PRs." },
    { topic: "B", title: "Security review", summary: "Check agent-written code before it ships." },
];

test("searchHighlights matches title or summary, case-insensitively", () => {
    assert.deepEqual(searchHighlights(sample, "STACKED"), [sample[0]]);
    assert.deepEqual(searchHighlights(sample, "agent-written"), [sample[1]]);
    assert.deepEqual(searchHighlights(sample, "missing"), []);
});

test("searchHighlights ignores an empty word", () => {
    assert.deepEqual(searchHighlights(sample, "   "), []);
});

test("formatResults reports matches and the empty case", () => {
    assert.equal(formatResults([sample[0]]), "- A: Stacked pull requests — Split a change into small PRs.");
    assert.equal(formatResults([]), "No matching highlights.");
});

test("searchNotes reads the keynote notes", async () => {
    const results = await searchNotes("stacked");
    assert.equal(results.length, 1);
    assert.equal(results[0].title, "Stacked pull requests");
});
