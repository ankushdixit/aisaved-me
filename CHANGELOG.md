# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with Session-Driven Development
- Complete landing page with all sections (Hero, VictoryTicker, FeaturedStory, CategoryCards, Features, HowItWorks, Testimonials, FinalCTA)
- Three-theme system with Memphis (default), Japanese/Zen, and Organic themes
- Theme switching via floating button with theme-aware styling
- ThemeProvider context for managing theme state with localStorage persistence
- Theme-specific component variants in `components/landing/{memphis,japanese,organic}/`
- Theme-specific UI components in `components/ui/{memphis,japanese,organic}/`
- Wrapper components that switch implementations based on current theme
- CSS variable overrides for each theme in globals.css
- Google Fonts loading via layout.tsx for Memphis (Righteous, Space Grotesk), Japanese (Georgia system font), and Organic (Quicksand, Lato) themes
- Mock data for stories, testimonials, and landing page content
- Comprehensive test suite with 204 tests across 21 test suites
- Test utilities with ThemeProvider wrapper for component testing

### Changed

- Updated all work item specs to include Theme System Integration section
- Configured test_execution commands in .session/config.json for sk validate

### Fixed

### Removed
