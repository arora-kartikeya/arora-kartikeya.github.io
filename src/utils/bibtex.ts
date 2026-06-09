import { readFile } from "node:fs/promises";

export type Publication = {
  key: string;
  type: string;
  title: string;
  author: string;
  year?: string;
  journal?: string;
  booktitle?: string;
  eprint?: string;
  archivePrefix?: string;
  url?: string;
  doi?: string;
  note?: string;
};

type BibFields = Record<string, string>;

const bibPath = new URL("../data/publications.bib", import.meta.url);

export async function getPublications(): Promise<Publication[]> {
  const source = await readFile(bibPath, "utf-8");

  return parseBibTeX(source).sort((a, b) => {
    const yearA = Number(a.year ?? 0);
    const yearB = Number(b.year ?? 0);
    return yearB - yearA || a.title.localeCompare(b.title);
  });
}

export function parseBibTeX(source: string): Publication[] {
  const entries = splitEntries(source);

  return entries.map((entry) => {
    const headerMatch = entry.match(/^@(\w+)\s*\{\s*([^,\s]+)\s*,/);
    const type = headerMatch?.[1]?.toLowerCase() ?? "misc";
    const key = headerMatch?.[2] ?? "unknown";
    const body = entry.slice(headerMatch?.[0].length ?? 0, -1);
    const fields = parseFields(body);

    return {
      key,
      type,
      title: fields.title ?? "Untitled",
      author: fields.author ?? "Unknown author",
      year: fields.year,
      journal: fields.journal,
      booktitle: fields.booktitle,
      eprint: fields.eprint,
      archivePrefix: fields.archiveprefix,
      url: fields.url,
      doi: fields.doi,
      note: fields.note
    };
  });
}

function splitEntries(source: string): string[] {
  const entries: string[] = [];
  let start = -1;
  let depth = 0;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (char === "@" && depth === 0) {
      start = index;
    }

    if (start >= 0 && char === "{") {
      depth += 1;
    }

    if (start >= 0 && char === "}") {
      depth -= 1;
      if (depth === 0) {
        entries.push(source.slice(start, index + 1));
        start = -1;
      }
    }
  }

  return entries;
}

function parseFields(body: string): BibFields {
  const fields: BibFields = {};
  let index = 0;

  while (index < body.length) {
    while (/[\s,]/.test(body[index] ?? "")) index += 1;

    const nameStart = index;
    while (/[A-Za-z]/.test(body[index] ?? "")) index += 1;
    const name = body.slice(nameStart, index).toLowerCase();

    while (/[\s=]/.test(body[index] ?? "")) index += 1;
    if (!name) break;

    const { value, nextIndex } = readValue(body, index);
    fields[name] = value.trim().replace(/\s+/g, " ");
    index = nextIndex;
  }

  return fields;
}

function readValue(body: string, startIndex: number): { value: string; nextIndex: number } {
  const opener = body[startIndex];

  if (opener === "{") {
    let depth = 0;
    for (let index = startIndex; index < body.length; index += 1) {
      const char = body[index];
      if (char === "{") depth += 1;
      if (char === "}") depth -= 1;
      if (depth === 0) {
        return {
          value: body.slice(startIndex + 1, index),
          nextIndex: index + 1
        };
      }
    }
  }

  if (opener === "\"") {
    for (let index = startIndex + 1; index < body.length; index += 1) {
      if (body[index] === "\"" && body[index - 1] !== "\\") {
        return {
          value: body.slice(startIndex + 1, index),
          nextIndex: index + 1
        };
      }
    }
  }

  const end = body.indexOf(",", startIndex);
  return {
    value: body.slice(startIndex, end === -1 ? body.length : end),
    nextIndex: end === -1 ? body.length : end + 1
  };
}

export function formatAuthors(author: string): string {
  return author
    .split(/\s+and\s+/i)
    .map((name) => name.trim())
    .join(", ");
}
