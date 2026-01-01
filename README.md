# Ritzee Wear

A modern, high-end fashion e-commerce storefront built with Next.js 15, featuring 3D product visualization, AI-powered inventory management, and a dark luxury aesthetic.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Configuration](#configuration)

---

## Overview

Ritzee Wear is a fashion e-commerce platform designed for a premium shopping experience. It features interactive 3D product viewers using Three.js, an AI-powered inventory synchronization tool using Google Genkit, and a fully responsive dark-themed UI built with Tailwind CSS and Radix UI primitives.

---

## Features

- **3D Product Visualization**: Interactive 360-degree product views using Three.js with GLTF model support
- **AI Inventory Sync**: Google Genkit-powered assistant for synchronizing inventory between Odoo and Shopify
- **Shopping Cart**: Persistent cart with local storage, quantity management, and real-time updates
- **Category Filtering**: Browse products by category (Oversized T-Shirts, Hoodies, Baggy Jeans)
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Dark Theme**: Built-in dark mode with a luxury aesthetic
- **Scroll Animations**: Smooth reveal animations for page elements
- **Auto-rotating Carousels**: Featured product showcases with Embla Carousel

---

## Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **Google Fonts** - Inter (body) and Space Grotesk (headlines)

### UI Components
- **Radix UI** - Unstyled, accessible component primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Collapsible
  - Dialog, Dropdown Menu, Label, Menubar, Navigation Menu
  - Popover, Progress, Radio Group, Scroll Area, Select
  - Separator, Slider, Switch, Tabs, Toast, Tooltip
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel component with autoplay

### 3D Graphics
- **Three.js** - 3D JavaScript library
- **GLTFLoader** - 3D model loader for GLTF/GLB files
- **OrbitControls** - Interactive camera controls

### AI Integration
- **Google Genkit** - AI orchestration framework
- **@genkit-ai/google-genai** - Google AI plugin for Gemini 2.5 Flash

### Forms and Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod resolver for React Hook Form

### Utilities
- **date-fns** - Date manipulation
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variant management
- **Recharts** - Charting library for data visualization

### Backend Services
- **Firebase** - Backend-as-a-Service platform

---

## Project Structure

```
ritzee/
├── public/
│   ├── products/          # Product images
│   └── models/            # 3D GLTF/GLB model files
├── src/
│   ├── ai/
│   │   ├── flows/
│   │   │   └── inventory-sync-assistant.ts  # AI inventory sync flow
│   │   ├── dev.ts                           # Genkit development server
│   │   └── genkit.ts                        # Genkit configuration
│   ├── app/
│   │   ├── about/         # About page
│   │   ├── admin/
│   │   │   └── inventory-sync/  # Admin inventory sync tool
│   │   ├── products/
│   │   │   └── [slug]/    # Dynamic product detail pages
│   │   ├── shop/          # Shop page with category filtering
│   │   ├── globals.css    # Global styles and CSS variables
│   │   ├── layout.tsx     # Root layout with providers
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── ui/            # Radix-based UI primitives (37 components)
│   │   ├── cart.tsx       # Shopping cart sidebar
│   │   ├── footer.tsx     # Site footer
│   │   ├── header.tsx     # Navigation header
│   │   ├── hero-section.tsx        # Homepage hero with carousel
│   │   ├── inventory-sync-form.tsx # AI inventory sync form
│   │   ├── marquee.tsx             # Scrolling text banner
│   │   ├── product-card.tsx        # Product grid card
│   │   ├── product-viewer.tsx      # Three.js 3D viewer
│   │   └── scroll-animation.tsx    # Scroll reveal animations
│   ├── context/
│   │   └── cart-context.tsx  # Cart state management
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Mobile detection hook
│   │   └── use-toast.ts      # Toast notification hook
│   └── lib/
│       ├── products.json     # Product catalog data
│       ├── products.ts       # Product type definitions
│       ├── placeholder-images.json  # Placeholder image data
│       ├── placeholder-images.ts    # Placeholder exports
│       └── utils.ts          # Utility functions (cn helper)
├── apphosting.yaml           # Firebase App Hosting config
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ritzee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:9002`

### Environment Variables

For AI features, you may need to configure:
- Google AI API key for Genkit functionality
- Firebase configuration for backend services

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack on port 9002 |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit development server |
| `npm run genkit:watch` | Start Genkit with file watching |

---

## Architecture

### Frontend Architecture

The application uses Next.js 15 App Router with the following patterns:

- **Server Components**: Default for pages and layouts
- **Client Components**: Used for interactive elements (marked with 'use client')
- **Context Providers**: CartProvider wraps the entire application for state management
- **Component Composition**: UI primitives from Radix are composed into higher-level components

### State Management

- **Cart State**: React Context with localStorage persistence
- **Form State**: React Hook Form with Zod validation
- **Toast Notifications**: Custom hook-based toast system

### 3D Product Viewer

The ProductViewer component uses Three.js to render 3D models:
- WebGL renderer with antialiasing and transparency
- Orbit controls for user interaction
- Auto-rotation for product showcase
- GLTF/GLB model format support
- Automatic model centering and lighting

### AI Integration

The inventory sync feature uses Google Genkit:
- Defines structured input/output schemas with Zod
- Uses Gemini 2.5 Flash model for analysis
- Server actions for secure API calls
- Provides actionable synchronization suggestions

### Styling System

- CSS custom properties for theming
- HSL color system for consistent palette
- Tailwind utilities with custom extensions
- Component variants using class-variance-authority

---

## Configuration

### Next.js Configuration

The `next.config.ts` file includes:
- TypeScript and ESLint error ignoring for builds
- Remote image patterns for external sources (placehold.co, Unsplash, Picsum, Google Storage)

### Tailwind Configuration

Custom extensions include:
- Font families: Inter, Space Grotesk, monospace
- Extended color palette with semantic naming
- Custom keyframes for accordion and marquee animations
- Radix-compatible border radius variables

### Deployment

The project includes Firebase App Hosting configuration (`apphosting.yaml`) for deployment on Google Cloud infrastructure.

---

## Product Categories

The store currently features three product categories:

1. **Oversized T-Shirts** - Premium cotton tees with unique graphics
2. **Hoodies** - Comfortable oversized hoodies
3. **Baggy Jeans** - Relaxed-fit denim with utility features

---

## License

This project is private and proprietary.
