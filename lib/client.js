import { defineClientConfig } from '@vuepress/client';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
// Note: dayjs is handled internally by Ant Design Vue
// No need to manually configure dayjs plugins
// Import layouts
import Layout from './layouts/Layout.vue';
import NotFound from './layouts/NotFound.vue';
// Import styles
import './styles/index.less';
import 'ant-design-vue/dist/reset.css';
// Import global store
import { useGlobalStore } from './composables/useGlobalStore';
export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // Add Pinia store
        const pinia = createPinia();
        app.use(pinia);
        // Add Ant Design Vue
        app.use(Antd);
        // Initialize global store after Pinia is available
        const globalStore = useGlobalStore();
        // Provide global store for components that need it
        app.provide('globalStore', globalStore);
        // Router guards for theme functionality
        router.beforeEach((to, from) => {
            // Handle any route-specific logic here
            return true;
        });
        router.afterEach((to, from) => {
            // Handle post-navigation logic
            // For example, close mobile sidebar
            globalStore.closeMobileSidebar();
        });
    },
    setup() {
        // Global setup logic using Composition API
        // This runs in the setup context of the root component
        // Initialize theme on client side
        if (typeof window !== 'undefined') {
            const globalStore = useGlobalStore();
            globalStore.initializeTheme();
        }
    },
    layouts: {
        Layout,
        NotFound,
    },
    rootComponents: [
    // Add any global components that should be rendered at the root level
    ],
});
