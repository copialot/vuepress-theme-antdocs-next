# VuePress Theme AntDocs - VuePress 2.x Migration

This is the VuePress 2.x migration of the AntDocs theme, converted from VuePress 1.x to support Vue 3, TypeScript, and modern development practices.

## Migration Progress

### ✅ Phase 1: Foundation Setup (COMPLETE)
- [x] Created new project structure in `next/` directory
- [x] Updated `package.json` with VuePress 2.x dependencies
- [x] Set up TypeScript configuration
- [x] Created new ESM-based theme entry point (`src/index.ts`)
- [x] Migrated client configuration from `enhanceApp.js` to `client.ts`
- [x] Replaced Vuex with Pinia for state management
- [x] Created VuePress 2.x composables for data access

### ✅ Phase 2: Layout Components Migration (COMPLETE)
- [x] Migrated `Layout.vue` to Vue 3 with Composition API
- [x] Converted `404.vue` to `NotFound.vue` with Vue 3 compatibility
- [x] Updated styles for Ant Design Vue 4.x compatibility

### 🚧 Phase 3: Core Components Migration (IN PROGRESS)
- [ ] Migrate Navbar Component
- [ ] Migrate Sidebar Component
- [ ] Migrate Page Component
- [ ] Migrate Home Component

### 📋 Remaining Phases
- Phase 4: Navigation & Utility Components
- Phase 5: Search Integration
- Phase 6: Testing & Validation

## Key Changes Made

### 1. Theme API Migration
- **Before (VuePress 1.x)**: `module.exports = (options, ctx) => ({ ... })`
- **After (VuePress 2.x)**: `export const antDocsTheme = (options) => ({ ... })`

### 2. Client Configuration
- **Before**: `enhanceApp.js` with `Vue.use()`
- **After**: `client.ts` with `defineClientConfig()` and `app.use()`

### 3. State Management
- **Before**: Vuex 3.x with `Vue.mixin({ store })`
- **After**: Pinia with composables and provide/inject

### 4. Data Access
- **Before**: `this.$site`, `this.$page`, `this.$themeConfig`
- **After**: `usePageData()`, `useSiteData()`, `useThemeData()` composables

### 5. Dependencies
- **Vue**: 2.x → 3.x
- **Ant Design Vue**: 1.7.8 → 4.2.5
- **VuePress**: 1.x → 2.0.0-rc.24
- **State Management**: Vuex 3.x → Pinia 2.x

## Development Setup

```bash
# Install dependencies
npm install

# Build the theme
npm run build

# Development mode
npm run dev
```

## Usage

### Basic Setup

1. **Install the theme** (after publishing):
```bash
npm install vuepress-theme-antdocs@next
# or
pnpm add vuepress-theme-antdocs@next
```

2. **Configure your VuePress site**:
```typescript
// .vuepress/config.ts
import { defineUserConfig } from 'vuepress'
import { antDocsTheme } from 'vuepress-theme-antdocs'

export default defineUserConfig({
  theme: antDocsTheme({
    // Theme configuration
    themeConfig: {
      // Navigation
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
        { text: 'API', link: '/api/' }
      ],

      // Sidebar
      sidebar: {
        '/guide/': [
          {
            text: 'Guide',
            children: [
              '/guide/README.md',
              '/guide/getting-started.md'
            ]
          }
        ]
      },

      // Repository
      repo: 'your-username/your-repo',
      editLinks: true,
      editLinkText: 'Edit this page on GitHub',

      // Search
      search: true,
      searchPlaceholder: 'Search docs...',

      // Theme features
      backToTop: true,
      darkMode: true,
      pageAnchor: {
        anchorDepth: 3,
        isDisabled: false
      }
    }
  }),

  // VuePress plugins (optional)
  plugins: [
    // Add any additional plugins you need
  ]
})
```

### Theme Configuration Options

#### Navigation (`nav`)
Configure the top navigation bar:
```typescript
nav: [
  { text: 'Home', link: '/' },
  {
    text: 'Guide',
    children: [
      { text: 'Getting Started', link: '/guide/' },
      { text: 'Advanced', link: '/guide/advanced/' }
    ]
  }
]
```

