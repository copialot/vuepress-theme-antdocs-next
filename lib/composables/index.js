// VuePress 2.x composables for theme
import { computed } from 'vue';
import { usePageData, useSiteData, useRouteLocale, withBase } from '@vuepress/client';
/**
 * Get current page data with type safety
 */
export function usePageInfo() {
    const page = usePageData();
    return {
        page,
        frontmatter: computed(() => page.value.frontmatter),
        headers: computed(() => page.value.headers || []),
        title: computed(() => page.value.title),
        path: computed(() => page.value.path),
        key: computed(() => page.value.key),
    };
}
/**
 * Get site data with type safety
 */
export function useSiteInfo() {
    const site = useSiteData();
    const routeLocale = useRouteLocale();
    return {
        site,
        base: computed(() => site.value.base),
        lang: computed(() => site.value.lang),
        title: computed(() => site.value.title),
        description: computed(() => site.value.description),
        locales: computed(() => site.value.locales),
        routeLocale,
    };
}
/**
 * Get theme configuration
 */
export function useThemeConfig() {
    // For now, we'll use a simple implementation without the plugin
    // Users can configure theme data through the theme options
    const { routeLocale } = useSiteInfo();
    const themeConfig = computed(() => {
        // Return a default theme config for now
        // This will be properly implemented when theme data is available
        return {
            navbar: false,
            nav: [],
            sidebar: {},
            logo: null,
            repo: null,
            editLinks: false,
            lastUpdated: false,
            search: true,
            algolia: null,
            backToTop: true,
            pageAnchor: { anchorDepth: 3, isDisabled: false },
            locales: {},
        };
    });
    return {
        themeConfig,
        // Commonly used theme config properties
        navbar: computed(() => themeConfig.value.navbar),
        sidebar: computed(() => themeConfig.value.sidebar),
        logo: computed(() => themeConfig.value.logo),
        repo: computed(() => themeConfig.value.repo),
        editLinks: computed(() => themeConfig.value.editLinks),
        lastUpdated: computed(() => themeConfig.value.lastUpdated),
        search: computed(() => themeConfig.value.search),
        algolia: computed(() => themeConfig.value.algolia),
        backToTop: computed(() => themeConfig.value.backToTop),
        pageAnchor: computed(() => themeConfig.value.pageAnchor),
    };
}
/**
 * Navigation helpers
 */
export function useNavigation() {
    const { page } = usePageInfo();
    const { themeConfig } = useThemeConfig();
    const { routeLocale } = useSiteInfo();
    const nav = computed(() => {
        const localeNav = themeConfig.value.locales?.[routeLocale.value]?.nav;
        return localeNav || themeConfig.value.nav || [];
    });
    const shouldShowNavbar = computed(() => {
        const { frontmatter } = page.value;
        if (frontmatter.navbar === false || themeConfig.value.navbar === false) {
            return false;
        }
        return Boolean(themeConfig.value.logo ||
            themeConfig.value.repo ||
            nav.value.length);
    });
    return {
        nav,
        shouldShowNavbar,
    };
}
/**
 * Sidebar helpers
 */
export function useSidebar() {
    const { page } = usePageInfo();
    const { themeConfig } = useThemeConfig();
    const shouldShowSidebar = computed(() => {
        const { frontmatter } = page.value;
        return (!frontmatter.home &&
            frontmatter.sidebar !== false &&
            themeConfig.value.sidebar);
    });
    return {
        shouldShowSidebar,
        sidebar: computed(() => themeConfig.value.sidebar),
    };
}
/**
 * Utility for resolving asset paths
 */
export function useAssets() {
    return {
        withBase,
    };
}
/**
 * Page edit helpers
 */
export function usePageEdit() {
    const { page } = usePageInfo();
    const { themeConfig } = useThemeConfig();
    const lastUpdated = computed(() => page.value.frontmatter.lastUpdated);
    const editLink = computed(() => {
        const { frontmatter } = page.value;
        const showEditLink = frontmatter.editLink !== false && themeConfig.value.editLinks;
        if (!showEditLink || !themeConfig.value.repo) {
            return null;
        }
        // This would need to be implemented based on the original logic
        return null; // Placeholder
    });
    return {
        lastUpdated,
        editLink,
    };
}
// Re-export store composable
export { useGlobalStore } from './useGlobalStore';
