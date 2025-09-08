export declare const hashRE: RegExp;
export declare const extRE: RegExp;
export declare const endingSlashRE: RegExp;
export declare const outboundRE: RegExp;
export declare function normalize(path: string): string;
export declare function getHash(path: string): string | undefined;
export declare function isExternal(path: string): boolean;
export declare function isMailto(path: string): boolean;
export declare function isTel(path: string): boolean;
export declare function ensureExt(path: string): string;
export declare function isActive(route: {
    path: string;
    hash: string;
}, path: string): boolean;
export interface PageData {
    key: string;
    path: string;
    title: string;
    lang: string;
    frontmatter: Record<string, any>;
    headers: PageHeader[];
    excerpt?: string;
    content?: string;
}
export interface PageHeader {
    level: number;
    title: string;
    slug: string;
    children?: PageHeader[];
}
export interface SiteData {
    base: string;
    lang: string;
    title: string;
    description: string;
    head: HeadConfig[];
    locales: Record<string, Partial<SiteData>>;
    themeConfig: Record<string, any>;
}
export type HeadConfig = [string, Record<string, string>, string?];
export interface SidebarItem {
    text: string;
    link?: string;
    children?: SidebarItem[];
    collapsible?: boolean;
    collapsed?: boolean;
}
export interface NavItem {
    text: string;
    link?: string;
    children?: NavItem[];
    activeMatch?: string;
}
export declare function resolvePage(pages: PageData[], rawPath: string, base?: string): any;
export declare function groupHeaders(headers: PageHeader[]): PageHeader[];
export declare function resolveNavLinkItem(linkItem: any): any;
/**
 * Resolve sidebar items for VuePress 2.x
 */
export declare function resolveSidebarItems(page: PageData, regularPath: string, site: SiteData, localePath: string): SidebarItem[];
/**
 * Resolve matching sidebar config
 */
export declare function resolveMatchingConfig(regularPath: string, config: any): {
    base: string;
    config: any;
};
//# sourceMappingURL=index.d.ts.map