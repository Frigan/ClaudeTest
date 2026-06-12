# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow

All changes must be committed with clean messages and pushed to GitHub.

- **Remote:** https://github.com/Frigan/ClaudeTest (branch: `main`)
- **Commit style:** Imperative subject line (≤72 chars), blank line, then a body explaining *why* if non-obvious
- **After every meaningful change:** stage, commit, then `git push origin main`
- **PowerShell commit syntax** (heredoc does not work in PowerShell):
  ```powershell
  git commit -m @'
  Subject line here

  Optional body here.

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  '@
  ```
- **gh CLI** is at `C:\Program Files\GitHub CLI\gh.exe` and is not in the default PATH — prepend it when needed: `$env:PATH += ";C:\Program Files\GitHub CLI"`
