# CheapSRV - Price & Service Finder

## Overview

CheapSRV is a web-based price comparison platform for OTT subscriptions, AI tools, and social media marketing (SMM) services. Built as a high-fidelity prototype using React with Vite, the application is designed to mimic a React Native mobile experience with plans to port to React Native Expo for Android/iOS deployment.

The platform provides users with:
- Price comparisons across various service categories (Netflix, YouTube Premium, Instagram growth services, etc.)
- Service details including features, delivery times, and requirements
- Bookmark functionality for saving favorite services
- External redirect to official vendor websites (no in-app purchases for safety)
- Planned monetization through Google AdMob (Banner, Native, Interstitial ads)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript
- Vite as the build tool and development server
- TailwindCSS v4 for styling with custom theme (Midnight Blue + Neon Cyan glassmorphism design)
- Wouter for client-side routing (lightweight alternative to React Router)

**State Management:**
- Zustand for global state with local storage persistence
- React Query (@tanstack/react-query) for server state management and caching
- Local state managed with React hooks

**UI Component System:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library built on top of Radix
- Custom components styled with Tailwind and class-variance-authority
- Framer Motion for animations and page transitions
- Embla Carousel for onboarding slider

**Design System:**
- Mobile-first responsive design
- Custom theme with CSS variables for midnight blue background (#0f172a) and neon cyan accents
- Glassmorphism effects using backdrop-blur and transparency
- Custom fonts: Outfit (body), Rajdhani (display/headings)

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server
- Node.js HTTP server wrapper for potential WebSocket support
- Middleware: JSON body parsing, URL-encoded parsing, CORS support

**Routing & API:**
- Centralized route registration in `server/routes.ts`
- API routes prefixed with `/api`
- Static file serving for production builds
- Development: Vite middleware integration for HMR

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based design (`IStorage`) for easy swapping to persistent storage
- Prepared for Drizzle ORM with PostgreSQL schema defined
- User authentication schema ready (username/password)

**Build Process:**
- Custom build script using esbuild for server bundling
- Vite for client-side bundling
- Server dependencies selectively bundled to reduce cold start times
- Production build outputs to `dist/` directory

### Data Storage Solutions

**Current Implementation:**
- Client-side: Browser localStorage via Zustand persist middleware
- Server-side: In-memory Map-based storage (development only)

**Database Schema (Prepared for PostgreSQL):**
- Drizzle ORM configured with PostgreSQL dialect
- Users table with UUID primary keys, username/password fields
- Schema validation using Drizzle-Zod
- Migration support configured via drizzle-kit

**Data Structure:**
- Service catalog stored in static TypeScript file (`client/src/data/db.ts`)
- Categories: Social (Instagram, YouTube, Spotify) and Subscription (Netflix, Prime, etc.)
- Services: Comprehensive metadata including pricing, features, tags, delivery times

### Authentication & Authorization

**Prepared Authentication:**
- User schema defined with username/password authentication
- Storage interface includes user CRUD operations
- Session management ready (express-session, connect-pg-simple configured)
- Currently using mock authentication with local storage flag

**Security Considerations:**
- No in-app payment processing (external redirects only)
- HTTPS enforcement for production deployment
- Rate limiting configured (express-rate-limit)
- CSRF protection via session configuration

## External Dependencies

**Third-Party Services:**
- **Google AdMob:** Planned monetization through banner, native, and interstitial ads (mock components implemented)
- **External Vendor Links:** All "Buy" actions redirect to official service provider websites

**Package Dependencies:**
- **UI/UX:** Radix UI primitives, Framer Motion, Embla Carousel
- **Data Management:** TanStack Query, Zustand, Drizzle ORM
- **Validation:** Zod, React Hook Form with Hookform Resolvers
- **Styling:** TailwindCSS, class-variance-authority, clsx
- **Development:** Replit-specific plugins (cartographer, dev banner, runtime error modal, meta images)

**Database:**
- PostgreSQL configured via Drizzle ORM
- Connection via DATABASE_URL environment variable
- Session store: connect-pg-simple or memorystore fallback

**Deployment Platform:**
- Designed for Replit deployment
- Custom Vite plugin for meta image updates based on deployment URL
- Environment-aware configuration (development vs. production)
- Capacitor configured for Android native app builds

## Android (Capacitor) Setup

**Mobile App Framework:**
- Capacitor 7.x for native Android builds
- App ID: `com.cheapsrv.app`
- Web assets synced from `dist/public` to Android WebView

**Installed Capacitor Plugins:**
- @capacitor/app - App lifecycle events
- @capacitor/splash-screen - Native splash screen support
- @capacitor/status-bar - Status bar styling

**Android Build Commands:**
```bash
npm run build          # Build web app
npx cap sync android   # Sync to Android
npx cap open android   # Open in Android Studio
```

**Play Store Requirements:**
- Target API Level 35 (Android 15) configured
- AAB format for Play Store submission
- See ANDROID_BUILD_GUIDE.md for complete build instructions

**Local Build Requirements:**
- Android Studio (Ladybug 2024.2.1+)
- Java JDK 21
- Android SDK API 34/35

## Codemagic Cloud Build (Bina PC ke APK banana)

**Setup:**
- Codemagic.io pe account banao (GitHub se sign up)
- GitHub pe repository banao aur files upload karo
- Codemagic mein repository connect karo

**Build Workflows:**
1. `android-workflow` - Debug APK (testing ke liye)
2. `android-signed` - Signed Release APK (Play Store ke liye)

**Important Files:**
- `codemagic.yaml` - Build configuration
- `CODEMAGIC_BUILD_GUIDE.md` - Complete Hindi guide for phone users

**Build Time:** 10-15 minutes per build
**Free Tier:** 500 minutes/month