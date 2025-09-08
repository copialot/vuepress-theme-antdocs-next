<template>
  <div class="theme-container">
    <div class="theme-antdocs-content page-404">
      <h1>404</h1>

      <blockquote>{{ randomMessage }}</blockquote>

      <RouterLink to="/">
        Take me home.
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const messages = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

const randomMessage = computed(() => {
  return messages[Math.floor(Math.random() * messages.length)]
})
</script>

<style lang="less">
@import '../styles/palette.less';

.page-404 {
  max-width: @contentWidthNoSidebar !important;
  padding: 0 2.5rem !important;
  margin: 0 auto;
  padding-top: 4rem;
  text-align: center;

  h1 {
    font-size: 4rem;
    color: @accentColor;
    margin-bottom: 1rem;
  }

  blockquote {
    font-size: 1.2rem;
    margin: 2rem 0;
    color: @textColor;
  }

  a {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: @accentColor;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken(@accentColor, 10%);
    }
  }
}
</style>
