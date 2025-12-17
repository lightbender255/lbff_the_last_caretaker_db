# Solo Developer Workflow & Configuration

This document outlines the repository configuration and standard operating procedure for a solo developer workflow on this project. This setup ensures code safety (no direct commits to `main`) while avoiding blockers (self-approval restrictions).

## 1. Repository Configuration

### A. General Settings

*Location: Settings > General > Pull Requests*

- [x] **Allow merge commits**: Enabled (Required for standard merging).
- [ ] **Allow auto-merge**: Optional (Can remain off).

### B. Legacy Branch Protection

*Location: Settings > Branches*

- **Ensure NO rules exist for `main` here.** (Legacy rules override Rulesets and often cause issues).

### C. Ruleset Configuration (Recommended)

*Location: Settings > Rulesets > New branch ruleset*

**General:**

- **Name:** Main Protection
- **Enforcement status:** Active

**Targets:**

- **Include default branch** (`main`)

**Rules:**

1. **[x] Restrict deletions**: Prevents accidental deletion of `main`.
2. **[x] Block force pushes**: Prevents rewriting history on `main`.
3. **[x] Require a pull request**:
    - **Required approvals:** `0` (CRITICAL: Must be 0 so you are not blocked by self-approval).
    - **Require review from Code Owners:** Unchecked.
4. **[x] Require status checks to pass**:
    - Add only the checks that actually run (e.g., `build`, `test`).
    - **Do NOT add** "Code Scanning" unless you have configured CodeQL.

---

## 2. Pull Request Procedure (Checklist)

Use this checklist for every feature or fix.

### 1. Start Work

- [ ] **Sync**: Ensure local `main` is up to date (`git checkout main && git pull`).
- [ ] **Branch**: Create a new branch (`git checkout -b feature/my-cool-feature`).
- [ ] **Code**: Make changes and commit.

### 2. Create PR

- [ ] **Push**: Push branch to GitHub (`git push -u origin feature/my-cool-feature`).
- [ ] **Open**: Go to GitHub and click **Compare & pull request**.
- [ ] **Details**: Fill in title and description.
- [ ] **Features**:
  - **Reviewers**: Leave empty (You cannot review yourself).
  - **Assignees**: Assign yourself.
- [ ] **Create**: Click **Create pull request**.

### 3. Review & Merge

- [ ] **Self-Review**: Click the **Files changed** tab to triple-check your work.
- [ ] **CI Checks**: Wait for all checks (like `build`) to turn Green.
- [ ] **Merge**:
  - Click **Merge pull request** (Green button).
  - Confirm merge.
- [ ] **Cleanup**: Delete the feature branch locally and on GitHub.
