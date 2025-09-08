<template>
  <main :class="['page', { 'has-page-anchor': hasPageAnchor }]">
    <slot name="top" />

    <Content class="theme-antdocs-content" />
    <PageEdit />

    <PageNav :sidebar-items="sidebarItems" />
    <PageAnchor v-if="!pageAnchorConfig.isDisabled" />

    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Content } from 'vuepress/client'
import PageEdit from './PageEdit.vue'
import PageNav from './PageNav.vue'
import PageAnchor from './PageAnchor.vue'
import { usePageInfo, useThemeConfig, useGlobalStore } from '../composables'

interface Props {
  sidebarItems: any[]
}

defineProps<Props>()

const { page, frontmatter, headers } = usePageInfo()
const { themeConfig } = useThemeConfig()
const globalStore = useGlobalStore()

// Computed properties
const pageAnchorConfig = computed(() => {
  return frontmatter.value.pageAnchor ||
         themeConfig.value.pageAnchor || 
         { anchorDepth: 2, isDisabled: false }
})

const hasPageAnchor = computed(() => {
  if (pageAnchorConfig.value.isDisabled) {
    globalStore.togglePageAnchor(true)
    return false
  }
  
  if (!headers.value || headers.value.length === 0) {
    globalStore.togglePageAnchor(true)
    return false
  }
  
  globalStore.togglePageAnchor(false)
  return true
})
</script>

<style lang="less">
@import '../styles/palette.less';
@import '../styles/wrapper.less';

.page {
  padding-bottom: 2rem;
  display: block;

  &.has-page-anchor {
    padding-right: 14rem;
  }
}

.theme-antdocs-content {
  &:not(.custom) {
    .wrapper;
    
    > *:first-child {
      margin-top: @navbarHeight + 2rem;
    }

    p.demo {
      padding: 1rem 1.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    img {
      max-width: 100%;
    }
  }

  &.custom {
    padding: 0;
    margin: 0;

    img {
      max-width: 100%;
    }
  }
}

@media (max-width: @MQMobile) {
  .page {
    &.has-page-anchor {
      padding-right: 0;
    }
  }
}
</style>
