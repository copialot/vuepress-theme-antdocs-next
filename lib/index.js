import { getDirname, path } from '@vuepress/utils';
const __dirname = getDirname(import.meta.url);
export const antDocsTheme = (options = {}) => {
    const { activeHeaderLinks = true, containers = {
        tip: true,
        warning: true,
        danger: true,
        details: true,
    }, } = options;
    return {
        name: 'vuepress-theme-antdocs',
        // Client config file
        clientConfigFile: path.resolve(__dirname, 'client.js'),
        // Template files
        templateBuild: path.resolve(__dirname, '../templates/build.html'),
        templateDev: path.resolve(__dirname, '../templates/dev.html'),
        // Alias configuration
        alias: {
            // Theme components aliases
            '@theme/components/AlgoliaSearchBox.vue': path.resolve(__dirname, 'components/AlgoliaSearchBox.vue'),
            '@theme/components/Home.vue': path.resolve(__dirname, 'components/Home.vue'),
            '@theme/components/Navbar.vue': path.resolve(__dirname, 'components/Navbar.vue'),
            '@theme/components/Page.vue': path.resolve(__dirname, 'components/Page.vue'),
            '@theme/components/Sidebar.vue': path.resolve(__dirname, 'components/Sidebar.vue'),
            '@theme/layouts/Layout.vue': path.resolve(__dirname, 'layouts/Layout.vue'),
            '@theme/layouts/NotFound.vue': path.resolve(__dirname, 'layouts/NotFound.vue'),
        },
        // Plugins - will be configured by the user in their VuePress config
        plugins: [
        // Basic plugins can be added here
        // For now, we'll keep it minimal and let users configure plugins
        ],
        // Bundler configuration
        extendsBundlerOptions: (bundlerOptions, app) => {
            // Add Less support with JavaScript enabled
            if (app.options.bundler.name === '@vuepress/bundler-webpack') {
                bundlerOptions.scss = bundlerOptions.scss || {};
                bundlerOptions.scss.sassOptions = {
                    ...bundlerOptions.scss.sassOptions,
                    // Suppress Sass deprecation warnings
                    quietDeps: true,
                    verbose: false,
                };
                bundlerOptions.less = bundlerOptions.less || {};
                bundlerOptions.less.lessOptions = {
                    ...bundlerOptions.less.lessOptions,
                    javascriptEnabled: true,
                };
            }
            if (app.options.bundler.name === '@vuepress/bundler-vite') {
                bundlerOptions.viteOptions = bundlerOptions.viteOptions || {};
                bundlerOptions.viteOptions.css = bundlerOptions.viteOptions.css || {};
                bundlerOptions.viteOptions.css.preprocessorOptions =
                    bundlerOptions.viteOptions.css.preprocessorOptions || {};
                // Configure Sass to suppress deprecation warnings
                bundlerOptions.viteOptions.css.preprocessorOptions.scss = {
                    ...bundlerOptions.viteOptions.css.preprocessorOptions.scss,
                    quietDeps: true,
                    verbose: false,
                };
                bundlerOptions.viteOptions.css.preprocessorOptions.less = {
                    ...bundlerOptions.viteOptions.css.preprocessorOptions.less,
                    javascriptEnabled: true,
                };
                // Configure Vite optimization for better performance
                bundlerOptions.viteOptions.optimizeDeps = bundlerOptions.viteOptions.optimizeDeps || {};
                bundlerOptions.viteOptions.optimizeDeps.include = [
                    ...(bundlerOptions.viteOptions.optimizeDeps.include || []),
                    'ant-design-vue',
                    'pinia'
                ];
            }
        },
    };
};
export default antDocsTheme;
