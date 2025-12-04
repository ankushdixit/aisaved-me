# AI Saved Me Platform - Complete Tech Stack

**Domain**: aisaved.me
**Stack**: saas_t3 (Solokit template)
**Framework**: Session-Driven Development with Solokit

## **STACK DECISION CRITERIA**

**Primary Constraints:**

1. **Claude Code Optimization** - Maximum compatibility and experience with Solokit
2. **Google Cloud Credits** - $25,000 credits utilization priority
3. **Speed of Development** - MVP in 7 days with Claude Code + Solokit
4. **PostgreSQL Database** - Structured relationships for long-term scalability
5. **Type Safety** - End-to-end TypeScript with tRPC

---

## **CORE TECHNOLOGY STACK**

### **1. FRONTEND & BACKEND FRAMEWORK**

**Next.js 16 (App Router) + tRPC 11 + TypeScript 5.9**

- **Next.js**: 16.0.7 with App Router
- **React**: 19.2.1
- **tRPC**: 11.7.1 (server, client, react-query, next)
- **TanStack Query**: 5.90.7
- **TypeScript**: 5.9.3
- **Reasoning**:
  - saas_t3 stack provides battle-tested configuration
  - tRPC eliminates API contract drift and runtime type errors
  - Full-stack framework with perfect client/server separation
  - React 19 with Server Components for optimal performance
  - Perfect Google Cloud Run deployment
  - Server-side rendering for SEO (critical for content platform)

### **2. DATABASE & ORM**

**PostgreSQL + Prisma 6 ORM**

- **Database**: Google Cloud SQL (PostgreSQL 15)
- **Prisma**: 6.19.0 (ORM + Client)
- **Validation**: Zod 4.1.12 for runtime schema validation
- **Connection**: Prisma Client with connection pooling
- **Reasoning**:
  - Structured relationships (users → stories → reviews → experts)
  - Complex queries for analytics and filtering
  - Prisma 6 with improved performance and type safety
  - Type-safe database operations with full TypeScript inference
  - Easy schema migrations and versioning
  - Google Cloud SQL uses credits efficiently

### **3. AUTHENTICATION & USER MANAGEMENT**

**NextAuth.js (Auth.js v5)**

- **Providers**: Google OAuth (primary), Email/Password (backup)
- **Session**: JWT tokens with database sessions
- **Integration**: Prisma adapter for NextAuth
- **Reasoning**:
  - Seamless Next.js integration
  - Google OAuth uses Google Cloud credits
  - Role-based access control support
  - Claude Code familiarity

### **4. AI & LLM SERVICES**

**Google AI Services (Gemini Pro)**

- **Content Enhancement**: Gemini Pro API for story improvement
- **Automated Redaction**: Gemini Pro for PII removal
- **Chat Analysis**: Gemini Pro for authenticity verification
- **Content Categorization**: Gemini Pro for automated tagging
- **Reasoning**:
  - Uses Google Cloud credits directly
  - Competitive performance with Claude/ChatGPT
  - Integrated billing with other Google services
  - Lower latency (same cloud provider)

### **5. FILE STORAGE & MEDIA**

**Google Cloud Storage**

- **Storage**: Cloud Storage buckets for images, documents, chat transcripts
- **CDN**: Google Cloud CDN for global content delivery
- **Processing**: Cloud Storage automatic image optimization
- **Reasoning**:
  - Uses Google Cloud credits
  - Seamless integration with Next.js
  - Automatic CDN and optimization
  - Scalable and reliable

### **6. UI FRAMEWORK & COMPONENTS**

**Tailwind CSS 4 + shadcn/ui**

- **Tailwind CSS**: 4.1.17 (CSS-first configuration)
- **PostCSS**: @tailwindcss/postcss 4.1.17
- **Components**: shadcn/ui component library
- **Rich Text**: Tiptap editor with extensions
- **Icons**: Lucide React icons
- **Utilities**: clsx 2.1.1, tailwind-merge 3.3.1
- **Reasoning**:
  - Tailwind v4 with CSS-first configuration (no JS config needed)
  - Theme customization via @theme directive in CSS
  - Automatic content detection (no content array needed)
  - Rapid UI development with utility classes
  - Mobile-first responsive design
  - No runtime CSS-in-JS overhead

### **7. EMAIL SERVICES**

