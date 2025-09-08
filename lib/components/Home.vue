<template>
  <div>
    <main class="home" aria-labelledby="main-title">
      <header class="hero">
        <img
          v-if="data.heroImage"
          :src="withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
          class="hero-logo"
        />

        <h1 v-if="data.heroText !== null" id="main-title">
          {{ data.heroText || site.title || 'Hello' }}
        </h1>

        <p v-if="data.tagline !== null" class="description">
          {{ data.tagline || site.description || 'Welcome to your VuePress site' }}
        </p>

        <div v-if="data.actions && data.actions.length" class="actions">
          <a-space size="middle">
            <a-button
              v-for="(action, index) in data.actions"
              :key="index"
              :type="action.type || 'primary'"
              :shape="action.shape || undefined"
              :size="action.size || 'large'"
              :ghost="action.ghost || false"
            >
              <a
                v-if="isExternal(action.link || '/')"
                :href="resolveLink(action.link || '/')"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ action.text }}
              </a>
              <RouterLink v-else :to="resolveLink(action.link || '/')">
                {{ action.text }}
              </RouterLink>
            </a-button>
          </a-space>
        </div>
      </header>

      <div v-if="data.features && data.features.length" class="features">
        <div
          v-for="(feature, index) in data.features"
          :key="index"
          class="feature"
        >
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>

      <Content class="theme-antdocs-content custom" />
    </main>

    <div v-if="data.footer" class="footer">
      <div
        v-if="data.footerWrap && data.footerWrap.length"
        class="footer-container"
      >
        <a-row
          :gutter="{ md: 0, lg: 32 }"
          type="flex"
          justify="space-around"
          class="add-bottom"
        >
          <a-col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            :xl="6"
            v-for="(footerWrap, index) in data.footerWrap"
            :key="index"
          >
            <div>
              <h2>{{ footerWrap.headline }}</h2>
              <ul>
                <li v-for="(item, itemIndex) in footerWrap.items" :key="itemIndex">
                  <a
                    v-if="isExternal(item.link)"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.text }}
                  </a>
                  <RouterLink v-else :to="item.link">
                    {{ item.text }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </a-col>
        </a-row>
      </div>

      <div class="footer-bottom">
        <p>{{ data.footer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Content } from '@vuepress/client'
import { usePageInfo, useSiteInfo, useAssets } from '../composables'
import { isExternal, ensureExt } from '../utils'

const { frontmatter } = usePageInfo()
const { site } = useSiteInfo()
const { withBase } = useAssets()

// Computed properties
const data = computed(() => frontmatter.value)

// Methods
const resolveLink = (link: string) => {
  return ensureExt(link)
}
</script>

<style lang="less">
@import '../styles/palette.less';

.home {
  padding: @navbarHeight 2rem 0;
  max-width: @homePageWidth;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;
    padding: 2rem 0 4rem;

    .hero-logo {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
      margin: 0;
      color: @textColor;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: @textLightColor;
      margin: 1.8rem auto;
    }

    .actions {
      padding: 1.8rem 0;

      .ant-btn {
        margin: 0.5rem;

        a {
          color: inherit;
          text-decoration: none;
        }
      }
    }
  }

  .features {
    border-top: 1px solid @borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;

    .feature {
      flex-grow: 1;
      flex-basis: 30%;
      max-width: 30%;
      padding: 0 1.5rem;

      h2 {
        font-size: 1.4rem;
        font-weight: 500;
        border-bottom: none;
        padding-bottom: 0;
        color: @textColor;
      }

      p {
        color: @textLightColor;
        line-height: 1.6;
      }
    }
  }

  .theme-antdocs-content {
    &.custom {
      padding: 0;
      margin: 0;
    }
  }
}

.footer {
  padding: 2.5rem;
  border-top: 1px solid @borderColor;
  text-align: center;
  color: @textLightColor;
  background-color: @codeBgColor;

  .footer-container {
    max-width: @homePageWidth;
    margin: 0 auto;
    padding-bottom: 2rem;

    .add-bottom {
      padding-bottom: 2rem;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: 500;
      color: @textColor;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin: 0.5rem 0;

        a {
          color: @textLightColor;
          text-decoration: none;
          transition: color 0.15s ease;

          &:hover {
            color: @accentColor;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid @borderColor;
    padding-top: 1.5rem;

    p {
      margin: 0;
    }
  }
}

@media (max-width: @MQMobile) {
  .home {
    .features {
      flex-direction: column;

      .feature {
        max-width: 100%;
        padding: 0 0 1.5rem 0;
      }
    }

    .hero {
      .hero-logo {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .actions {
        .ant-btn {
          display: block;
          margin: 0.5rem auto;
          max-width: 300px;
        }
      }
    }
  }

  .footer {
    padding: 1.5rem;

    .footer-container {
      text-align: left;
    }
  }
}

@media (max-width: @MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      h1 {
        font-size: 1.8rem;
      }

      .description {
        font-size: 1.1rem;
      }
    }
  }
}
</style>
