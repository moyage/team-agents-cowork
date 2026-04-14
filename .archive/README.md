# Historical Archive Manifest

This directory (`.archive/`) acts as the consolidated storage for all historical point-in-time documents, audit trails, and release records prior to Iteration V0.6. 

To reduce root-level repository noise and cognitive load for AI integrators and human collaborators, the following legacy directories were safely moved here without altering their contents:

- `.archive/audit/`: Originally `audit/`. Contains security, protocol consistency, and risk register checklists from past iterations.
- `.archive/qa/`: Originally `qa/`. Contains acceptance reports and installation validation checklists.
- `.archive/release/`: Originally `release/`. Contains point-in-time release notes and version proposals (V0.2, V0.3, etc.).
- `.archive/retros/`: Originally `retros/`. Contains highly nested historical iteration summaries, closures, and demand pools (V0.3-archive, V0.4-archive, etc.).

*Note: Any intra-directory markdown links referring to `../audit`, `../qa`, etc., remain valid if resolved relatively within this `.archive/` namespace. Absolute references may be broken but are preserved "as-is" to maintain audit integrity.*
