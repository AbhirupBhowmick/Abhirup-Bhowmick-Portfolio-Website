# Portfolio Rollback & Recovery Guide

This document defines the professional version-control safety workflow and rollback procedures for the portfolio website. Follow these steps and rules to ensure that the current stable, premium state of the portfolio is never lost, and all modifications can be reverted easily.

---

## 1. Safety Architecture & Branch Structure

To protect the portfolio, the repository is split into two primary branches:

| Branch Name | Role | Access Rule |
| :--- | :--- | :--- |
| `main` | Stable production/premium checkpoint | **Strictly Read-Only.** Do not make direct commits or edits here. |
| `portfolio-upgrades` | Experimental upgrades & AI improvements | **Development Zone.** All new features, UI tests, and styling go here. |

### The Golden Rule
> **Never modify the `main` branch directly.** If anything goes wrong during development, you can instantly discard experimental changes and restore the project using the stable `main` branch.

---

## 2. Safe Development Rules

When implementing any upgrades, follow this 5-step loop:

1. **Develop on Branch**: Ensure you are on the `portfolio-upgrades` branch (`git checkout portfolio-upgrades`).
2. **Local Testing**: Run development servers locally and verify the changes across devices and screen sizes.
3. **Commit Safely**: Save incremental milestones with clean, descriptive commit messages.
4. **Push Branch**: Keep GitHub in sync by pushing changes (`git push origin portfolio-upgrades`).
5. **Merge Stable Upgrades**: Merge into `main` only after complete verification and testing.

---

## 3. Gitignore & Secret Protection

To ensure credentials, keys, and auto-generated code are never leaked or tracked, the `.gitignore` file enforces the following exclusions:

* **Dependencies**: `node_modules/` is excluded.
* **Secrets/API Keys**: `.env`, `.env.local`, and `.env.production` are strictly ignored.
* **Build Artifacts**: Production build outputs like `.next/`, `out/`, `dist/`, and `build/` are ignored.
* **System Files**: OS metadata (`.DS_Store`, `Thumbs.db`) and IDE configuration folders (`.vscode/`, `.idea/`) are filtered.

> [!WARNING]
> Never commit API keys (e.g., Resend, Firebase, Google APIs) directly in the source files. Always use environment variables in a `.env.local` file.

---

## 4. Key Git Commands & Reference

| Command | Purpose | When to Use |
| :--- | :--- | :--- |
| `git checkout main` | Switches current workspace to `main` branch | To view or build the stable, unaltered portfolio. |
| `git checkout portfolio-upgrades` | Switches workspace to the experimental branch | To resume coding, testing, or applying upgrades. |
| `git log --oneline -n 10` | Displays the last 10 commits concisely | To locate the commit hash you want to restore or review. |
| `git diff` | Shows unstaged changes in the files | To review what changes were made since the last commit. |
| `git reset --hard` | Destroys all unstaged/staged local changes | To instantly discard a broken implementation and start clean. |
| `git revert <commit-hash>` | Creates a new commit that undoes a previous commit | To undo a commit that was already pushed without rewriting history. |
| `git checkout -- <file>` | Reverts changes in a specific file only | To discard modifications in one file without resetting the whole workspace. |
| `git clean -fd` | Removes untracked files and directories | To purge newly created folders/files that are not tracked by Git. |

---

## 5. Step-by-Step Recovery Scenarios

### Scenario A: Discarding Current Broken Changes (Uncommitted)
If you made changes that broke the UI and you want to throw them away completely:
```bash
# 1. Discard all modifications in tracked files
git reset --hard HEAD

# 2. Clean up any newly created untracked files/folders
git clean -fd
```

### Scenario B: Restoring to the Stable "Primary Restore Checkpoint"
If you need to return your working directory to the exact state of the stable backup commit:
```bash
# 1. Switch back to the main branch
git checkout main

# 2. Force reset main to match the remote origin/main (if changes were accidentally made)
git fetch origin
git reset --hard origin/main
```

### Scenario C: Reverting a Pushed Commit
If a commit was pushed to `portfolio-upgrades` and you later discover it has a bug:
```bash
# 1. Find the commit hash using git log
git log --oneline

# 2. Revert the commit (creates a new commit that subtracts the changes)
git revert <commit-hash>

# 3. Push the revert commit to GitHub
git push origin portfolio-upgrades
```

### Scenario D: Merging Working Upgrades into Main Safely
Once upgrades in `portfolio-upgrades` are thoroughly tested and ready to become the new stable version:
```bash
# 1. Ensure you have committed and pushed everything on the development branch
git checkout portfolio-upgrades
git push origin portfolio-upgrades

# 2. Switch to main
git checkout main

# 3. Pull latest main changes
git pull origin main

# 4. Merge portfolio-upgrades into main
git merge portfolio-upgrades

# 5. Push the new stable state back to main on GitHub
git push origin main

# 6. Switch back to development branch to continue working
git checkout portfolio-upgrades
```
