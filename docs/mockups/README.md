# AI Saved Me - UI Mockups

**Domain**: aisaved.me
**Stack**: saas_t3 (Next.js 16 + tRPC 11 + Prisma 6)

## MVP Screens Overview

These SVG mockups represent all screens for the MVP. Each includes annotations explaining key UI decisions.

### Public Screens

| #   | Screen             | File                                           | Description                                                                  |
| --- | ------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | **Home Page**      | [01-home-v3.svg](./01-home-v3.svg)             | Complete landing: ticker, counter, features, testimonials, detailed footer   |
|     | ~~Home v2~~        | ~~[01-home-v2.svg](./01-home-v2.svg)~~         | ~~(Incomplete bottom half)~~                                                 |
|     | ~~Home v1~~        | ~~[01-home.svg](./01-home.svg)~~               | ~~(Deprecated - generic template design)~~                                   |
| 2   | **Story Listing**  | [02-story-listing.svg](./02-story-listing.svg) | Browse stories with filters (category, AI tool, outcome), search, pagination |
| 3   | **Story Detail**   | [03-story-detail.svg](./03-story-detail.svg)   | Immersive reading with embedded media, chat session preview, engagement bar  |
| 4   | **Authentication** | [05-auth.svg](./05-auth.svg)                   | Split-screen login with Google OAuth primary, email/password backup          |

### User Screens

| #   | Screen                | File                                                   | Description                                                          |
| --- | --------------------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
| 5   | **Submission Wizard** | [04-submission-wizard.svg](./04-submission-wizard.svg) | 5-step story submission: Basics → Story → Chat Link → Media → Review |
| 6   | **Make It Your Own**  | [07-make-it-your-own.svg](./07-make-it-your-own.svg)   | Interactive tool to customize prompts for user's own situation       |

### Admin Screens

| #   | Screen              | File                                               | Description                                                           |
| --- | ------------------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| 7   | **Admin Dashboard** | [06-admin-dashboard.svg](./06-admin-dashboard.svg) | Stats, pending stories table, approve/reject actions, recent activity |

---

## Key UI Components

### Design System Elements

- **Colors**:
  - Primary: `#2563eb` (Blue)
  - Success: `#059669` (Green)
  - Warning: `#d97706` (Amber)
  - Legal category: Amber tones
  - Medical category: Green tones

- **Typography**: System UI font stack

- **Cards**: White background, subtle border, rounded corners (12px)

- **Buttons**:
  - Primary: Blue filled
  - Secondary: White with border
  - Danger: Red filled

### Story Cards

Stories appear in multiple formats:

1. **Vertical cards** (home page) - Image top, content below
2. **Horizontal cards** (listing page) - Thumbnail left, content right
3. **Compact cards** (related stories) - Small thumbnail, minimal info

### Category Tags

- **Legal**: Amber background (`#fef3c7`), brown text (`#92400e`)
- **Medical**: Green background (`#d1fae5`), dark green text (`#065f46`)

### Chat Session Embeds

Stories include embedded AI chat previews:

- Shows 2-3 message exchanges
- User messages in gray bubbles
- AI responses in blue bubbles
- Link to view full verified chat session

---

## User Flows

### 1. Reader Flow

```
Home → Browse Stories → Filter/Search → Read Story → Make It Your Own → Copy Prompt
```

### 2. Submitter Flow

```
Home → Sign In → Share Your Win → 5-Step Wizard → Submit for Review
```

### 3. Admin Flow

```
Admin Dashboard → Review Pending Stories → Approve/Reject → Publish
```

---

## Responsive Considerations

These mockups are designed at 1440px width (desktop). For implementation:

- **Mobile** (< 768px): Single column, collapsible filters, hamburger nav
- **Tablet** (768-1024px): 2-column story grid, side nav
- **Desktop** (> 1024px): Full layout as shown

---

## Annotations

Each mockup includes red annotation boxes explaining:

- Key UI decisions
- Interactive elements
- Data displayed
- User actions available

---

## Phase 1 Implementation Order

For the PRD, UI implementation should follow this order:

1. **Layout components** (header, footer, sidebar)
2. **Home page** (hero, story cards, category cards)
3. **Story listing** (filters, grid, pagination)
4. **Story detail** (reading experience, chat embed)
5. **Auth screens** (login, signup)
6. **Submission wizard** (5-step form)
7. **Admin dashboard** (stats, table, actions)
8. **Make It Your Own** (interactive tool)

All with mock data first, then integrate with tRPC/Prisma backend.
