<template>
  <div v-if="prev || next" class="page-nav">
    <p class="inner">
      <span v-if="prev" class="prev">
        ←
        <RouterLink v-if="prev.type === 'page'" class="prev" :to="prev.path">
          {{ prev.title || prev.path }}
        </RouterLink>
        <a
          v-else
          class="prev"
          :href="prev.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ prev.title || prev.path }}
        </a>
      </span>

      <span v-if="next" class="next">
        <RouterLink v-if="next.type === 'page'" :to="next.path">
          {{ next.title || next.path }}
        </RouterLink>
        <a
          v-else
          :href="next.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ next.title || next.path }}
        </a>
        →
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageInfo, useSiteInfo } from '../composables'
import { resolvePage } from '../utils'

interface Props {
  sidebarItems: any[]
}

const props = defineProps<Props>()

const { page } = usePageInfo()
const { site } = useSiteInfo()

// Computed properties
const prev = computed(() => {
  return resolvePageLink('prev')
})

const next = computed(() => {
  return resolvePageLink('next')
})

// Methods
const resolvePageLink = (type: 'prev' | 'next') => {
  const { frontmatter } = page.value
  
  if (frontmatter[type] === false) {
    return null
  }
  
  if (frontmatter[type]) {
    return resolvePage(site.value.pages, frontmatter[type], page.value.path)
  }
  
  // Auto-resolve from sidebar
  return resolvePageLinkFromSidebar(type)
}

const resolvePageLinkFromSidebar = (type: 'prev' | 'next') => {
  const candidates = getCandidateLinksFromSidebar()
  const currentIndex = candidates.findIndex(candidate => 
    candidate.path === page.value.path
  )
  
  if (currentIndex >= 0) {
    const targetIndex = type === 'prev' ? currentIndex - 1 : currentIndex + 1
    return candidates[targetIndex] || null
  }
  
  return null
}

const getCandidateLinksFromSidebar = (): any[] => {
  const candidates: any[] = []
  
  const traverse = (items: any[]) => {
    for (const item of items) {
      if (item.type === 'page') {
        candidates.push(item)
      } else if (item.children) {
        traverse(item.children)
      }
    }
  }
  
  traverse(props.sidebarItems)
  return candidates
}
</script>

<style lang="less">
@import '../styles/palette.less';

.page-nav {
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid @borderColor;
    padding-top: 1rem;
    overflow: auto;

    .next {
      float: right;
    }

    .prev,
    .next {
      a {
        font-size: 1.1em;
        font-weight: 500;
        color: @accentColor;
        text-decoration: none;
        transition: color 0.15s ease;

        &:hover {
          color: darken(@accentColor, 10%);
        }
      }
    }
  }
}

@media (max-width: @MQMobile) {
  .page-nav {
    .inner {
      .prev,
      .next {
        display: block;
        float: none;
        
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
