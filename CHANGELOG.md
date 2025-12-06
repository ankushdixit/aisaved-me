# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 5-step story submission wizard at `/submit` route
  - Step 1 (Basics): Category and AI tool selection dropdowns
  - Step 2 (Story): Rich text editors for title, problem, AI help, and outcome with success metrics
  - Step 3 (Chat Link): URL input for chat links or textarea for excerpts
  - Step 4 (Media): File dropzone for images/documents (up to 5 files, 10MB each)
  - Step 5 (Review): Summary display with terms/privacy checkboxes
  - WizardProgress component showing step completion status
  - WizardTips sidebar with context-sensitive tips for each step
  - Auto-save to localStorage with debounced saves (2s delay)
  - Form validation using Zod schemas with step-by-step validation
  - Theme variants (Memphis, Japanese, Organic) for all wizard components
- Success page at `/submit/success` with themed confirmation message
- Error page at `/submit/error` with error type handling (validation, network, server, unknown)
- RichTextEditor component using Tiptap with bold, italic, bullet list, numbered list, and blockquote support
- FileDropzone component with drag-and-drop, file preview, and removal functionality
- Custom themed checkboxes with SVG checkmarks matching each theme
- useWizardForm hook managing multi-step form state, navigation, and validation
- useAutoSave hook with callback-based API for efficient auto-saving
- Story submission Zod schemas with step-specific validation rules
- 285 new unit tests for submit wizard components and pages
- Authentication pages with NextAuth.js v5 integration
  - Sign-in page at `/auth/signin` with email/password and Google OAuth
  - Sign-up page at `/auth/signup` with registration form
  - Error page at `/auth/error` with friendly error messages
  - Split-screen layout with social proof panel and form
  - Theme variants (Memphis, Japanese, Organic) for all auth components
  - AuthLayout, SocialProof, GoogleButton, SignInForm, SignUpForm components
  - User, Account, Session, VerificationToken models in Prisma schema
  - Registration API route at `/api/auth/register`
  - JWT session strategy with Prisma adapter
  - 28 new unit tests for auth components
- FormInput and PasswordInput reusable components for Memphis theme
- ArtifactModal component for viewing artifacts in a themed modal
  - Memphis theme: Bold borders, Memphis shadows, colored headers (yellow/mint/coral)
  - Japanese theme: Minimal styling, muted colors, subtle accent line
  - Organic theme: Rounded corners, gradient headers, soft shadows
  - Supports images, screenshots, and PDF documents
  - PDF placeholder with Download and "Open in New Tab" actions
  - Keyboard support (ESC to close), backdrop click to close
  - Full accessibility (ARIA attributes, focus management)
  - 122 new tests across all three themes
- StoryArtifact type enhancements: `url`, `fileSize`, `pageCount` fields
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

- Improved form performance: Changed validation mode from onChange to onBlur, optimized auto-save with subscription-based API
- Updated jscpd config to ignore submit theme variants and report folder
- StoryArtifacts components: Converted artifact cards to clickable buttons with hover states
- ArtifactModal refactoring: Extracted sub-components (ModalHeader, ImageContent, DocumentContent, ModalFooter) reducing main function from ~140 to ~45 lines
- Updated all work item specs to include Theme System Integration section
- Configured test_execution commands in .session/config.json for sk validate

### Fixed

- VictoryTicker card cropping: Fixed hover rotation causing edges to be clipped by changing overflow and adding padding
- Artifact card layout inconsistency: Fixed varying card heights with fixed image area and min-height text area

### Removed
