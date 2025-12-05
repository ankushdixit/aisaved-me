# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Story detail page at `/stories/[slug]` route with dynamic slug routing
- StoryHero component displaying title, category tag, author info, publish date, and outcome badge
- StoryContent component with intro, problem, strategy, quote, result, and key takeaways sections
- ChatEmbed component showing AI conversation excerpts with user/AI message differentiation
- ChatMessage component for individual chat messages with role-based styling
- EngagementBar component with like, comment, bookmark, share actions and "Make It Your Own" CTA
- RelatedStories component displaying 3 related story cards from same category
- StoryArtifacts component for displaying evidence photos, documents, and screenshots
- Extended StoryDetail type with full content, chat embeds, and artifacts support
- Mock chat embed data for 5 stories with realistic AI conversations
- Full story content for 5 featured stories (Enterprise, Tenant Rights, Contractor, Insurance, Kidney Stones)
- Clickable ticker stories linking to story detail pages
- Theme variants (Memphis, Japanese, Organic) for all new components
- 94 new unit tests for story detail components
- Story listing page at `/stories` route with filter sidebar and pagination
- FilterSidebar component with Category, AI Tool, and Outcome Type filter groups
- FilterChip component for active filter display with remove functionality
- StoryCardHorizontal component for story grid display
- StoryGrid component for arranging story cards
- Pagination component with theme-aware styling
- Story type definitions in `lib/types/story.ts`
- Extended mock story data with 15 stories across all categories
- Filter and pagination helper functions for client-side filtering
- URL query parameter support for shareable filtered views
- Unit tests for FilterChip, FilterSidebar, StoryCardHorizontal, and Pagination components
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
