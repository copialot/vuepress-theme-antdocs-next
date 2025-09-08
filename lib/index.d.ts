import type { Theme } from '@vuepress/core';
export interface AntDocsThemeOptions {
    /**
     * Enable active header links plugin
     * @default true
     */
    activeHeaderLinks?: boolean;
    /**
     * Theme configuration
     */
    themeConfig?: Record<string, any>;
    /**
     * Custom container configurations
     */
    containers?: {
        tip?: boolean;
        warning?: boolean;
        danger?: boolean;
        details?: boolean;
    };
}
export declare const antDocsTheme: (options?: AntDocsThemeOptions) => Theme;
export default antDocsTheme;
//# sourceMappingURL=index.d.ts.map