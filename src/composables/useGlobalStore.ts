import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  // State
  const navStyle = ref('')
  const isCollapsePageAnchor = ref(false)
  const isMobileSidebarOpen = ref(false)
  const isDarkMode = ref(false)

  // Getters (computed)
  const sidebarVisible = computed(() => isMobileSidebarOpen.value)
  const pageAnchorCollapsed = computed(() => isCollapsePageAnchor.value)

  // Actions
  const setNavStyle = (style: string) => {
    navStyle.value = style
  }

  const togglePageAnchor = (collapsed?: boolean) => {
    if (typeof collapsed === 'boolean') {
      isCollapsePageAnchor.value = collapsed
    } else {
      isCollapsePageAnchor.value = !isCollapsePageAnchor.value
    }
  }

  const toggleMobileSidebar = (open?: boolean) => {
    if (typeof open === 'boolean') {
      isMobileSidebarOpen.value = open
    } else {
      isMobileSidebarOpen.value = !isMobileSidebarOpen.value
    }
  }

  const openMobileSidebar = () => {
    isMobileSidebarOpen.value = true
  }

  const closeMobileSidebar = () => {
    isMobileSidebarOpen.value = false
  }

  const toggleDarkMode = (dark?: boolean) => {
    if (typeof dark === 'boolean') {
      isDarkMode.value = dark
    } else {
      isDarkMode.value = !isDarkMode.value
    }
    
    // Apply theme class to document
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Store preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('antdocs-theme', isDarkMode.value ? 'dark' : 'light')
    }
  }

  const initializeTheme = () => {
    // Initialize theme from localStorage or system preference
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('antdocs-theme')
      if (stored) {
        toggleDarkMode(stored === 'dark')
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        toggleDarkMode(prefersDark)
      }
    }
  }

  return {
    // State
    navStyle,
    isCollapsePageAnchor,
    isMobileSidebarOpen,
    isDarkMode,
    
    // Getters
    sidebarVisible,
    pageAnchorCollapsed,
    
    // Actions
    setNavStyle,
    togglePageAnchor,
    toggleMobileSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    toggleDarkMode,
    initializeTheme,
  }
})
