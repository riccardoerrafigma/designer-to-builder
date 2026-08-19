# Designer to Builder: Prompts and Terminal Commands

This page collects the prompts and terminal commands used across the three Designer to Builder sessions. Replace any placeholder text with your own Figma link or project details before running a prompt.

> **Keep secrets out of Git.** This repository’s `.gitignore` excludes local environment files, including `.env`. Confirm that the file is ignored before adding a token or running `git add .`.

## Session 1 — Foundations

Session 1 did not use any agent prompts. The repository and design-token foundations were demonstrated manually with these terminal commands.

```bash
git clone https://github.com/riccardoerra/designer-to-builder.git
cd designer-to-builder

git remote set-url origin git@github.com:riccardoerrafigma/designer-to-builder.git
git push -u origin main

git status
git add index.html src/tokens
git commit -m "Add design tokens and token preview"
git push
```

## Session 2 — Build the Accordion

### Terminal preflight

The component workflow used the agent and VS Code Preview. The only terminal preflight was checking that the working tree was clean.

```bash
git status
```

### 1. Plan the component

```text
I want to build a reusable accordion component from this selected Figma node:

<FIGMA_NODE_URL>

Use the Figma MCP get_design_context tool to inspect the selected node. Also inspect this repository and read AGENTS.md. Do not edit any files yet.

Plan an implementation that:

- creates the component preview in src/components/accordion/accordion.html and its styles in src/components/accordion/accordion.css
- uses the existing tokens in src/tokens/tokens.css
- uses native details and summary, with no JavaScript or framework
- includes the light and dark examples and the open and closed states supplied by Figma
- preserves all existing content in the root index.html
- only adds a link from the existing root page to the accordion component preview
- does not invent content that is not supplied by Figma

Separate the plan into:

1. decisions coming from Figma
2. decisions coming from the repository
3. anything requiring human judgement
4. how the result will be verified in the preview
```

### 2. Implement the plan

```text
Implement the plan you just proposed. When you finish, summarise the files you changed and what I should verify in the preview.
```

### 3. Compare the implementation

```text
Do not change any files yet.

Use the Figma MCP get_design_context tool to compare the current implementation with this selected Figma node:

<FIGMA_NODE_URL>

Explain:

1. which structure, states, content, variables, and visual decisions match
2. which decisions came from Figma and which came from the repository
3. whether anything exists in Figma but is missing from code, or exists in code but is not supported by Figma
4. whether the selected design supplies body content for Return Policy, Payment Methods, or Customer Support
5. anything that appears out of sync and the smallest change you would recommend, if any

Refer to the relevant Figma layer or variable names and the relevant code files. Do not invent a mismatch and do not edit the implementation.
```

### Optional recovery prompts

These were prepared as contingencies rather than as part of the core demo.

#### Fix a verified mismatch

```text
Fix only this verified mismatch: [DESCRIBE THE MISMATCH HERE].

Recheck the same Figma node, preserve the existing repository constraints, and tell me exactly what to verify in the preview.
```

#### Restore the root page

```text
Restore all of the original token-preview content in the root index.html.

Keep the new accordion component files unchanged, and add only a link from the existing root page to src/components/accordion/accordion.html. Do not replace or simplify any of the original root-page content.
```

## Session 3 — Connect, Review, and Publish

### 0. Install the Code Connect CLI

This prerequisite was not covered during the session. Code Connect requires Node.js 18 or newer. Install the latest version of the CLI before starting the workflow:

```bash
npm install --global @figma/code-connect@latest
```

### 1. Prepare the repository and create the branch

```bash
cd designer-to-builder
git switch main
git pull
git status
git switch -c session-3
```

### 2. Create the Code Connect mapping

```text
Use the Figma Code Connect skill to create a parserless template for the Accordion component in this project.

Connect the Figma component to the existing HTML implementation, and map its Slot property so the accordion’s content remains flexible in the generated code. Create any configuration and template files needed, but only connect the Accordion—not the Accordion Item or Icon—and don’t publish anything yet.

Here’s the Figma component:
<FIGMA_NODE_URL>
```

### 3. Preview and validate

```bash
figma connect preview
figma connect publish --dry-run
```

If the preview reports an error or renders the template incorrectly, use this correction prompt:

```text
The Code Connect preview returned this result:

[PASTE THE OUTPUT OR ERROR]

Fix only the Code Connect template or configuration. Keep the same top-level Accordion mapping and dynamic Slot.

Do not modify the existing implementation, commit, push, or publish anything.
```

### 4. Commit and push

Because `.gitignore` excludes `.env`, stage the repository changes:

```bash
git status
git add .
git status
git commit -m "Add Accordion Code Connect mapping"
git push -u origin session-3
```

### 5. Review and merge the pull request

Open the pull request on GitHub, review the changes, and merge it.

### 6. Update `main` and publish

```bash
git switch main
git pull
figma connect publish
```

Verify the published mapping in Figma Dev Mode.
