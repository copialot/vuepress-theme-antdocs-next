// Re-export utility functions for VuePress 2.x compatibility
export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

export function normalize(path: string): string {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash(path: string): string | undefined {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function isExternal(path: string): boolean {
  return outboundRE.test(path)
}

export function isMailto(path: string): boolean {
  return /^mailto:/.test(path)
}

export function isTel(path: string): boolean {
  return /^tel:/.test(path)
}

export function ensureExt(path: string): string {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

export function isActive(route: { path: string; hash: string }, path: string): boolean {
  const routeHash = route.hash
  const linkHash = getHash(path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const routePath = normalize(route.path)
  const pagePath = normalize(path)
  return routePath === pagePath
}

// VuePress 2.x specific utility types
export interface PageData {
  key: string
  path: string
  title: string
  lang: string
  frontmatter: Record<string, any>
  headers: PageHeader[]
  excerpt?: string
  content?: string
}

export interface PageHeader {
  level: number
  title: string
  slug: string
  children?: PageHeader[]
}

export interface SiteData {
  base: string
  lang: string
  title: string
  description: string
  head: HeadConfig[]
  locales: Record<string, Partial<SiteData>>
  themeConfig: Record<string, any>
}

export type HeadConfig = [string, Record<string, string>, string?]

export interface SidebarItem {
  text: string
  link?: string
  children?: SidebarItem[]
  collapsible?: boolean
  collapsed?: boolean
}

export interface NavItem {
  text: string
  link?: string
  children?: NavItem[]
  activeMatch?: string
}

// Sidebar resolution functions (adapted for VuePress 2.x)
export function resolvePage(pages: PageData[], rawPath: string, base?: string): any {
  if (isExternal(rawPath)) {
    return {
      type: 'external',
      path: rawPath
    }
  }

  if (base) {
    rawPath = resolvePath(rawPath, base)
  }

  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].path) === path) {
      return {
        ...pages[i],
        type: 'page',
        path: ensureExt(pages[i].path)
      }
    }
  }

  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

function resolvePath(relative: string, base: string, append?: boolean): string {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

export function groupHeaders(headers: PageHeader[]): PageHeader[] {
  // group h3s under h2
  headers = headers.map(h => ({ ...h }))
  let lastH2: PageHeader | undefined
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}

export function resolveNavLinkItem(linkItem: any): any {
  return {
    ...linkItem,
    type: linkItem.children && linkItem.children.length ? 'links' : 'link'
  }
}

/**
 * Resolve sidebar items for VuePress 2.x
 */
export function resolveSidebarItems(
  page: PageData,
  regularPath: string,
  site: SiteData,
  localePath: string
): SidebarItem[] {
  const { pages, themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar
  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page)
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar
  if (!sidebarConfig) {
    return []
  } else {
    const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig)
    return config
      ? config.map((item: any) => resolveItem(item, pages, base))
      : []
  }
}

/**
 * Resolve headers for auto sidebar
 */
function resolveHeaders(page: PageData): SidebarItem[] {
  const headers = groupHeaders(page.headers || [])
  return [{
    text: page.title,
    link: null,
    children: headers.map(h => ({
      text: h.title,
      link: page.path + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

/**
 * Resolve matching sidebar config
 */
export function resolveMatchingConfig(regularPath: string, config: any): { base: string; config: any } {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }
  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
      return {
        base,
        config: config[base]
      }
    }
  }
  return { base: '/', config: null }
}

function ensureEndingSlash(path: string): string {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem(item: any, pages: PageData[], base: string, groupDepth = 1): any {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    if (groupDepth > 3) {
      console.error('[vuepress] detected a too deep nested sidebar group.')
    }
    const children = item.children || []
    if (children.length === 0 && item.path) {
      return Object.assign(resolvePage(pages, item.path, base), {
        title: item.title
      })
    }
    return {
      type: 'group',
      path: item.path,
      title: item.title,
      sidebarDepth: item.sidebarDepth,
      children: children.map((child: any) => resolveItem(child, pages, base, groupDepth + 1)),
      collapsible: item.collapsible !== false
    }
  }
}
