<template>
  <ul v-if="items.length" class="sidebar-links">
    <li v-for="(item, i) in items" :key="i">
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsible="item.collapsible || item.collapsable"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink 
        v-else 
        :sidebar-depth="sidebarDepth" 
        :item="item" 
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import { isActive } from '../utils'

interface Props {
  items: any[]
  depth?: number
  sidebarDepth?: number
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
  sidebarDepth: 2
})

const route = useRoute()
const openGroupIndex = ref(0)

const refreshIndex = () => {
  const index = resolveOpenGroupIndex(route, props.items)
  if (index > -1) {
    openGroupIndex.value = index
  }
}

const toggleGroup = (index: number) => {
  openGroupIndex.value = index === openGroupIndex.value ? -1 : index
}

const isActiveItem = (page: any) => {
  return isActive(route, page.regularPath || page.path)
}

// Helper functions
function resolveOpenGroupIndex(route: any, items: any[]): number {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (descendantIsActive(route, item)) {
      return i
    }
  }
  return -1
}

function descendantIsActive(route: any, item: any): boolean {
  if (item.type === 'group') {
    return item.children.some((child: any) => {
      if (child.type === 'group') {
        return descendantIsActive(route, child)
      } else {
        return isActive(route, child.regularPath || child.path)
      }
    })
  }
  return false
}

// Watch for route changes
watch(() => route.path, () => {
  refreshIndex()
})

// Initialize on mount
onMounted(() => {
  refreshIndex()
})
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar-links {
  padding: 1.5rem 0;

  li {
    margin: 0;
  }

  a {
    color: @textColor;
    text-decoration: none;
    
    &:hover {
      color: @accentColor;
    }
  }

  .sidebar-link {
    display: block;
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    line-height: 1.4;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-left: 0.25rem solid transparent;
    
    &:hover {
      color: @accentColor;
    }
    
    &.active {
      font-weight: 600;
      color: @accentColor;
      border-left-color: @accentColor;
    }
  }

  .sidebar-group {
    .sidebar-group-items {
      .sidebar-link {
        padding-left: 2rem;
      }
      
      .sidebar-group {
        .sidebar-link {
          padding-left: 2.75rem;
        }
      }
    }
  }
}
</style>