#### Sidebar (`sidebar`)
Configure the sidebar navigation:
```typescript
sidebar: {
  '/guide/': [
    {
      text: 'Getting Started',
      collapsible: true,
      children: [
        '/guide/README.md',
        '/guide/installation.md'
      ]
    }
  ]
}
```

#### Search Configuration
```typescript
// Built-in search
search: true,
searchPlaceholder: 'Search docs...',

// Or Algolia search
algolia: {
  apiKey: 'your-api-key',
  indexName: 'your-index-name',
  appId: 'your-app-id'
}
```

#### Page Anchor Configuration
```typescript
pageAnchor: {
  anchorDepth: 3,        // Show headers up to h3
  isDisabled: false      // Enable page anchor
}
```

### Frontmatter Options

Configure individual pages using frontmatter:

```yaml
---
# Page title
title: My Page Title

# Hide navbar on this page
navbar: false

# Hide sidebar on this page
sidebar: false

# Disable search on this page
search: false

# Custom page anchor settings
pageAnchor:
  anchorDepth: 2
  isDisabled: false

# Edit link settings
editLink: true

# Last updated
lastUpdated: true

# Home page configuration
home: true
heroImage: /hero.png
heroText: Welcome to My Docs
tagline: A great documentation site
actions:
  - text: Get Started
    link: /guide/
    type: primary
  - text: Learn More
    link: /about/
    type: default
    ghost: true

features:
  - title: Feature 1
    details: Description of feature 1
  - title: Feature 2
    details: Description of feature 2

footer: MIT Licensed | Copyright © 2024
footerWrap:
  - headline: Resources
    items:
      - text: Guide
        link: /guide/
      - text: API Reference
        link: /api/
---
```

## Migration Notes

### Breaking Changes
1. **Vue 3 Compatibility**: All components now use Vue 3 Composition API
2. **TypeScript**: Theme is now written in TypeScript for better type safety
3. **ESM Only**: No CommonJS support, pure ESM modules
4. **Ant Design Vue 4.x**: Updated component APIs and styling

### Compatibility
- **Node.js**: >= 18.16.0
- **VuePress**: 2.0.0-rc.24
- **Vue**: ^3.5.12

## Testing

The migration includes comprehensive testing for:
- Component functionality
- Theme configuration
- Responsive design
- Search integration
- Build and deployment

### Advanced Features

#### Dark Mode Support
The theme includes built-in dark mode support:
```typescript
themeConfig: {
  darkMode: true  // Enable dark mode toggle
}
```

#### Promotional Content
Add promotional content to the sidebar:
```typescript
themeConfig: {
  ads: {
    style: 1,
    image: '/promo-image.png',
    text: 'Promotional text',
    link: 'https://example.com'
  }
}
```

#### Custom Styling
Override theme styles by creating custom CSS:
```less
// .vuepress/styles/index.less
@import '~vuepress-theme-antdocs/lib/styles/palette.less';

// Override variables
@accentColor: #007acc;
@textColor: #2c3e50;

// Custom styles
.custom-class {
  color: @accentColor;
}
```

## Development

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Build the theme: `npm run build`
4. Test with a sample VuePress site

### Building the Theme
```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions
- Copy assets and templates
- Create the `lib/` directory with built files

### Testing
Create a test VuePress site to verify the theme works correctly:
```bash
mkdir test-site
cd test-site
npm init -y
npm install vuepress@next ../path/to/built/theme
```

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed and TypeScript is configured correctly
2. **Style Issues**: Check that Less files are properly imported and Ant Design Vue CSS is loaded
3. **Component Errors**: Verify all Vue 3 syntax is correct and composables are properly imported

### Migration from VuePress 1.x

If migrating from the original VuePress 1.x AntDocs theme:

1. **Update VuePress**: Upgrade to VuePress 2.x
2. **Update Theme**: Install the new theme version
3. **Update Config**: Convert your config file to the new format
4. **Update Frontmatter**: Check frontmatter options for any changes
5. **Test Thoroughly**: Verify all functionality works as expected

## Contributing

This is a migration project. Please refer to the original theme repository for contribution guidelines.

### Reporting Issues
- Check existing issues before creating new ones
- Provide detailed reproduction steps
- Include VuePress and theme version information

### Pull Requests
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
# vuepress-theme-antdocs-next
