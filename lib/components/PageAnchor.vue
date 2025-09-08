<template>
  <div v-if="headers.length" class="page-anchor">
    <div class="anchor-wrapper">
      <div class="anchor-title">On this page</div>
      <ul class="anchor-list">
        <li
          v-for="header in filteredHeaders"
          :key="header.slug"
          :class="[
            'anchor-item',
            `anchor-level-${header.level}`,
            { active: activeAnchor === header.slug }
          ]"
        >
          <a
            :href="`#${header.slug}`"
            :title="header.title"
            @click="scrollToAnchor(header.slug)"
          >
            {{ header.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { usePageInfo, useThemeConfig } from '../composables'

const { headers } = usePageInfo()
const { themeConfig } = useThemeConfig()

const activeAnchor = ref('')

// Computed properties
const anchorDepth = computed(() => {
  return themeConfig.value.pageAnchor?.anchorDepth || 2
})

const filteredHeaders = computed(() => {
  return headers.value.filter(header => 
    header.level >= 2 && header.level <= anchorDepth.value
  )
})

// Methods
const scrollToAnchor = (slug: string) => {
  const element = document.getElementById(slug)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const updateActiveAnchor = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const headerElements = filteredHeaders.value
    .map(header => ({
      slug: header.slug,
      element: document.getElementById(header.slug),
      level: header.level
    }))
    .filter(item => item.element)

  // Find the current active header
  let current = ''
  for (let i = headerElements.length - 1; i >= 0; i--) {
    const { slug, element } = headerElements[i]
    if (element && element.offsetTop <= scrollTop + 100) {
      current = slug
      break
    }
  }

  activeAnchor.value = current
}

// Lifecycle
onMounted(() => {
  updateActiveAnchor()
  window.addEventListener('scroll', updateActiveAnchor)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveAnchor)
})
</script>

<style lang="less">
@import '../styles/palette.less';

.page-anchor {
  position: fixed;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  z-index: 10;
  max-width: 200px;

  .anchor-wrapper {
    background: white;
    border: 1px solid @borderColor;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    max-height: 60vh;
    overflow-y: auto;

    .anchor-title {
      font-size: 0.9em;
      font-weight: 600;
      color: @textColor;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @borderColor;
    }

    .anchor-list {
      list-style: none;
      margin: 0;
      padding: 0;

      .anchor-item {
        margin: 0;
        
        a {
          display: block;
          padding: 0.25rem 0;
          color: @textLightColor;
          text-decoration: none;
          font-size: 0.85em;
          line-height: 1.4;
          border-left: 2px solid transparent;
          padding-left: 0.5rem;
          transition: all 0.15s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:hover {
            color: @accentColor;
          }
        }

        &.active a {
          color: @accentColor;
          border-left-color: @accentColor;
          font-weight: 500;
        }

        &.anchor-level-3 a {
          padding-left: 1rem;
          font-size: 0.8em;
        }

        &.anchor-level-4 a {
          padding-left: 1.5rem;
          font-size: 0.75em;
        }
      }
    }
  }
}

@media (max-width: @MQMobile) {
  .page-anchor {
    display: none;
  }
}

// Dark theme support
.dark .page-anchor {
  .anchor-wrapper {
    background: #1f1f1f;
    border-color: #333;
    
    .anchor-title {
      color: rgba(255, 255, 255, 0.85);
      border-bottom-color: #333;
    }
    
    .anchor-list .anchor-item a {
      color: rgba(255, 255, 255, 0.65);
      
      &:hover {
        color: @accentColor;
      }
    }
  }
}
</style>
