import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string(),
  href: z.string()
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string().default("In progress"),
    topics: z.array(z.string()).default([]),
    startDate: z.coerce.date().optional(),
    links: z.array(linkSchema).default([])
  })
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.enum(["blog", "tutorial"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = { projects, writing };