**Google Cloud Email (SendGrid Integration)**

- **Service**: SendGrid via Google Cloud Marketplace
- **Features**: Transactional emails, newsletters, notifications
- **Templates**: Email template system for different notifications
- **Reasoning**:
  - Uses Google Cloud credits
  - High deliverability rates
  - Easy integration with Next.js
  - Template management

---

## **INFRASTRUCTURE & DEPLOYMENT**

### **HOSTING & DEPLOYMENT**

**Google Cloud Run**

- **Container**: Docker containers for Next.js application
- **Auto-scaling**: 0 to 1000+ instances based on traffic
- **Custom Domain**: aisaved.me with SSL certificates
- **Reasoning**:
  - Perfect for Next.js applications
  - Uses Google Cloud credits
  - Serverless scaling
  - Pay only for usage

### **DATABASE HOSTING**

**Google Cloud SQL**

- **Instance**: PostgreSQL 15 with automatic backups
- **Configuration**: High availability setup
- **Connection**: Private IP with VPC connector
- **Reasoning**:
  - Managed PostgreSQL service
  - Automatic backups and maintenance
  - Uses Google Cloud credits
  - Scales with application growth

### **MONITORING & ANALYTICS**

**Google Cloud Suite**

- **Application Monitoring**: Google Cloud Monitoring and Logging
- **User Analytics**: Google Analytics 4
- **Error Tracking**: Google Cloud Error Reporting
- **Performance**: Google Cloud Trace
- **Reasoning**:
  - Comprehensive monitoring suite
  - Uses Google Cloud credits
  - Integrated dashboard
  - Real-time alerting

---

## **DEVELOPMENT TOOLS & LIBRARIES**

### **ESSENTIAL LIBRARIES**

**Core Stack (from saas_t3 template)**

- `next` 16.0.7 - React framework with App Router
- `react` / `react-dom` 19.2.1 - UI library
- `@trpc/server` / `@trpc/client` / `@trpc/react-query` / `@trpc/next` 11.7.1 - Type-safe APIs
- `@tanstack/react-query` 5.90.7 - Data fetching and caching
- `prisma` / `@prisma/client` 6.19.0 - Database ORM
- `zod` 4.1.12 - Schema validation
- `typescript` 5.9.3 - Type system
- `superjson` 2.2.2 - Serialization for tRPC

**UI & Styling**

- `tailwindcss` / `@tailwindcss/postcss` 4.1.17 - Utility-first CSS
- `clsx` 2.1.1 - Conditional classNames
- `tailwind-merge` 3.3.1 - Merge Tailwind classes
- `@radix-ui/react-*` - Accessible component primitives (for shadcn/ui)
- `lucide-react` - Icon library
- `class-variance-authority` - Component variants

**Authentication & Security**

- `next-auth` - Authentication for Next.js
- `@auth/prisma-adapter` - Prisma adapter for NextAuth
- `bcryptjs` - Password hashing

**File Upload & Processing**

- `@google-cloud/storage` - Google Cloud Storage client
- `sharp` - Image processing and optimization

**AI Integration**

- `@google/generative-ai` - Gemini Pro API client
- Custom wrapper for chat analysis and redaction

**Form Handling**

- `react-hook-form` - Form state management
- `@hookform/resolvers/zod` - Zod resolver for form validation

**Rich Text Editor**

- `@tiptap/react` - Rich text editor
- `@tiptap/starter-kit` - Essential Tiptap extensions
- `@tiptap/extension-image` - Image support

---

## **DATABASE SCHEMA DESIGN**

### **CORE ENTITIES**

```sql
-- Users table
users {
  id: string (UUID)
  email: string (unique)
  name: string
  role: enum (READER, SUBMITTER, EXPERT, ADMIN)
  created_at: datetime
  updated_at: datetime
}

-- Stories table
stories {
  id: string (UUID)
  title: string
  content: text
  category: enum (LEGAL, MEDICAL, FINANCIAL, CAREER, OTHER)
  ai_tool_used: string
  outcome_metrics: json
  status: enum (DRAFT, PENDING, APPROVED, PUBLISHED, REJECTED)
  submitter_id: foreign_key(users.id)
  created_at: datetime
  published_at: datetime
}

-- Story assets (images, documents, chat transcripts)
story_assets {
  id: string (UUID)
  story_id: foreign_key(stories.id)
  file_type: enum (IMAGE, DOCUMENT, CHAT_TRANSCRIPT, OTHER)
  file_url: string
  file_name: string
  file_size: integer
  is_redacted: boolean
}

-- Story engagement
story_engagement {
  id: string (UUID)
  story_id: foreign_key(stories.id)
  user_id: foreign_key(users.id)
  type: enum (LIKE, BOOKMARK, COMMENT, SHARE)
  comment_text: text (nullable)
  created_at: datetime
}
```

