# scottejames personal site

A personal site with public and private blogs, built with [Astro](https://astro.build).

## Everyday use

```sh
npm install              # first time only
npm run dev              # local preview at http://localhost:4321
npm run new -- "Title"             # new public post (starts as a draft)
npm run new -- --private "Title"   # new private post
npm run deploy           # build and publish to GitHub Pages
```

Posts are markdown with this frontmatter: `title`, `date`, `summary`, `tags` and `draft`.
Drafts appear in `npm run dev` but are left out of builds.

## Where things live

| What | Where |
| --- | --- |
| Name, nav, social links | `src/site.config.ts` |
| Home page | `src/pages/index.astro` |
| About page | `src/pages/about.md` |
| Public posts | `src/content/blog/` |
| Private posts | `src/private/` (git-ignored) |
| Colours and type | `src/styles/global.css` |
| Contour map hero | `src/components/Topo.astro` (change `seed` for a new landscape) |

To add a page, create `src/pages/<name>.astro` (or `.md` with `layout: ../layouts/Prose.astro`)
and add it to `nav` in `src/site.config.ts`.

## The private blog

- Private posts are markdown files in `src/private/`. They are never committed to git.
- At build time every private post is bundled into one blob and encrypted with AES-256-GCM.
  The key comes from `PRIVATE_BLOG_PASSWORD` in `.env` (see `.env.example`), via PBKDF2 with 600k iterations.
- `/private/` asks for the password and decrypts the posts in the browser. Post titles are encrypted too.
- Security depends on the password, so use a long passphrase.
- Images referenced from private posts are **not** encrypted. Don't use them for anything sensitive.
- Back up `src/private/` yourself, because git does not have a copy.

## Deploying

`npm run deploy` builds locally and force-pushes `dist/` to the `gh-pages` branch of `origin`.
It has to run locally because CI can't see the private posts.
In GitHub, set Pages to deploy from the `gh-pages` branch.
For a custom domain, put it in `public/CNAME` and set `site` in `astro.config.mjs`.
