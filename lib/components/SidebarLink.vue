<template>
  <div class="sidebar-link-wrapper">
    <!-- Main link -->
    <RouterLink
      v-if="item.type !== 'external'"
      :to="item.path"
      class="sidebar-link"
      :class="{ active: isMainActive }"
      :title="item.title || item.path"
    >
      {{ item.title || item.path }}
    </RouterLink>
    
    <a
      v-else
      :href="item.path"
      class="sidebar-link external"
      target="_blank"
      rel="noopener noreferrer"
      :title="item.title || item.path"
    >
      {{ item.title || item.path }}
      <LinkOutlined />
    </a>

    <!-- Auto-generated headers or manual children -->
    <ul v-if="shouldShowChildren && children.length" class="sidebar-sub-headers">
      <li
        v-for="child in children"
        :key="child.slug || child.path"
        class="sidebar-sub-header"
      >
        <RouterLink
          :to="getChildPath(child)"
          class="sidebar-link"
          :class="{ active: isChildActive(child) }"
          :style="getChildStyle(child)"
        >
          {{ child.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { LinkOutlined } from '@ant-design/icons-vue'
import { usePageInfo, useThemeConfig } from '../composables'
import { isActive, hashRE, groupHeaders } from '../utils'

interface Props {
  item: {
    type?: string
    path: string
    title?: string
    basePath?: string
    children?: any[]
    headers?: any[]
  }
  sidebarDepth?: number
}

const props = withDefaults(defineProps<Props>(), {
  sidebarDepth: 2
})

const route = useRoute()
const { page, frontmatter } = usePageInfo()
const { themeConfig } = useThemeConfig()

// Computed properties
const isMainActive = computed(() => {
  const selfActive = isActive(route, props.item.path)
  
  if (props.item.type === 'auto') {
    return selfActive || (props.item.children || []).some(c => 
      isActive(route, props.item.basePath + '#' + c.slug)
    )
  }
  
  return selfActive
})

const maxDepth = computed(() => {
  return [
    frontmatter.value.sidebarDepth,
    props.sidebarDepth,
    themeConfig.value.sidebarDepth,
    1
  ].find(depth => depth !== undefined) || 1
})

const displayAllHeaders = computed(() => {
  return themeConfig.value.displayAllHeaders
})

const shouldShowChildren = computed(() => {
  if (props.item.type === 'auto') {
    return true
  }
  
  return (isMainActive.value || displayAllHeaders.value) && 
         props.item.headers && 
         !hashRE.test(props.item.path)
})

const children = computed(() => {
  if (props.item.type === 'auto') {
    return props.item.children || []
  }
  
  if (props.item.headers) {
    return groupHeaders(props.item.headers)
  }
  
  return []
})

// Methods
const getChildPath = (child: any) => {
  if (props.item.type === 'auto') {
    return props.item.basePath + '#' + child.slug
  }
  return props.item.path + '#' + child.slug
}

const isChildActive = (child: any) => {
  return isActive(route, getChildPath(child))
}

const getChildStyle = (child: any) => {
  const level = child.level || 2
  if (level > 2) {
    return {
      paddingLeft: (level - 1) + 'rem'
    }
  }
  return {}
}
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar-link-wrapper {
  .sidebar-link {
    display: block;
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    line-height: 1.4;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-left: 0.25rem solid transparent;
    color: @textColor;
    text-decoration: none;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover {
      color: @accentColor;
    }

    &.active {
      font-weight: 600;
      color: @accentColor;
      border-left-color: @accentColor;
    }

    &.external {
      .anticon {
        margin-left: 0.25rem;
        font-size: 0.8em;
      }
    }
  }

  .sidebar-sub-headers {
    padding: 0;
    margin: 0;
    list-style: none;

    .sidebar-sub-header {
      .sidebar-link {
        padding-left: 2rem;
        font-size: 0.85em;
        font-weight: normal;
        border-left: none;

        &.active {
          font-weight: 500;
          color: @accentColor;
        }
      }
    }
  }
}
</style>
