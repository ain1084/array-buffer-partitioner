# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.4] - 2024-11-02

### Added

- Added `"type": "module"` to `package.json` to define the package as ESM-only.
- Added `"exports"` field to `package.json` to specify the entry point explicitly for ESM compatibility.

### Changed

- Updated `clean` script to `rm -rf ./dist docs` for consistency in paths.

## [0.0.3] - 2024-10-26

### Added

- **Alignment Adjustment for `byteOffset`**: Implemented automatic alignment of each `TypedArray` view’s `byteOffset` to prevent errors during view creation.
- **README.md Update**:
  - Added a note in the `Overview` section that `byteOffset` alignment is essential for preventing errors when creating `TypedArray` views.

### Changed

- **Function Adjustment**: Modified the `createArrayBufferViews` function to automatically align the `byteOffset` of each `TypedArray` view, preventing errors across different data types.

### Fixed

- **Error Prevention**: Enforced correct alignment during `TypedArray` view creation to resolve potential errors.

## [0.0.2] - 2024-10-26

### Changed

- Updated README to replace the "Documentation" badge with a "CI" badge to reflect the status of continuous integration workflows.
- Updated the badge URL and link to point to the correct GitHub Actions workflow.

## [0.0.1] - 2024-10-26

- Initial release
