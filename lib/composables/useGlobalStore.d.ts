export declare const useGlobalStore: import("pinia").StoreDefinition<"global", Pick<{
    navStyle: import("vue").Ref<string, string>;
    isCollapsePageAnchor: import("vue").Ref<boolean, boolean>;
    isMobileSidebarOpen: import("vue").Ref<boolean, boolean>;
    isDarkMode: import("vue").Ref<boolean, boolean>;
    sidebarVisible: import("vue").ComputedRef<boolean>;
    pageAnchorCollapsed: import("vue").ComputedRef<boolean>;
    setNavStyle: (style: string) => void;
    togglePageAnchor: (collapsed?: boolean) => void;
    toggleMobileSidebar: (open?: boolean) => void;
    openMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    toggleDarkMode: (dark?: boolean) => void;
    initializeTheme: () => void;
}, "navStyle" | "isCollapsePageAnchor" | "isMobileSidebarOpen" | "isDarkMode">, Pick<{
    navStyle: import("vue").Ref<string, string>;
    isCollapsePageAnchor: import("vue").Ref<boolean, boolean>;
    isMobileSidebarOpen: import("vue").Ref<boolean, boolean>;
    isDarkMode: import("vue").Ref<boolean, boolean>;
    sidebarVisible: import("vue").ComputedRef<boolean>;
    pageAnchorCollapsed: import("vue").ComputedRef<boolean>;
    setNavStyle: (style: string) => void;
    togglePageAnchor: (collapsed?: boolean) => void;
    toggleMobileSidebar: (open?: boolean) => void;
    openMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    toggleDarkMode: (dark?: boolean) => void;
    initializeTheme: () => void;
}, "sidebarVisible" | "pageAnchorCollapsed">, Pick<{
    navStyle: import("vue").Ref<string, string>;
    isCollapsePageAnchor: import("vue").Ref<boolean, boolean>;
    isMobileSidebarOpen: import("vue").Ref<boolean, boolean>;
    isDarkMode: import("vue").Ref<boolean, boolean>;
    sidebarVisible: import("vue").ComputedRef<boolean>;
    pageAnchorCollapsed: import("vue").ComputedRef<boolean>;
    setNavStyle: (style: string) => void;
    togglePageAnchor: (collapsed?: boolean) => void;
    toggleMobileSidebar: (open?: boolean) => void;
    openMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    toggleDarkMode: (dark?: boolean) => void;
    initializeTheme: () => void;
}, "setNavStyle" | "togglePageAnchor" | "toggleMobileSidebar" | "openMobileSidebar" | "closeMobileSidebar" | "toggleDarkMode" | "initializeTheme">>;
//# sourceMappingURL=useGlobalStore.d.ts.map