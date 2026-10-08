import { getCollection, type CollectionEntry } from 'astro:content';

type Name = 'blog' | 'private';

/** Posts newest first. Drafts show up in `npm run dev` but never in a build. */
export async function getPosts<N extends Name>(name: N): Promise<CollectionEntry<N>[]> {
  const posts = await getCollection(name, ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
