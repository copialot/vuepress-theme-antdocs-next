<template>
  <div class="theme-switch">
    <a-tooltip placement="bottom">
      <template #title>
        {{ isDark ? 'Switch to light theme' : 'Switch to dark theme' }}
      </template>
      <a-button
        type="text"
        :icon="isDark ? h(SunOutlined) : h(MoonOutlined)"
        @click="toggleTheme"
        class="theme-toggle-btn"
      />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { SunOutlined, MoonOutlined } from '@ant-design/icons-vue'
import { useGlobalStore } from '../composables'

const globalStore = useGlobalStore()

const isDark = computed(() => globalStore.isDarkMode)

const toggleTheme = () => {
  globalStore.toggleDarkMode()
}
</script>

<style lang="less">
@import '../styles/palette.less';

.theme-switch {
  display: inline-block;

  .theme-toggle-btn {
    color: @textColor;
    font-size: 1.1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: @accentColor;
      background: rgba(0, 0, 0, 0.04);
    }

    &:focus {
      box-shadow: none;
    }
  }
}

// Dark theme styles
.dark {
  .theme-switch {
    .theme-toggle-btn {
      color: rgba(255, 255, 255, 0.85);

      &:hover {
        color: @accentColor;
        background: rgba(255, 255, 255, 0.08);
      }
    }
  }
}
</style>
