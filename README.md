# VoyageAI — Travel Planning & Experience Engine

Built for the H2S PromptWars Hackathon. VoyageAI uses Google Gemini to generate hyper-personalized travel itineraries based on user vibes, constraints, and preferences.

## Features
- **AI-Curated Plans**: Powered by Gemini 1.5 Pro.
- **Premium Design**: Dark Electric palette, Glassmorphism, and Cinematic animations.
- **Smooth Experience**: Lenis smooth scroll and GSAP narrative reveals.
- **Cloud Ready**: Optimized Dockerfile for Google Cloud Run.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Runtime**: Bun
- **AI**: Google Generative AI (Gemini)
- **Motion**: GSAP + Framer Motion
- **Styling**: Vanilla CSS with HSL design system tokens

## Getting Started

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Set up Environment Variables**:
   Create a `.env.local` file:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

3. **Run Locally**:
   ```bash
   bun dev
   ```

## Deployment to Cloud Run

1. **Build and Push to Artifact Registry**:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/voyage-ai
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy voyage-ai --image gcr.io/YOUR_PROJECT_ID/voyage-ai --platform managed --set-env-vars GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

## Project Structure
- `src/app`: Routes and API endpoints.
- `src/components`: UI components (Navbar, Hero, PlannerForm, PlanDisplay).
- `src/lib`: Logic and service integrations.
- `agency-designer`: Design resources and system rules.
