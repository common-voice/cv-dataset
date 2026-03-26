# Changelog

Changelogs are maintained per dataset type:

- [Scripted Speech (SCS)](datasets/scripted-speech/CHANGELOG.md) -- 25 releases (v1 through v25.0)
- [Spontaneous Speech (SPS)](datasets/spontaneous-speech/CHANGELOG.md) -- 3 releases (v1.0 through v3.0)
- [Code Switching (CS)](datasets/code-switching/README.md) -- planned, no releases yet

## Major Changes with March 2026 Releases

The March 2026 release cycle (SCS v25.0 / SPS v3.0) introduces significant infrastructure and tooling changes across the Common Voice dataset ecosystem. Below is a summary; see each dataset type's changelog for details relevant to dataset consumers.

- **Multi-modality dataset statistics.** This repository (`cv-dataset`) now tracks release statistics for all dataset types (SCS, SPS, CS). Helper scripts (`createStats.js`, `compareReleases.js`, `createDeltaStatistics.js`, `recalculateStats.js`) were refactored to handle both SCS and SPS data formats, with per-type handlers and recursive comparison for nested SPS objects.

- **SCS & SPS Bundler changes** The Scripted Speech bundler is augmented with new `variant` option, and ability to handle licensed datasets. The Spontaneous Speech bundler reached its first production release matching SCS counterpart where possible, with four release types (`full`, `delta`, `variants`, `statistics`) and includes graceful delta release support with passive locale skipping for locales with zero new activity.

- **Embedded QA pipeline.** The SPS bundler now embeds the quality-control-data-pipeline as a `PostProcessCorpus` step. This applies disfluency standardization, quality tagging, and generates a per-locale QA summary JSON included in each release archive.

- **Datasheets integration.** Both SCS and SPS bundlers now generate per-locale datasheets (Markdown documentation) as part of the release pipeline. Templates and community-contributed content are sourced from `cv-datasheets` (schema v2.0.0), and the bundler fills in auto-generated statistics at build time. Datasheets are included in full release archives and also presented at datasets pages on the MDC platform. They merge community-contributed content with auto-generated statistics, and are designed to be human-readable summaries of the dataset for each locale.

- **SCS-SPS data bridge.** The SPS bundler can cross-reference the SCS database to provide demographics data. This enables accent, age, and gender data from SCS profiles to appear in SPS releases when available. Note that SPS was not connected to SCS user profiles at the start, thus older data may have missing demographics.
