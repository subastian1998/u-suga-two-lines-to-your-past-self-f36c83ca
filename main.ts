import { writeFileSync, mkdirSync } from "node:fs";

const entry =
  "Don't ship the Friday 2 a.m. deploy \u2014 the rollback ate the whole weekend and the on-call phone with it.\n" +
  "That weekend rewrote my rulebook: deploys wait for Monday, and sleep is a production dependency.";

// Gate self-check (RULES.txt): UTF-8 text, 1-280 chars, not only whitespace,
// exactly two non-blank lines, no trailing newline. Each line is one sentence,
// so each must end with a full stop.
if (entry.length < 1 || entry.length > 280) {
  throw new Error(`entry length ${entry.length} outside gate 1-280`);
}
if (entry.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
const lines = entry.split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error("entry must be exactly two non-blank lines");
}
if (lines.some((l) => !l.trim().endsWith("."))) {
  throw new Error("each line must be a single sentence ending with a full stop");
}
if (entry.endsWith("\n")) {
  throw new Error("entry must not end with a trailing newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
