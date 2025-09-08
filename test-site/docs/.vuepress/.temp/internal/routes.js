export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/admin/Projects/SaaS/vuepress-theme-antdocs-next/test-site/docs/.vuepress/.temp/pages/index.html.js"), meta: {} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/admin/Projects/SaaS/vuepress-theme-antdocs-next/test-site/docs/.vuepress/.temp/pages/404.html.js"), meta: {} }],
]);