---

## **DEVELOPMENT WORKFLOW**

### **SETUP PROCESS**

1. **Project Initialization with Solokit**

   ```bash
   # Initialize project with Solokit saas_t3 stack
   # This sets up Next.js 16 + tRPC 11 + Prisma 6 + Tailwind 4
   cd /Users/ankushdixit/Projects/aisaved-me
   # Run /sk:init and select saas_t3 stack
   ```

2. **Database Setup**

   ```bash
   # Configure DATABASE_URL in .env
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Google Cloud Configuration**
   - Set up Cloud SQL instance (PostgreSQL 15)
   - Configure Cloud Storage buckets
   - Set up Gemini Pro API access
   - Configure Cloud Run service

### **DEPLOYMENT PIPELINE**

1. **Docker Configuration**
   - Multi-stage Docker build for optimization
   - Environment variable management
   - Database connection configuration

2. **Cloud Run Deployment**
   - Automated deployment via Cloud Build
   - Environment-specific configurations
   - Database migration handling

---

## **SECURITY CONSIDERATIONS**

### **DATA PROTECTION**

- **PII Redaction**: Automated using Gemini Pro before storage
- **File Scanning**: Virus scanning for all uploaded files
- **Database Security**: Encrypted connections and data at rest
- **API Rate Limiting**: Prevent abuse of AI services

### **AUTHENTICATION SECURITY**

- **JWT Tokens**: Secure session management
- **Role-Based Access**: Granular permission system
- **OAuth Security**: Google OAuth with proper scopes
- **Password Security**: bcrypt hashing for backup auth

---

## **COST OPTIMIZATION**

### **GOOGLE CLOUD CREDITS USAGE**

- **Cloud Run**: Pay per request, scales to zero
- **Cloud SQL**: Right-sized instance with auto-scaling
- **Cloud Storage**: Lifecycle policies for old files
- **Gemini Pro API**: Efficient token usage with caching
- **Monitoring**: Free tier sufficient for MVP

### **ESTIMATED MONTHLY COSTS (POST-CREDITS)**

- Cloud Run: $20-50/month (depending on traffic)
- Cloud SQL: $30-70/month (db-f1-micro to db-g1-small)
- Cloud Storage: $5-15/month
- Gemini Pro: $20-100/month (depending on usage)
- **Total**: $75-235/month

---

## **DEVELOPMENT TIMELINE**

### **Day 1: Foundation**

- Next.js project setup with TypeScript
- Prisma schema design and database setup
- Basic authentication with NextAuth
- Google Cloud services configuration

### **Day 2: Core Features**

- Story submission form with file uploads
- Basic admin dashboard for story approval
- Google Cloud Storage integration

### **Day 3: AI Integration**

- Gemini Pro integration for content redaction
- Chat transcript processing and validation
- Automated content enhancement

### **Day 4: Story Display**

- Immersive story reading experience
- Media embedding and optimization
- Basic story listing and categorization

### **Day 5: Polish & Testing**

- UI/UX refinements with shadcn/ui
- Basic search and filtering
- Error handling and validation

### **Day 6: Deployment**

- Docker containerization
- Cloud Run deployment
- Domain configuration and SSL

### **Day 7: Launch Preparation**

- First story publication (your Enterprise story)
- Basic analytics setup
- Documentation and README

---

_Last Updated: December 2024_

**Tech Stack Versions (saas_t3):**

- Next.js 16.0.7 + React 19.2.1 + TypeScript 5.9.3
- tRPC 11.7.1 + TanStack Query 5.90.7
- Prisma 6.19.0 + PostgreSQL 15
- Zod 4.1.12 + Tailwind CSS 4.1.17

_Framework: Solokit Session-Driven Development_
_Ready for Claude Code Implementation_
