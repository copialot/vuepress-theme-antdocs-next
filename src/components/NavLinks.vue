<template>
  <nav v-if="userLinks.length || repoLink" class="nav-links">
    <a-menu
      :mode="currentStyle"
      id="nav"
      v-model:selected-keys="currentPage"
      :selectable="false"
      :force-sub-menu-render="true"
    >
      <template v-for="item in userLinks" :key="item.link || item.text">
        <a-sub-menu v-if="item.type === 'links'">
          <template #title>
            <span>{{ item.text }}</span>
          </template>
          <template v-for="(subItem, index) in item.items" :key="subItem.link || index">
            <a-menu-item-group
              v-if="subItem.type === 'links'"
              :title="subItem.text"
            >
              <a-menu-item
                v-for="childSubItem in subItem.items"
                :key="childSubItem.link"
              >
                <RouterLink 
                  v-if="isInternal(childSubItem.link, childSubItem.target)" 
                  :to="resolveLink(childSubItem.link)"
                >
                  {{ childSubItem.text }}
                </RouterLink>
                <a
                  v-else
                  :href="childSubItem.link"
                  :target="getTarget(childSubItem.target, childSubItem.link)"
                  rel="noopener noreferrer"
                >
                  {{ childSubItem.text }}
                  <LinkOutlined v-if="!isInternal(childSubItem.link, childSubItem.target)" />
                </a>
              </a-menu-item>
            </a-menu-item-group>

            <a-menu-item v-else>
              <RouterLink 
                v-if="isInternal(subItem.link, subItem.target)" 
                :to="resolveLink(subItem.link)"
              >
                {{ subItem.text }}
              </RouterLink>
              <a
                v-else
                :href="subItem.link"
                :target="getTarget(subItem.target, subItem.link)"
                rel="noopener noreferrer"
              >
                {{ subItem.text }}
                <LinkOutlined v-if="!isInternal(subItem.link, subItem.target)" />
              </a>
            </a-menu-item>
          </template>
        </a-sub-menu>
        
        <a-menu-item v-else>
          <RouterLink 
            v-if="isInternal(item.link, item.target)" 
            :to="resolveLink(item.link)"
          >
            {{ item.text }}
          </RouterLink>
          <a
            v-else
            :href="resolveLink(item.link)"
            :target="getTarget(item.target, item.link)"
            rel="noopener noreferrer"
          >
            {{ item.text }}
            <LinkOutlined v-if="!isInternal(item.link, item.target)" />
          </a>
        </a-menu-item>
      </template>
    </a-menu>

    <ul class="extra-group">
      <li v-if="repoLink">
        <a-tooltip placement="bottom">
          <template #title>
            <span style="text-transform:capitalize;">{{ repoLabel }}</span>
          </template>
          <a
            :href="repoLink"
            class="repo-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined v-if="repoLabel === 'github'" />
            <GitlabOutlined v-else-if="repoLabel === 'gitlab'" />
            <LinkOutlined v-else />
          </a>
        </a-tooltip>
      </li>

      <li v-if="isDarkMode">
        <ThemeSwitch />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { LinkOutlined, GithubOutlined, GitlabOutlined } from '@ant-design/icons-vue'
import ThemeSwitch from './ThemeSwitch.vue'
import { 
  usePageInfo, 
  useSiteInfo, 
  useThemeConfig, 
  useGlobalStore 
} from '../composables'
import { resolveNavLinkItem, ensureExt, isExternal } from '../utils'

const route = useRoute()
const { page, frontmatter } = usePageInfo()
const { site, routeLocale } = useSiteInfo()
const { themeConfig } = useThemeConfig()
const globalStore = useGlobalStore()

// Computed properties
const currentStyle = computed(() => globalStore.navStyle || 'horizontal')

const userNav = computed(() => {
  return themeConfig.value.nav || []
})

const userLinks = computed(() => {
  return userNav.value.map(link => resolveNavLinkItem(link))
})

const repoLink = computed(() => {
  const { repo } = themeConfig.value
  if (repo) {
    return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
  }
  return null
})

const repoLabel = computed(() => {
  if (!repoLink.value) return null
  if (repoLink.value.includes('github.com')) return 'github'
  if (repoLink.value.includes('gitlab.com')) return 'gitlab'
  return 'repo'
})

const currentPage = computed(() => {
  return [activePage(route.path)]
})

const isDarkMode = computed(() => {
  return themeConfig.value.darkMode !== false
})

// Methods
const isInternal = (link: string, target?: string) => {
  if (target === '_blank') return false
  return !isExternal(link)
}

const getTarget = (target?: string, link?: string) => {
  if (target) return target
  return isExternal(link || '') ? '_blank' : undefined
}

const resolveLink = (link: string) => {
  return ensureExt(link)
}

const activePage = (path: string) => {
  // Simple active page detection - can be enhanced
  return path
}
</script>

<style lang="less">
@import '../styles/palette.less';

.nav-links {
  display: flex;
  align-items: center;
  
  #nav {
    flex: 1;
    border: none;
    background: transparent;
    
    &.ant-menu-horizontal {
      line-height: @navbarHeight;
      border-bottom: transparent;
      
      > .ant-menu-item,
      > .ant-menu-submenu {
        padding: 0 0.875rem;
        
        a {
          border-top: 2px solid transparent;
          padding: 0 6px;
          transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), 
                      border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        &:hover a {
          border-top-color: @accentColor;
        }
        
        &.ant-menu-item-selected a {
          border-color: @accentColor;
        }
      }
    }
  }
  
  .extra-group {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin-left: 1rem;
      
      .repo-link {
        font-size: 1.2rem;
        color: @textColor;
        
        &:hover {
          color: @accentColor;
        }
      }
    }
  }
}

@media (max-width: @MQMobile) {
  .nav-links {
    flex-direction: column;
    
    #nav {
      width: 100%;
      
      &.ant-menu-inline {
        border: none;
      }
    }
    
    .extra-group {
      width: 100%;
      justify-content: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid @borderColor;
    }
  }
}
</style>
