#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'

console.log('🚀 Building VuePress Theme AntDocs v2.x...')

// Clean previous build
console.log('🧹 Cleaning previous build...')
if (fs.existsSync('lib')) {
  fs.rmSync('lib', { recursive: true, force: true })
}

// Build TypeScript
console.log('🔨 Building TypeScript...')
try {
  execSync('npx tsc -b tsconfig.build.json', { stdio: 'inherit' })
  console.log('✅ TypeScript build completed')
} catch (error) {
  console.error('❌ TypeScript build failed:', error.message)
  process.exit(1)
}

// Copy non-TS files
console.log('📁 Copying assets...')
const copyFiles = [
  { from: 'templates', to: 'lib/templates' },
  { from: 'src/styles', to: 'lib/styles' },
  { from: 'src/layouts', to: 'lib/layouts' },
  { from: 'src/components', to: 'lib/components' }
]

copyFiles.forEach(({ from, to }) => {
  if (fs.existsSync(from)) {
    fs.cpSync(from, to, { recursive: true })
    console.log(`   Copied ${from} -> ${to}`)
  }
})

// Update package.json paths for built files
console.log('📝 Updating package.json...')
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// Create lib package.json with correct paths
const libPackageJson = {
  ...packageJson,
  main: 'index.js',
  types: 'index.d.ts',
  files: [
    'lib',
    'templates',
    'package.json',
    'README.md'
  ]
}

fs.writeFileSync('lib/package.json', JSON.stringify(libPackageJson, null, 2))

console.log('🎉 Build completed successfully!')
console.log('')
console.log('📦 Built files:')
console.log('   lib/index.js - Theme entry point')
console.log('   lib/client.js - Client configuration')
console.log('   lib/components/ - Vue components')
console.log('   lib/composables/ - Vue composables')
console.log('   lib/utils/ - Utility functions')
console.log('   lib/styles/ - Theme styles')
console.log('')
console.log('🚀 Ready to publish or test!')
