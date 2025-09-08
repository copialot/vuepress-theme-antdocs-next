<template>
  <form
    id="search-form"
    class="algolia-search-wrapper search-box"
    role="search"
  >
    <input
      id="algolia-search-input"
      class="search-query"
      :placeholder="placeholder"
    >
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useSiteInfo, useThemeConfig } from '../composables'

interface AlgoliaOptions {
  apiKey: string
  indexName: string
  appId?: string
  algoliaOptions?: Record<string, any>
}

interface Props {
  options: AlgoliaOptions
}

const props = defineProps<Props>()

const { site } = useSiteInfo()
const { themeConfig } = useThemeConfig()

const placeholder = ref('')

const initialize = async (userOptions: AlgoliaOptions, lang: string) => {
  try {
    // Dynamic import of DocSearch (placeholder for now)
    // In a real implementation, you would import @docsearch/js here
    console.log('Initializing Algolia search with options:', userOptions)
    
    // TODO: Implement actual DocSearch integration
    // const { default: docsearch } = await import('@docsearch/js')
    // docsearch({
    //   ...userOptions,
    //   container: '#algolia-search-input',
    //   // Additional configuration
    // })
  } catch (error) {
    console.error('Failed to initialize Algolia search:', error)
  }
}

const update = (newOptions: AlgoliaOptions, lang: string) => {
  // Re-initialize with new options
  initialize(newOptions, lang)
}

// Watch for option changes
watch(() => props.options, (newOptions) => {
  if (newOptions) {
    update(newOptions, site.value.lang)
  }
}, { deep: true })

// Initialize on mount
onMounted(() => {
  initialize(props.options, site.value.lang)
  placeholder.value = themeConfig.value.searchPlaceholder || 'Search docs'
})
</script>

<style lang="less">
@import '../styles/palette.less';

.algolia-search-wrapper {
  display: inline-block;
  position: relative;
  margin-right: 1rem;

  .search-query {
    width: 200px;
    height: 32px;
    padding: 4px 11px;
    border: 1px solid @borderColor;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 14px;
    outline: none;
    transition: all 0.3s;

    &:focus {
      background-color: white;
      border-color: @accentColor;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

    &::placeholder {
      color: @textLightColor;
    }
  }
}

// DocSearch specific styles (when implemented)
:deep(.DocSearch) {
  --docsearch-primary-color: @accentColor;
  --docsearch-text-color: @textColor;
  --docsearch-spacing: 12px;
  --docsearch-icon-stroke-width: 1.4;
  --docsearch-highlight-color: @accentColor;
  --docsearch-muted-color: @textLightColor;
  --docsearch-container-background: rgba(101, 108, 133, 0.8);
  --docsearch-logo-color: @textColor;
}

@media (max-width: @MQMobile) {
  .algolia-search-wrapper {
    .search-query {
      width: 100%;
    }
  }
}
</style>
