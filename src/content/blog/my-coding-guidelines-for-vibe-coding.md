---
title: "My coding guidelines for vibe coding"
date: 2026-10-09
summary: "The rulebook I give Claude Code so the web apps I vibe code stay simple, safe and readable."
tags: [ai, vibe-coding, developer-experience]
draft: false
---

Most of the web apps I build these days are vibe coded: I describe what I want and Claude Code writes the code. The speed is great, but left alone an AI model drifts. It adds abstractions nobody asked for, writes comments that just repeat the code, and makes a different choice in the second file from the one it made in the first.

So every project gets a `CODING_GUIDELINES.md` at its root, and here's how I use it:

- **The model reads it before it writes anything.** A Claude Code skill loads the guidelines whenever code is about to change, and again before the change is handed back, so the model checks its own diff against them. This matters because it's easy to follow the rules in the first file and forget them by the third.
- **Every rule points at real code.** Rather than generic snippets, each principle names a file in the project that already does it right. This gives the model a concrete pattern to copy, and lets me check whether the rule is actually being followed.
- **Mistakes become rules.** When something goes wrong, the lesson goes into the guidelines in the same change. The Amplify section's "never rename a model" rule is there because a rename deleted a production table. This also catches conflicts: if a task seems to need something the guidelines forbid, the model has to say so instead of quietly picking one.
- **It's about my stack.** These cover React, TypeScript, Vite and AWS Amplify Gen2 because that's what I build with. The general principles in sections 1 and 2 carry over to anything.

Below is the current version, unedited. File references are to the project it came from, a planning app I'm building, so treat them as examples.

---

