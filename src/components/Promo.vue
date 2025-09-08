<template>
  <div v-if="data">
    <div class="promo">
      <!-- Promo state 1 -->
      <div v-if="data.style === 1" @click="gotoLink" id="promo_1">
        <img :src="data.image" />
        <span :title="data.text">{{ data.text || 'No text' }}</span>
      </div>
      
      <!-- Promo state 2 -->
      <div v-else-if="data.style === 2" id="promo_2">
        <a-carousel autoplay :autoplay-speed="data.speed || 3000">
          <div v-for="(item, index) in data.items" :key="index">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              <img :src="item.image" :title="item.text" />
            </a>
          </div>
        </a-carousel>
      </div>
      
      <!-- Promo state 3 -->
      <div v-else id="promo_3">
        <div class="promo_title">{{ data.title || 'Sponsor' }}</div>
        <a-button type="primary" ghost @click="popupInfo">
          {{ data.btnText || 'Become a Sponsor' }}
        </a-button>
      </div>
    </div>
    <a-divider dashed id="reset-margin" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Modal } from 'ant-design-vue'
import { useThemeConfig } from '../composables'

const { themeConfig } = useThemeConfig()

const data = computed(() => {
  return themeConfig.value.ads
})

const gotoLink = () => {
  if (data.value?.link) {
    window.open(data.value.link)
  }
}

const popupInfo = () => {
  Modal.info({
    title: data.value?.msgTitle || 'Message Title',
    content: data.value?.msgText || 'Put your text here.',
    okText: data.value?.msgOkText || 'Ok',
    maskClosable: true
  })
}
</script>

<style lang="less">
@import '../styles/palette.less';

.promo {
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;

  #promo_1 {
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }

    span {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.9em;
      color: @textLightColor;
    }
  }

  #promo_2 {
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
  }

  #promo_3 {
    .promo_title {
      font-size: 1.1em;
      font-weight: 600;
      margin-bottom: 1rem;
      color: @textColor;
    }
  }
}

#reset-margin {
  margin: 1rem 0 0 0;
}
</style>
