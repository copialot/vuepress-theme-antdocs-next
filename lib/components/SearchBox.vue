<template>
  <div class="search-box">
    <a-input
      v-model:value="query"
      :placeholder="placeholder"
      class="search-input"
      @keyup.enter="search"
      @input="onInput"
    >
      <template #suffix>
        <SearchOutlined />
      </template>
    </a-input>
    
    <div v-if="showSuggestions && suggestions.length" class="suggestions">
      <ul>
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="goTo(suggestion.path)"
          class="suggestion"
        >
          <span class="page-title">{{ suggestion.title }}</span>
          <span v-if="suggestion.header" class="header">{{ suggestion.header.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useThemeConfig } from '../composables'

const router = useRouter()
const { themeConfig } = useThemeConfig()

const query = ref('')
const showSuggestions = ref(false)
const suggestions = ref<any[]>([])

const placeholder = computed(() => {
  return themeConfig.value.searchPlaceholder || 'Search'
})

const onInput = () => {
  if (query.value) {
    showSuggestions.value = true
    // TODO: Implement search logic
    suggestions.value = []
  } else {
    showSuggestions.value = false
  }
}

const search = () => {
  if (query.value && suggestions.value.length > 0) {
    goTo(suggestions.value[0].path)
  }
}

const goTo = (path: string) => {
  router.push(path)
  query.value = ''
  showSuggestions.value = false
}

// Hide suggestions when clicking outside
watch(showSuggestions, (show) => {
  if (show) {
    document.addEventListener('click', hideSuggestions)
  } else {
    document.removeEventListener('click', hideSuggestions)
  }
})

const hideSuggestions = (e: Event) => {
  if (!(e.target as Element).closest('.search-box')) {
    showSuggestions.value = false
  }
}
</script>

<style lang="less">
@import '../styles/palette.less';

.search-box {
  position: relative;
  display: inline-block;
  margin-right: 1rem;

  .search-input {
    width: 200px;
    
    :deep(.ant-input) {
      border-radius: 2rem;
      background-color: rgba(255, 255, 255, 0.2);
      border-color: transparent;
      
      &:focus {
        background-color: white;
        border-color: @accentColor;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
    }
  }

  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid @borderColor;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    max-height: 300px;
    overflow-y: auto;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .suggestion {
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid @borderColor;

      &:hover {
        background-color: @codeBgColor;
      }

      &:last-child {
        border-bottom: none;
      }

      .page-title {
        font-weight: 600;
        color: @textColor;
      }

      .header {
        display: block;
        font-size: 0.9em;
        color: @textLightColor;
        margin-top: 0.25rem;
      }
    }
  }
}

@media (max-width: @MQMobile) {
  .search-box {
    .search-input {
      width: 100%;
    }
  }
}
</style>
