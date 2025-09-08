<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsible,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActiveItem(item.path)
      }"
      :to="item.path"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>

      <span v-if="collapsible" class="arrow" :class="open ? 'down' : 'right'">
        <DownOutlined />
      </span>
    </RouterLink>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span v-if="collapsible" class="arrow" :class="open ? 'down' : 'right'">
        <DownOutlined />
      </span>
    </p>

    <SidebarLinks
      v-if="open || !collapsible"
      class="sidebar-group-items"
      :items="item.children"
      :sidebar-depth="item.sidebarDepth"
      :depth="depth + 1"
    />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DownOutlined } from '@ant-design/icons-vue'
import SidebarLinks from './SidebarLinks.vue'
import { isActive } from '../utils'

interface Props {
  item: {
    title: string
    path?: string
    children: any[]
    sidebarDepth?: number
  }
  open: boolean
  collapsible: boolean
  depth: number
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()

const route = useRoute()

const isActiveItem = (path: string) => {
  return isActive(route, path)
}
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar-group {
  .sidebar-heading {
    color: @textColor;
    transition: color 0.15s ease;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
    padding: 0.35rem 1.5rem 0.35rem 1.25rem;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    border-left: 0.25rem solid transparent;
    
    &.clickable {
      &.active {
        font-weight: 600;
        color: @accentColor;
        border-left-color: @accentColor;
      }
      
      &:hover {
        color: @accentColor;
      }
    }

    .arrow {
      position: relative;
      top: -0.12em;
      left: 0.5em;
      transition: transform 0.15s ease;
      
      &.right {
        transform: rotate(-90deg);
      }
      
      &.down {
        transform: rotate(0deg);
      }
    }
  }

  .sidebar-group-items {
    transition: height 0.1s ease-out;
    font-size: 0.95em;
    overflow: hidden;
  }

  &.collapsible {
    .sidebar-heading {
      &:hover {
        color: @accentColor;
      }
    }
  }

  &.is-sub-group {
    padding-left: 0.5em;

    & > .sidebar-heading {
      font-weight: 500;
      font-size: 0.95em;
      line-height: 1.4;
      border-left: none;
      padding: 0.25rem 1.5rem 0.25rem 2rem;
    }

    & > .sidebar-group-items {
      padding-left: 1rem;

      & > li > .sidebar-link {
        font-size: 0.85em;
        border-left: none;
      }
    }
  }

  &.depth-2 {
    & > .sidebar-heading {
      border-left: none;
    }
  }
}
</style>
