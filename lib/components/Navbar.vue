<template>
  <header class="navbar">
    <a-row>
      <NavButton />
      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="5" :xxl="4">
        <RouterLink 
          :to="routeLocale" 
          :class="{'no-logo': !themeConfig.logo, 'home-link': true}"
        >
          <img 
            v-if="themeConfig.logo" 
            class="logo" 
            :src="withBase(themeConfig.logo)" 
            :alt="site.title" 
          />
          <span v-if="site.title" ref="siteName" class="site-name">
            {{ site.title }}
          </span>
        </RouterLink>
        <SearchBox
          v-if="themeConfig.search !== false && frontmatter.search !== false"
          class="mobile-search"
        />
      </a-col>
      <a-col :xs="0" :sm="0" :md="18" :lg="18" :xl="19" :xxl="20" class="nav-space-between">
        <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
        <SearchBox v-else-if="themeConfig.search !== false && frontmatter.search !== false" />
        <NavLinks class="can-hide" />
      </a-col>
    </a-row>

    <a-drawer
      placement="left"
      :closable="false"
      @close="toggleDrawer"
      :open="globalStore.sidebarVisible"
      wrap-class-name="sidebarWrap"
      v-if="shouldShowSidebar"
    >
      <template #handle>
        <div 
          :class="{ 'drawer-open': globalStore.isMobileSidebarOpen, 'drawer-handle': true }" 
          @click="toggleDrawer"
        >
          <i class="drawer-handle-icon"></i>
        </div>
      </template>
      <Sidebar :items="sidebarItems" class="mobile-sidebar" />
    </a-drawer>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Import components (these will be created in subsequent steps)
import AlgoliaSearchBox from './AlgoliaSearchBox.vue'
import SearchBox from './SearchBox.vue'
import NavButton from './NavButton.vue'
import NavLinks from './NavLinks.vue'
import Sidebar from './Sidebar.vue'

// Import composables
import { 
  usePageInfo, 
  useSiteInfo, 
  useThemeConfig, 
  useNavigation, 
  useSidebar,
  useGlobalStore,
  useAssets
} from '../composables'

// Get reactive data
const { page, frontmatter } = usePageInfo()
const { site, routeLocale } = useSiteInfo()
const { themeConfig } = useThemeConfig()
const { shouldShowNavbar } = useNavigation()
const { shouldShowSidebar } = useSidebar()
const { withBase } = useAssets()
const globalStore = useGlobalStore()
const router = useRouter()

// Computed properties
const algolia = computed(() => {
  return themeConfig.value.algolia || {}
})

const isAlgoliaSearch = computed(() => {
  return algolia.value && algolia.value.apiKey && algolia.value.indexName
})

const sidebarItems = computed(() => {
  // TODO: Implement sidebar resolution logic
  // For now, return empty array as placeholder
  return []
})

// Methods
const toggleDrawer = () => {
  globalStore.toggleMobileSidebar()
  
  // Toggle app class for sidebar animation
  const app = document.getElementById('app')
  if (app) {
    app.classList.toggle('toggle-sidebar')
  }
}

// Lifecycle
onMounted(() => {
  // Set navigation style
  globalStore.setNavStyle('horizontal')
})
</script>

<style lang="less">
@import '../styles/palette.less';

.navbar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 2px 8px #f0f1f2;
  height: @navbarHeight;
  padding: 0 1.5rem;
  line-height: @navbarHeight;

  .home-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;

    .logo {
      height: 2rem;
      margin-right: 0.5rem;
    }

    .site-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: @textColor;
    }

    &.no-logo .site-name {
      margin-left: 0;
    }
  }

  .nav-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mobile-search {
    display: none;
  }
}

.drawer-handle {
  position: absolute;
  top: 50%;
  right: -40px;
  width: 40px;
  height: 40px;
  background: @accentColor;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  transition: all 0.3s;

  .drawer-handle-icon {
    width: 14px;
    height: 2px;
    background: white;
    position: relative;
    transition: all 0.3s;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 14px;
      height: 2px;
      background: white;
      transition: all 0.3s;
    }

    &::before {
      top: -5px;
    }

    &::after {
      top: 5px;
    }
  }

  &.drawer-open .drawer-handle-icon {
    background: transparent;

    &::before {
      transform: rotate(45deg);
      top: 0;
    }

    &::after {
      transform: rotate(-45deg);
      top: 0;
    }
  }
}

@media (max-width: @MQMobile) {
  .navbar {
    .mobile-search {
      display: block;
      margin-top: 0.5rem;
    }
  }
}
</style>
