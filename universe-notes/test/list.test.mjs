import assert from "node:assert/strict";
import test from "node:test";
import { formatHighlights, listHighlights } from "../scripts/list.mjs";

test("formatHighlights groups titles by topic in source order", () => {
    const output = formatHighlights([
        { topic: "First", title: "Alpha" },
        { topic: "Second", title: "Beta" },
        { topic: "First", title: "Gamma" },
    ]);
    assert.equal(output, "First\n- Alpha\n- Gamma\n\nSecond\n- Beta");
});

test("listHighlights reads the keynote notes", async () => {
    const output = await listHighlights();
    assert.match(output, /^The modern GitHub experience\n- AI overview tab/m);
    assert.match(output, /\n\nAgentic software development\n- Copilot automations/m);
    assert.equal(output.split("\n").filter((line) => line.startsWith("- ")).length, 6);
});
