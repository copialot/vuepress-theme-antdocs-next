/**
 * Get current page data with type safety
 */
export declare function usePageInfo(): {
    page: import("vuepress/client").PageDataRef<Record<string, unknown>>;
    frontmatter: import("vue").ComputedRef<import("vuepress/client").PageFrontmatter<Record<string, unknown>>>;
    headers: import("vue").ComputedRef<{}>;
    title: import("vue").ComputedRef<string>;
    path: import("vue").ComputedRef<string>;
    key: import("vue").ComputedRef<unknown>;
};
/**
 * Get site data with type safety
 */
export declare function useSiteInfo(): {
    site: import("vuepress/client").SiteDataRef;
    base: import("vue").ComputedRef<"/" | `/${string}/`>;
    lang: import("vue").ComputedRef<string>;
    title: import("vue").ComputedRef<string>;
    description: import("vue").ComputedRef<string>;
    locales: import("vue").ComputedRef<import("@vuepress/core").SiteLocaleConfig>;
    routeLocale: import("vuepress/client").RouteLocaleRef;
};
/**
 * Get theme configuration
 */
export declare function useThemeConfig(): {
    themeConfig: import("vue").ComputedRef<{
        navbar: boolean | any[];
        nav: any[];
        sidebar: {};
        logo: null;
        repo: null;
        editLinks: boolean;
        lastUpdated: boolean;
        search: boolean;
        algolia: null;
        backToTop: boolean;
        pageAnchor: {
            anchorDepth: number;
            isDisabled: boolean;
        };
        locales: Record<string, any>;
    }>;
    navbar: import("vue").ComputedRef<boolean | any[]>;
    sidebar: import("vue").ComputedRef<{}>;
    logo: import("vue").ComputedRef<null>;
    repo: import("vue").ComputedRef<null>;
    editLinks: import("vue").ComputedRef<boolean>;
    lastUpdated: import("vue").ComputedRef<boolean>;
    search: import("vue").ComputedRef<boolean>;
    algolia: import("vue").ComputedRef<null>;
    backToTop: import("vue").ComputedRef<boolean>;
    pageAnchor: import("vue").ComputedRef<{
        anchorDepth: number;
        isDisabled: boolean;
    }>;
};
/**
 * Navigation helpers
 */
export declare function useNavigation(): {
    nav: import("vue").ComputedRef<any>;
    shouldShowNavbar: import("vue").ComputedRef<boolean>;
};
/**
 * Sidebar helpers
 */
export declare function useSidebar(): {
    shouldShowSidebar: import("vue").ComputedRef<false | {}>;
    sidebar: import("vue").ComputedRef<{}>;
};
/**
 * Utility for resolving asset paths
 */
export declare function useAssets(): {
    withBase: (url: string) => string;
};
/**
 * Page edit helpers
 */
export declare function usePageEdit(): {
    lastUpdated: import("vue").ComputedRef<unknown>;
    editLink: import("vue").ComputedRef<null>;
};
export { useGlobalStore } from './useGlobalStore';
//# sourceMappingURL=index.d.ts.map