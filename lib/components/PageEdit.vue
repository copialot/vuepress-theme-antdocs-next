<template>
  <footer class="page-edit">
    <div v-if="editLink" class="edit-link">
      <a
        :href="editLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ editLinkText }}
      </a>
      <LinkOutlined />
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LinkOutlined } from '@ant-design/icons-vue'
import { usePageInfo, useSiteInfo, useThemeConfig } from '../composables'
import { endingSlashRE, outboundRE } from '../utils'

const { page, frontmatter } = usePageInfo()
const { site } = useSiteInfo()
const { themeConfig } = useThemeConfig()

// Computed properties
const lastUpdated = computed(() => {
  return page.value.frontmatter.lastUpdated || page.value.lastUpdated
})

const lastUpdatedText = computed(() => {
  return themeConfig.value.lastUpdated || 'Last Updated'
})

const editLink = computed(() => {
  const showEditLink = frontmatter.value.editLink !== false && themeConfig.value.editLinks
  
  if (!showEditLink) {
    return null
  }

  const {
    repo,
    docsDir = '',
    docsBranch = 'master',
    docsRepo = repo
  } = themeConfig.value

  if (showEditLink && docsRepo && page.value.filePathRelative) {
    return createEditLink(
      repo,
      docsRepo,
      docsDir,
      docsBranch,
      page.value.filePathRelative
    )
  }
  
  return null
})

const editLinkText = computed(() => {
  return themeConfig.value.editLinkText || 'Edit this page'
})

// Methods
const createEditLink = (
  repo: string,
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string
): string => {
  const bitbucket = /bitbucket.org/
  
  if (bitbucket.test(repo)) {
    const base = outboundRE.test(docsRepo) ? docsRepo : repo
    return (
      base.replace(endingSlashRE, '') +
      `/src` +
      `/${docsBranch}/` +
      (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
      path +
      `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
    )
  }

  const base = outboundRE.test(docsRepo)
    ? docsRepo
    : `https://github.com/${docsRepo}`
    
  return (
    base.replace(endingSlashRE, '') +
    `/edit` +
    `/${docsBranch}/` +
    (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
    path
  )
}
</script>

<style lang="less">
@import '../styles/palette.less';

.page-edit {
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;
    margin-right: 0.25rem;

    a {
      color: @accentColor;
      margin-right: 0.25rem;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: @textColor;
    }

    .time {
      font-weight: 400;
      color: @textLightColor;
    }
  }
}

@media (max-width: @MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
