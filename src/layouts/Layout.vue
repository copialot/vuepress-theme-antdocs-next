<template>
  <div class="theme-container" :class="pageClasses">
    <Navbar v-if="shouldShowNavbar" />

    <Sidebar :items="sidebarItems" v-if="shouldShowSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>

    <a-back-top v-if="themeConfig.backToTop" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Content } from '@vuepress/client'

// Import components (these will be created in the next phase)
import Home from '../components/Home.vue'
import Navbar from '../components/Navbar.vue'
import Page from '../components/Page.vue'
import Sidebar from '../components/Sidebar.vue'

// Import composables
import {
  usePageInfo,
  useSiteInfo,
  useThemeConfig,
  useNavigation,
  useSidebar,
  useGlobalStore
} from '../composables'

// Import utilities
import { resolveSidebarItems } from '../utils'

// Get reactive data
const { page, frontmatter } = usePageInfo()
const { site } = useSiteInfo()
const { themeConfig } = useThemeConfig()
const { shouldShowNavbar } = useNavigation()
const { shouldShowSidebar } = useSidebar()
const globalStore = useGlobalStore()
const router = useRouter()

// Computed properties
const sidebarItems = computed(() => {
  // This will need to be implemented based on the theme config
  // For now, return empty array as placeholder
  return []

  // TODO: Implement sidebar resolution logic
  // return resolveSidebarItems(
  //   page.value,
  //   page.value.path,
  //   site.value,
  //   routeLocale.value
  // )
})

const pageClasses = computed(() => {
  const userPageClass = frontmatter.value.pageClass
  return [
    {
      'no-navbar': !shouldShowNavbar.value,
      'no-sidebar': !shouldShowSidebar.value
    },
    userPageClass
  ]
})

// Lifecycle hooks
onMounted(() => {
  // Initialize theme
  globalStore.initializeTheme()

  // Router after each hook for closing mobile sidebar
  router.afterEach(() => {
    globalStore.closeMobileSidebar()
  })
})
</script>

<style lang="less">
// Layout-specific styles can be added here if needed
</style>
