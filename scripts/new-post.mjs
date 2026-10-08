// Create a new post:  npm run new -- "My title"            (public)
//                     npm run new -- --private "My title"  (private)
import { existsSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const isPrivate = args.includes('--private');
const title = args.filter((a) => a !== '--private').join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- [--private] "Post title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dir = isPrivate ? 'src/private' : 'src/content/blog';
const file = `${dir}/${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
writeFileSync(
  file,
  `---\ntitle: ${JSON.stringify(title)}\ndate: ${date}\nsummary: ""\ntags: []\ndraft: true\n---\n\n`,
);
console.log(`Created ${file}. Set draft: false when it's ready to publish.`);
