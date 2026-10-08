import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

// Public posts: committed to git and published as normal pages.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: postSchema,
});

// Private posts: git-ignored, and only ever published encrypted (see src/lib/encrypt.ts).
const priv = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/private' }),
  schema: postSchema,
});

export const collections = { blog, private: priv };
